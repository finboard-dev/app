import { chip } from "../../accountingSamples.js";
import { CLOSE_DAYS, CONTACT_EMAIL } from "../../accountingServices.js";
import { emailHref } from "../mergeCopy.js";

/**
 * /accounting-services/cpa-firms: US CPA firms outsourcing bookkeeping, write-up
 * and tax-season prep to FinBoard's team in India. The firm keeps the client
 * relationship and signs every return.
 */
export const CPA_FIRMS = {
  slug: "cpa-firms",
  // Sold to firms, not businesses: kept out of the business-segment links.
  listed: false,
  nav: "CPA firms",
  blurb: "An India-based team for bookkeeping, close and tax prep, under your firm's name.",
  breadcrumb: "Outsourced accounting for CPA firms",
  metaTitle: "Outsourced Accounting for CPA Firms, India Team | FinBoard",
  metaDescription: "Outsource bookkeeping, write-up, monthly close and tax-season prep to an India-based team, reviewed by our accountants and delivered under your firm's name.",
  copy: {
    HERO: {
      eyebrow: "For US CPA firms",
      titleLead: "More capacity,",
      titleAccent: "no new hires.",
      lede: "An India-based accounting team takes on your bookkeeping, write-up, monthly close and tax-season prep. Work moves while you sleep, our accountants check it, and it comes back ready for your review. AI agents handle the data entry, so you pay for judgment, not typing.",
      microcopy: "Free 30-minute call · Start with one client",
    },
    EMAIL_CTA: { href: emailHref(CONTACT_EMAIL, "Outsourcing for our CPA firm: I'd like to know more") },
    CALL_SUBTITLE: "30 minutes with our finance co-founder about your firm.",
    SECTIONS: { ask: false, segments: false },
    STATS: [
      { label: "Time zone", value: "Overnight", note: "Work moves while your team sleeps" },
      { label: "White-label", value: "Your brand", note: "Clients only ever see your firm" },
      { label: "Review", value: "100%", note: "Of work checked before it reaches you" },
      { label: "Start", value: "1 client", note: "Pilot one client, then scale" },
    ],
    FOUNDER_PROFILE: {
      titleAccent: "Offshore capacity.",
      lead: "Your India team is led by Vaishnav Gupta, our finance co-founder. He learned audit-grade finance at PwC, then handled payroll and tax operations at Rippling. You work with him directly, not an account manager.",
    },
    SPECIFICS: {
      eyebrow: "What we take on",
      title: "The work that buries",
      accent: "your team every March",
      end: ".",
      lead: "Hand off the preparation. Keep the review, the signature and the client relationship.",
      items: [
        { title: "Bookkeeping and write-up", body: "Monthly categorization, reconciliations and write-up for your small business clients, inside your firm's software." },
        { title: "Monthly close", body: `Client books closed and reconciled within ${CLOSE_DAYS} business days of month-end, with open questions batched for your team.` },
        { title: "Catch-up and cleanup", body: "Months or years of messy books brought current before tax season, so returns start from clean numbers." },
        { title: "Individual returns prep", body: "1040 workpapers and draft returns prepared from client documents, then handed to your reviewers to finalize and sign." },
        { title: "Business returns prep", body: "1120, 1120-S and 1065 workpapers and drafts prepared for your review." },
        { title: "Payroll and sales tax support", body: "Payroll reconciliations and sales tax workpapers prepared for your firm to review and file." },
      ],
    },
    SOURCES: [
      { key: "inbox", label: "Client documents" },
      { key: "bank", label: "Bank and card feeds" },
      { key: "bills", label: "Bills and receipts" },
      { key: "payroll", label: "Payroll reports" },
      { key: "returns", label: "Prior-year returns" },
      { key: "ledger", label: "Your firm's software" },
    ],
    AGENT_ROWS: [
      { name: "Harper Dental", detail: "412 bank lines", to: "Categorized, client books", confidence: 98 },
      { name: "Ortiz household", detail: "W-2s, 1099s, 1098", to: "Sorted into 1040 workpapers", confidence: 99 },
      { name: "Lakeview Builders", detail: "Payroll reports", to: "Reconciled to the ledger", confidence: 100 },
      { name: "Client receipt", detail: "Unclear business purpose", to: "Sent to our accountant", confidence: 55 },
    ],
    FLOW_CARDS: {
      agentsNote: "Not sure? It asks our accountant instead of guessing.",
      reviewTitle: "Our accountant review",
      booksTitle: "Back to your firm",
      booksHeadline: "Ready for your review",
    },
    REVIEW_ROWS: [
      { label: "Bank reconciliations", state: "Approved" },
      { label: "1040 workpapers", state: "Ready" },
      { label: "Payroll tie-out", state: "Approved" },
    ],
    BOOK_OUTPUTS: ["Review-ready workpapers", "Closed client books", "Your firm's name"],
    REPLACES: [
      { title: "AI agents", body: "Do the data entry and first-pass categorization." },
      { title: "Our accountants", body: "Prepare the work and check it before it reaches you." },
      { title: "Your firm", body: "Reviews, signs and owns every client relationship." },
    ],
    FEED: [
      { text: "Categorized 412 bank lines for Harper Dental", tag: "Books" },
      { text: "Prepared 1040 workpapers for the Ortiz household", tag: "Tax prep" },
      { text: "Reconciled payroll for Lakeview Builders", tag: "Payroll" },
      { text: "Closed October books for 41 clients", tag: "Close" },
      { text: "Sent a question to your reviewer", tag: "Review" },
    ],
    CLOSE_ROWS: [
      { label: "Client feeds categorized", state: "done" },
      { label: "Reconciliations", state: "done" },
      { label: "Workpapers prepared", state: "active" },
      { label: "Your firm's review", state: "next" },
    ],
    DASHBOARD: {
      title: "Firm workload",
      kpis: [
        { label: "Returns in prep", value: "142", note: "38 ready for review" },
        { label: "Books closed", value: "41 of 45", note: `October, day ${CLOSE_DAYS}`, tone: "good" },
        { label: "Turnaround", value: "1 day", note: "Back to your reviewers" },
      ],
      chart: null,
      rows: [
        { name: "Harper Dental", detail: "October close", amount: "Books", chip: chip("Ready", "done") },
        { name: "Ortiz household", detail: "Form 1040", amount: "Tax prep", chip: chip("Ready", "done") },
        { name: "Lakeview Builders", detail: "Form 1120-S", amount: "Tax prep", chip: chip("In prep", "soon") },
        { name: "Coastal Yoga", detail: "Catch-up, 2025", amount: "Cleanup", chip: chip("Waiting on client", "late") },
      ],
      bottom: [
        { label: "Waiting on clients", value: "17", note: "Missing documents", tone: "bad" },
        { label: "Questions for your firm", value: "6", note: "Need your judgment" },
      ],
      insight: "38 returns are ready for your reviewers. 17 clients still owe documents.",
    },
    HEADS: {
      flow: {
        title: "Client work goes in.",
        accent: "Review-ready work comes back.",
        lead: "Our agents and India team work inside your firm's software. Our accountants check everything before it reaches your reviewers.",
      },
      compare: {
        title: "More capacity",
        accent: "without more hires.",
        lead: "Hiring takes months and staffing firms leave you managing people. We deliver finished, checked work and manage the team ourselves.",
      },
      final: {
        title: "Add capacity",
        accent: "before next tax season.",
        lead: "Tell us about your firm, your software and the work you want off your plate. We'll show you how a pilot with one client would run.",
      },
    },
    COMPARE: {
      columns: [
        { name: "Hire in-house", sub: "US staff" },
        { name: "Offshore staffing firm", sub: "Staff you manage" },
        { name: "FinBoard", sub: "AI agents + India team" },
      ],
      rows: [
        ["What you get", "An employee", "A person to train and manage", "Finished, checked work"],
        ["Getting started", "Months to hire and train", "Weeks learning your process", "A pilot with one client"],
        ["Tax season", "Overtime and burnout", "Only as fast as headcount", "Work moves overnight"],
        ["Quality check", "Your reviewers", "Your reviewers", "Our accountants, then yours"],
        ["Data entry", "By hand", "By hand", "Done by AI agents"],
      ],
    },
    STEPS: [
      { title: "Discovery call", body: "30 minutes on your firm, clients and software." },
      { title: "Pilot one client", body: "We take on one client's work so you can judge the quality." },
      { title: "Scale up", body: "Add clients and tax-season capacity as you need it." },
    ],
    FAQS: [
      { q: "Who does the work?", a: "Accountants on our team in India, led by Vaishnav Gupta, our finance co-founder (ex-PwC, ex-Rippling). AI agents handle data entry and first-pass categorization." },
      { q: "Will our clients know we outsource?", a: "Only if you tell them. We work inside your firm's software and under your firm's name. Your clients deal with you." },
      { q: "Who signs the returns?", a: "You do. Your firm stays the preparer of record, reviews every return and keeps the client relationship. We prepare the workpapers and drafts." },
      { q: "Do we need client consent to send tax work offshore?", a: "Yes. IRC Section 7216 requires written taxpayer consent before tax return information is disclosed to a preparer outside the US. We walk you through it during onboarding." },
      { q: "How do you keep client data secure?", a: "We work inside your firm's software with access you grant and can revoke at any time, and we sign an NDA before we start. We walk through our security practices on the discovery call." },
      { q: "How is it priced?", a: "It depends on the work and the volume. We scope it on the discovery call and start with a pilot on one client, so you can judge the quality before you commit to more." },
    ],
  },
};
