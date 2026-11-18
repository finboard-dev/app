/**
 * Copy and sample data for the /products/consolidation page
 * (QuickBooks multi-entity consolidation in Google Sheets).
 */

import { SHEETS_ADDON_URL, TRIAL_DAYS } from "@/data/trial";

export { SHEETS_ADDON_URL, TRIAL_DAYS };
export const PRICE_PER_ENTITY = "$20";

export const HERO = {
  headlineLead: "QuickBooks consolidation in",
  headlineItalic: "Google Sheets.",
  lede:
    "Connect your QuickBooks Online entities. Consolidate P&L and balance sheet. Eliminate intercompany transactions.",
  bullets: [
    "Intercompany eliminations",
    "Chart of accounts mapping",
    "Budgets vs actuals",
    "Performance benchmarks",
  ],
  trust: ["US servers", "Enterprise encryption", "Intuit Developer Program"],
};

export const FEATURES = [
  { title: "Consolidated financial reporting", body: "Group P&L and balance sheet, with every entity side by side." },
  { title: "Intercompany eliminations", body: "Intercompany revenue, fees and balances net out automatically." },
  { title: "Intercompany journal entries", body: "Check both sides of every intercompany entry before you close." },
  { title: "Chart of accounts mapping", body: "Map each entity’s accounts once, and every report lines up." },
];

export const MODELING_ITEMS = [
  { title: "Budgets vs actuals, rolled up", body: "Each entity’s budget next to actuals, rolled up to the group." },
  { title: "Variance analysis", body: "Dollar and percent variances on every line." },
  { title: "Entity benchmarking", body: "Compare margins, costs and growth side by side." },
  { title: "% of income benchmarking", body: "Every line as a share of income, so any size compares fairly." },
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
    note: "Unfavorable variances are highlighted.",
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
    note: "Denver’s COGS and payroll run about 3 points above the group.",
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
    body: "Add FinBoard from the Google Workspace Marketplace.",
    image: { src: "/products/consolidation/sheets-addon.webp", width: 1600, height: 878, alt: "The FinBoard add-on open in the Google Sheets sidebar, next to a monthly profit and loss report" },
  },
  {
    title: "Connect QuickBooks",
    body: "Pick your companies and the reports you need.",
    image: { src: "/products/consolidation/create-report.webp", width: 1600, height: 872, alt: "FinBoard’s Create Report dialog in Google Sheets, with a QuickBooks company selected and the profit and loss options showing" },
  },
  {
    title: "Consolidate",
    body: "One statement, intercompany eliminated, refreshed hourly.",
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
    eyebrow: "Dashboards",
    title: "Live dashboards for the whole group",
    body: "Every entity’s QuickBooks numbers roll into one executive view, so owners see cash and performance without waiting for month-end.",
    points: ["Cash & bank and operating cash flow", "Cash balance trend and cash flow bridge", "AI commentary on any chart, on demand"],
    image: { src: "/products/consolidation/group-dashboard.webp", width: 1600, height: 782, alt: "FinBoard’s executive group dashboard showing cash and bank, operating cash flow, a cash balance trend and a cash flow bridge" },
  },
  {
    eyebrow: "Mapping",
    title: "Chart of accounts mapping",
    body: "Give every entity one reporting structure, without changing anything in QuickBooks. Map once, and every consolidated report lines up.",
    points: ["Drag and drop accounts into income, COGS and expenses", "New QuickBooks accounts flagged for review", "One mapping powers every entity and group report"],
    image: { src: "/products/consolidation/workspace-mapping.webp", width: 1600, height: 1019, alt: "FinBoard’s web workspace regrouping QuickBooks accounts into income, cost of goods sold and expense sections" },
  },
];

export const AUDIENCES = [
  { title: "Accounting firms and bookkeepers", body: "Consolidate client groups without rebuilding workbooks." },
  { title: "Fractional CFOs", body: "Live consolidated numbers for every multi-entity client." },
  { title: "Finance and FP&A teams", body: "Your own models and formulas, fed by live QuickBooks data." },
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
