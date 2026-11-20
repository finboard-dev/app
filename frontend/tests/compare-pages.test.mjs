import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { CHECKED_ON, COMPARISONS } from "../src/data/compare/pages.js";
import { PRIMARY_CTA, SECONDARY_CTA } from "../src/data/compare/finboard.js";

const TEST_DIR = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_DIR = path.join(TEST_DIR, "..");
const readSource = (relativePath) => fs.readFileSync(path.join(FRONTEND_DIR, relativePath), "utf8");

// Google Ads final URLs point at these exact slugs.
const EXPECTED_SLUGS = [
  "liveflow",
  "intuit-enterprise-suite",
  "quickbooks-sheets-connectors",
  "quickbooks-reporting-tools",
  "fpa-tools",
];

// FinBoard works with QuickBooks Online and Google Sheets only.
const UNSUPPORTED_FOR_FINBOARD = /\b(xero|excel|netsuite|multi-currency|currency conversion|currencies)\b/i;

test("the compare pages use exactly the Google Ads slugs", () => {
  assert.deepEqual(COMPARISONS.map((c) => c.slug), EXPECTED_SLUGS);
});

test("each page has a unique, SERP-sized title and meta description", () => {
  const titles = new Set(COMPARISONS.map((c) => c.metaTitle));
  const descriptions = new Set(COMPARISONS.map((c) => c.metaDescription));
  assert.equal(titles.size, COMPARISONS.length);
  assert.equal(descriptions.size, COMPARISONS.length);
  for (const c of COMPARISONS) {
    assert.ok(c.metaTitle.length <= 70, `${c.slug} title is ${c.metaTitle.length} chars`);
    assert.ok(c.metaDescription.length >= 70 && c.metaDescription.length <= 160, `${c.slug} description is ${c.metaDescription.length} chars`);
    assert.ok(c.h1 && c.lede && c.breadcrumb && c.finalCta, `${c.slug} is missing hero, breadcrumb or CTA copy`);
  }
});

test("LiveFlow and Intuit pages compare side by side; the rest answer for FinBoard only", () => {
  const kinds = Object.fromEntries(COMPARISONS.map((c) => [c.slug, c.table.kind]));
  assert.equal(kinds.liveflow, "sideBySide");
  assert.equal(kinds["intuit-enterprise-suite"], "sideBySide");
  for (const slug of EXPECTED_SLUGS.slice(2)) {
    assert.equal(kinds[slug], "checklist", slug);
  }
  for (const c of COMPARISONS.filter((x) => x.table.kind === "checklist")) {
    for (const row of c.table.rows) {
      assert.deepEqual(Object.keys(row).sort(), ["answer", "question"], `${c.slug} checklist rows hold FinBoard answers only`);
    }
  }
});

test("checklist pages name the other tools in the intro, never in the table", () => {
  for (const c of COMPARISONS.filter((x) => x.table.kind === "checklist")) {
    assert.ok(c.competitors.length > 0, c.slug);
    const intro = `${c.h1} ${c.lede}`;
    const table = JSON.stringify(c.table.rows);
    for (const name of c.competitors) {
      assert.ok(intro.includes(name), `${c.slug}: ${name} should be named in the intro`);
      assert.ok(!table.includes(name), `${c.slug}: ${name} must not appear in the checklist`);
    }
  }
});

test("FinBoard is never credited with Xero, Excel, NetSuite or multi-currency support", () => {
  for (const c of COMPARISONS) {
    const finboardClaims = [
      ...(c.table.kind === "sideBySide" ? c.table.rows.map((r) => r.finboard) : c.table.rows.map((r) => r.answer)),
      ...c.fit.finboard,
    ];
    for (const claim of finboardClaims) {
      assert.doesNotMatch(claim, UNSUPPORTED_FOR_FINBOARD, `${c.slug}: "${claim}"`);
    }
  }
});

test("every comparison cites dated vendor sources and is honest about fit", () => {
  assert.match(CHECKED_ON, /^[A-Z][a-z]+ \d{4}$/);
  for (const c of COMPARISONS) {
    assert.ok(c.sources.length > 0, `${c.slug} needs sources under its table`);
    for (const s of c.sources) assert.match(s.url, /^https:\/\//, `${c.slug} source ${s.label}`);
    assert.ok(c.fit.other.length > 0, `${c.slug} must say where the alternative is the better fit`);
    assert.ok(c.faqs.length >= 4 && c.faqs.length <= 6, `${c.slug} has ${c.faqs.length} FAQs`);
  }
});

test("calls to action go to /start and FinBoard's Marketplace listing", () => {
  assert.equal(PRIMARY_CTA.label, "Start free trial");
  assert.equal(PRIMARY_CTA.href, "/start");
  assert.equal(SECONDARY_CTA.label, "Install from Google Workspace Marketplace");
  assert.equal(
    SECONDARY_CTA.href,
    "https://workspace.google.com/marketplace/app/finboard_quickbooks_to_google_sheets_con/239112301433",
  );
});

test("the sitemap lists every compare page", () => {
  const source = readSource("src/app/sitemap.js");
  assert.match(source, /import \{ COMPARISONS \} from "@\/data\/compare\/pages"/);
  assert.match(source, /url: `\$\{SITE_URL\}\/compare\/\$\{c\.slug\}`/);
  assert.match(source, /\.\.\.compareEntries/);
});
