import { chip } from "../../accountingSamples.js";
import { CLOSE_DAYS, CONTACT_EMAIL } from "../../accountingServices.js";
import { emailHref } from "../mergeCopy.js";

/** /accounting-services/creators: creators earning from platforms, brand deals, memberships and merch. */
export const CREATORS = {
  slug: "creators",
  nav: "Creators",
  blurb: "Platform payouts, brand deals, memberships and merch in one set of books.",
  breadcrumb: "Accounting for creators",
  metaTitle: "Accounting Services for Creators | FinBoard",
  metaDescription: `Creator accounting, handled. Platform payouts, brand deals, memberships and merch in one set of books, closed in ${CLOSE_DAYS} business days.`,
  copy: {
    HERO: {
      eyebrow: "Accounting for creators",
      titleLead: "Creator accounting,",
      titleAccent: "handled.",
      lede: `Platform payouts, brand deals, memberships and merch in one set of books, closed in ${CLOSE_DAYS} business days. Know what you earn, what you keep and what your team costs. AI agents do the work. Accountants check every entry.`,
    },
    EMAIL_CTA: { href: emailHref(CONTACT_EMAIL, "Creator accounting: I'd like to know more") },
    STATS: [
      { label: "Close", value: `${CLOSE_DAYS} days`, note: "Business days to close each month" },
      { label: "Income", value: "Every stream", note: "Platforms, brand deals, memberships and merch" },
      { label: "Accuracy", value: "100%", note: "Of entries checked by an accountant" },
      { label: "Tax-ready", value: "Monthly", note: "Numbers your CPA can use for quarterly estimates" },
    ],
    SPECIFICS: {
      eyebrow: "Built for creators",
      title: "You make the content.",
      accent: "We keep the books.",
      lead: "Income arrives from a dozen places on a dozen schedules. Your team is mostly freelancers. We keep it all straight every month.",
      items: [
        { title: "Every income stream in one place", body: "Platform payouts, brand deals, memberships, affiliate income and merch, recorded by stream so you see what actually pays." },
        { title: "Brand deals from contract to cash", body: "Upfront and final payments tracked against each deal, so you know which brands still owe you." },
        { title: "Business and personal, separated", body: "Purchases sorted into business and personal, and anything unclear sent to your accountant instead of guessed." },
        { title: "Editors and contractors", body: "Payments to editors, designers and other freelancers recorded and tracked, so year-end 1099s are not a scramble." },
        { title: "Gear and studio costs", body: "Cameras, lighting, software and studio costs recorded properly, with your accountant deciding what gets depreciated." },
        { title: "Numbers for quarterly estimates", body: "Closed books every month, so your CPA can work out quarterly estimated taxes from real numbers." },
      ],
    },
    SOURCES: [
      { key: "platform", label: "Platform payouts" },
      { key: "sponsors", label: "Brand deals" },
      { key: "billing", label: "Memberships and merch" },
      { key: "bank", label: "Bank and cards" },
      { key: "payroll", label: "Editors and contractors" },
      { key: "ledger", label: "Your ledger" },
    ],
    AGENT_ROWS: [
      { name: "Platform payout", detail: "Monthly ad revenue", to: "Income, by platform", confidence: 100 },
      { name: "Lumen Skincare", detail: "Sponsorship, 50% upfront", to: "Brand deal, 2 deliverables", confidence: 97 },
      { name: "Editor invoice", detail: "Freelance video editing", to: "Contractor, 1099 tracked", confidence: 99 },
      { name: "Camera store", detail: "Paid on a personal card", to: "Sent to your accountant", confidence: 62 },
    ],
    REVIEW_ROWS: [
      { label: "Camera gear purchase", state: "Approved" },
      { label: "Contractor 1099 list", state: "Posted" },
      { label: "Brand deal deposits", state: "Approved" },
    ],
    BOOK_OUTPUTS: ["Income by stream", "Unpaid brand deals", "Tax-ready books"],
    REPLACES: [
      { title: "AI agents", body: "Replace sorting payouts and receipts yourself." },
      { title: "Your accountant", body: "Replaces a bookkeeper who doesn't know creator income." },
      { title: "Live dashboards", body: "Replace guessing what you earned this month." },
    ],
    FEED: [
      { text: "Recorded a $12,000 brand deal deposit", tag: "Brand deal" },
      { text: "Matched a platform payout to October", tag: "Payout" },
      { text: "Booked an editor invoice as a contractor cost", tag: "Contractor" },
      { text: "Reconciled 2 bank accounts", tag: "Reconcile" },
      { text: "Sent a personal-card purchase to your accountant", tag: "Review" },
    ],
    CLOSE_ROWS: [
      { label: "Payouts and deposits matched", state: "done" },
      { label: "Brand deals updated", state: "done" },
      { label: "Contractors and expenses", state: "active" },
      { label: "Accountant review", state: "next" },
    ],
    DASHBOARD: {
      title: "Creator dashboard",
      kpis: [
        { label: "Income", value: "$84.6K", note: "5 income streams" },
        { label: "Profit", value: "$51.2K", note: "↑ 6% vs Sep", tone: "good" },
        { label: "Cash", value: "$186K", note: "2 bank accounts" },
      ],
      chart: { title: "Cash balance", legend: ["Actual", "Projected"] },
      bottom: [
        { label: "Brand deals unpaid", value: "$18.5K", note: "3 brands", tone: "bad" },
        { label: "Contractors due this week", value: "$6.4K", note: "4 invoices" },
      ],
      insight: "Brand deals were 46% of October income. Three brands still owe you $18.5K.",
    },
    HEADS: {
      ask: { lead: "Live numbers on books we keep current. Ask the questions creators ask every week." },
      compare: {
        title: "Less work than software.",
        accent: "More fluent than a generalist.",
        lead: "Software makes you sort every payout. Generalist firms don't know creator income. We do the work and keep your numbers current.",
      },
      final: { title: "See your numbers", lead: "Tell us about your income streams and your team. We'll show you what your close and dashboards would look like." },
    },
    ASK: [
      { key: "runway", label: "Cash", q: "How much can I spend this month?", sub: "Cash, income on the way and costs" },
      { key: "payables", label: "Team", q: "What do I owe my team?", sub: "Editors, contractors and tools" },
      { key: "receivables", label: "Brand deals", q: "Which brands haven't paid me?", sub: "Open deals and days late" },
      { key: "close", label: "Close", q: "Are my books closed yet?", sub: `The ${CLOSE_DAYS}-day close, step by step` },
      { key: "tax", label: "Tax", q: "Am I ready for tax time?", sub: "Tax-ready books, every month" },
    ],
    ANSWERS: {
      runway: {
        kpis: [
          { label: "Cash", value: "$186K", note: "2 bank accounts" },
          { label: "Monthly costs", value: "$33.4K", note: "Team, tools, studio" },
          { label: "Coming in", value: "$27.9K", note: "Payouts and deals" },
        ],
        chartTitle: "Cash balance, actual and projected",
        insight: "Costs averaged $33.4K a month this quarter. $27.9K of payouts and deal payments are on the way.",
      },
      payables: {
        aging: [
          { l: "Current", v: 9, c: "#2563EB" },
          { l: "1–30", v: 4, c: "#60A5FA" },
          { l: "31–60", v: 1, c: "#F59E0B" },
          { l: "60+", v: 0, c: "#EA580C" },
        ],
        rows: [
          { name: "Video editor", detail: "Due Nov 20", amount: "$3,200", chip: chip("This week", "soon") },
          { name: "Thumbnail designer", detail: "Due Nov 21", amount: "$1,450", chip: chip("This week", "soon") },
          { name: "Studio rent", detail: "Due Dec 1", amount: "$2,800", chip: chip("Scheduled") },
          { name: "Editing software", detail: "Due Oct 29", amount: "$240", chip: chip("Overdue", "late") },
        ],
        insight: "$6.4K is due to your team this week. One software bill is overdue.",
      },
      receivables: {
        kpis: [
          { label: "Unpaid deals", value: "$18.5K", note: "3 brands", tone: "bad" },
          { label: "Payouts due", value: "$9.4K", note: "2 platforms" },
          { label: "Avg. days to pay", value: "38", note: "Brand deals" },
        ],
        rows: [
          { name: "Lumen Skincare", detail: "Final 50%", amount: "$12,000", chip: chip("21 days late", "late") },
          { name: "Trailhead Gear", detail: "Usage rights", amount: "$4,000", chip: chip("8 days late", "late") },
          { name: "Brightcup Coffee", detail: "Story package", amount: "$2,500", chip: chip("Due Nov 25") },
          { name: "Membership platform", detail: "November payout", amount: "$6,150", chip: chip("Due Dec 5") },
        ],
        insight: "Lumen Skincare is 21 days late on the final $12,000 of your deal.",
      },
      close: {
        tasks: [
          { day: 1, task: "Bank and card reconciliations", by: "AI agents", state: "done" },
          { day: 2, task: "Platform payouts and deposits matched", by: "AI agents", state: "done" },
          { day: 3, task: "Brand deals updated", by: "AI agents", state: "done" },
          { day: 4, task: "Contractors, gear and expenses", by: "Accountant", state: "active" },
          { day: 5, task: "Review and tax-ready books", by: "Accountant", state: "next" },
        ],
        insight: `On track to close by day ${CLOSE_DAYS}. One personal-card purchase is with your accountant.`,
      },
      tax: {
        checks: [
          "Every income stream recorded",
          "Business and personal spending separated",
          "Contractor payments tracked for 1099s",
          "Checked by your accountant",
        ],
        pnl: [
          ["Income", "$84.6K", "$79.8K"],
          ["Costs", "($33.4K)", "($31.5K)"],
          ["Profit", "$51.2K", "$48.3K"],
        ],
        insight: "October is closed and reconciled. Your CPA can use these numbers for your quarterly estimate.",
      },
    },
    COMPARE: {
      columns: [
        { name: "Accounting software", sub: "You do the work" },
        { name: "Generalist firm", sub: "People, by hand" },
        { name: "FinBoard", sub: "AI agents + accountants" },
      ],
      rows: [
        ["Income streams", "You sort every payout", "Lumped into one line", "Tracked by stream"],
        ["Brand deals", "A spreadsheet, if any", "Not tracked", "Followed from contract to payment"],
        ["Contractors and 1099s", "A year-end scramble", "Year-end only", "Tracked every month"],
        ["Month-end close", "When you find time", "Weeks after month-end", `${CLOSE_DAYS} business days`],
        ["Your time", "Hours every week", "Email back-and-forth", "A short monthly review"],
      ],
    },
    FAQS: [
      { q: "Which income sources do you handle?", a: "Platform payouts, brand deals, memberships, affiliate income, courses and merch. We confirm your exact mix on the discovery call." },
      { q: "Can you track brand deals?", a: "Yes. We record each deal's payments against what was agreed, so you can see which brands still owe you and how late they are." },
      { q: "I mix business and personal spending. Is that a problem?", a: "It's common. Our agents sort what they can and send anything unclear to your accountant. Over time we help you keep them apart." },
      { q: "Do you handle my taxes?", a: "We keep your books closed and tax-ready every month. Your CPA files your return and works out estimated taxes from our numbers." },
      { q: "How fast is the monthly close?", a: `Your books are closed within ${CLOSE_DAYS} business days of month-end, every month.` },
      { q: "Is this only for big creators?", a: "No. If you have several income streams or anyone on your team, the books get complicated fast. Book a call and we'll tell you honestly if it's worth it." },
    ],
  },
};
