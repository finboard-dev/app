/**
 * Copy for the /compare/[slug] pages (Google Ads landing pages).
 *
 * Rules:
 * - FinBoard claims come only from finboard.ai and its Marketplace listing
 *   (see ./finboard.js). FinBoard is QuickBooks Online + Google Sheets.
 * - Every competitor fact was checked on the vendor's own site on CHECKED_ON
 *   and is linked in that page's `sources`. Unverifiable facts are left out.
 * - Checklist pages name the other tools in the intro only.
 *
 * Plain ES module with relative imports, so node tests can import it.
 */
import { PRICE_PER_ENTITY, TRIAL_DAYS } from "./finboard.js";

export const CHECKED_ON = "November 2026";

// FinBoard answers, reused across the checklist pages.
const ANSWERS = {
  systems: {
    question: "Which accounting system and spreadsheet does it work with?",
    answer: "QuickBooks Online and Google Sheets.",
  },
  consolidate: {
    question: "Does it consolidate entities into one P&L and balance sheet?",
    answer: "Yes. FinBoard consolidates the P&L and balance sheet across your QuickBooks Online entities, with each entity side by side.",
  },
  intercompany: {
    question: "Does it eliminate intercompany automatically?",
    answer: "Yes. Intercompany revenue, fees and balances net out automatically, and FinBoard checks your intercompany journal entries.",
  },
  mapping: {
    question: "Can entities with different charts of accounts roll up the same way?",
    answer: "Yes. Chart of accounts mapping lines up every entity's accounts before they consolidate.",
  },
  analysis: {
    question: "Can I compare budgets with actuals and explain the variances?",
    answer: "Yes. Budgets vs actuals, flux and variance analysis, and entity and % of income benchmarking.",
  },
  planning: {
    question: "Can I forecast and run scenarios?",
    answer: "Yes. Forecasting and scenarios run on the same consolidated QuickBooks Online data.",
  },
  freshness: {
    question: "How current is the data?",
    answer: "It refreshes every hour. By our own measure, FinBoard pulls monthly financials in under 10 seconds.",
  },
  reports: {
    question: "Where do the reports live?",
    answer: "In your Google Sheets, with live dashboards and AI commentary in the FinBoard web app.",
  },
  pricing: {
    question: "What does it cost as you add entities?",
    answer: `From ${PRICE_PER_ENTITY} per entity per month, with unlimited QuickBooks Online entities and a ${TRIAL_DAYS}-day free trial.`,
  },
  help: {
    question: "Who helps you set it up?",
    answer: "FinBoard's experts help you automate your templates, and premium support is included.",
  },
};

const FAQ_PRICE = {
  q: "How much does FinBoard cost?",
  a: `From ${PRICE_PER_ENTITY} per entity per month, with unlimited QuickBooks Online entities. Every plan starts with a ${TRIAL_DAYS}-day free trial.`,
};
const FAQ_SYSTEMS = {
  q: "Does FinBoard work with Xero, Excel or other accounting systems?",
  a: "No. FinBoard works with QuickBooks Online and Google Sheets. If you need Xero, Excel or another ledger, a tool that supports it is the better choice.",
};
const FAQ_INTERCOMPANY = {
  q: "How does FinBoard handle intercompany?",
  a: "Intercompany revenue, fees and balances net out automatically in the consolidated statements, and FinBoard checks your intercompany journal entries. Each entity's own numbers stay visible side by side.",
};
const FAQ_REFRESH = {
  q: "How often does the data refresh?",
  a: "Every hour. Your QuickBooks Online data flows into Google Sheets and the FinBoard web app without manual exports.",
};

const LIVEFLOW = {
  slug: "liveflow",
  breadcrumb: "FinBoard vs LiveFlow",
  metaTitle: "FinBoard vs LiveFlow: QuickBooks Consolidation in Sheets",
  metaDescription: `Compare FinBoard and LiveFlow for QuickBooks Online consolidation in Google Sheets: features, intercompany, published pricing from ${PRICE_PER_ENTITY} per entity, and fit.`,
  h1: "Looking for a LiveFlow alternative?",
  lede: `FinBoard is a Google Sheets add-on for QuickBooks Online that consolidates your entities, eliminates intercompany and refreshes every hour, from ${PRICE_PER_ENTITY} per entity per month with a ${TRIAL_DAYS}-day free trial.`,
  competitors: ["LiveFlow"],
  table: {
    kind: "sideBySide",
    competitor: "LiveFlow",
    title: "FinBoard vs LiveFlow, side by side.",
    lead: "Both consolidate QuickBooks entities in a spreadsheet. The differences are in ledgers, spreadsheets, pricing and how you get started.",
    rows: [
      { label: "Accounting systems", finboard: "QuickBooks Online", competitor: "QuickBooks Online and Xero" },
      { label: "Spreadsheets", finboard: "Google Sheets", competitor: "Google Sheets and Excel" },
      {
        label: "Consolidation",
        finboard: "Consolidated P&L and balance sheet, with entities side by side",
        competitor: "Consolidates QuickBooks and Xero entities in one place",
      },
      {
        label: "Intercompany",
        finboard: "Revenue, fees and balances net out automatically, with intercompany journal entry checks",
        competitor: "Intercompany lines eliminated automatically",
      },
      {
        label: "Chart of accounts",
        finboard: "Map each entity's accounts to one group chart of accounts",
        competitor: "AI standardizes every entity's chart of accounts",
      },
      {
        label: "Planning",
        finboard: "Budgets vs actuals, flux and variance analysis, forecasting and scenarios",
        competitor: "Budgeting and forecasting, cash flow forecasting, budget vs actuals",
      },
      { label: "Data refresh", finboard: "Every hour", competitor: "Live reports that refresh from QuickBooks" },
      {
        label: "Pricing",
        finboard: `Published: from ${PRICE_PER_ENTITY} per entity per month`,
        competitor: "Not published. Its pricing page says pricing is tailored to what you need",
      },
      {
        label: "Getting started",
        finboard: `Install from the Google Workspace Marketplace and start a ${TRIAL_DAYS}-day free trial`,
        competitor: "Book a demo from its pricing page",
      },
      {
        label: "Marketplace listing",
        finboard: "2K+ installs, rated 5 out of 5 (9 ratings)",
        competitor: "20K+ installs, rated 5 out of 5 (76 ratings)",
      },
    ],
  },
  sources: [
    { label: "LiveFlow integrations", url: "https://help.liveflow.com/articles/7096622243-which-accounting-platforms-does-liveflow-integrate-with" },
    { label: "LiveFlow for Excel", url: "https://help.liveflow.com/articles/7238670199-does-liveflow-connect-with-microsoft-excel" },
    { label: "LiveFlow consolidation", url: "https://liveflow.com/products/consolidation" },
    { label: "LiveFlow pricing", url: "https://www.liveflow.com/pricing" },
    { label: "LiveFlow Marketplace listing", url: "https://workspace.google.com/marketplace/app/liveflow_for_quickbooks/329923094148" },
    { label: "FinBoard Marketplace listing", url: "https://workspace.google.com/marketplace/app/finboard_quickbooks_to_google_sheets_con/239112301433" },
  ],
  fit: {
    title: "Who each is a better fit for.",
    lead: "Both are solid choices. Pick the one that matches your ledgers, your spreadsheet and how you like to buy.",
    finboard: [
      "Every entity is on QuickBooks Online and your team works in Google Sheets",
      `You want a published price, from ${PRICE_PER_ENTITY} per entity per month, and a self-serve ${TRIAL_DAYS}-day trial`,
      "You want intercompany journal entry checks alongside automatic eliminations",
      "You want entity and % of income benchmarking and data that refreshes every hour",
    ],
    otherName: "LiveFlow",
    other: [
      "Some of your entities are on Xero: LiveFlow integrates with QuickBooks Online and Xero",
      "Your team works in Excel as well as Google Sheets",
      "You consolidate entities in different currencies: LiveFlow lists consolidation in 160+ currencies",
      "You're an accounting firm: LiveFlow builds its templates, consolidation and dashboards for firms",
    ],
  },
  switchTitle: "Moving from LiveFlow to FinBoard.",
  pricing: {
    title: "Pricing you can see before you talk to anyone.",
    otherLabel: "LiveFlow",
    other: "LiveFlow doesn't publish prices. Its pricing page says pricing is tailored to what you need and asks you to book a demo.",
  },
  faqs: [
    {
      q: "Is FinBoard a good LiveFlow alternative?",
      a: "Yes, if your entities are on QuickBooks Online and your team works in Google Sheets. FinBoard consolidates the P&L and balance sheet, eliminates intercompany and refreshes every hour.",
    },
    {
      q: "Does FinBoard support Xero or Excel like LiveFlow?",
      a: "No. FinBoard works with QuickBooks Online and Google Sheets. LiveFlow supports QuickBooks Online and Xero in both Google Sheets and Excel, so it's the better choice if you need those.",
    },
    {
      q: "How do I move from LiveFlow to FinBoard?",
      a: "Install the add-on from the Google Workspace Marketplace, connect your QuickBooks Online entities and map your chart of accounts. FinBoard's experts can help you automate your templates.",
    },
    FAQ_PRICE,
    FAQ_INTERCOMPANY,
    FAQ_REFRESH,
  ],
  finalCta: "Consolidate your QuickBooks Online entities in Google Sheets.",
};

const INTUIT_ENTERPRISE_SUITE = {
  slug: "intuit-enterprise-suite",
  breadcrumb: "FinBoard vs Intuit Enterprise Suite",
  metaTitle: "Stay on QuickBooks Online: FinBoard vs Intuit Enterprise Suite",
  metaDescription: "Considering Intuit Enterprise Suite for multiple entities? Compare it with staying on QuickBooks Online and consolidating in Google Sheets with FinBoard.",
  h1: "Considering Intuit Enterprise Suite?",
  lede: `If consolidation is the reason, you may not need to move. FinBoard consolidates the QuickBooks Online companies you already have, in Google Sheets, from ${PRICE_PER_ENTITY} per entity per month.`,
  competitors: ["Intuit Enterprise Suite"],
  table: {
    kind: "sideBySide",
    competitor: "Intuit Enterprise Suite",
    title: "FinBoard vs Intuit Enterprise Suite, side by side.",
    lead: "One adds consolidation to your current QuickBooks Online companies. The other upgrades you to Intuit's ERP.",
    rows: [
      {
        label: "What it is",
        finboard: "A Google Sheets add-on for QuickBooks Online",
        competitor: "Intuit's AI-native ERP for businesses growing in complexity",
      },
      {
        label: "Your books",
        finboard: "Stay on your current QuickBooks Online companies",
        competitor: "Your QuickBooks Online data is upgraded into Intuit Enterprise Suite, including chart of accounts, vendors, classes and transaction history",
      },
      {
        label: "Consolidated reports",
        finboard: "Consolidated P&L and balance sheet, with entities side by side",
        competitor: "Consolidated P&L, balance sheet, cash flow and trial balance",
      },
      {
        label: "Intercompany",
        finboard: "Revenue, fees and balances net out automatically, with intercompany journal entry checks",
        competitor: "Intercompany journal entries and elimination accounts managed from the parent company",
      },
      {
        label: "Chart of accounts",
        finboard: "Map each entity's accounts to one group chart of accounts",
        competitor: "Sync a primary company's chart of accounts to your other companies",
      },
      {
        label: "Spreadsheets",
        finboard: "Runs inside Google Sheets, with live dashboards in the FinBoard web app",
        competitor: "Spreadsheet Sync works with Excel and Google Sheets",
      },
      {
        label: "Pricing",
        finboard: `Published: from ${PRICE_PER_ENTITY} per entity per month`,
        competitor: "Not published. Intuit builds a product bundle and agreement for your business",
      },
      {
        label: "Getting started",
        finboard: `Install from the Google Workspace Marketplace and start a ${TRIAL_DAYS}-day free trial`,
        competitor: "Work with an Intuit account manager to add and link your companies",
      },
    ],
  },
  sources: [
    { label: "What is Intuit Enterprise Suite", url: "https://erp.intuit.com/blog/product-update/what-is-intuit-enterprise-suite/" },
    { label: "Consolidated statements", url: "https://quickbooks.intuit.com/learn-support/en-us/help-article/multi-entity/view-consolidated-financial-statements-intuit/L6Xbfa6xi_US_en_US" },
    { label: "Intercompany accounting", url: "https://quickbooks.intuit.com/learn-support/en-us/help-article/expense-accounting/streamline-intercompany-accounting/L88O7nxD0_US_en_US" },
    { label: "Shared chart of accounts", url: "https://quickbooks.intuit.com/learn-support/en-us/help-article/multi-entity/consolidate-manage-multi-entity-shared-chart-suite/L7DRNHUSk_US_en_US" },
    { label: "Spreadsheet Sync", url: "https://quickbooks.intuit.com/learn-support/en-us/help-article/accounting-bookkeeping/spreadsheet-sync/L3jiBUftI_US_en_US" },
    { label: "Upgrading from QuickBooks Online", url: "https://erp.intuit.com/upgrade-quickbooks-online/" },
    { label: "Migration", url: "https://erp.intuit.com/migration/" },
    { label: "Pricing", url: "https://erp.intuit.com/pricing/" },
    { label: "Who it's for", url: "https://erp.intuit.com/accountant/" },
    { label: "Linking companies", url: "https://quickbooks.intuit.com/learn-support/en-us/help-article/account-management/create-add-another-company-file-quickbooks-online/L1WEnRQs1_US_en_US" },
  ],
  fit: {
    title: "Who each is a better fit for.",
    lead: "Intuit Enterprise Suite is a bigger platform decision. FinBoard is an add-on to what you have.",
    finboard: [
      "You want to keep your current QuickBooks Online companies and add consolidation on top",
      "Your team works in Google Sheets and wants consolidated statements there, refreshed every hour",
      `You want a published price, from ${PRICE_PER_ENTITY} per entity per month, and a ${TRIAL_DAYS}-day free trial`,
      "You want budgets vs actuals, variance analysis and forecasting on the consolidated numbers",
    ],
    otherName: "Intuit Enterprise Suite",
    other: [
      "You want multi-entity accounting inside one Intuit system, with intercompany managed from a parent company",
      "You need consolidated cash flow and trial balance reports in the ledger itself",
      "You fit Intuit's profile: multiple US-based entities and over $5 million in annual revenue",
      "You're moving off QuickBooks Desktop: Intuit includes migration for Desktop customers",
    ],
  },
  switchTitle: "Adding FinBoard to QuickBooks Online.",
  pricing: {
    title: "A published price, per entity.",
    otherLabel: "Intuit Enterprise Suite",
    other: "Intuit doesn't publish Intuit Enterprise Suite pricing. Its pricing page says it works with you on a product bundle and agreement that reflects your business.",
  },
  faqs: [
    {
      q: "Do I have to leave QuickBooks Online to use FinBoard?",
      a: "No. FinBoard is a Google Sheets add-on that connects to your QuickBooks Online companies. Your books stay where they are.",
    },
    {
      q: "Is moving to Intuit Enterprise Suite a migration?",
      a: "Intuit describes it as an upgrade: its site says your QuickBooks Online data, including your chart of accounts, vendors, classes and transaction history, carries over into Intuit Enterprise Suite.",
    },
    {
      q: "When is Intuit Enterprise Suite the better choice?",
      a: "When you want multi-entity accounting inside one Intuit system, with consolidated reports, intercompany managed from a parent company and a shared chart of accounts. Intuit positions it for businesses with multiple US-based entities and over $5 million in annual revenue.",
    },
    FAQ_PRICE,
    FAQ_INTERCOMPANY,
  ],
  finalCta: "Keep QuickBooks Online. Add consolidation in Google Sheets.",
};

const CONNECTORS = {
  slug: "quickbooks-sheets-connectors",
  breadcrumb: "FinBoard vs QuickBooks-to-Sheets connectors",
  metaTitle: "FinBoard vs G-Accon, Coefficient and Retriever",
  metaDescription: "Comparing G-Accon, Coefficient or Retriever for QuickBooks in Google Sheets? The questions worth asking before you consolidate, with FinBoard's answers.",
  h1: "Looking for a G-Accon, Coefficient or Retriever alternative?",
  lede: `G-Accon, Coefficient and Retriever all bring QuickBooks data into Google Sheets. If you consolidate QuickBooks Online entities, here is how FinBoard answers the questions that matter, from ${PRICE_PER_ENTITY} per entity per month.`,
  competitors: ["G-Accon", "Coefficient", "Retriever"],
  table: {
    kind: "checklist",
    title: "Questions worth asking any QuickBooks-to-Sheets tool.",
    lead: "Ask every vendor the same questions. These are FinBoard's answers.",
    rows: [
      ANSWERS.systems,
      ANSWERS.consolidate,
      ANSWERS.intercompany,
      ANSWERS.mapping,
      ANSWERS.analysis,
      ANSWERS.freshness,
      ANSWERS.reports,
      ANSWERS.pricing,
      ANSWERS.help,
    ],
  },
  sources: [
    { label: "G-Accon", url: "https://www.g-accon.com/" },
    { label: "G-Accon consolidation", url: "https://www.g-accon.com/quickbooks-integration/" },
    { label: "Coefficient for QuickBooks", url: "https://coefficient.io/integrations-google-sheets/quickbooks" },
    { label: "Coefficient integrations", url: "https://coefficient.io/integrations" },
    { label: "Coefficient for Excel", url: "https://coefficient.io/integrations-excel/quickbooks" },
    { label: "Retriever", url: "https://retrieverhq.com" },
  ],
  fit: {
    title: "Who each is a better fit for.",
    lead: "A connector can be the right tool. It depends on what else lives in your spreadsheet.",
    finboard: [
      "Every entity is on QuickBooks Online and you want consolidated statements ready in Google Sheets",
      "You want intercompany revenue, fees and balances to net out automatically, with journal entry checks",
      "You want budgets vs actuals, flux and variance analysis, benchmarking, forecasting and scenarios built in",
      "You want live dashboards with AI commentary and expert help automating your templates",
    ],
    otherName: "A connector",
    other: [
      "You also use Xero, Sage or FreshBooks: G-Accon connects Google Sheets to each of them",
      "You want QuickBooks next to CRM and database data: Coefficient lists 150+ sources, such as Salesforce and HubSpot",
      "Your team works in Excel: Coefficient works in both Google Sheets and Excel",
      "You consolidate in more than one currency: G-Accon advertises consolidated reports in multiple currencies",
    ],
  },
  switchTitle: "Moving to FinBoard from a connector.",
  pricing: {
    title: "Priced per entity, with unlimited entities.",
    otherLabel: "Connectors",
    other: "Each connector prices differently: G-Accon per accounting product, Coefficient by plan and user, and Retriever per QuickBooks company connection. Check each vendor's pricing page for current prices.",
  },
  faqs: [
    {
      q: "What does FinBoard add on top of a QuickBooks-to-Sheets connector?",
      a: "A finished consolidation: a consolidated P&L and balance sheet with entities side by side, automatic intercompany eliminations with journal entry checks, chart of accounts mapping, and budgets, variance analysis and forecasting on top.",
    },
    {
      q: "Can I keep my existing Google Sheets reports?",
      a: "Yes. FinBoard runs inside Google Sheets, and its experts can help you automate your existing templates.",
    },
    FAQ_SYSTEMS,
    FAQ_PRICE,
    FAQ_REFRESH,
  ],
  finalCta: "Go from QuickBooks data to consolidated statements in Google Sheets.",
};

const REPORTING_TOOLS = {
  slug: "quickbooks-reporting-tools",
  breadcrumb: "FinBoard vs QuickBooks reporting apps",
  metaTitle: "FinBoard vs Reach Reporting, Qvinci, Joiin, Syft and Fathom",
  metaDescription: "Comparing Reach Reporting, Qvinci, Joiin, Syft, Fathom or Spotlight? See how FinBoard consolidates QuickBooks Online inside Google Sheets instead.",
  h1: "Looking for a Reach Reporting, Qvinci or Joiin alternative?",
  lede: "Reach Reporting, Qvinci, Joiin, Syft, Fathom and Spotlight build reports in their own web apps, with exports to PDF and Excel. FinBoard consolidates your QuickBooks Online entities inside Google Sheets.",
  competitors: ["Reach Reporting", "Qvinci", "Joiin", "Syft", "Fathom", "Spotlight"],
  table: {
    kind: "checklist",
    title: "Questions worth asking any reporting and consolidation app.",
    lead: "Ask every vendor the same questions. These are FinBoard's answers.",
    rows: [
      ANSWERS.reports,
      ANSWERS.consolidate,
      ANSWERS.intercompany,
      ANSWERS.mapping,
      ANSWERS.analysis,
      ANSWERS.planning,
      ANSWERS.freshness,
      ANSWERS.systems,
      ANSWERS.pricing,
      ANSWERS.help,
    ],
  },
  sources: [
    { label: "Reach Reporting pricing", url: "https://reachreporting.com/pricing" },
    { label: "Qvinci FAQs", url: "https://www.qvinci.com/faqs" },
    { label: "Qvinci for accountants", url: "https://www.qvinci.com/accounting-solution" },
    { label: "Joiin pricing", url: "https://www.joiin.co/pricing/" },
    { label: "Syft pricing", url: "https://www.syftanalytics.com/pricing-page" },
    { label: "Fathom pricing", url: "https://www.fathomhq.com/pricing" },
    { label: "Fathom consolidation", url: "https://www.fathomhq.com/multi-currency-consolidation" },
    { label: "Spotlight consolidated reporting", url: "https://www.spotlightreporting.com/consolidated-reporting" },
    { label: "Spotlight pricing for accountants", url: "https://www.spotlightreporting.com/pricing/pricing-accountants-us" },
  ],
  fit: {
    title: "Who each is a better fit for.",
    lead: "Reporting apps are good at what they do. The question is where you want your numbers to live.",
    finboard: [
      "Your entities are on QuickBooks Online and you want consolidated statements in Google Sheets, not another app",
      "You want to build your own reports in Sheets on consolidated data that refreshes every hour",
      "You want budgets vs actuals, flux and variance analysis, forecasting and scenarios on the same data",
      `You want unlimited QuickBooks Online entities from ${PRICE_PER_ENTITY} per entity per month`,
    ],
    otherName: "A reporting app",
    other: [
      "Your entities span Xero, MYOB or Sage as well as QuickBooks: these apps connect to several ledgers",
      "You consolidate in more than one currency: Reach Reporting, Fathom and Spotlight list multi-currency consolidation",
      "You want polished report packs, client portals and PDF exports more than a working spreadsheet",
      "You report for many clients as an accounting firm: Qvinci, Joiin and Spotlight all offer plans for accountants",
    ],
  },
  switchTitle: "Moving your reporting into Google Sheets.",
  pricing: {
    title: "One price per entity, unlimited entities.",
    otherLabel: "Reporting apps",
    other: "Most of these apps publish prices that scale with the number of companies or connections, and Qvinci quotes custom pricing. Check each vendor's pricing page for current prices.",
  },
  faqs: [
    {
      q: "How is FinBoard different from a reporting app?",
      a: "These apps present your numbers in their own web apps. FinBoard puts consolidated QuickBooks Online numbers in Google Sheets, where you build your own reports, with live dashboards and AI commentary in the FinBoard web app.",
    },
    {
      q: "Can I recreate my existing report pack in FinBoard?",
      a: "FinBoard runs in Google Sheets, so your reports are spreadsheets you control. FinBoard's experts can help you automate your templates.",
    },
    FAQ_SYSTEMS,
    FAQ_PRICE,
    FAQ_INTERCOMPANY,
  ],
  finalCta: "Consolidated QuickBooks Online reporting, in the Google Sheets you already use.",
};

const FPA_TOOLS = {
  slug: "fpa-tools",
  breadcrumb: "FinBoard vs FP&A tools",
  metaTitle: "FinBoard vs Datarails and Jirav for QuickBooks Online",
  metaDescription: "Comparing Datarails or Jirav? If you run on QuickBooks Online and Google Sheets, see how FinBoard handles consolidation, budgets and forecasting.",
  h1: "Looking for a Datarails or Jirav alternative?",
  lede: `Datarails and Jirav are planning platforms with their own budgeting, forecasting and reporting. If your books are on QuickBooks Online and your team lives in Google Sheets, here is how FinBoard answers the questions that matter.`,
  competitors: ["Datarails", "Jirav"],
  table: {
    kind: "checklist",
    title: "Questions worth asking any FP&A tool.",
    lead: "Ask every vendor the same questions. These are FinBoard's answers.",
    rows: [
      ANSWERS.systems,
      ANSWERS.analysis,
      ANSWERS.planning,
      ANSWERS.consolidate,
      ANSWERS.intercompany,
      ANSWERS.mapping,
      ANSWERS.freshness,
      ANSWERS.reports,
      ANSWERS.pricing,
      ANSWERS.help,
    ],
  },
  sources: [
    { label: "Datarails", url: "https://www.datarails.com/" },
    { label: "Datarails consolidation", url: "https://www.datarails.com/solutions-consolidation/" },
    { label: "Datarails pricing", url: "https://www.datarails.com/pricing/" },
    { label: "Jirav", url: "https://www.jirav.com/" },
    { label: "Jirav integrations", url: "https://www.jirav.com/product/business-integrations" },
    { label: "Jirav business pricing", url: "https://www.jirav.com/business-pricing" },
  ],
  fit: {
    title: "Who each is a better fit for.",
    lead: "A full planning platform makes sense for some teams. Here is an honest split.",
    finboard: [
      "Your books are on QuickBooks Online and your team works in Google Sheets",
      "You want consolidation, budgets vs actuals, variance analysis, forecasting and scenarios in one add-on",
      `You want a published price from ${PRICE_PER_ENTITY} per entity per month and a ${TRIAL_DAYS}-day free trial`,
      "You want consolidated numbers that refresh every hour, with live dashboards and AI commentary",
    ],
    otherName: "An FP&A platform",
    other: [
      "You need headcount or workforce planning: Datarails and Jirav both offer it",
      "Your books are on NetSuite, Sage Intacct or Xero: both connect to those systems",
      "Your team plans in Excel: Datarails works in Excel as well as Google Sheets",
      "You consolidate in several currencies: Datarails lists multi-currency consolidation",
    ],
  },
  switchTitle: "Getting started with FinBoard.",
  pricing: {
    title: "Priced for QuickBooks Online groups.",
    otherLabel: "FP&A platforms",
    other: "Datarails gives quotes on request. Jirav publishes business plans starting at $10,000 per year. Check each vendor's pricing page for current prices.",
  },
  faqs: [
    {
      q: "Is FinBoard an FP&A tool?",
      a: "FinBoard covers the FP&A work most QuickBooks Online groups need: budgets vs actuals, flux and variance analysis, entity benchmarking, forecasting and scenarios, on consolidated numbers in Google Sheets.",
    },
    {
      q: "When is a full FP&A platform the better choice?",
      a: "When you need headcount or workforce planning, or your books are on NetSuite, Sage Intacct or Xero. Datarails and Jirav both cover those, and Datarails also works in Excel.",
    },
    FAQ_SYSTEMS,
    FAQ_PRICE,
    FAQ_INTERCOMPANY,
  ],
  finalCta: "Budgets, forecasts and consolidation for QuickBooks Online, in Google Sheets.",
};

export const COMPARISONS = [LIVEFLOW, INTUIT_ENTERPRISE_SUITE, CONNECTORS, REPORTING_TOOLS, FPA_TOOLS];

export const COMPARISONS_BY_SLUG = Object.fromEntries(COMPARISONS.map((c) => [c.slug, c]));

export { ANSWERS, FAQ_PRICE, FAQ_SYSTEMS, FAQ_INTERCOMPANY, FAQ_REFRESH };
