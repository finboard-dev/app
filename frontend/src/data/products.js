import {
  Landmark, BarChart3, LineChart, Receipt, CircleDollarSign,
  Layers, ShieldCheck, Zap, Users, Database, FileText, GitMerge,
  Target, Gauge, RefreshCw, Wallet, ClipboardCheck, TrendingUp,
} from "lucide-react";

/**
 * Product catalog. Each entry drives a /products/:slug page and the
 * "Products" navigation menu. `order` sets nav + cross-link ordering.
 */
export const PRODUCTS = [
  {
    slug: "month-end-close",
    order: 0,
    nav: "Month-end close",
    icon: ClipboardCheck,
    accent: "#0A0A0A",
    eyebrow: "Close & controllership",
    kicker: "Close the group in days, not weeks.",
    headlineLead: "Month-end",
    headlineItalic: "close",
    headlineTail: "on autopilot.",
    subhead:
      "GL accounting, reconciliations, prepaid, accruals, fixed assets and board packs, one governed workspace that runs the entire close from cutoff to consolidation.",
    capabilities: [
      { icon: FileText,       label: "GL accounting & JE queue" },
      { icon: RefreshCw,      label: "Bank & subledger recs" },
      { icon: Layers,         label: "Group consolidation" },
      { icon: ClipboardCheck, label: "Board reporting packs" },
    ],
    features: [
      { icon: FileText,       title: "GL & journal entries", body: "AI drafts recurring journals, accruals, prepaid amortization, revenue cutoff, with a full posting trail and reviewer sign-off." },
      { icon: RefreshCw,      title: "Reconciliations", body: "Bank, credit-card and subledger reconciliations run continuously. Only true unmatched items surface for investigation." },
      { icon: ShieldCheck,    title: "Prepaid, accruals & FA", body: "Amortization schedules, accrual recognition, auto-reversal and a live fixed-asset register with depreciation, all reconciled to GL." },
      { icon: ClipboardCheck, title: "Board reporting packs", body: "Executive summary, consolidated P&L, BS, CF and KPI scorecard, auto-generated with AI-drafted narrative, every number traceable." },
    ],
    steps: [
      { title: "Cutoff & post", body: "AI drafts month-end JEs, accruals, prepaid, revenue cutoff, and books them after reviewer sign-off." },
      { title: "Reconcile & consolidate", body: "Bank, subledger and inter-company recs run continuously; group consolidation applies FX and eliminations." },
      { title: "Publish the pack", body: "Board-ready packs generate automatically with narrative, every figure drills back to source." },
    ],
    metrics: [
      { value: "3 days", label: "typical close" },
      { value: "100%", label: "reconciled" },
      { value: "Auto", label: "board pack" },
    ],
  },
  {
    slug: "consolidation",
    order: 1,
    nav: "Consolidation",
    icon: Landmark,
    accent: "#2563EB",
    eyebrow: "Group close",
    kicker: "Many entities, one truth.",
    headlineLead: "Multi-entity",
    headlineItalic: "consolidation",
    headlineTail: "on autopilot.",
    subhead:
      "Ingest every subsidiary ledger, auto-match inter-company transactions, post eliminations and translate currencies, so your group close goes from weeks to days.",
    capabilities: [
      { icon: GitMerge,    label: "Inter-company auto-matching" },
      { icon: ShieldCheck, label: "Eliminations & adjustments" },
      { icon: CircleDollarSign, label: "FX translation & CTA" },
      { icon: Layers,      label: "50+ entity roll-ups" },
    ],
    features: [
      { icon: GitMerge,    title: "Auto-reconcile inter-co", body: "AI matches inter-company pairs across ledgers and flags only the true deltas for review, no more tie-out spreadsheets." },
      { icon: ShieldCheck, title: "Rules-based eliminations", body: "Codify elimination and minority-interest rules once; they run automatically every period with a full audit trail." },
      { icon: CircleDollarSign, title: "Multi-currency", body: "Translate each entity at the right rate, book CTA automatically, and keep a currency-by-currency lineage." },
      { icon: Layers,      title: "Any group structure", body: "Model tiers, JVs, holdcos and partial ownership, roll up 50+ entities into a single consolidated view." },
    ],
    steps: [
      { title: "Connect ledgers", body: "Link every subsidiary's QuickBooks, NetSuite or ERP. Balances sync continuously." },
      { title: "Match & eliminate", body: "AI reconciles inter-co, applies eliminations and FX, and surfaces exceptions." },
      { title: "Publish the group", body: "One governed consolidated set, drill from group down to any entity's source entry." },
    ],
    metrics: [
      { value: "50+", label: "entities consolidated" },
      { value: "10 days", label: "typical close" },
      { value: "100%", label: "lineage tracked" },
    ],
  },
  {
    slug: "analytics",
    order: 2,
    nav: "Analytics",
    icon: BarChart3,
    accent: "#0A0A0A",
    eyebrow: "Reporting & dashboards",
    kicker: "Answers, not exports.",
    headlineLead: "Board-ready",
    headlineItalic: "analytics",
    headlineTail: "across the group.",
    subhead:
      "Live dashboards, KPI scorecards and board packs built on one governed semantic layer, every number traceable back to the source entry.",
    capabilities: [
      { icon: BarChart3, label: "Live board dashboards" },
      { icon: Gauge,     label: "KPI & manager scorecards" },
      { icon: FileText,  label: "Automated board packs" },
      { icon: Database,  label: "Governed semantic layer" },
    ],
    features: [
      { icon: BarChart3, title: "Dashboards that update", body: "Revenue, margin and cash by entity, refreshed in real time, no more month-old PDF decks." },
      { icon: Gauge,     title: "Scorecards", body: "People, manager and business scorecards that roll the whole group into a single comparable view." },
      { icon: FileText,  title: "One-click board pack", body: "Generate a consistent, branded board pack every period, narrative and charts, ready to send." },
      { icon: Database,  title: "Trust every number", body: "Built on a governed semantic layer, so every metric drills back to the transaction it came from." },
    ],
    steps: [
      { title: "Unify the data", body: "ERP, CRM and HRMS flow into one semantic layer with consistent definitions." },
      { title: "Build the view", body: "Compose dashboards and scorecards from shared, governed metrics." },
      { title: "Share with confidence", body: "Publish board packs and live links, every figure is traceable." },
    ],
    metrics: [
      { value: "100+", label: "data connections" },
      { value: "Real-time", label: "refresh" },
      { value: "1", label: "source of truth" },
    ],
  },
  {
    slug: "fpa",
    order: 3,
    nav: "FP&A",
    icon: LineChart,
    accent: "#059669",
    eyebrow: "Planning & forecasting",
    kicker: "Plan the whole group.",
    headlineLead: "Planning &",
    headlineItalic: "forecasting",
    headlineTail: "that ties to actuals.",
    subhead:
      "Driver-based budgets, rolling forecasts and scenario models that sit on the same governed data as your actuals, so plan-versus-actual is always live.",
    capabilities: [
      { icon: Target,    label: "Driver-based budgets" },
      { icon: RefreshCw, label: "Rolling forecasts" },
      { icon: Layers,    label: "Scenario & what-if" },
      { icon: TrendingUp,label: "Live plan vs actual" },
    ],
    features: [
      { icon: Target,    title: "Driver-based models", body: "Build budgets on the drivers that move your business, headcount, volume, price, not static line items." },
      { icon: RefreshCw, title: "Rolling forecasts", body: "Re-forecast continuously as actuals land; the model updates itself and flags variance." },
      { icon: Layers,    title: "Scenarios in seconds", body: "Model best / base / worst case side by side and see the impact on cash and margin instantly." },
      { icon: TrendingUp,title: "Plan vs actual, live", body: "Because plans sit on the same data as actuals, variance is always current and always traceable." },
    ],
    steps: [
      { title: "Set the drivers", body: "Define the operational drivers behind revenue, cost and headcount." },
      { title: "Build & branch", body: "Create budgets and forecast scenarios that inherit from your actuals." },
      { title: "Track variance", body: "Watch plan vs actual update in real time and re-forecast in a click." },
    ],
    metrics: [
      { value: "Rolling", label: "13-week + annual" },
      { value: "Live", label: "plan vs actual" },
      { value: "∞", label: "scenarios" },
    ],
  },
  {
    slug: "p2p",
    order: 4,
    nav: "Procure-to-Pay",
    icon: Receipt,
    accent: "#D97706",
    eyebrow: "Accounts payable",
    kicker: "Quote to payment, handled.",
    headlineLead: "Procure-to-pay",
    headlineItalic: "without",
    headlineTail: "the busywork.",
    subhead:
      "An AI agent that reads vendor quotes and invoices, runs 3-way match, routes approvals by policy and stages payments, with full vendor context at every step.",
    capabilities: [
      { icon: FileText,     label: "Invoice & quote capture" },
      { icon: ShieldCheck,  label: "3-way match" },
      { icon: ClipboardCheck,label: "Policy-based approvals" },
      { icon: Wallet,       label: "Payment runs" },
    ],
    features: [
      { icon: FileText,     title: "Reads every document", body: "Quotes and invoices from inbox or ERP are parsed automatically, vendor, amount, terms, GL coding." },
      { icon: ShieldCheck,  title: "3-way match", body: "PO, receipt and invoice are matched automatically; only genuine exceptions reach a human." },
      { icon: ClipboardCheck,title: "Approvals by policy", body: "Route by amount and entity, e.g. over $10k to the CFO, with a complete approval trail." },
      { icon: Wallet,       title: "Pay with context", body: "Every payment shows open balance, open POs and YTD spend, fully traceable to source docs." },
    ],
    steps: [
      { title: "Capture", body: "AI ingests quotes and invoices from email and your ERP." },
      { title: "Match & approve", body: "3-way match runs, then approvals route automatically by policy." },
      { title: "Pay & trace", body: "Stage the payment run, every entry linked back to its documents." },
    ],
    metrics: [
      { value: "3-way", label: "auto-match" },
      { value: "42", label: "invoices in flight" },
      { value: "6", label: "linked docs per pay" },
    ],
  },
  {
    slug: "o2c",
    order: 5,
    nav: "Order-to-Cash",
    icon: CircleDollarSign,
    accent: "#2563EB",
    eyebrow: "Accounts receivable",
    kicker: "Order to cash in bank.",
    headlineLead: "Order-to-cash",
    headlineItalic: "that",
    headlineTail: "collects itself.",
    subhead:
      "From quote to collected cash: credit checks, invoicing, dunning and DSO tracking, an AI agent that moves receivables while keeping every customer's full context in view.",
    capabilities: [
      { icon: FileText,        label: "Quote → order capture" },
      { icon: ShieldCheck,     label: "Automated credit checks" },
      { icon: Receipt,         label: "Invoicing & dunning" },
      { icon: Gauge,           label: "DSO tracking" },
    ],
    features: [
      { icon: FileText,   title: "Quote to order", body: "Pull quotes from CPQ or inbox and turn approved ones into orders without rekeying." },
      { icon: ShieldCheck,title: "Credit in the loop", body: "AI credit checks and policy approvals run before invoicing, over $25k routes to the CFO." },
      { icon: Receipt,    title: "Invoice & chase", body: "Send invoices, then run tone-matched dunning automatically until cash lands." },
      { icon: Gauge,      title: "DSO under control", body: "Track DSO and open A/R per customer, with every invoice traceable to its order." },
    ],
    steps: [
      { title: "Ingest the order", body: "Quotes from Salesforce CPQ or email become orders automatically." },
      { title: "Check & invoice", body: "Credit check, approval, then invoice, all on policy." },
      { title: "Collect", body: "Automated dunning and DSO tracking bring the cash home." },
    ],
    metrics: [
      { value: "27", label: "orders in flight" },
      { value: "41 days", label: "DSO tracked" },
      { value: "Auto", label: "dunning" },
    ],
  },
];

export const PRODUCTS_BY_SLUG = PRODUCTS.reduce((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});

export const PRODUCT_NAV = [...PRODUCTS].sort((a, b) => a.order - b.order);
