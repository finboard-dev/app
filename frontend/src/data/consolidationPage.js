/**
 * Copy and sample data for the /products/consolidation page
 * (QuickBooks multi-entity consolidation in Google Sheets).
 */

import { SHEETS_ADDON_URL, TRIAL_DAYS } from "@/data/trial";

export { SHEETS_ADDON_URL, TRIAL_DAYS };
export const PRICE_PER_ENTITY = "$20";

export const HERO = {
  eyebrow: "Many entities, one sheet.",
  headlineLead: "Consolidate every QuickBooks entity in",
  headlineItalic: "Google Sheets.",
  lede:
    "Install the FinBoard add-on, connect your QuickBooks Online companies and get a consolidated P&L and balance sheet with intercompany eliminations. No implementation project, no copy-paste.",
  bullets: [
    "Intercompany eliminations",
    "Chart of accounts mapping",
    "Budgets vs actuals and benchmarking",
    "Unlimited entities, refreshed hourly",
  ],
  trust: ["US servers", "Enterprise-grade encryption", "Intuit Developer Program member"],
};

export const FEATURES = [
  { title: "Consolidated financial reporting", body: "A consolidated P&L and balance sheet across every QuickBooks company, with each entity side by side so you can see what drives the group." },
  { title: "Intercompany eliminations", body: "Intercompany revenue, management fees and balances net out of the group view, so your consolidated numbers aren’t overstated." },
  { title: "Intercompany journal entries", body: "Pull journal entries from every entity into one sheet and check that both sides of each intercompany entry agree before you close." },
  { title: "Chart of accounts mapping", body: "Rename and regroup each entity’s accounts once, so every consolidated report lines up across the group." },
];

export const MODELING_ITEMS = [
  { title: "Budgets vs actuals, rolled up", body: "Pull each entity’s QuickBooks budget next to its actuals and roll both up to the group, month by month or year to date." },
  { title: "Variance analysis", body: "Dollar and percent variances on every line, by entity and for the group, so you can see what moved and where." },
  { title: "Entity benchmarking", body: "Map every entity to the same chart of accounts, then compare margins, costs and growth side by side." },
  { title: "% of income benchmarking", body: "Show every line as a percentage of total income, so a small location and a large one can be compared fairly." },
];

// Cell tones: "pos" | "neg" | "flag" | "elim" (elim can combine: "elim neg").
const r = (label, cells, kind) => ({ label, cells, kind });

export const MODELING_TABS = [
  {
    id: "bva",
    label: "Budget vs actual",
    title: "Budget vs actual, group roll-up, Oct 2026",
    columns: ["Account", "Actual", "Budget", "Variance", "Variance %"],
    rows: [
      r("Revenue", [["1,284,000", "pos"], ["1,250,000", "pos"], ["34,000", "pos"], ["2.7%", "pos"]]),
      r("Cost of goods sold", [["(498,000)", "neg"], ["(475,000)", "neg"], ["(23,000)", "flag"], ["(4.8%)", "flag"]]),
      r("Gross profit", [["786,000", "pos"], ["775,000", "pos"], ["11,000", "pos"], ["1.4%", "pos"]], "total"),
      r("Operating expenses", [["(612,000)", "neg"], ["(590,000)", "neg"], ["(22,000)", "flag"], ["(3.7%)", "flag"]]),
      r("Net income", [["174,000", "pos"], ["185,000", "pos"], ["(11,000)", "flag"], ["(5.9%)", "flag"]], "final"),
    ],
    note: "Unfavorable variances are highlighted. Each entity’s budget and actuals roll up into the group the same way.",
  },
  {
    id: "bench",
    label: "% of income",
    title: "% of income by entity, Jan–Oct 2026",
    columns: ["Account", "Austin", "Denver", "Tampa", "Group"],
    rows: [
      r("Total income", [["100.0%", "pos"], ["100.0%", "pos"], ["100.0%", "pos"], ["100.0%", "pos"]]),
      r("Cost of goods sold", [["38.0%", "pos"], ["41.6%", "flag"], ["36.8%", "pos"], ["38.8%", "pos"]]),
      r("Gross margin", [["62.0%", "pos"], ["58.4%", "pos"], ["63.2%", "pos"], ["61.2%", "pos"]], "total"),
      r("Payroll", [["27.5%", "pos"], ["31.1%", "flag"], ["26.0%", "pos"], ["28.2%", "pos"]]),
      r("Rent and occupancy", [["8.0%", "pos"], ["7.4%", "pos"], ["9.5%", "pos"], ["8.3%", "pos"]]),
      r("Other operating costs", [["11.5%", "pos"], ["10.4%", "pos"], ["10.2%", "pos"], ["10.7%", "pos"]]),
      r("Net income", [["15.0%", "pos"], ["9.5%", "flag"], ["17.5%", "pos"], ["14.0%", "pos"]], "final"),
    ],
    note: "Denver’s cost of goods sold and payroll both run about 3 points above the group, which is why its margin trails.",
  },
];

export const CONSOLIDATED_PL = {
  title: "Consolidated P&L, Jan–Oct 2026",
  columns: ["Account", "Holdings", "Retail", "Services", "Eliminations", "Consolidated"],
  elimColumn: 4,
  rows: [
    r("Revenue", [["0", "pos"], ["820,000", "pos"], ["410,000", "pos"], ["0", "pos"], ["1,230,000", "pos"]]),
    r("Intercompany fees earned", [["120,000", "pos"], ["0", "pos"], ["0", "pos"], ["(120,000)", "neg"], ["0", "pos"]]),
    r("Cost of goods sold", [["0", "pos"], ["(492,000)", "neg"], ["(164,000)", "neg"], ["0", "pos"], ["(656,000)", "neg"]]),
    r("Gross profit", [["120,000", "pos"], ["328,000", "pos"], ["246,000", "pos"], ["(120,000)", "neg"], ["574,000", "pos"]], "total"),
    r("Operating expenses", [["(65,000)", "neg"], ["(148,000)", "neg"], ["(97,000)", "neg"], ["0", "pos"], ["(310,000)", "neg"]]),
    r("Intercompany fees paid", [["0", "pos"], ["(80,000)", "neg"], ["(40,000)", "neg"], ["120,000", "pos"], ["0", "pos"]]),
    r("Net income", [["55,000", "pos"], ["100,000", "pos"], ["109,000", "pos"], ["0", "pos"], ["264,000", "pos"]], "final"),
  ],
  sidebar: ["3 entities connected", "Intercompany eliminated", "Refreshes every hour"],
};

export const STEPS = [
  {
    title: "Install the add-on",
    body: "Add FinBoard to Google Sheets from the Google Workspace Marketplace. It opens in the sidebar.",
    image: { src: "/products/consolidation/sheets-addon.webp", width: 1600, height: 878, alt: "The FinBoard add-on open in the Google Sheets sidebar, next to a monthly profit and loss report" },
  },
  {
    title: "Connect QuickBooks",
    body: "Pick your QuickBooks Online companies and the reports you need, by month or by class.",
    image: { src: "/products/consolidation/create-report.webp", width: 1600, height: 872, alt: "FinBoard’s Create Report dialog in Google Sheets, with a QuickBooks company selected and the profit and loss options showing" },
  },
  {
    title: "Consolidate",
    body: "Roll the companies into one statement with intercompany eliminated, refreshed every hour.",
    image: null, // renders the consolidated P&L sheet
  },
];

export const STATS = [
  { value: "Under 10 sec", label: "to pull monthly financials" },
  { value: "Up to 4 hrs", label: "saved per entity, every month" },
  { value: "Unlimited", label: "QuickBooks entities" },
  { value: "Every hour", label: "automatic refresh" },
];

export const CHIPS = [`${TRIAL_DAYS}-day free trial`, `From ${PRICE_PER_ENTITY} per entity`, "No implementation project", "Works in Google Sheets"];

export const WORKSPACE = [
  {
    title: "Map each entity’s accounts once",
    body: "Drag QuickBooks accounts into one reporting structure for the whole group. When QuickBooks adds a new account, FinBoard flags it for review, so nothing slips past the consolidation.",
    image: { src: "/products/consolidation/workspace-mapping.webp", width: 1600, height: 1019, alt: "FinBoard’s web workspace regrouping QuickBooks accounts into income, cost of goods sold and expense sections" },
  },
  {
    title: "Share a live dashboard with the group",
    body: "Profit and loss, entity breakdown and cash position for the whole group, with commentary written for you on demand.",
    image: { src: "/products/consolidation/group-dashboard.webp", width: 1600, height: 782, alt: "FinBoard’s executive group dashboard showing cash and bank, operating cash flow, a cash balance trend and a cash flow bridge" },
  },
];

export const AUDIENCES = [
  { title: "Accounting firms and bookkeepers", body: "Consolidate client groups without rebuilding the workbook every month." },
  { title: "Fractional CFOs", body: "Give each multi-entity client live consolidated numbers in a format they already know." },
  { title: "Finance and FP&A teams", body: "Keep your own models and formulas, now fed by live QuickBooks data." },
];

export const PLAN = {
  name: "FinBoard for Google Sheets",
  includes: [
    "Unlimited QuickBooks entities",
    "Consolidation with intercompany eliminations",
    "Chart of accounts mapping",
    "Flux analysis",
    "Variance analysis",
    "Budget vs actuals",
    "Forecasting",
    "Scenarios",
    "Automatic refresh every hour",
    "Expert help automating your templates",
    "Premium support",
  ],
};

export const FAQS = [
  { q: "Which QuickBooks versions does FinBoard work with?", a: "FinBoard connects to QuickBooks Online." },
  { q: "How many entities can I connect?", a: `As many as you need. Plans are priced per entity, starting at ${PRICE_PER_ENTITY} per entity per month.` },
  { q: "How are intercompany transactions handled?", a: "Intercompany transactions and balances are eliminated in the consolidated statements, while each entity’s own numbers stay visible side by side." },
  { q: "Can I compare budgets to actuals across entities?", a: "Yes. FinBoard pulls each entity’s QuickBooks budget next to its actuals, rolls them up to the group and shows dollar and percent variances on every line." },
  { q: "What is % of income benchmarking?", a: "Every line is shown as a percentage of that entity’s total income, so entities of different sizes can be compared fairly. A location spending 31% of income on payroll stands out next to one spending 26%." },
  { q: "How often does the data refresh?", a: "Your reports refresh automatically every hour, and you can pull the latest QuickBooks data whenever you need it." },
  { q: "Do we have to change how we use QuickBooks?", a: "No. FinBoard connects to the QuickBooks companies you already have, so your books stay where they are." },
  { q: "Is my financial data secure?", a: "Your data is secured on US servers with enterprise-grade encryption, and FinBoard is a member of the Intuit Developer Program." },
  { q: "Can someone help us set it up?", a: "Yes. Our experts can help automate your financial templates and dashboards with your QuickBooks data, and premium support is there if you get stuck." },
];
