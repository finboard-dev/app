// Filesystem-backed template gallery. Each content/templates/<slug>.json is a
// CMS-imported template: metadata, an "about" HTML body, an external Google
// Sheets link, and optional JSON-LD. Runs at build time (Server Components).

import fs from "node:fs";
import path from "node:path";

const TEMPLATE_DIR = path.join(process.cwd(), "content", "templates");

function readTemplate(slug) {
  const p = path.join(TEMPLATE_DIR, `${slug}.json`);
  if (!fs.existsSync(p)) return null;
  const data = JSON.parse(fs.readFileSync(p, "utf8"));
  return {
    slug,
    title: data.title ?? slug,
    category: data.category ?? "Other",
    shortDescription: data.shortDescription ?? "",
    about: data.about ?? "",
    excerpt: data.excerpt ?? data.shortDescription ?? "",
    link: data.link ?? "",
    image: data.image ?? null,
    imageAlt: data.imageAlt ?? data.title ?? "",
    order: typeof data.order === "number" ? data.order : 0,
    structuredData: data.structuredData ?? null,
  };
}

export function getTemplateSlugs() {
  if (!fs.existsSync(TEMPLATE_DIR)) return [];
  return fs
    .readdirSync(TEMPLATE_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getTemplateBySlug(slug) {
  return readTemplate(slug);
}

export function getAllTemplates() {
  return getTemplateSlugs()
    .map(readTemplate)
    .filter(Boolean)
    .sort((a, b) => {
      const c = a.category.localeCompare(b.category);
      return c !== 0 ? c : a.order - b.order;
    });
}

// Distinct categories, sorted by template count (desc) then name.
export function getTemplateCategories() {
  const counts = new Map();
  for (const t of getAllTemplates()) {
    counts.set(t.category, (counts.get(t.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([name, count]) => ({ name, count }));
}
