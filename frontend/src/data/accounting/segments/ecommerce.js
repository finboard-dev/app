import { chip } from "../../accountingSamples.js";
import { CLOSE_DAYS, CONTACT_EMAIL } from "../../accountingServices.js";
import { emailHref } from "../mergeCopy.js";

/** /accounting-services/ecommerce: online brands selling across a store, marketplaces and social. */
export const ECOMMERCE = {
  slug: "ecommerce",
  nav: "E-commerce brands",
  blurb: "Payouts, inventory and margin by product and channel.",
  breadcrumb: "E-commerce accounting",
  metaTitle: "E-commerce Accounting Services | FinBoard",
  metaDescription: `E-commerce accounting, handled. Payouts matched to orders, inventory and cost of goods on a ${CLOSE_DAYS}-day close, and margin by product and channel.`,
  copy: {
    HERO: {
      layout: "split",
      eyebrow: "Accounting for e-commerce brands",
      titleLead: "E-commerce books,",
      titleAccent: "handled.",
      lede: `Every payout matched to orders, fees and refunds. Inventory and cost of goods on a ${CLOSE_DAYS}-day close. Margin by product and channel, every month. AI agents do the work. Accountants check every entry.`,
    },
    // Split-hero card (sample data): margin by product, with the close status.
    HERO_VISUAL: {
      kind: "bars",
      accent: "#7C3AED",
      title: "Gross margin by product",
      period: "October",
      bars: [
        { label: "Linen tee", pct: 58, display: "58%" },
        { label: "Canvas tote", pct: 47, display: "47%" },
        { label: "Ceramic mug", pct: 36, display: "36%" },
        { label: "Gift set", pct: 12, display: "12%", tone: "bad" },
      ],
      insight: "The gift set barely breaks even once fees and shipping are counted.",
      status: { title: "October close", detail: `Day 4 of ${CLOSE_DAYS} · On track`, progress: 80 },
    },
    LEAD_FORM: {
      title: "Tell us about your brand",
      companyLabel: "Brand",
      qualifier: { label: "Monthly revenue", options: ["Under $50K", "$50K to $250K", "$250K to $1M", "Over $1M"] },
      messagePlaceholder: "Payout reconciliation, inventory, margin by product...",
    },
    EMAIL_CTA: { href: emailHref(CONTACT_EMAIL, "E-commerce accounting: I'd like to know more") },
    STATS: [
      { label: "Close", value: `${CLOSE_DAYS} days`, note: "Business days to close each month" },
      { label: "Margin", value: "By SKU", note: "Margin by product and channel, monthly" },
      { label: "Accuracy", value: "100%", note: "Of entries checked by an accountant" },
      { label: "Tax-ready", value: "Monthly", note: "Books your CPA can file from" },
    ],
    SPECIFICS: {
      eyebrow: "Built for e-commerce",
      title: "The hard parts of",
      accent: "e-commerce books",
      end: ", handled.",
      lead: "Sales land net of fees, refunds and reserves, across channels that each report differently. We untangle it every month.",
      items: [
        { title: "Payouts matched to orders", body: "Every store and marketplace payout broken out into sales, fees, refunds and reserves, then matched to the orders behind it." },
        { title: "Inventory and cost of goods", body: "Supplier invoices, freight and duties booked to inventory, so cost of goods reflects what you actually sold." },
        { title: "Margin by product and channel", body: "See which products and channels make money after fees, shipping and ad spend, not just which ones sell." },
        { title: "Fees, refunds and chargebacks", body: "Platform fees, processing fees, returns and chargebacks recorded where they belong instead of buried in a net deposit." },
        { title: "Sales tax records", body: "Sales tax collected tracked by channel, so your sales tax filings start from clean numbers." },
        { title: "Ad spend against profit", body: "Ad spend by channel set against gross profit, so you know what growth really costs." },
      ],
    },
    SOURCES: [
      { key: "store", label: "Store and marketplaces" },
      { key: "billing", label: "Payment payouts" },
      { key: "ads", label: "Ad accounts" },
      { key: "inventory", label: "Inventory and suppliers" },
      { key: "bank", label: "Bank and cards" },
      { key: "ledger", label: "Your ledger" },
    ],
    AGENT_ROWS: [
      { name: "Store payout", detail: "Net of fees and refunds", to: "212 orders matched", confidence: 100 },
      { name: "Ad platform", detail: "Monthly ad spend", to: "Marketing, by channel", confidence: 98 },
      { name: "Harbor Supply Co.", detail: "Inventory purchase", to: "Inventory, 1,200 units", confidence: 96 },
      { name: "Marketplace", detail: "Unclear reimbursement", to: "Sent to your accountant", confidence: 58 },
    ],
    REVIEW_ROWS: [
      { label: "Inventory count adjustment", state: "Approved" },
      { label: "Sales tax collected", state: "Posted" },
      { label: "Returns reserve", state: "Approved" },
    ],
    BOOK_OUTPUTS: ["Margin by SKU", "Cash for inventory", "Tax-ready books"],
    REPLACES: [
      { title: "AI agents", body: "Replace matching payouts to orders by hand." },
      { title: "Your accountant", body: "Replaces a bookkeeper who doesn't know e-commerce." },
      { title: "Live dashboards", body: "Replace guessing margins from your bank balance." },
    ],
    FEED: [
      { text: "Matched a store payout to 212 orders", tag: "Match" },
      { text: "Recorded $1,840 of marketplace fees", tag: "Fees" },
      { text: "Booked a supplier invoice to inventory", tag: "Inventory" },
      { text: "Reconciled 4 sales channels", tag: "Reconcile" },
      { text: "Sent a reimbursement to your accountant", tag: "Review" },
    ],
    CLOSE_ROWS: [
      { label: "Payouts matched to orders", state: "done" },
      { label: "Inventory and cost of goods", state: "done" },
      { label: "Fees, refunds and returns", state: "active" },
      { label: "Accountant review", state: "next" },
    ],
    DASHBOARD: {
      title: "Brand dashboard",
      kpis: [
        { label: "Net sales", value: "$486K", note: "4 sales channels" },
        { label: "Gross margin", value: "41.2%", note: "↑ 1.8 pts vs Sep", tone: "good" },
        { label: "Cash", value: "$612K", note: "2 bank accounts" },
      ],
      chart: { title: "Cash balance", legend: ["Actual", "Projected"] },
      bottom: [
        { label: "Supplier bills due this week", value: "$38.4K", note: "9 bills" },
        { label: "Payouts in transit", value: "$48.1K", note: "6 payouts" },
      ],
      insight: "Gross margin rose 1.8 points in October as returns fell.",
    },
    HEADS: {
      ask: { lead: "Live numbers on books we keep current. Ask the questions brand owners ask every week." },
      compare: { lead: "Software makes you match payouts yourself. Generalist firms don't know e-commerce. We do the work and keep your margins current." },
      final: { title: "See your margins", lead: "Tell us about your channels and your tools. We'll show you what your close and margin reports would look like." },
    },
    ASK: [
      { key: "runway", label: "Cash", q: "How much cash can we put into inventory?", sub: "Cash, payouts on the way and spend" },
      { key: "payables", label: "Suppliers", q: "What do we owe suppliers this week?", sub: "Bills by supplier and due date" },
      { key: "receivables", label: "Payouts", q: "Which payouts haven't landed?", sub: "Payouts by channel and days late" },
      { key: "close", label: "Close", q: "Are the books closed yet?", sub: `The ${CLOSE_DAYS}-day close, step by step` },
      { key: "tax", label: "Tax", q: "Are we ready for tax time?", sub: "Tax-ready books, every month" },
    ],
    ANSWERS: {
      runway: {
        kpis: [
          { label: "Cash", value: "$612K", note: "2 bank accounts" },
          { label: "In transit", value: "$48.1K", note: "6 payouts" },
          { label: "Monthly spend", value: "$318K", note: "Incl. inventory" },
        ],
        chartTitle: "Cash balance, actual and projected",
        insight: "After this week's supplier bills, you have $574K free for your next inventory order.",
      },
      payables: {
        aging: [
          { l: "Current", v: 84, c: "#2563EB" },
          { l: "1–30", v: 31, c: "#60A5FA" },
          { l: "31–60", v: 7, c: "#F59E0B" },
          { l: "60+", v: 2, c: "#EA580C" },
        ],
        rows: [
          { name: "Harbor Supply Co.", detail: "Due Nov 20", amount: "$21,600", chip: chip("This week", "soon") },
          { name: "Freight forwarder", detail: "Due Nov 21", amount: "$8,950", chip: chip("This week", "soon") },
          { name: "Packaging supplier", detail: "Due Dec 3", amount: "$4,200", chip: chip("Scheduled") },
          { name: "3PL warehouse", detail: "Due Oct 30", amount: "$3,780", chip: chip("Overdue", "late") },
        ],
        insight: "$38.4K is due to suppliers this week. One warehouse bill is overdue.",
      },
      receivables: {
        kpis: [
          { label: "In transit", value: "$48.1K", note: "6 payouts" },
          { label: "Late", value: "$6.2K", note: "1 channel", tone: "bad" },
          { label: "Fees", value: "3.1%", note: "Of October sales" },
        ],
        rows: [
          { name: "Marketplace", detail: "Payout, Oct 28", amount: "$6,240", chip: chip("6 days late", "late") },
          { name: "Online store", detail: "Payout, Nov 18", amount: "$19,870", chip: chip("Due Nov 20") },
          { name: "Social shop", detail: "Payout, Nov 18", amount: "$9,410", chip: chip("Due Nov 21") },
          { name: "Wholesale", detail: "INV-2207", amount: "$12,600", chip: chip("Due Dec 1") },
        ],
        insight: "One marketplace payout is 6 days late. We've flagged it so you can raise it with the marketplace.",
      },
      close: {
        tasks: [
          { day: 1, task: "Bank, card and payout reconciliations", by: "AI agents", state: "done" },
          { day: 2, task: "Payouts matched to orders", by: "AI agents", state: "done" },
          { day: 3, task: "Fees, refunds and returns recorded", by: "AI agents", state: "done" },
          { day: 4, task: "Inventory and cost of goods", by: "Accountant", state: "active" },
          { day: 5, task: "Review and tax-ready books", by: "Accountant", state: "next" },
        ],
        insight: `On track to close by day ${CLOSE_DAYS}. The inventory count is with your accountant.`,
      },
      tax: {
        checks: [
          "Every bank, card and payout account reconciled",
          "Sales, fees and refunds recorded by channel",
          "Inventory and cost of goods reconciled",
          "Checked by your accountant",
        ],
        pnl: [
          ["Net sales", "$486K", "$451K"],
          ["Cost of goods", "($286K)", "($274K)"],
          ["Gross profit", "$200K", "$177K"],
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
        ["Payouts", "You match them yourself", "Booked as one net deposit", "Matched to orders, fees and refunds"],
        ["Inventory and cost of goods", "Spreadsheets", "Adjusted at year-end", "Reconciled every month"],
        ["Margin by product and channel", "Build it yourself", "Rarely", "Every month"],
        ["Month-end close", "When you find time", "Weeks after month-end", `${CLOSE_DAYS} business days`],
        ["Your time", "Hours every week", "Email back-and-forth", "A short monthly review"],
      ],
    },
    FAQS: [
      { q: "Which sales channels do you work with?", a: "Your online store, marketplaces, social shops and wholesale. We confirm your exact channels and tools on the discovery call." },
      { q: "How do you handle payouts?", a: "Each payout is broken out into gross sales, fees, refunds and reserves, then matched to the orders behind it. Your books show real sales, not net deposits." },
      { q: "Do you track inventory and cost of goods?", a: "Yes. Supplier invoices, freight and duties are booked to inventory and reconciled each month, so cost of goods matches what you sold." },
      { q: "Do you file sales tax?", a: "We track sales tax collected by channel so your filings start from clean numbers. Filing itself stays with you or your tax provider." },
      { q: "How fast is the monthly close?", a: `Your books are closed within ${CLOSE_DAYS} business days of month-end, every month.` },
      { q: "Do you replace our CPA?", a: "No. We handle bookkeeping, the monthly close and reporting, and hand clean books to your CPA for tax." },
    ],
  },
};
