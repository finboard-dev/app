// Landing-page FAQ content. Kept in a plain data module (not a "use client"
// component) so both the FAQ component and the server-rendered FAQPage schema
// can import it.
export const FAQ_ITEMS = [
  {
    q: "How is FinBoard different from a generic BI or FP&A tool?",
    a: "Off-the-shelf tools force your business into their schema. FinBoard is a product plus a forward-deployed engineering team: we build custom pipelines around your entities, chart of accounts and systems, then the platform runs them in real time.",
  },
  {
    q: "How many entities can FinBoard consolidate?",
    a: "From 2 to 200+. The platform is built for groups, inter-company eliminations, currency, dimensions and roll-ups scale together.",
  },
  {
    q: "How much faster does the month-end close get?",
    a: "Most groups close in about 5 days. AI drafts the recurring journals, accruals, prepaid amortization and revenue cutoff, reconciliations run continuously through the month, and consolidation applies FX and eliminations automatically. Your team reviews and signs off instead of rebuilding schedules.",
  },
  {
    q: "Does FinBoard handle bank and subledger reconciliations?",
    a: "Yes. Bank, credit-card and subledger reconciliations run continuously rather than in a month-end crunch. Matched items clear themselves and only true exceptions surface for investigation, each with a full trail back to the source transaction.",
  },
  {
    q: "Can FinBoard generate board and investor reports?",
    a: "Yes. Board packs, consolidated P&L, balance sheet, cash flow and KPI scorecards generate automatically every period, with AI-drafted variance commentary. Every figure drills back to the underlying entry.",
  },
  {
    q: "Does FinBoard work with Google Sheets?",
    a: "Deeply. Reporting templates roll forward month to month with updated data, no broken formulas and no formatting mess. You can layer your own formulas and logic on top, reuse the same template across companies, and refresh live from QuickBooks with one click.",
  },
  {
    q: "Can I regroup my chart of accounts without changing my ledger?",
    a: "Yes. You can regroup and rename accounts for reporting inside FinBoard without touching QuickBooks or your ERP. Statutory books stay untouched while management reporting reads the way you actually run the business.",
  },
  {
    q: "Which systems does FinBoard connect to?",
    a: "QuickBooks Online, NetSuite, Xero, Sage Intacct, and any HRIS/CRM/ticketing tool via our data connectors. Custom sources are supported on Growth and Enterprise plans.",
  },
  {
    q: "Does FinBoard cover accounts payable and receivable?",
    a: "Yes. The procure-to-pay and order-to-cash agents capture invoices and orders, run 3-way match and credit checks, route approvals by policy, and track payments, collections and DSO with full vendor and customer context.",
  },
  {
    q: "Is the AI reliable for close?",
    a: "Every AI action, classification, elimination, adjustment, is fully explained and reviewable, with a complete audit trail. FinBoard never posts silently.",
  },
  {
    q: "Who is FinBoard for?",
    a: "CFOs, group controllers, FP&A leads and founders of multi-entity businesses, anywhere spreadsheets and stitched-together tools have become the bottleneck.",
  },
  {
    q: "How does implementation work?",
    a: "A forward-deployed engineer and finance architect embed with your team. Typical onboarding is 2-4 weeks: discovery, custom pipeline build, historical validation, then go-live. We stay embedded to iterate models and dashboards every quarter.",
  },
  {
    q: "How is my data handled?",
    a: "Your data stays yours. We host and process it only to provide the service, encrypted in transit and at rest, and we never use it for AI model training unless you explicitly opt in. Full details are in our Terms.",
  },
];
