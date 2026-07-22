// Filesystem-backed blog source. Two on-disk formats live side by side:
//   * <slug>.json  — CMS import: pre-rendered HTML body + optional JSON-LD.
//   * <slug>.md(x) — hand-authored: markdown body, frontmatter via gray-matter.
// Both normalise to the same shape. Runs at build time (Server Components).

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { resolveAuthor } from "@/lib/authors";
import { normalizeBlogStructuredData } from "@/lib/blogAuthor.mjs";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

const WORDS_PER_MINUTE = 200;

// Canonical blog categories. Frontmatter stores the key; the UI shows the label.
export const BLOG_CATEGORIES = {
  accounting: "Accounting & Finance",
  tech: "Engineering",
};

const DEFAULT_CATEGORY = "accounting";

function normalizeCategory(value) {
  const key = String(value ?? "").toLowerCase();
  return BLOG_CATEGORIES[key] ? key : DEFAULT_CATEGORY;
}

export function categoryLabel(key) {
  return BLOG_CATEGORIES[key] ?? BLOG_CATEGORIES[DEFAULT_CATEGORY];
}

function stripTags(html) {
  return String(html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function estimateReadingTime(text) {
  const words = String(text || "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

function normalizeDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value);
}

function fileFor(slug) {
  for (const ext of [".json", ".md", ".mdx"]) {
    const p = path.join(BLOG_DIR, `${slug}${ext}`);
    if (fs.existsSync(p)) return { path: p, ext };
  }
  return null;
}

export function getPostSlugs() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const slugs = new Set();
  for (const file of fs.readdirSync(BLOG_DIR)) {
    const m = file.match(/^(.*)\.(json|md|mdx)$/);
    if (m) slugs.add(m[1]);
  }
  return [...slugs];
}

export function getPostBySlug(slug) {
  const found = fileFor(slug);
  if (!found) return null;

  if (found.ext === ".json") {
    const data = JSON.parse(fs.readFileSync(found.path, "utf8"));
    return {
      slug,
      format: "html",
      content: data.content ?? "",
      structuredData: data.structuredData
        ? normalizeBlogStructuredData(data.structuredData)
        : null,
      frontmatter: {
        title: data.title ?? slug,
        date: normalizeDate(data.date),
        excerpt: data.excerpt ?? "",
        author: resolveAuthor(normalizeCategory(data.category), data.authorId),
        category: normalizeCategory(data.category),
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage ?? null,
        coverAlt: data.coverAlt ?? data.title ?? "",
        readingTime: estimateReadingTime(stripTags(data.content)),
        order: typeof data.order === "number" ? data.order : 0,
      },
    };
  }

  const raw = fs.readFileSync(found.path, "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    format: "markdown",
    content,
    structuredData: null,
    frontmatter: {
      title: data.title ?? slug,
      date: normalizeDate(data.date),
      excerpt: data.excerpt ?? "",
      author: resolveAuthor(normalizeCategory(data.category), data.authorId),
      category: normalizeCategory(data.category),
      tags: Array.isArray(data.tags) ? data.tags : [],
      coverImage: data.coverImage ?? null,
      coverAlt: data.coverAlt ?? data.title ?? "",
      readingTime: estimateReadingTime(content),
      order: 0,
    },
  };
}

// Dated (hand-authored) posts first, newest first; then undated CMS posts in
// import order.
function comparePosts(a, b) {
  if (a.date && b.date) return a.date < b.date ? 1 : -1;
  if (a.date) return -1;
  if (b.date) return 1;
  return (a.order ?? 0) - (b.order ?? 0);
}

export function getAllPosts() {
  return getPostSlugs()
    .map((slug) => {
      const post = getPostBySlug(slug);
      return post ? { slug, ...post.frontmatter } : null;
    })
    .filter(Boolean)
    .sort(comparePosts);
}
