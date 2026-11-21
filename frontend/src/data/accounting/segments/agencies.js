import { chip } from "../../accountingSamples.js";
import { CLOSE_DAYS, CONTACT_EMAIL } from "../../accountingServices.js";
import { emailHref } from "../mergeCopy.js";

/** /accounting-services/agencies: marketing, creative and development agencies. */
export const AGENCIES = {
  slug: "agencies",
  nav: "Agencies",
  blurb: "Retainers, projects and profit by client.",
  breadcrumb: "Accounting for agencies",
  metaTitle: "Accounting Services for Agencies | FinBoard",
  metaDescription: `Agency accounting, handled. Retainers, projects and contractor costs closed in ${CLOSE_DAYS} business days, with profit by client and project every month.`,
  copy: {
    HERO: {
      eyebrow: "Accounting for agencies",
      titleLead: "Agency accounting,",
      titleAccent: "handled.",
      lede: `Retainers, projects and contractor costs closed in ${CLOSE_DAYS} business days, with profit by client and project every month. AI agents do the work. Accountants check every entry.`,
    },
    EMAIL_CTA: { href: emailHref(CONTACT_EMAIL, "Agency accounting: I'd like to know more") },
    STATS: [
      { label: "Close", value: `${CLOSE_DAYS} days`, note: "Business days to close each month" },
      { label: "Profit", value: "By client", note: "Profit by client and project, monthly" },
      { label: "Accuracy", value: "100%", note: "Of entries checked by an accountant" },
      { label: "Tax-ready", value: "Monthly", note: "Books your CPA can file from" },
    ],
    SPECIFICS: {
      eyebrow: "Built for agencies",
      title: "Know which clients",
      accent: "actually make you money",
      end: ".",
      lead: "Revenue is busy and margins are thin. We tie every dollar of revenue and cost to the client and project behind it.",
      items: [
        { title: "Profit by client and project", body: "Revenue, team costs and contractors tied to each client and project, so you see real margin, not just billings." },
        { title: "Retainers and project revenue", body: "Retainers, milestones and upfront payments recognized in the month the work happens, not the month cash arrives." },
        { title: "Contractors and freelancers", body: "Freelancer invoices coded to the right project, and payments tracked for year-end 1099s." },
        { title: "Pass-through costs", body: "Media spend, stock assets and other rebillable costs tracked so nothing goes unbilled." },
        { title: "Late-paying clients", body: "Open invoices by client and days late, so cash surprises stop being surprises." },
        { title: "Payroll and team costs", body: "Payroll and benefits recorded every month, ready to set against what each client brings in." },
      ],
    },
    SOURCES: [
      { key: "billing", label: "Client invoicing" },
      { key: "time", label: "Time tracking" },
      { key: "payroll", label: "Payroll and contractors" },
      { key: "bills", label: "Software and vendor bills" },
      { key: "bank", label: "Bank and cards" },
      { key: "ledger", label: "Your ledger" },
    ],
    AGENT_ROWS: [
      { name: "Meridian Hotels", detail: "Monthly retainer", to: "Revenue, Meridian", confidence: 100 },
      { name: "Freelance designer", detail: "42 hours, rebrand", to: "Project cost: Rebrand", confidence: 98 },
      { name: "Stock media", detail: "Billable to client", to: "Rebill to Northwind", confidence: 95 },
      { name: "Unlabeled transfer", detail: "No matching invoice", to: "Sent to your accountant", confidence: 57 },
    ],
    REVIEW_ROWS: [
      { label: "Milestone revenue", state: "Approved" },
      { label: "Unbilled pass-throughs", state: "Posted" },
      { label: "Payroll allocation", state: "Approved" },
    ],
    BOOK_OUTPUTS: ["Profit by client", "Late invoices", "Tax-ready books"],
    REPLACES: [
      { title: "AI agents", body: "Replace coding every cost to a project by hand." },
      { title: "Your accountant", body: "Replaces a bookkeeper who doesn't know agency revenue." },
      { title: "Live dashboards", body: "Replace guessing which clients are profitable." },
    ],
    FEED: [
      { text: "Recorded Meridian Hotels' monthly retainer", tag: "Revenue" },
      { text: "Coded a freelancer invoice to the rebrand project", tag: "Project" },
      { text: "Flagged $2,400 of unbilled stock media", tag: "Rebill" },
      { text: "Reconciled 3 bank accounts", tag: "Reconcile" },
      { text: "Sent an unlabeled transfer to your accountant", tag: "Review" },
    ],
    CLOSE_ROWS: [
      { label: "Bank reconciliations", state: "done" },
      { label: "Retainer and project revenue", state: "done" },
      { label: "Costs by client and project", state: "active" },
      { label: "Accountant review", state: "next" },
    ],
    DASHBOARD: {
      title: "Agency dashboard",
      kpis: [
        { label: "Revenue", value: "$328K", note: "21 active clients" },
        { label: "Gross margin", value: "47%", note: "↑ 3 pts vs Sep", tone: "good" },
        { label: "Cash", value: "$540K", note: "3 bank accounts" },
      ],
      chart: { title: "Cash balance", legend: ["Actual", "Projected"] },
      bottom: [
        { label: "Receivables overdue", value: "$64.2K", note: "4 clients", tone: "bad" },
        { label: "Contractors due this week", value: "$28.9K", note: "11 invoices" },
      ],
      insight: "Margin rose 3 points in October. Two retainer clients are below 30% margin.",
    },
    HEADS: {
      ask: { lead: "Live numbers on books we keep current. Ask the questions agency owners ask every week." },
      compare: { lead: "Software makes you code every cost yourself. Generalist firms stop at the P&L. We do the work and show you profit by client." },
      final: { title: "See your client margins", lead: "Tell us about your clients and your tools. We'll show you what your close and profitability reports would look like." },
    },
    ASK: [
      { key: "runway", label: "Cash", q: "How much cash do we have?", sub: "Cash, payroll coming up and spend" },
      { key: "payables", label: "Contractors", q: "What do we owe contractors?", sub: "Freelancers and vendors by due date" },
      { key: "receivables", label: "Clients", q: "Which clients are late paying?", sub: "Open invoices and days late" },
      { key: "close", label: "Close", q: "Are the books closed yet?", sub: `The ${CLOSE_DAYS}-day close, step by step` },
      { key: "tax", label: "Tax", q: "Are we ready for tax time?", sub: "Tax-ready books, every month" },
    ],
    ANSWERS: {
      runway: {
        kpis: [
          { label: "Cash", value: "$540K", note: "3 bank accounts" },
          { label: "Next payroll", value: "$96K", note: "Nov 30" },
          { label: "Monthly spend", value: "$174K", note: "Team and vendors" },
        ],
        chartTitle: "Cash balance, actual and projected",
        insight: "After the Nov 30 payroll, you'll have $444K, about 2.5 months of spend.",
      },
      payables: {
        aging: [
          { l: "Current", v: 52, c: "#2563EB" },
          { l: "1–30", v: 19, c: "#60A5FA" },
          { l: "31–60", v: 5, c: "#F59E0B" },
          { l: "60+", v: 1, c: "#EA580C" },
        ],
        rows: [
          { name: "Freelance designer", detail: "Due Nov 20", amount: "$6,300", chip: chip("This week", "soon") },
          { name: "Dev contractor", detail: "Due Nov 21", amount: "$11,800", chip: chip("This week", "soon") },
          { name: "Project software", detail: "Due Dec 1", amount: "$1,900", chip: chip("Scheduled") },
          { name: "Photo studio", detail: "Due Oct 27", amount: "$2,250", chip: chip("Overdue", "late") },
        ],
        insight: "$28.9K is due to contractors this week. One studio bill is overdue.",
      },
      receivables: {
        kpis: [
          { label: "Open AR", value: "$186K", note: "29 invoices" },
          { label: "Overdue", value: "$64.2K", note: "4 clients", tone: "bad" },
          { label: "DSO", value: "41 days", note: "↓ 3 days vs Sep", tone: "good" },
        ],
        rows: [
          { name: "Northwind Retail", detail: "INV-3310", amount: "$28,500", chip: chip("24 days late", "late") },
          { name: "Meridian Hotels", detail: "INV-3322", amount: "$18,000", chip: chip("11 days late", "late") },
          { name: "Fieldstone Bank", detail: "INV-3341", amount: "$22,400", chip: chip("Due Nov 22") },
          { name: "Copperleaf", detail: "INV-3347", amount: "$9,600", chip: chip("Due Dec 2") },
        ],
        insight: "Northwind Retail is 24 days late on $28,500, your largest overdue invoice.",
      },
      close: {
        tasks: [
          { day: 1, task: "Bank and card reconciliations", by: "AI agents", state: "done" },
          { day: 2, task: "Client invoices and payments matched", by: "AI agents", state: "done" },
          { day: 3, task: "Retainer and project revenue", by: "AI agents", state: "done" },
          { day: 4, task: "Costs by client and project", by: "Accountant", state: "active" },
          { day: 5, task: "Review and tax-ready books", by: "Accountant", state: "next" },
        ],
        insight: `On track to close by day ${CLOSE_DAYS}. One unlabeled transfer is with your accountant.`,
      },
      tax: {
        checks: [
          "Every bank and card account reconciled",
          "Revenue recorded by client and project",
          "Contractor payments tracked for 1099s",
          "Checked by your accountant",
        ],
        pnl: [
          ["Revenue", "$328K", "$305K"],
          ["Direct costs", "($174K)", "($171K)"],
          ["Gross profit", "$154K", "$134K"],
        ],
        insight: "October is closed and reconciled. At year-end, your CPA gets tax-ready books, not a cleanup project.",
      },
    },
    COMPARE: {
      columns: [
        { name: "Accounting software", sub: "You do the work" },
        { name: "Generalist firm", sub: "People, by hand" },
        { name: "FinBoard", sub: "AI agents + accountants" },
      ],
      rows: [
        ["Profit by client", "Build it yourself", "Not included", "Every month"],
        ["Retainer and project revenue", "When cash arrives", "Adjusted at year-end", "Recognized as work happens"],
        ["Pass-through costs", "Easy to miss", "Lumped into expenses", "Tracked for rebilling"],
        ["Month-end close", "When you find time", "Weeks after month-end", `${CLOSE_DAYS} business days`],
        ["Your time", "Hours every week", "Email back-and-forth", "A short monthly review"],
      ],
    },
    FAQS: [
      { q: "What kinds of agencies do you work with?", a: "Marketing, creative, design, development and consulting firms that bill clients through retainers, projects or hours." },
      { q: "Can you show profit by client?", a: "Yes. Revenue, team costs and contractors are tied to each client and project, so you see margin by client every month." },
      { q: "How do you handle retainers and upfront payments?", a: "Revenue is recognized in the month the work happens, so a big upfront payment doesn't make one month look great and the next look terrible." },
      { q: "Do you work with our time tracking and invoicing tools?", a: "We work with the tools you already use. We confirm your exact stack on the discovery call." },
      { q: "How fast is the monthly close?", a: `Your books are closed within ${CLOSE_DAYS} business days of month-end, every month.` },
      { q: "Do you replace our CPA?", a: "No. We handle bookkeeping, the monthly close and reporting, and hand clean books to your CPA for tax." },
    ],
  },
};
