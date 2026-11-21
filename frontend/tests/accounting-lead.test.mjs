import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { formatLeadEmail, GENERAL_SEGMENT, leadFormFor, parseAccountingLead } from "../src/lib/accountingLead.mjs";
import { SEGMENTS } from "../src/data/accounting/segments/index.js";

const FRONTEND_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(FRONTEND_DIR, rel), "utf8");

const valid = (overrides = {}) => ({
  segment: "ecommerce",
  name: "Priya Shah",
  email: "priya@harborgoods.com",
  company: "Harbor Goods",
  qualifier: "$50K to $250K",
  message: "Payouts never match our orders.",
  ...overrides,
});

test("every accounting page has a lead form with a qualifying question", () => {
  for (const slug of [GENERAL_SEGMENT, ...SEGMENTS.map((s) => s.slug)]) {
    const form = leadFormFor(slug);
    assert.ok(form.title && form.companyLabel && form.success, `${slug} copy`);
    assert.ok(form.qualifier.options.length >= 3, `${slug} options`);
  }
  assert.equal(leadFormFor("nope"), null);
});

test("a complete submission is accepted and keeps the segment's question", () => {
  const result = parseAccountingLead(valid());
  assert.equal(result.ok, true);
  assert.equal(result.isSpam, false);
  assert.deepEqual(result.lead.qualifier, { label: "Monthly revenue", answer: "$50K to $250K" });
});

test("personal email addresses are accepted, malformed ones are not", () => {
  assert.equal(parseAccountingLead(valid({ segment: "creators", email: "maya@gmail.com", qualifier: "$10K to $50K" })).ok, true);
  assert.equal(parseAccountingLead(valid({ email: "not-an-email" })).ok, false);
});

test("missing fields, unknown pages and made-up answers are rejected", () => {
  assert.equal(parseAccountingLead(valid({ name: " " })).ok, false);
  assert.equal(parseAccountingLead(valid({ company: "" })).ok, false);
  assert.equal(parseAccountingLead(valid({ segment: "nope" })).ok, false);
  assert.equal(parseAccountingLead(valid({ qualifier: "A billion dollars" })).ok, false);
});

test("the hidden spam field marks a submission as spam", () => {
  assert.equal(parseAccountingLead(valid({ website: "http://spam.example" })).isSpam, true);
});

test("the notification email carries the lead's details and page", () => {
  const { lead } = parseAccountingLead(valid());
  const email = formatLeadEmail(lead);
  assert.equal(email.subject, "New accounting lead: Harbor Goods (E-commerce brands)");
  for (const part of ["Priya Shah", "priya@harborgoods.com", "Brand: Harbor Goods", "Monthly revenue: $50K to $250K", "Payouts never match", "https://finboard.ai/accounting-services/ecommerce"]) {
    assert.ok(email.text.includes(part), `missing ${part}`);
  }
  assert.ok(!email.text.includes("—"));
});

test("question-style labels read naturally in the email", () => {
  const { lead } = parseAccountingLead(valid({ segment: "cpa-firms", qualifier: "Monthly close" }));
  assert.ok(formatLeadEmail(lead).text.includes("What do you want to outsource? Monthly close"));
});

test("leads are emailed to Vaishnav, not posted to Slack", () => {
  const route = read("src/app/api/accounting-lead/route.js");
  assert.match(route, /vaishnav@finboard\.ai/);
  assert.match(route, /api\.resend\.com\/emails/);
  assert.match(route, /reply_to: lead\.email/);
  assert.doesNotMatch(route, /SLACK/);
});

test("accounting pages swap the navbar trial button for the lead form", () => {
  const view = read("src/views/AccountingServices.jsx");
  assert.match(view, /<Navbar onBookDemo=\{openCall\} cta=\{navCta\} \/>/);
  assert.match(view, /<LeadDialog /);
  assert.match(read("src/components/accounting/LeadDialog.jsx"), /Prefer email\? Write to/);
});

test("the hero's second button opens the lead form instead of scrolling to how it works", () => {
  for (const file of ["src/components/accounting/Hero.jsx", "src/components/accounting/HeroSplit.jsx"]) {
    const src = read(file);
    assert.match(src, /onClick=\{onLead\}/, `${file} wires the form button`);
    assert.match(src, /\{LEAD_FORM\.title\}/, `${file} labels it with the form title`);
    assert.doesNotMatch(src, /href="#how"/, `${file} no longer links to #how`);
  }
  assert.match(read("src/views/AccountingServices.jsx"), /<Hero onDiscovery=\{openCall\} onLead=\{openLead\} \/>/);
});
