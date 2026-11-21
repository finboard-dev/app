/**
 * Sample data shown in the /accounting-services product mockups (hero
 * dashboard, agent feed, close tracker and the "Answers" views). Every figure
 * here is illustrative and is labelled "Sample" on the page. Segment pages
 * override these through src/data/accounting/segments.
 */

import { CLOSE_DAYS } from "./accountingServices.js";

/** Chips: tone is "soon", "late", "done" or null (neutral). */
const chip = (text, tone = null) => ({ text, tone });

export const DASHBOARD = {
  title: "Founder dashboard",
  kpis: [
    { label: "Cash", value: "$2.84M", note: "3 bank accounts" },
    { label: "Net burn", value: "$158K", note: "↓ 2.5% vs Sep", tone: "good" },
    { label: "Runway", value: "18 mo", note: "Cash-out Apr 2028" },
  ],
  chart: { title: "Cash balance", legend: ["Actual", "At current burn"] },
  bottom: [
    { label: "Payables due this week", value: "$46.2K", note: "14 bills" },
    { label: "Receivables overdue", value: "$31.8K", note: "3 customers", tone: "bad" },
  ],
  insight: "Burn fell 2.5% in October. At this pace, cash lasts 18 months.",
};

// What the agents did today. The newest item pops in every few seconds.
export const FEED = [
  { text: "Found an AWS invoice in your inbox", tag: "Invoice" },
  { text: "Scheduled $18,000 of Kestrel AI revenue", tag: "Revenue" },
  { text: "Matched a payout to 14 invoices", tag: "Match" },
  { text: "Reconciled 3 bank accounts", tag: "Reconcile" },
  { text: "Sent a credit note to your accountant", tag: "Review" },
];

export const CLOSE_ROWS = [
  { label: "Bank reconciliations", state: "done" },
  { label: "Revenue schedules", state: "done" },
  { label: "Accruals and prepaids", state: "active" },
  { label: "Accountant review", state: "next" },
];

// Labels inside the "How it works" cards.
export const FLOW_CARDS = {
  agentsNote: "Not sure? It asks your accountant instead of guessing.",
  reviewTitle: "Accountant review",
  booksTitle: "Your books",
  booksHeadline: "October closed",
};

/** One entry per ASK key: the data behind each live view. */
export const ANSWERS = {
  runway: {
    kpis: [
      { label: "Cash", value: "$2.84M", note: "3 bank accounts" },
      { label: "Net burn", value: "$158K", note: "↓ 2.5% vs Sep", tone: "good" },
      { label: "Runway", value: "18 mo", note: "Cash-out Apr 2028" },
    ],
    chartTitle: "Cash balance, actual and at current burn",
    insight: "At $158K a month, cash lasts until April 2028. Burn fell 2.5% in October.",
  },
  payables: {
    aging: [
      { l: "Current", v: 96, c: "#2563EB" },
      { l: "1–30", v: 42, c: "#60A5FA" },
      { l: "31–60", v: 12, c: "#F59E0B" },
      { l: "60+", v: 4, c: "#EA580C" },
    ],
    rows: [
      { name: "AWS", detail: "Due Nov 20", amount: "$18,240", chip: chip("This week", "soon") },
      { name: "Gusto payroll", detail: "Due Nov 21", amount: "$22,600", chip: chip("This week", "soon") },
      { name: "WeWork", detail: "Due Dec 1", amount: "$5,400", chip: chip("Scheduled") },
      { name: "Figma", detail: "Due Oct 28", amount: "$1,150", chip: chip("Overdue", "late") },
    ],
    insight: "$46.2K is due this week across 14 bills. One bill is overdue.",
  },
  receivables: {
    kpis: [
      { label: "Open AR", value: "$212K", note: "38 invoices" },
      { label: "Overdue", value: "$31.8K", note: "3 customers", tone: "bad" },
      { label: "DSO", value: "34 days", note: "↓ 4 days vs Sep", tone: "good" },
    ],
    rows: [
      { name: "Northwind Labs", detail: "INV-1042", amount: "$24,000", chip: chip("18 days late", "late") },
      { name: "Brightline", detail: "INV-1039", amount: "$7,800", chip: chip("9 days late", "late") },
      { name: "Acme Health", detail: "INV-1051", amount: "$12,500", chip: chip("Due Nov 22") },
      { name: "Kestrel AI", detail: "INV-1056", amount: "$18,000", chip: chip("Due Dec 2") },
    ],
    insight: "Northwind Labs is 18 days late on $24,000, your largest overdue invoice.",
  },
  close: {
    tasks: [
      { day: 1, task: "Bank and card reconciliations", by: "AI agents", state: "done" },
      { day: 2, task: "Bills and invoices matched", by: "AI agents", state: "done" },
      { day: 3, task: "Revenue calculated and scheduled", by: "AI agents", state: "done" },
      { day: 4, task: "Accruals, prepaids and payroll", by: "Accountant", state: "active" },
      { day: 5, task: "Review and tax-ready books", by: "Accountant", state: "next" },
    ],
    insight: `On track to close by day ${CLOSE_DAYS}. Two entries are with your accountant.`,
  },
  tax: {
    checks: [
      "Every bank and card account reconciled",
      "Revenue and expenses categorized",
      "Payroll and contractor payments recorded",
      "Checked by your accountant",
    ],
    pnl: [
      ["Revenue", "$412K", "$396K"],
      ["Expenses", "$569K", "$572K"],
      ["Net loss", "($157K)", "($176K)"],
    ],
    insight: "October is closed and reconciled. At year-end, your CPA gets tax-ready books, not a cleanup project.",
  },
};

export { chip };
