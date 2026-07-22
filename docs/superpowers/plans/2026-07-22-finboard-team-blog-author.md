# FinBoard Team Blog Author Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make FinBoard Team the author of every existing and future FinBoard blog post in visible bylines, source metadata, and Article structured data.

**Architecture:** A small JavaScript author policy module will own the canonical public author and normalize Article or BlogPosting schema at runtime. The existing resolver, loader, and page will consume that policy. A matching Python helper will enforce the same values in repository publishing scripts, while regression tests scan all blog sources and pipeline configuration.

**Tech Stack:** Next.js 15, React 19, Node test runner, Python 3 unittest, JSON and MDX content, JSON-LD

## Global Constraints

The exact public author name is `FinBoard Team`.

The canonical author identifier is `finboard-team`.

The rule applies to all existing posts and every future post, regardless of category, source format, publishing script, or embedded structured data.

Do not rename people on the About page, team page, or other non-blog product pages.

Do not add decorative special characters to copy.

Preserve titles, dates, body content, images, categories, tags, URLs, and schema fields unrelated to author identity.

Preserve the user's unrelated untracked files.

Run the site on port 3010 for final verification.

Push the verified implementation directly to `origin/main`.

---

## File Map

`frontend/src/lib/blogAuthor.mjs` will own the canonical JavaScript author record, canonical schema author, resolver, and recursive schema normalization.

`frontend/src/lib/authors.js` will retain the shared author registry for non-blog consumers while delegating blog author resolution to the canonical policy.

`frontend/src/lib/blog.js` will normalize custom JSON-LD as content is loaded.

`frontend/src/app/blog/[slug]/page.jsx` will generate Organization author schema for posts without custom JSON-LD.

`frontend/scripts/blog_author.py` will own the equivalent constants and normalization rules for Python publishers.

`frontend/scripts/import-cms.py` and `frontend/scripts/gen-conferences-post.py` will emit canonical author metadata and schema.

`frontend/scripts/normalize-blog-authors.py` will perform an idempotent migration of existing JSON blog sources while preserving their current compact or indented layout style.

`.blog-pipeline/config.json` will expose only `finboard-team` to the automated publishing pipeline.

`frontend/tests/blog-author.test.mjs` will test runtime behavior and scan every blog content file.

`frontend/tests/test_blog_author.py` will test the Python publisher policy and pipeline configuration.

`frontend/package.json` will run every Node test file through `test:unit`.

### Task 1: Enforce the Runtime Blog Author

**Files:**

- Create: `frontend/src/lib/blogAuthor.mjs`
- Modify: `frontend/src/lib/authors.js`
- Modify: `frontend/src/lib/blog.js`
- Modify: `frontend/src/app/blog/[slug]/page.jsx`
- Create: `frontend/tests/blog-author.test.mjs`
- Modify: `frontend/package.json`

**Interfaces:**

- Produces: `FINBOARD_TEAM_AUTHOR: Readonly<object>`
- Produces: `FINBOARD_TEAM_SCHEMA_AUTHOR: Readonly<object>`
- Produces: `resolveAuthor(): object`
- Produces: `normalizeBlogStructuredData(value: unknown): unknown`
- Consumes: existing JSON and MDX loader output in `frontend/src/lib/blog.js`

- [ ] **Step 1: Write the failing runtime policy tests**

Create `frontend/tests/blog-author.test.mjs` with the initial unit coverage:

```js
import assert from "node:assert/strict";
import test from "node:test";
import {
  FINBOARD_TEAM_AUTHOR,
  FINBOARD_TEAM_SCHEMA_AUTHOR,
  normalizeBlogStructuredData,
  resolveAuthor,
} from "../src/lib/blogAuthor.mjs";

test("always resolves FinBoard Team for blog authorship", () => {
  assert.equal(resolveAuthor().name, "FinBoard Team");
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
      { "@type": "Organization", name: "Publisher" },
    ],
  };

  const result = normalizeBlogStructuredData(input);

  assert.deepEqual(result["@graph"][0].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.deepEqual(result["@graph"][1].author, FINBOARD_TEAM_SCHEMA_AUTHOR);
  assert.equal(result["@graph"][2].author, undefined);
  assert.notEqual(result, input);
});
```

- [ ] **Step 2: Make `test:unit` discover all Node tests**

Change the package script to:

```json
"test:unit": "node --test tests/*.test.mjs"
```

- [ ] **Step 3: Run the test and verify the missing module failure**

Run: `cd frontend && yarn test:unit`

Expected: FAIL because `src/lib/blogAuthor.mjs` does not exist.

- [ ] **Step 4: Create the canonical JavaScript author policy**

Create `frontend/src/lib/blogAuthor.mjs`:

```js
export const FINBOARD_TEAM_AUTHOR = Object.freeze({
  id: "finboard-team",
  name: "FinBoard Team",
  role: "",
  bio: "Written by the FinBoard team. We build multi-entity reporting and consolidation for QuickBooks Online, and we write from what we see across our customers' books.",
  linkedin: "https://finboard.ai/about",
});

export const FINBOARD_TEAM_SCHEMA_AUTHOR = Object.freeze({
  "@type": "Organization",
  "@id": "https://finboard.ai/#organization",
  name: "FinBoard Team",
  url: "https://finboard.ai/about",
});

const ARTICLE_TYPES = new Set(["Article", "BlogPosting"]);

function isArticleType(value) {
  const types = Array.isArray(value) ? value : [value];
  return types.some((type) => ARTICLE_TYPES.has(type));
}

export function resolveAuthor() {
  return FINBOARD_TEAM_AUTHOR;
}

export function normalizeBlogStructuredData(value) {
  if (Array.isArray(value)) {
    return value.map(normalizeBlogStructuredData);
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  const normalized = Object.fromEntries(
    Object.entries(value).map(([key, child]) => [
      key,
      normalizeBlogStructuredData(child),
    ]),
  );

  if (isArticleType(normalized["@type"])) {
    normalized.author = { ...FINBOARD_TEAM_SCHEMA_AUTHOR };
  }

  return normalized;
}
```

- [ ] **Step 5: Delegate the existing blog resolver to the canonical policy**

At the top of `frontend/src/lib/authors.js`, import and re-export the policy:

```js
import {
  FINBOARD_TEAM_AUTHOR,
  resolveAuthor,
} from "./blogAuthor.mjs";

export { resolveAuthor };
```

Replace the literal `finboard-team` registry value with:

```js
"finboard-team": FINBOARD_TEAM_AUTHOR,
```

Remove the old category based `resolveAuthor(category, explicitId)` function. Keep both founder records because the About page imports the shared registry.

- [ ] **Step 6: Normalize embedded blog schema in the loader**

Change the import in `frontend/src/lib/blog.js` to:

```js
import { resolveAuthor } from "@/lib/authors";
import { normalizeBlogStructuredData } from "@/lib/blogAuthor.mjs";
```

Change the JSON post field to:

```js
structuredData: data.structuredData
  ? normalizeBlogStructuredData(data.structuredData)
  : null,
```

Leave the MDX field as `null` because its page schema is generated from the canonical author.

- [ ] **Step 7: Generate Organization author schema for posts without custom schema**

Import the schema author in `frontend/src/app/blog/[slug]/page.jsx`:

```js
import { FINBOARD_TEAM_SCHEMA_AUTHOR } from "@/lib/blogAuthor.mjs";
```

Remove `const author = frontmatter.author;` and replace the generated Article author object with:

```js
author: { ...FINBOARD_TEAM_SCHEMA_AUTHOR },
```

Keep the existing publisher, image, dates, and main entity fields unchanged.

- [ ] **Step 8: Run unit tests and the production build**

Run: `cd frontend && yarn test:unit && yarn build`

Expected: all Node tests PASS and Next.js reports a successful production build.

- [ ] **Step 9: Commit the runtime invariant**

```bash
git add frontend/src/lib/blogAuthor.mjs frontend/src/lib/authors.js frontend/src/lib/blog.js frontend/src/app/blog/'[slug]'/page.jsx frontend/tests/blog-author.test.mjs frontend/package.json
git commit -m "feat: enforce FinBoard Team blog authorship"
```

### Task 2: Enforce the Author in Future Publishing Paths

**Files:**

- Create: `frontend/scripts/blog_author.py`
- Create: `frontend/tests/test_blog_author.py`
- Modify: `frontend/scripts/import-cms.py`
- Modify: `frontend/scripts/gen-conferences-post.py`
- Modify: `.blog-pipeline/config.json`

**Interfaces:**

- Produces: `AUTHOR_ID: str`
- Produces: `AUTHOR_NAME: str`
- Produces: `SCHEMA_AUTHOR: dict`
- Produces: `normalize_structured_data(value: object) -> object`
- Produces: `normalize_post(post: dict) -> dict`
- Consumes: blog dictionaries created by the CMS importer, conference generator, and migration utility

- [ ] **Step 1: Write the failing Python policy tests**

Create `frontend/tests/test_blog_author.py`:

```python
import json
import sys
import unittest
from pathlib import Path

FRONTEND = Path(__file__).resolve().parents[1]
REPO = FRONTEND.parent
sys.path.insert(0, str(FRONTEND / "scripts"))

from blog_author import (  # noqa: E402
    AUTHOR_ID,
    AUTHOR_NAME,
    SCHEMA_AUTHOR,
    normalize_post,
    normalize_structured_data,
)


class BlogAuthorPolicyTest(unittest.TestCase):
    def test_normalizes_post_metadata_and_nested_article_schema(self):
        post = {
            "title": "Example",
            "author": "Someone Else",
            "authorId": "someone-else",
            "structuredData": {
                "@graph": [
                    {"@type": "BlogPosting", "author": {"@type": "Person"}},
                    {"@type": "Organization", "name": "Publisher"},
                ]
            },
        }

        result = normalize_post(post)

        self.assertEqual(result["author"], AUTHOR_NAME)
        self.assertEqual(result["authorId"], AUTHOR_ID)
        self.assertEqual(result["structuredData"]["@graph"][0]["author"], SCHEMA_AUTHOR)
        self.assertNotIn("author", result["structuredData"]["@graph"][1])

    def test_normalizes_article_type_arrays(self):
        result = normalize_structured_data({"@type": ["Article", "TechArticle"]})
        self.assertEqual(result["author"], SCHEMA_AUTHOR)

    def test_pipeline_exposes_only_finboard_team(self):
        config = json.loads((REPO / ".blog-pipeline" / "config.json").read_text())
        self.assertEqual(config["target"]["authors"], [{"id": AUTHOR_ID}])


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the Python tests and verify the missing module failure**

Run: `cd frontend && python3 -m unittest tests/test_blog_author.py -v`

Expected: FAIL because `scripts/blog_author.py` does not exist.

- [ ] **Step 3: Create the canonical Python publishing policy**

Create `frontend/scripts/blog_author.py`:

```python
from copy import deepcopy

AUTHOR_ID = "finboard-team"
AUTHOR_NAME = "FinBoard Team"
SCHEMA_AUTHOR = {
    "@type": "Organization",
    "@id": "https://finboard.ai/#organization",
    "name": AUTHOR_NAME,
    "url": "https://finboard.ai/about",
}
ARTICLE_TYPES = {"Article", "BlogPosting"}


def _is_article_type(value):
    values = value if isinstance(value, list) else [value]
    return any(item in ARTICLE_TYPES for item in values)


def normalize_structured_data(value):
    if isinstance(value, list):
        return [normalize_structured_data(item) for item in value]
    if not isinstance(value, dict):
        return value

    normalized = {
        key: normalize_structured_data(child)
        for key, child in value.items()
    }
    if _is_article_type(normalized.get("@type")):
        normalized["author"] = deepcopy(SCHEMA_AUTHOR)
    return normalized


def normalize_post(post):
    normalized = deepcopy(post)
    normalized["author"] = AUTHOR_NAME
    normalized["authorId"] = AUTHOR_ID
    normalized["structuredData"] = normalize_structured_data(
        normalized.get("structuredData")
    )
    return normalized
```

- [ ] **Step 4: Update the CMS importer**

Add this import to `frontend/scripts/import-cms.py`:

```python
from blog_author import AUTHOR_ID, AUTHOR_NAME, normalize_structured_data
```

Use these fields in the blog post dictionary:

```python
"author": AUTHOR_NAME,
"authorId": AUTHOR_ID,
"structuredData": normalize_structured_data(ld),
```

Do not change the template importer because templates are not blog posts.

- [ ] **Step 5: Update the conference post generator**

Replace the local person `AUTHOR` object in `frontend/scripts/gen-conferences-post.py` with:

```python
from blog_author import AUTHOR_ID, AUTHOR_NAME, SCHEMA_AUTHOR
```

Use `SCHEMA_AUTHOR` for the BlogPosting schema author and use these top-level fields:

```python
"author": AUTHOR_NAME,
"authorId": AUTHOR_ID,
```

- [ ] **Step 6: Restrict the automated pipeline author list**

Change `.blog-pipeline/config.json` to:

```json
"authors": [
  {
    "id": "finboard-team"
  }
]
```

- [ ] **Step 7: Run the Python and Node tests**

Run: `cd frontend && python3 -m unittest tests/test_blog_author.py -v && yarn test:unit`

Expected: all Python and Node tests PASS.

- [ ] **Step 8: Commit the future publishing controls**

```bash
git add .blog-pipeline/config.json frontend/scripts/blog_author.py frontend/scripts/import-cms.py frontend/scripts/gen-conferences-post.py frontend/tests/test_blog_author.py
git commit -m "feat: standardize blog publisher authors"
```

### Task 3: Migrate and Guard Every Existing Blog Source

**Files:**

- Create: `frontend/scripts/normalize-blog-authors.py`
- Modify: `frontend/tests/blog-author.test.mjs`
- Modify: `frontend/content/blog/*.json` only where canonical author data differs
- Verify: `frontend/content/blog/*.md`
- Verify: `frontend/content/blog/*.mdx`

**Interfaces:**

- Consumes: `normalize_post(post: dict) -> dict` from `frontend/scripts/blog_author.py`
- Produces: idempotently normalized blog JSON files
- Produces: repository-wide content assertions in `frontend/tests/blog-author.test.mjs`

- [ ] **Step 1: Extend the Node test with repository-wide content checks**

Add these imports and helpers to `frontend/tests/blog-author.test.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(TEST_DIR, "..", "content", "blog");

function articleNodes(value, found = []) {
  if (Array.isArray(value)) {
    value.forEach((item) => articleNodes(item, found));
    return found;
  }
  if (!value || typeof value !== "object") return found;

  const types = Array.isArray(value["@type"])
    ? value["@type"]
    : [value["@type"]];
  if (types.includes("Article") || types.includes("BlogPosting")) {
    found.push(value);
  }
  Object.values(value).forEach((item) => articleNodes(item, found));
  return found;
}
```

Add the content test:

```js
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
      for (const article of articleNodes(post.structuredData)) {
        assert.deepEqual(article.author, FINBOARD_TEAM_SCHEMA_AUTHOR, file);
      }
      continue;
    }

    const frontmatter = raw.match(/^---\s*\n([\s\S]*?)\n---/);
    assert.ok(frontmatter, `${file} has frontmatter`);
    assert.match(frontmatter[1], /^author:\s*["']?FinBoard Team["']?\s*$/m, file);
    assert.match(frontmatter[1], /^authorId:\s*["']?finboard-team["']?\s*$/m, file);
  }
});
```

- [ ] **Step 2: Run the Node tests and verify source drift failures**

Run: `cd frontend && yarn test:unit`

Expected: FAIL on the JSON posts that still identify an individual author or contain noncanonical Article schema.

- [ ] **Step 3: Create the idempotent migration utility**

Create `frontend/scripts/normalize-blog-authors.py`:

```python
#!/usr/bin/env python3
import json
from pathlib import Path

from blog_author import normalize_post

FRONTEND = Path(__file__).resolve().parents[1]
BLOG_DIR = FRONTEND / "content" / "blog"


def render(post, indented):
    return json.dumps(
        post,
        ensure_ascii=False,
        indent=2 if indented else None,
    )


def main():
    changed = []
    for path in sorted(BLOG_DIR.glob("*.json")):
        raw = path.read_text(encoding="utf-8")
        post = json.loads(raw)
        normalized = normalize_post(post)
        if normalized == post:
            continue

        suffix = "\n" if raw.endswith("\n") else ""
        indented = raw.lstrip().startswith("{\n")
        path.write_text(render(normalized, indented) + suffix, encoding="utf-8")
        changed.append(path.name)

    print(f"normalized {len(changed)} blog files")
    for name in changed:
        print(name)


if __name__ == "__main__":
    main()
```

- [ ] **Step 4: Run the migration once**

Run: `cd frontend && python3 scripts/normalize-blog-authors.py`

Expected: the script lists only JSON files whose top-level author metadata or Article schema required correction.

- [ ] **Step 5: Verify the migration is idempotent**

Run: `cd frontend && python3 scripts/normalize-blog-authors.py`

Expected: `normalized 0 blog files`.

- [ ] **Step 6: Review the content diff for author-only semantic changes**

Run: `git diff --stat -- frontend/content/blog && git diff --word-diff=porcelain -- frontend/content/blog | rg 'author|authorId|FinBoard Team|Organization|Person|Vaishnav|Ujjwal'`

Expected: author names, author IDs, and Article author nodes are the only semantic content changes. Titles, dates, body content, images, categories, tags, URLs, and unrelated schema fields remain unchanged.

- [ ] **Step 7: Run all author tests and the production build**

Run: `cd frontend && yarn test:unit && python3 -m unittest tests/test_blog_author.py -v && yarn build`

Expected: all tests PASS and the production build succeeds.

- [ ] **Step 8: Commit the source migration**

```bash
git add frontend/scripts/normalize-blog-authors.py frontend/tests/blog-author.test.mjs frontend/content/blog
git commit -m "content: assign all blogs to FinBoard Team"
```

### Task 4: Verify on Port 3010 and Publish

**Files:**

- Verify: `frontend/src/app/blog/[slug]/page.jsx`
- Verify: `frontend/content/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.json`
- Verify: `frontend/content/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly.json`
- Verify: one older JSON article with custom structured data
- Verify: `frontend/content/blog/multi-entity-month-end-close-in-5-days.mdx`

**Interfaces:**

- Consumes: the completed runtime policy and migrated sources
- Produces: verified visible bylines and JSON-LD on local rendered pages
- Produces: pushed commits on `origin/main`

- [ ] **Step 1: Confirm the worktree contains no unintended tracked changes**

Run: `git status --short && git diff --check`

Expected: only intended author implementation files are tracked or staged. The pre-existing untracked pipeline run files, `AGENTS.md`, and `package-lock.json` remain unmodified and untracked.

- [ ] **Step 2: Run the full automated verification once more**

Run: `cd frontend && yarn test:unit && python3 -m unittest tests/test_blog_author.py -v && yarn build`

Expected: all tests PASS and the production build succeeds.

- [ ] **Step 3: Free port 3010 if an old development process owns it**

Run: `lsof -t -iTCP:3010 -sTCP:LISTEN`

Expected: no output, or one or more process IDs belonging to the prior local frontend process. If IDs are returned, inspect them with `ps -p <pid> -o pid=,command=` and stop only the confirmed frontend process with `kill <pid>`.

- [ ] **Step 4: Start the frontend on port 3010**

Run: `cd frontend && yarn dev --port 3010`

Expected: Next.js reports `http://localhost:3010` and remains running for verification.

- [ ] **Step 5: Check visible bylines and JSON-LD on four representative posts**

Open these local URLs and inspect the rendered page and `application/ld+json` script:

```text
http://localhost:3010/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses
http://localhost:3010/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly
http://localhost:3010/blog/intercompany-eliminations-a-practical-guide-for-busy-finance-teams
http://localhost:3010/blog/multi-entity-month-end-close-in-5-days
```

Expected for every page:

```text
Visible author: FinBoard Team
Schema author @type: Organization
Schema author @id: https://finboard.ai/#organization
Schema author name: FinBoard Team
Schema author url: https://finboard.ai/about
```

- [ ] **Step 6: Confirm no blog publishing source retains individual authorship**

Run: `rg -n 'vaishnav-gupta|ujjwal-singh|Vaishnav Gupta|Ujjwal Singh' frontend/content/blog frontend/scripts .blog-pipeline/config.json`

Expected: no matches. Founder names may remain in `frontend/src/lib/authors.js` because the About page uses that registry.

- [ ] **Step 7: Push the verified commits directly to the remote**

Run: `git push origin main`

Expected: `origin/main` advances through all author policy and migration commits.

- [ ] **Step 8: Confirm local and remote main match**

Run: `git status --short --branch && git rev-parse HEAD && git rev-parse origin/main`

Expected: the two revisions are identical. Only the user's pre-existing unrelated untracked files remain in status.
