import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import {
  FINBOARD_TEAM_AUTHOR,
  FINBOARD_TEAM_SCHEMA_AUTHOR,
  normalizeBlogStructuredData,
  resolveAuthor,
} from "../src/lib/blogAuthor.mjs";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(TEST_DIR, "..", "content", "blog");
const FINBOARD_LINKEDIN = "https://www.linkedin.com/company/finboard-ai-native-finance";

test("always resolves FinBoard Team for blog authorship", () => {
  assert.equal(resolveAuthor().name, "FinBoard Team");
  assert.equal(resolveAuthor().linkedin, FINBOARD_LINKEDIN);
  assert.deepEqual(FINBOARD_TEAM_SCHEMA_AUTHOR.sameAs, [FINBOARD_LINKEDIN]);
  assert.equal(resolveAuthor("tech", "ujjwal-singh"), FINBOARD_TEAM_AUTHOR);
  assert.equal(resolveAuthor("accounting", "vaishnav-gupta"), FINBOARD_TEAM_AUTHOR);
});

test("normalizes Article and BlogPosting authors recursively", () => {
  const input = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: "Example",
        author: { "@type": "Person", name: "Someone Else" },
      },
      {
        "@type": ["Article", "TechArticle"],
        name: "Nested article",
      },
      {
        "@type": "TechArticle",
        name: "Subtype article",
      },
      {
        "@type": "https://schema.org/BlogPosting",
        name: "Expanded blog posting",
      },
      { "@type": "Organization", name: "Publisher" },
    ],
  };

  const result = normalizeBlogStructuredData(input);

  assert.deepEqual(result["@graph"][0].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][1].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][2].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][3].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.equal(result["@graph"][4].author, undefined);
  assert.notEqual(result, input);
});

test("source validation rejects article subtype and expanded URL author drift", () => {
  const structuredData = [
    {
      "@type": "TechArticle",
      author: { "@type": "Person", name: "Someone Else" },
    },
    {
      "@type": "https://schema.org/NewsArticle",
      author: { "@type": "Person", name: "Someone Else" },
    },
  ];

  assert.throws(() => {
    assert.deepEqual(
      structuredData,
      normalizeBlogStructuredData(structuredData),
    );
  }, assert.AssertionError);
});

test("every blog source identifies FinBoard Team", () => {
  const files = fs.readdirSync(BLOG_DIR)
    .filter((file) => /\.(json|md|mdx)$/.test(file));

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");

    if (file.endsWith(".json")) {
      const post = JSON.parse(raw);
      assert.equal(post.author, "FinBoard Team", file);
      assert.equal(post.authorId, "finboard-team", file);
      assert.deepEqual(
        post.structuredData,
        normalizeBlogStructuredData(post.structuredData),
        file,
      );
      continue;
    }

    const frontmatter = raw.match(/^---\s*\n([\s\S]*?)\n---/);
    assert.ok(frontmatter, `${file} has frontmatter`);
    assert.match(frontmatter[1], /^author:\s*["']?FinBoard Team["']?\s*$/m, file);
    assert.match(frontmatter[1], /^authorId:\s*["']?finboard-team["']?\s*$/m, file);
  }
});
