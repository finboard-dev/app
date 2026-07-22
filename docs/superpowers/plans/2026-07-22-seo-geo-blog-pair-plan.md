# SEO/GEO Blog Pair Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Draft, illustrate, publish, and verify two SEO/GEO-focused FinBoard blog posts: a timely QuickBooks multi-entity reporting explainer and an evergreen small-business P&L guide.

**Architecture:** Add two validated JSON articles to the existing filesystem-backed blog, with one generated PNG cover per post. The current Next.js blog loader will provide metadata, related posts, breadcrumb schema, sitemap entries, and llms.txt entries automatically. Deployment will use the existing `main` branch Git push that triggers Vercel, followed by production URL and metadata verification.

**Tech Stack:** Next.js 15, React 19, filesystem JSON content, Schema.org JSON-LD, Node.js tests, built-in image generation, Git, Vercel production deployment.

## Global Constraints

- Publish exactly two new posts dated `2026-07-22`; `.blog-pipeline/config.json` sets `blogsPerRun` to `2`.
- Preserve unrelated untracked files and changes: `.blog-pipeline/runs/*.json`, `AGENTS.md`, and `package-lock.json` must not be staged or edited.
- Use the existing JSON fields consumed by `frontend/src/lib/blog.js`: `slug`, `title`, `category`, `excerpt`, `authorId`, `date`, `coverImage`, `coverAlt`, `structuredData`, and `content`.
- Use category `accounting` and author `vaishnav-gupta` for both posts.
- Put the main search answer in the first 60 words and use short, self-contained answer blocks under question-based headings.
- Prefer current primary sources. Recheck Intuit documentation immediately before writing and immediately before production publication.
- Do not claim that all QuickBooks Online plans or regions include multi-entity reporting.
- Do not use unsupported competitor pricing, performance, customer-count, or feature claims.
- Do not present illustrative P&L thresholds as universal industry benchmarks.
- Use unique landscape PNG covers without logos, embedded words, numbers, watermarks, or copied product UI.
- Publishing is incomplete until both production URLs, canonical tags, structured data, cover images, sitemap entries, and llms.txt entries are verified.

---

## File structure

- Create `tests/test_seo_geo_blog_pair.py`: artifact contract for both JSON posts and both covers.
- Create `frontend/content/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.json`: timely QuickBooks product-change explainer.
- Create `frontend/content/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly.json`: evergreen P&L action guide.
- Create `frontend/public/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png`: cover for article 1.
- Create `frontend/public/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png`: cover for article 2.
- No application source file needs modification: the blog route, sitemap, and llms.txt route discover content automatically.

---

### Task 1: Add the two-post artifact contract

**Files:**
- Create: `tests/test_seo_geo_blog_pair.py`

**Interfaces:**
- Consumes: JSON files in `frontend/content/blog` and covers in `frontend/public/blog/covers`.
- Produces: executable validation for field names, dates, authorship, schema, answer-first copy, sources, internal links, GEO structure, and image dimensions.

- [ ] **Step 1: Write the failing artifact test**

Create `tests/test_seo_geo_blog_pair.py` with this complete contract:

```python
import json
import struct
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "frontend" / "content" / "blog"
COVERS = ROOT / "frontend" / "public" / "blog" / "covers"

POSTS = {
    "quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses": {
        "title": "QuickBooks Multi-Entity Reporting in 2026: What It Does and Still Misses",
        "cover": "quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png",
        "required_external": (
            "quickbooks.intuit.com/learn-support/en-us/help-article/vendor-management/",
            "quickbooks.intuit.com/learn-support/en-uk/help-article/multi-entity/",
            "quickbooks.intuit.com/learn-support/en-us/help-article/multi-entity/",
        ),
        "required_internal": (
            "/blog/how-to-combine-reports-from-multiple-quickbooks-online-companies-every-method-compared",
            "/blog/intercompany-eliminations-a-practical-guide-for-busy-finance-teams",
            "/blog/finboard-ai-vs-liveflow-live-quickbooks-reporting-compared-2026",
            "/products/consolidation",
        ),
        "required_phrases": (
            "availability may vary",
            "Intuit Enterprise Suite",
            "QuickBooks Online Accountant",
        ),
    },
    "five-p-and-l-numbers-small-business-owners-should-check-monthly": {
        "title": "Five Numbers Every Small-Business Owner Should Check on Their P&L Each Month",
        "cover": "five-p-and-l-numbers-small-business-owners-should-check-monthly.png",
        "required_external": (),
        "required_internal": (
            "/blog/why-quickbooks-online-cannot-manage-a-reliable-13-week-cash-flow-forecast-and-how-to-fix-it",
            "/blog/consolidated-budget-vs-actuals-a-guide-to-multi-entity-budgeting",
            "/blog/multi-location-restaurant-p-and-l-in-quickbooks-online-prime-cost-by-location",
            "/products/analytics",
        ),
        "required_phrases": (
            "Revenue trend",
            "Gross margin",
            "Operating expense ratio",
            "Profit margin",
            "cash",
        ),
    },
}


def png_size(path):
    data = path.read_bytes()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        raise AssertionError(f"not a PNG: {path}")
    return struct.unpack(">II", data[16:24])


class SeoGeoBlogPairTest(unittest.TestCase):
    def test_two_posts_have_complete_metadata_and_content(self):
        for slug, expected in POSTS.items():
            with self.subTest(slug=slug):
                path = BLOG / f"{slug}.json"
                self.assertTrue(path.is_file(), path)
                post = json.loads(path.read_text())
                self.assertEqual(post["slug"], slug)
                self.assertEqual(post["title"], expected["title"])
                self.assertEqual(post["category"], "accounting")
                self.assertEqual(post["authorId"], "vaishnav-gupta")
                self.assertEqual(post["date"], "2026-07-22")
                self.assertEqual(post["coverImage"], f"/blog/covers/{expected['cover']}")
                self.assertGreaterEqual(len(post["excerpt"]), 110)
                self.assertLessEqual(len(post["excerpt"]), 155)
                self.assertGreaterEqual(len(post["content"].split()), 1500)
                self.assertGreaterEqual(post["content"].count("<h2>"), 6)
                self.assertIn("<table>", post["content"])
                self.assertIn("FAQ", post["content"])
                for needle in expected["required_external"] + expected["required_internal"]:
                    self.assertIn(needle, post["content"])
                for phrase in expected["required_phrases"]:
                    self.assertIn(phrase.lower(), post["content"].lower())

    def test_structured_data_describes_each_published_article(self):
        for slug in POSTS:
            with self.subTest(slug=slug):
                post = json.loads((BLOG / f"{slug}.json").read_text())
                schema = post["structuredData"]
                self.assertEqual(schema["@context"], "https://schema.org")
                self.assertIn(schema["@type"], ("Article", "BlogPosting"))
                self.assertEqual(schema["headline"], post["title"])
                self.assertEqual(schema["datePublished"], "2026-07-22")
                self.assertEqual(schema["dateModified"], "2026-07-22")
                self.assertEqual(schema["mainEntityOfPage"], f"https://finboard.ai/blog/{slug}")
                self.assertEqual(schema["author"]["name"], "Vaishnav Gupta")

    def test_covers_are_landscape_pngs_large_enough_for_social_preview(self):
        for expected in POSTS.values():
            path = COVERS / expected["cover"]
            with self.subTest(path=path):
                self.assertTrue(path.is_file(), path)
                width, height = png_size(path)
                self.assertGreater(width, height)
                self.assertGreaterEqual(width, 1200)
                self.assertGreaterEqual(height, 630)


if __name__ == "__main__":
    unittest.main()
```

- [ ] **Step 2: Run the test and verify RED**

Run: `python3 -m unittest tests.test_seo_geo_blog_pair -v`

Expected: three failures because the two JSON files and two covers do not exist.

- [ ] **Step 3: Commit the failing contract**

```bash
git add tests/test_seo_geo_blog_pair.py
git commit -m "test: define SEO GEO blog pair contract"
```

---

### Task 2: Write the 2026 QuickBooks multi-entity reporting article

**Files:**
- Create: `frontend/content/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.json`

**Interfaces:**
- Consumes: current Intuit product documentation and the JSON contract from Task 1.
- Produces: one complete blog artifact discoverable by `getPostBySlug()` and `getAllPosts()`.

- [ ] **Step 1: Recheck the three primary sources**

Open and record the current visible product names, availability caveats, report lists, mapping behavior, adjustment behavior, and updated dates from:

```text
https://quickbooks.intuit.com/learn-support/en-us/help-article/vendor-management/strong-view-consolidated-reports-multiple-intuit/L5ebsW3b7_US_en_US
https://quickbooks.intuit.com/learn-support/en-uk/help-article/multi-entity/create-multi-entity-reports-quickbooks-online/L2Rzhky1k_GB_en_GB
https://quickbooks.intuit.com/learn-support/en-us/help-article/multi-entity/consolidate-manage-multi-entity-shared-chart-suite/L7DRNHUSk_US_en_US
```

Expected: the first and third describe Intuit Enterprise Suite in the US; the second describes a QBO Accountant workflow and states that availability may vary by region or firm. If the documentation changes, update the article claims and the exact caveat asserted in the test before proceeding.

- [ ] **Step 2: Create the complete JSON article**

Use this exact metadata and populate `content` with 1,800-2,400 words of HTML following the specified section contract:

```json
{
  "slug": "quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses",
  "title": "QuickBooks Multi-Entity Reporting in 2026: What It Does and Still Misses",
  "category": "accounting",
  "excerpt": "QuickBooks added new multi-entity reporting in 2026. Compare QBO Accountant, Intuit Enterprise Suite and FinBoard before choosing your workflow.",
  "authorId": "vaishnav-gupta",
  "date": "2026-07-22",
  "coverImage": "/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png",
  "coverAlt": "Multiple QuickBooks company ledgers flowing into one consolidated financial report",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "QuickBooks Multi-Entity Reporting in 2026: What It Does and Still Misses",
    "description": "QuickBooks added new multi-entity reporting in 2026. Compare QBO Accountant, Intuit Enterprise Suite and FinBoard before choosing your workflow.",
    "datePublished": "2026-07-22",
    "dateModified": "2026-07-22",
    "author": {
      "@type": "Person",
      "name": "Vaishnav Gupta",
      "url": "https://finboard.ai/about"
    },
    "publisher": {"@id": "https://finboard.ai/#organization"},
    "image": "https://finboard.ai/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png",
    "mainEntityOfPage": "https://finboard.ai/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses",
    "keywords": [
      "QuickBooks multi-entity reporting",
      "QuickBooks consolidated reports",
      "Intuit Enterprise Suite",
      "QuickBooks Online Accountant",
      "multi-company reporting"
    ]
  },
  "content": "<p><strong>Direct answer in 40-60 words.</strong></p><h2>Does QuickBooks support multi-entity reporting in 2026?</h2><p>Answer with the product and region caveat.</p><h2>What changed in 2026?</h2><p>Explain only changes supported by the three Intuit sources.</p><h2>QuickBooks multi-entity options compared</h2><table><thead><tr><th>Option</th><th>Reports</th><th>Mapping and eliminations</th><th>Best fit</th></tr></thead><tbody><tr><td>Separate QBO files</td><td>Entity-level</td><td>Manual outside QBO</td><td>Simple groups</td></tr><tr><td>Documented QBO Accountant workflow</td><td>P&amp;L and balance sheet</td><td>Merges, custom rows and report-only adjustments</td><td>Eligible firms</td></tr><tr><td>Intuit Enterprise Suite</td><td>Consolidated statements and transaction reports</td><td>Shared chart and intercompany workflows</td><td>US multi-entity operators</td></tr><tr><td>FinBoard</td><td>Custom and consolidated management reports</td><td>Reusable mapping and reporting layer</td><td>Spreadsheet-native and cross-source reporting</td></tr></tbody></table><h2>What can Intuit Enterprise Suite consolidate?</h2><p>Cite the US reporting source.</p><h2>What can the documented QBO Accountant workflow do?</h2><p>Cite the UK source and preserve availability may vary.</p><h2>How do mappings, adjustments and eliminations differ?</h2><p>Cite primary sources and link the FinBoard elimination guide.</p><h2>When is native QuickBooks enough?</h2><p>Give an honest decision rule.</p><h2>When does a separate reporting layer make sense?</h2><p>Explain custom outputs, reusable mappings, spreadsheet delivery and cross-source data without unsupported comparisons.</p><h2>Decision checklist</h2><ul><li>Product and regional availability</li><li>Required statements</li><li>Entity count</li><li>Intercompany complexity</li><li>Output destination</li><li>Audit and drill-down requirements</li></ul><h2>FAQ</h2><h3>Can QuickBooks Online consolidate multiple companies?</h3><p>Answer with caveat.</p><h3>Is Intuit Enterprise Suite the same as QuickBooks Online Advanced?</h3><p>Answer from current official product material only.</p><h3>Do consolidated adjustments change the client books?</h3><p>Answer for the documented QBO Accountant workflow.</p><h3>Can QuickBooks use different charts of accounts?</h3><p>Answer separately for each documented product.</p><h2>The bottom line</h2><p>Conclude with a contextual link to /products/consolidation.</p>"
}
```

Replace every instructional sentence inside `content` with finished reader-facing prose. Preserve the heading order, table columns, official citations, availability caveat, and required internal links, including the FinBoard-versus-LiveFlow comparison. Do not retain any instructional labels such as “Direct answer,” “Explain,” “Cite,” or “Answer.”

- [ ] **Step 3: Validate the JSON and focused article contract**

Run:

```bash
python3 -m json.tool frontend/content/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.json >/dev/null
python3 -m unittest tests.test_seo_geo_blog_pair.SeoGeoBlogPairTest.test_two_posts_have_complete_metadata_and_content tests.test_seo_geo_blog_pair.SeoGeoBlogPairTest.test_structured_data_describes_each_published_article -v
```

Expected: JSON parsing succeeds. Assertions for article 1 pass; article 2 remains missing until Task 3.

- [ ] **Step 4: Review claims against sources**

Check every sentence containing `QuickBooks`, `Intuit`, `supports`, `includes`, `available`, `report`, `mapping`, `adjustment`, or `elimination`. Each factual product claim must be linked to one of the three current Intuit pages or clearly labeled as FinBoard's interpretation.

- [ ] **Step 5: Commit article 1**

```bash
git add frontend/content/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.json
git commit -m "content: explain QuickBooks multi-entity reporting"
```

---

### Task 3: Write the five-number small-business P&L guide

**Files:**
- Create: `frontend/content/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly.json`

**Interfaces:**
- Consumes: the JSON contract from Task 1 and existing FinBoard P&L, budget, cash-flow, and analytics resources.
- Produces: one complete evergreen blog artifact discoverable by the current blog loader.

- [ ] **Step 1: Create the complete JSON article**

Use this exact metadata and populate `content` with 1,800-2,400 words of finished HTML:

```json
{
  "slug": "five-p-and-l-numbers-small-business-owners-should-check-monthly",
  "title": "Five Numbers Every Small-Business Owner Should Check on Their P&L Each Month",
  "category": "accounting",
  "excerpt": "Learn the five P&L numbers every small-business owner should review monthly, how to calculate them and which operating decisions each one should trigger.",
  "authorId": "vaishnav-gupta",
  "date": "2026-07-22",
  "coverImage": "/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png",
  "coverAlt": "Small-business profit and loss report with five key financial signals highlighted",
  "structuredData": {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Five Numbers Every Small-Business Owner Should Check on Their P&L Each Month",
    "description": "Learn the five P&L numbers every small-business owner should review monthly, how to calculate them and which operating decisions each one should trigger.",
    "datePublished": "2026-07-22",
    "dateModified": "2026-07-22",
    "author": {
      "@type": "Person",
      "name": "Vaishnav Gupta",
      "url": "https://finboard.ai/about"
    },
    "publisher": {"@id": "https://finboard.ai/#organization"},
    "image": "https://finboard.ai/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png",
    "mainEntityOfPage": "https://finboard.ai/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly",
    "keywords": [
      "how to read a profit and loss statement",
      "P&L numbers to watch",
      "small business financial metrics",
      "gross margin",
      "profit margin"
    ]
  },
  "content": "<p><strong>Direct answer naming all five signals in 40-60 words.</strong></p><h2>What should a small-business owner look for on a P&amp;L?</h2><p>Define the monthly decision routine.</p><h2>A worked monthly example</h2><table><thead><tr><th>Line</th><th>This month</th><th>Last month</th></tr></thead><tbody><tr><td>Revenue</td><td>$100,000</td><td>$92,000</td></tr><tr><td>Cost of sales</td><td>$40,000</td><td>$34,000</td></tr><tr><td>Operating expenses</td><td>$48,000</td><td>$44,000</td></tr><tr><td>Operating profit</td><td>$12,000</td><td>$14,000</td></tr></tbody></table><h2>1. Revenue trend: is demand actually moving?</h2><p>Formula, comparison periods, warning pattern and action.</p><h2>2. Gross margin: are sales becoming more valuable?</h2><p>Formula `(Revenue - Cost of sales) / Revenue`, worked example and action.</p><h2>3. Operating expense ratio: is overhead growing faster than the business?</h2><p>Formula `Operating expenses / Revenue`, worked example and action.</p><h2>4. Profit margin: what remains after operating the business?</h2><p>Formula `Operating profit / Revenue`, worked example and action.</p><h2>5. Cash coverage: can the business fund the next few months?</h2><p>State clearly that cash coverage is not a P&amp;L line, link the 13-week cash-flow article, and explain the cash runway companion calculation.</p><h2>What should you review daily, weekly and monthly?</h2><table><thead><tr><th>Cadence</th><th>Review</th><th>Decision</th></tr></thead><tbody><tr><td>Daily</td><td>Cash and urgent obligations</td><td>Protect liquidity</td></tr><tr><td>Weekly</td><td>Sales, collections and major variable costs</td><td>Correct operating drift</td></tr><tr><td>Monthly</td><td>Full P&amp;L, budget and prior-year comparison</td><td>Change pricing, cost or hiring plans</td></tr></tbody></table><h2>Common P&amp;L reading mistakes</h2><ul><li>Treating revenue as cash</li><li>Reading one month in isolation</li><li>Ignoring seasonality</li><li>Confusing owner draws with operating expense</li><li>Using a generic benchmark without industry context</li></ul><h2>A ten-minute monthly P&amp;L review</h2><ol><li>Confirm the period and accounting method.</li><li>Compare revenue and margins.</li><li>Inspect material variances.</li><li>Connect profit to cash.</li><li>Record one decision and one follow-up.</li></ol><h2>FAQ</h2><h3>How often should a small business review its P&amp;L?</h3><p>Answer directly.</p><h3>What is the most important number on a P&amp;L?</h3><p>Explain why no single metric works without context.</p><h3>Why can a profitable business run out of cash?</h3><p>Explain timing, working capital and debt payments.</p><h3>Should I compare against last month or last year?</h3><p>Explain seasonality and budget comparisons.</p><h2>Turn the review into a repeatable report</h2><p>Finish with a soft link to /products/analytics.</p>"
}
```

Replace every instructional sentence inside `content` with finished reader-facing prose. Use the same worked example throughout. Explicitly calculate gross margin as 60%, operating expense ratio as 48%, and operating profit margin as 12% for the sample month. Explain that these results are illustrative, not universal targets. Include the required links to the budget-versus-actual article, the 13-week cash-flow article, the multi-location restaurant P&L example, and `/products/analytics`.

- [ ] **Step 2: Validate the JSON and content contract**

Run:

```bash
python3 -m json.tool frontend/content/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly.json >/dev/null
python3 -m unittest tests.test_seo_geo_blog_pair.SeoGeoBlogPairTest.test_two_posts_have_complete_metadata_and_content tests.test_seo_geo_blog_pair.SeoGeoBlogPairTest.test_structured_data_describes_each_published_article -v
```

Expected: both tests pass. The cover test remains failing until Task 4.

- [ ] **Step 3: Perform a financial-clarity review**

Verify the sample math exactly:

```text
Gross margin = ($100,000 - $40,000) / $100,000 = 60%
Operating expense ratio = $48,000 / $100,000 = 48%
Operating profit margin = $12,000 / $100,000 = 12%
```

Confirm that cash coverage is explicitly identified as a companion metric sourced from cash and obligations rather than a line on the P&L. Confirm that no percentage is described as a universal healthy target.

- [ ] **Step 4: Commit article 2**

```bash
git add frontend/content/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly.json
git commit -m "content: publish monthly P and L owner guide"
```

---

### Task 4: Generate and verify the two cover images

**Files:**
- Create: `frontend/public/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png`
- Create: `frontend/public/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png`

**Interfaces:**
- Consumes: the article topics, FinBoard visual direction, and exact output paths.
- Produces: two landscape PNG covers referenced by the JSON posts and suitable for blog cards and social previews.

- [ ] **Step 1: Generate the QuickBooks multi-entity cover**

Use built-in image generation with this production prompt:

```text
Use case: productivity-visual
Asset type: landscape blog and social-preview cover
Primary request: Create a polished editorial illustration of several distinct company ledgers flowing into one unified consolidated financial statement.
Scene/backdrop: warm off-white studio background with a subtle accounting-grid structure.
Subject: three separate abstract ledger panels on the left converging through clean data paths into one larger organized reporting panel on the right.
Style/medium: refined 3D editorial illustration with crisp geometric forms, restrained depth, and premium B2B SaaS finish.
Composition/framing: 1.91:1 landscape, strong readable silhouette at thumbnail size, generous padding, no cropped panels.
Lighting/mood: soft neutral lighting, calm, trustworthy and precise.
Color palette: black, warm white, sand, light gray, and restrained FinBoard blue accents.
Constraints: no QuickBooks logo, no company logos, no copied product interface, no people, no text, no letters, no numbers, no watermark.
Avoid: tiny pseudo-UI, neon gradients, clutter, glossy crypto aesthetics, illegible decorative marks.
```

Save the result at exactly:

`frontend/public/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png`

- [ ] **Step 2: Generate the five-number P&L cover**

Use built-in image generation with this production prompt:

```text
Use case: productivity-visual
Asset type: landscape blog and social-preview cover
Primary request: Create an approachable editorial illustration of a simplified profit-and-loss report with five distinct financial signals visually highlighted.
Scene/backdrop: warm off-white background with a subtle paper and spreadsheet-grid feel.
Subject: one clean financial report panel with five prominent visual markers expressed only through shapes, bars, dots, and restrained highlights.
Style/medium: refined 3D editorial illustration, crisp geometry, friendly small-business tone, premium B2B SaaS finish.
Composition/framing: 1.91:1 landscape, clear central focal point, generous padding, strong thumbnail readability.
Lighting/mood: soft daylight, practical, reassuring and clear rather than institutional.
Color palette: black, warm white, sand, light gray, and restrained FinBoard blue accents.
Constraints: exactly five highlighted signals; no logos, no people, no text, no letters, no numbers, no watermark.
Avoid: stock charts, trading-terminal imagery, neon gradients, clutter, tiny pseudo-UI, cash piles or coins.
```

Save the result at exactly:

`frontend/public/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png`

- [ ] **Step 3: Inspect both images at full size**

Use the local image viewer on each file. Confirm:

- landscape composition and at least 1200x630 pixels;
- no generated words, digits, logos, or watermarks;
- article 1 clearly communicates many ledgers becoming one report;
- article 2 contains exactly five visually distinct highlights;
- important content remains legible when reduced to a blog-card thumbnail.

If one criterion fails, regenerate only the failing image with a single-change follow-up that names the invariant to preserve.

- [ ] **Step 4: Run the full artifact contract**

Run: `python3 -m unittest tests.test_seo_geo_blog_pair -v`

Expected: all three tests pass.

- [ ] **Step 5: Commit both covers**

```bash
git add frontend/public/blog/covers/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses.png frontend/public/blog/covers/five-p-and-l-numbers-small-business-owners-should-check-monthly.png
git commit -m "assets: add SEO GEO blog covers"
```

---

### Task 5: Build and inspect both article pages locally

**Files:**
- Verify only: `frontend/content/blog/*.json`
- Verify only: `frontend/public/blog/covers/*.png`

**Interfaces:**
- Consumes: the two article JSON files, cover files, and existing Next.js routes.
- Produces: evidence that the posts build, render, expose metadata/schema, and appear in generated discovery surfaces.

- [ ] **Step 1: Run repository and frontend checks**

Run:

```bash
python3 -m unittest discover -s tests -v
yarn --cwd frontend test:unit
yarn --cwd frontend build
git diff --check
```

Expected: all Python and Node tests pass, Next.js completes a production build, and `git diff --check` prints no errors.

- [ ] **Step 2: Start the local production server**

Run: `yarn --cwd frontend start`

Expected: Next.js reports a local server URL, normally `http://localhost:3000`.

- [ ] **Step 3: Inspect the two local pages in the browser**

Open:

```text
http://localhost:3000/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses
http://localhost:3000/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly
```

At desktop and mobile widths, confirm the title, author, date, cover, opening answer, headings, tables, lists, source links, internal links, FAQ, related posts, and CTA are visible and correctly styled. Confirm no raw HTML, overflow, clipped table columns, broken image, or hydration error appears.

- [ ] **Step 4: Inspect metadata and discovery outputs**

Open each page source or inspect the head and verify:

```text
canonical: https://finboard.ai/blog/<slug>
og:type: article
og:image: https://finboard.ai/blog/covers/<cover>.png
twitter:card: summary_large_image
application/ld+json: BlogPosting plus BreadcrumbList
```

Also open:

```text
http://localhost:3000/sitemap.xml
http://localhost:3000/llms.txt
```

Expected: both new canonical article URLs appear in both outputs.

- [ ] **Step 5: Stop the local server and review the final diff**

Run:

```bash
git status --short
git diff --stat origin/main...HEAD
git diff --name-only origin/main...HEAD
```

Expected: the new test, two JSON files, two PNG covers, design document, and plan document are present. Unrelated untracked run files, `AGENTS.md`, and `package-lock.json` remain untracked and unstaged.

---

### Task 6: Publish and verify production

**Files:**
- No new file changes expected unless production verification reveals a content defect.

**Interfaces:**
- Consumes: a passing local build on `main` and the Git remote `origin`.
- Produces: two publicly accessible production posts with working metadata, images, sitemap, and llms.txt entries.

- [ ] **Step 1: Recheck publication safety**

Run:

```bash
git fetch origin
git status -sb
git log --oneline origin/main..HEAD
git diff --name-only origin/main...HEAD
```

Expected: local `main` is only ahead, not behind; the ahead commits are understood; no unrelated tracked file is included. Note that the previously approved design and pipeline documentation commits are also ahead of `origin/main`; they will publish with this push because the current branch is `main`.

- [ ] **Step 2: Recheck current source claims and publication dates**

Reopen the three Intuit sources from Task 2 and confirm the article remains accurate. Confirm both JSON files still carry `2026-07-22`, and confirm no other blog post in `frontend/content/blog` has that date:

```bash
rg -l '"date": "2026-07-22"' frontend/content/blog | sort
```

Expected: exactly the two new JSON paths are returned, satisfying the two-post daily cap.

- [ ] **Step 3: Push the production branch**

Run: `git push origin main`

Expected: Git reports `main -> main`. The configured Vercel project begins a production deployment from the pushed commit.

- [ ] **Step 4: Wait for deployment and verify live pages**

Check until both URLs return success and show the pushed content:

```text
https://finboard.ai/blog/quickbooks-multi-entity-reporting-2026-what-it-does-and-still-misses
https://finboard.ai/blog/five-p-and-l-numbers-small-business-owners-should-check-monthly
```

Verify the visible title, author, date, cover, complete body, tables, source links, internal links, FAQ, and CTA on desktop and mobile.

- [ ] **Step 5: Verify production metadata and discovery surfaces**

For each live article, verify the canonical URL, title, meta description, Open Graph image, Twitter card, BlogPosting schema, and BreadcrumbList schema. Then verify both URLs appear in:

```text
https://finboard.ai/sitemap.xml
https://finboard.ai/llms.txt
```

Expected: both production pages, both production covers, and both discovery entries resolve successfully without redirects to unrelated routes.

- [ ] **Step 6: Record final evidence**

Report the pushed commit, live URLs, successful build/test commands, source recheck, cover inspection, schema checks, sitemap presence, and llms.txt presence. If deployment fails or a production defect appears, do not claim publication; fix the defect in a focused commit, push again, and repeat Steps 4-6.
