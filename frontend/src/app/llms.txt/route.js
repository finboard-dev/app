import { getAllPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/seo";

// Build-generated llms.txt (replaces the old static public/llms.txt).
// Static sections are authored here; the Blog section is derived from
// content/blog at build time so publishing a post updates the AI-crawler
// inventory with no manual edit — same contract as sitemap.js.

export const dynamic = "force-static";

const HEADER = `# FinBoard

> FinBoard is an AI-native financial operations platform built for multi-entity operators — restaurants, construction firms, retailers, e-commerce brands, healthcare groups, and software companies. It automates month-end close, multi-entity consolidation, FP&A, procure-to-pay, and order-to-cash workflows, giving finance teams a single governed workspace powered by QuickBooks data and AI agents.

## Core Pages

- [Home](${SITE_URL}/) — Platform overview: AI agents for multi-entity financial close, consolidation, and analytics.
- [About](${SITE_URL}/about) — FinBoard's mission and team: finance and engineering leaders from PwC, Rippling, Samsung and more.
- [For Operators](${SITE_URL}/operators) — How FinBoard serves multi-entity operators managing 5–200+ entities across complex org structures.
- [Advisory](${SITE_URL}/advisory) — FinBoard for fractional CFOs, CAS firms, and fund admins: run every client's finance in one workspace.
- [Pricing](${SITE_URL}/pricing) — Custom-quoted per group; pricing varies by entity count, modules, and seats.
- [Engagement Model](${SITE_URL}/engagement) — How FinBoard onboards and delivers: discovery, implementation, and ongoing cadence.
- [Testimonials](${SITE_URL}/testimonials) — Customer stories and outcomes from operators who use FinBoard for financial close and reporting.`;

const FOOTER = `## Templates

- [Finance Templates](${SITE_URL}/templates) — 80+ free, QuickBooks Online–ready Google Sheets templates: budgets, cash-flow forecasts, P&L, balance sheet, invoices, calculators (ASC 842 lease, ARR/MRR) and more.

## Conferences

- [Accounting Conferences Calendar](${SITE_URL}/conferences) — The calendar of major conferences for accountants, firms, CFOs and CPAs, with dates, locations and registration links, updated as events are announced.

## Products

- [Month-End Close](${SITE_URL}/products/month-end-close) — AI-assisted close checklists and automated reconciliation cutting close time to under 5 business days.
- [Consolidation](${SITE_URL}/products/consolidation) — Automated multi-entity consolidation with intercompany eliminations for groups of 50+ entities.
- [Analytics](${SITE_URL}/products/analytics) — Real-time P&L, balance sheet, and cash flow dashboards with drill-down to transaction level.
- [FP&A](${SITE_URL}/products/fpa) — Rolling forecasts, budget-vs-actuals, and scenario planning integrated with QuickBooks data.
- [Procure-to-Pay](${SITE_URL}/products/p2p) — Purchase order workflow, vendor payment approvals, and spend analytics across entities.
- [Order-to-Cash](${SITE_URL}/products/o2c) — Revenue tracking, AR aging, and collections workflow for multi-entity operators.

## Accounting Services

- [Accounting Services](${SITE_URL}/accounting-services): Done-for-you startup accounting. AI agents do the work, accountants check every entry, books close in 5 business days.
- [E-commerce Accounting](${SITE_URL}/accounting-services/ecommerce): Payouts matched to orders, inventory and cost of goods, and margin by product and channel for e-commerce brands.
- [Accounting for Creators](${SITE_URL}/accounting-services/creators): Platform payouts, brand deals, memberships and merch in one set of books for creators.
- [Accounting for Agencies](${SITE_URL}/accounting-services/agencies): Retainers, project revenue and profit by client for marketing, creative and development agencies.
- [Outsourced Accounting for CPA Firms](${SITE_URL}/accounting-services/cpa-firms): An India-based team for bookkeeping, monthly close and tax-season prep, delivered under the CPA firm's name.

## Industries

- [Restaurants](${SITE_URL}/industries/restaurants) — Financial close and multi-location P&L reporting for restaurant groups.
- [Construction](${SITE_URL}/industries/construction) — Job costing, WIP reporting, and cash flow management for construction companies.
- [Retail](${SITE_URL}/industries/retail) — Multi-location inventory and margin reporting for retail operators.
- [E-Commerce](${SITE_URL}/industries/ecommerce) — Revenue reconciliation, COGS tracking, and platform fee analysis for e-commerce brands.
- [Healthcare](${SITE_URL}/industries/healthcare) — Multi-practice financial consolidation and compliance-ready reporting for healthcare groups.
- [Software & Services](${SITE_URL}/industries/software-and-services) — SaaS metrics, ARR tracking, and departmental P&L for software and professional services companies.
`;

function stripNewlines(text) {
  return String(text || "").replace(/\s+/g, " ").trim();
}

export function GET() {
  const posts = getAllPosts();
  const blogLines = posts.map(
    (post) =>
      `- [${stripNewlines(post.title)}](${SITE_URL}/blog/${post.slug}) — ${stripNewlines(post.excerpt)}`
  );

  const blogSection = [
    "## Blog",
    "",
    `- [Blog](${SITE_URL}/blog) — ${posts.length} practical guides on US GAAP accounting, month-end close, multi-entity consolidation, FP&A and QuickBooks Online workflows, plus engineering notes.`,
    ...blogLines,
  ].join("\n");

  const body = [HEADER, blogSection, FOOTER].join("\n\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
