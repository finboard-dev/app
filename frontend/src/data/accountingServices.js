/**
 * Copy for /accounting-services: done-for-you accounting for startup founders.
 * Pitch: AI agents do the work inside the client's tools, accountants check it,
 * founders get tax-ready books and live numbers. CTA: a discovery call.
 * All product figures on the page are sample data.
 */

export const ACCOUNTING_PATH = "/accounting-services";
export const DISCOVERY_LABEL = "Book a discovery call";

/** For visitors who would rather write than book a call. */
export const CONTACT_EMAIL = "support@finboard.ai";
export const EMAIL_CTA = {
  label: "Email us instead",
  prompt: "Prefer email?",
  body: "and we'll get back to you.",
  href: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Accounting services: I'd like to know more")}`,
};
export const CLOSE_DAYS = 5;

export const HERO = {
  titleLead: "Startup accounting,",
  titleAccent: "handled.",
  lede: `Tax-ready books closed in ${CLOSE_DAYS} business days, with live burn, runway, payables and receivables in between. AI agents do the work. Accountants check every entry.`,
  secondary: "See how it works",
  microcopy: "Free 30-minute call · No commitment",
};

// Service commitments, not customer outcome claims.
export const STATS = [
  { label: "Close", value: `${CLOSE_DAYS} days`, note: "Business days to close each month" },
  { label: "Visibility", value: "Daily", note: "Burn, runway, payables and receivables" },
  { label: "Accuracy", value: "100%", note: "Of entries checked by an accountant" },
  { label: "Tax-ready", value: "Monthly", note: "Books your CPA can file from" },
];

// How it works: the client's tools feed the agents, an accountant checks, the books close.
export const SOURCES = [
  { key: "bank", label: "Bank and cards" },
  { key: "billing", label: "Billing and payments" },
  { key: "inbox", label: "Email inbox" },
  { key: "bills", label: "Bills and spend" },
  { key: "payroll", label: "Payroll" },
  { key: "ledger", label: "Your ledger" },
];

export const AGENT_ROWS = [
  { name: "AWS", detail: "Invoice found in inbox", to: "Hosting", confidence: 99 },
  { name: "Kestrel AI", detail: "New annual contract", to: "Revenue, 12 months", confidence: 97 },
  { name: "Payout", detail: "Billing deposit", to: "14 invoices matched", confidence: 100 },
  { name: "Northwind Labs", detail: "Credit note", to: "Sent to your accountant", confidence: 61 },
];

export const REVIEW_ROWS = [
  { label: "Northwind credit note", state: "Approved" },
  { label: "Accruals and prepaids", state: "Posted" },
  { label: "Revenue schedules", state: "Approved" },
];

export const BOOK_OUTPUTS = ["Burn and runway", "Payables and receivables", "Tax-ready books"];

export const REPLACES = [
  { title: "AI agents", body: "Replace data entry and catch-up bookkeeping." },
  { title: "Your accountant", body: "Replaces hiring and managing a bookkeeper." },
  { title: "Live dashboards", body: "Replace waiting on month-end spreadsheets." },
];

// Real-time visibility: founder questions, each answered by a live view.
export const ASK = [
  { key: "runway", label: "Runway", q: "How much runway do we have?", sub: "Cash, burn and cash-out date" },
  { key: "payables", label: "Payables", q: "What do we owe this week?", sub: "Bills by vendor and due date" },
  { key: "receivables", label: "Receivables", q: "Who is late paying us?", sub: "Open invoices and days late" },
  { key: "close", label: "Close", q: "Are the books closed yet?", sub: `The ${CLOSE_DAYS}-day close, step by step` },
  { key: "tax", label: "Tax", q: "Are we ready for tax time?", sub: "Tax-ready books, every month" },
];

// DRAFT, anonymised customer stories: replace every fact, figure and quote with
// the real client's, and get their sign-off, before publishing.
// Hidden until then: flip SHOW_STORIES to true once the stories are real.
export const SHOW_STORIES = false;

export const STORIES = [
  {
    key: "b2b",
    tab: "B2B software",
    short: "B2B software",
    company: "Series A · 35 people · US",
    title: "From three months behind to",
    titleAccent: `closed in ${CLOSE_DAYS}\u00A0days`,
    quote: "I stopped being the bookkeeper. Our investors get clean numbers on day 5, and I finally trust our runway.",
    role: "Founder and CEO",
    sector: "B2B software",
    steps: [
      {
        label: "The problem",
        body: "Books were three months behind going into a Series A. Invoices sat in the founder's inbox, revenue sat in billing, and nobody trusted the burn number.",
      },
      {
        label: "What we did",
        body: `Cleaned up nine months of history, connected our AI agents to their bank, billing, inbox and payroll, and set a ${CLOSE_DAYS}-day close.`,
      },
      {
        label: "The result",
        body: `The first clean close took three weeks. Every close since has landed by day ${CLOSE_DAYS}, and the books stay tax-ready every month.`,
      },
    ],
    metrics: [
      { value: "5 days", label: "To close, down from 3 months" },
      { value: "9 months", label: "Of history cleaned up" },
      { value: "Tax-ready", label: "Every month, not just at year-end" },
    ],
  },
  {
    key: "ecommerce",
    tab: "Creator-led e-commerce",
    short: "E-commerce",
    company: "Creator-led brand · 12 people · US",
    title: "From guessing margins to",
    titleAccent: "knowing every\u00A0SKU",
    quote: "I finally know which products make money, not just which ones sell.",
    role: "Founder and creator",
    sector: "Creator-led e-commerce",
    steps: [
      {
        label: "The problem",
        body: "Sales came in from their online store, social shops and brand deals. Payouts landed net of fees and refunds, so nobody knew the real margin on a single product.",
      },
      {
        label: "What we did",
        body: `Connected our AI agents to every sales channel, payout and ad account, matched payouts to orders, and put inventory and cost of goods on a ${CLOSE_DAYS}-day close.`,
      },
      {
        label: "The result",
        body: "Margin by product and channel every month, ad spend measured against real profit, and tax-ready books at year-end.",
      },
    ],
    metrics: [
      { value: "5 days", label: "To close each month" },
      { value: "4", label: "Sales channels in one set of books" },
      { value: "Every SKU", label: "Margin tracked monthly" },
    ],
  },
];

// Each row: [topic, accounting software, traditional firm, FinBoard].
export const COMPARE = {
  columns: [
    { name: "Accounting software", sub: "You do the work" },
    { name: "Traditional firm", sub: "People, by hand" },
    { name: "FinBoard", sub: "AI agents + accountants" },
  ],
  rows: [
    ["Who does the work", "You do", "Their team, by hand", "AI agents, checked by accountants"],
    ["Month-end close", "When you find time", "Weeks after month-end", `${CLOSE_DAYS} business days`],
    ["Burn, runway, AP and AR", "Build it yourself", "Once a month", "Live, every day"],
    ["Revenue", "Spreadsheets", "Manual schedules", "Calculated by AI agents"],
    ["Your time", "Hours every week", "Email back-and-forth", "A short monthly review"],
  ],
};

export const STEPS = [
  { title: "Discovery call", body: "30 minutes on your books, tools and investors." },
  { title: "Connect your stack", body: "Our agents connect to the tools you already use." },
  { title: "First close", body: `Books closed in ${CLOSE_DAYS} business days, every month.` },
];

export const FOUNDER = {
  name: "Vaishnav Gupta",
  role: "Co-founder · Finance",
  photo: "/team/vaishnav.webp",
  linkedin: "https://www.linkedin.com/in/vaishnav-gupta-07b1b218/",
  bio: "Ex-PwC and ex-Rippling. You talk to a founder, not a sales rep.",
};

// Founder profile, shown right below the hero. Facts match the homepage team section.
export const FOUNDER_PROFILE = {
  eyebrow: "Meet your finance lead",
  title: "Big Four rigor.",
  titleAccent: "Startup speed.",
  lead: "FinBoard's accounting team is led by Vaishnav Gupta, our finance co‑founder. He learned audit-grade finance at PwC, then handled payroll and tax operations at Rippling.",
  experience: [
    {
      company: "PwC",
      tag: "Big Four audit and tax firm",
      title: "Finance transformation",
      body: "Led finance transformations for Fortune 500 groups at one of the world's leading audit and tax firms.",
      color: "#E0301E",
    },
    {
      company: "Rippling",
      tag: "HR and payroll platform",
      title: "Payroll and tax operations",
      body: "Handled payroll and tax operations at Rippling, on systems that moved billions.",
      color: "#7C2D52",
    },
  ],
  facts: ["10+ years advising CFOs", "Fortune 500 finance transformations", "Payroll and tax at scale"],
  cta: "Book a call with Vaishnav",
  linkedinLabel: "View LinkedIn profile",
};

export const FAQS = [
  {
    q: "What happens on the discovery call?",
    a: "We talk through your books, your tools and what your investors expect. You leave with a clear plan, whether or not you work with us.",
  },
  {
    q: "How do the AI agents work?",
    a: "They connect to the tools you already use, find invoices and bills, calculate revenue and match payments. When they are not sure, they ask your accountant instead of guessing.",
  },
  {
    q: "How fast is the monthly close?",
    a: `Your books are closed within ${CLOSE_DAYS} business days of month-end, every month.`,
  },
  {
    q: "Will our books be ready for tax time?",
    a: "Yes. We close and reconcile your books every month, so your CPA gets tax-ready books at year-end, not a cleanup project.",
  },
  {
    q: "Which tools do you work with?",
    a: "Your ledger, bank and card feeds, billing, payroll and spend tools. We confirm your exact stack on the discovery call.",
  },
  {
    q: "Do you replace our CPA?",
    a: "No. We handle bookkeeping, the monthly close and reporting, and hand clean books to your CPA for tax.",
  },
];
