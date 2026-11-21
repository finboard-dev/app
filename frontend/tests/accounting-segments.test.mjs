import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { SEGMENTS } from "../src/data/accounting/segments/index.js";
import { mergeCopy } from "../src/data/accounting/mergeCopy.js";
import * as base from "../src/data/accountingServices.js";
import * as samples from "../src/data/accountingSamples.js";

const FRONTEND_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(FRONTEND_DIR, rel), "utf8");
const BASE = mergeCopy({ ...base, ...samples });

// Live views exist only for these question keys (components/accounting/AnswerViews.jsx).
const ANSWER_KEYS = ["runway", "payables", "receivables", "close", "tax"];
const SOURCE_ICON_KEYS = [...read("src/components/accounting/FlowCards.jsx").matchAll(/^\s{2}(\w+): \{ icon:/gm)].map((m) => m[1]);

test("the segment pages use the agreed slugs", () => {
  assert.deepEqual(SEGMENTS.map((s) => s.slug), ["ecommerce", "creators", "agencies", "cpa-firms"]);
});

test("each page has a unique, SERP-sized title and description", () => {
  assert.equal(new Set(SEGMENTS.map((s) => s.metaTitle)).size, SEGMENTS.length);
  assert.equal(new Set(SEGMENTS.map((s) => s.metaDescription)).size, SEGMENTS.length);
  for (const s of SEGMENTS) {
    assert.ok(s.metaTitle.length <= 70, `${s.slug} title is ${s.metaTitle.length} chars`);
    assert.ok(s.metaDescription.length >= 70 && s.metaDescription.length <= 160, `${s.slug} description is ${s.metaDescription.length} chars`);
  }
});

for (const s of SEGMENTS) {
  test(`${s.slug}: merged copy is complete and renderable`, () => {
    const c = mergeCopy(BASE, s.copy);
    assert.ok(c.HERO.eyebrow && c.HERO.titleLead && c.HERO.lede && c.HERO.microcopy, "hero copy");
    assert.equal(c.SOURCES.length, 6, "the flow diagram is laid out for six sources");
    for (const src of c.SOURCES) assert.ok(SOURCE_ICON_KEYS.includes(src.key), `no icon for source "${src.key}"`);
    assert.equal(c.STATS.length, 4);
    assert.ok(c.SPECIFICS && c.SPECIFICS.items.length === 6, "six 'built for' cards");
    assert.ok(c.EMAIL_CTA.href.startsWith("mailto:support@finboard.ai?subject="), "email call to action");
    if (c.SECTIONS.ask) {
      assert.deepEqual(c.ASK.map((a) => a.key), ANSWER_KEYS);
      for (const k of ANSWER_KEYS) assert.ok(c.ANSWERS[k], `answer data for ${k}`);
    }
    assert.equal(new Set(c.COMPARE.rows.map((r) => r[0])).size, c.COMPARE.rows.length);
    for (const row of c.COMPARE.rows) assert.equal(row.length, c.COMPARE.columns.length + 1);
  });

  test(`${s.slug}: copy has no em-dashes`, () => {
    assert.ok(!JSON.stringify(s).includes("—"), "use commas, colons or periods instead");
  });
}

test("the general page's copy is unchanged by segment merges", () => {
  mergeCopy(BASE, SEGMENTS[0].copy);
  assert.equal(BASE.HERO.titleLead, "Startup accounting,");
  assert.equal(BASE.SECTIONS.ask, true);
});

test("the CPA page keeps the firm as preparer of record and covers Section 7216", () => {
  const faqs = SEGMENTS.find((s) => s.slug === "cpa-firms").copy.FAQS.map((f) => f.a).join(" ");
  assert.match(faqs, /preparer of record/);
  assert.match(faqs, /Section 7216/);
});

test("the sitemap lists every segment page", () => {
  assert.match(read("src/app/sitemap.js"), /SEGMENTS\.map/);
});

// Checked against the AICPA Code (2026 edition), SSTS and Rev. Proc. 2013-14 in Nov 2026.
const VERIFIED_RULES = [
  "AICPA Code 1.700.040",
  "AICPA Code 1.150.040",
  "AICPA Code 1.300.040",
  "AICPA SSTS 1.4",
  "IRC §7216 · Rev. Proc. 2013-14",
  "FTC Safeguards Rule",
];

test("the CPA compliance section cites only verified rules", () => {
  const cpa = SEGMENTS.find((s) => s.slug === "cpa-firms").copy;
  assert.deepEqual(cpa.COMPLIANCE.items.map((i) => i.rule), VERIFIED_RULES);
  assert.match(cpa.COMPLIANCE.note, /not legal advice/);
  for (const s of SEGMENTS.filter((x) => x.slug !== "cpa-firms")) assert.equal(s.copy.COMPLIANCE, undefined, `${s.slug} has no compliance section`);
  assert.equal(BASE.COMPLIANCE, null);
});

test("the CPA page tells firms to notify clients (AICPA 1.150.040), never to hide outsourcing", () => {
  const faqs = SEGMENTS.find((s) => s.slug === "cpa-firms").copy.FAQS;
  const notice = faqs.find((f) => /clients know/i.test(f.q));
  assert.match(notice.a, /preferably in writing/);
  assert.doesNotMatch(JSON.stringify(faqs), /only if you tell them/i);
});
