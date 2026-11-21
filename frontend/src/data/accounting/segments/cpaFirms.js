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
      layout: "split",
      eyebrow: "For US CPA firms",
      titleLead: "More capacity,",
      titleAccent: "no new hires.",
      lede: "An India-based team handles your bookkeeping, monthly close and tax-season prep overnight. AI does the data entry, our accountants check it, and it's ready for your review by morning.",
      microcopy: "Free 30-minute call · Start with one client",
    },
    // Split-hero card (sample data): the overnight handoff between time zones.
    HERO_VISUAL: {
      kind: "timeline",
      accent: "#10B981",
      title: "Overnight handoff",
      steps: [
        { when: "Your evening", what: "You share 45 client files", who: "Your firm" },
        { when: "Morning in India", what: "AI agents categorize 12,400 lines", who: "AI agents" },
        { when: "Afternoon in India", what: "Our accountants prepare and check", who: "Our team" },
        { when: "Your next morning", what: "Review-ready work in your queue", who: "Your firm" },
      ],
      status: { title: "Ready for your review", detail: "38 returns · 41 client books", progress: 90 },
    },
    LEAD_FORM: {
      title: "Tell us about your firm",
      subtitle: "Share a few details and we'll reply by email with how a pilot would work. No commitment.",
      companyLabel: "Firm name",
      qualifier: {
        label: "What do you want to outsource?",
        options: ["Bookkeeping and write-up", "Monthly close", "Tax-season prep", "A mix of these"],
      },
      messagePlaceholder: "Client volume, the software you use, timing for tax season...",
    },
    EMAIL_CTA: { href: emailHref(CONTACT_EMAIL, "Outsourcing for our CPA firm: I'd like to know more") },
    CALL_SUBTITLE: "30 minutes with our finance co-founder about your firm.",
    SECTIONS: { ask: false, segments: false },
    STATS: [
      { label: "Time zone", value: "Overnight", note: "Work moves while your team sleeps" },
      { label: "White-label", value: "Your brand", note: "Clients work with your firm, not with us" },
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
    // How the work lines up with AICPA, IRS and FTC rules. Citations checked
    // against the AICPA Code (2026 edition) and Rev. Proc. 2013-14 in Nov 2026.
    COMPLIANCE: {
      eyebrow: "Compliance",
      title: "AI that fits",
      accent: "your professional standards",
      end: ".",
      lead: "AI does the data entry. People make the judgment calls. Here is how our work lines up with the rules your firm already follows.",
      principles: [
        "AI never signs, files or contacts your clients",
        "Our accountants check every AI output",
        "Your firm reviews, signs and stays in control",
      ],
      items: [
        {
          icon: "confidentiality",
          rule: "AICPA Code 1.700.040",
          title: "Confidentiality, in writing",
          body: "We sign a confidentiality agreement with your firm before we see any client data, one of the two ways the Code lets you share confidential client information with a third-party service provider. We work inside your systems, with access you can revoke at any time.",
        },
        {
          icon: "notice",
          rule: "AICPA Code 1.150.040",
          title: "Client notice, ready to send",
          body: "The Code asks you to tell clients, preferably in writing, before you share their information with a third-party service provider. We give you notice language for your engagement letters.",
        },
        {
          icon: "supervision",
          rule: "AICPA Code 1.300.040",
          title: "Supervision built in",
          body: "You stay responsible for planning and supervising outsourced work. Every deliverable comes back with its workpapers and the source data behind them, so your reviewers can check the work and support their conclusions.",
        },
        {
          icon: "ai",
          rule: "AICPA SSTS 1.4",
          title: "AI as a tool, never the preparer",
          body: "AI agents categorize transactions and draft workpapers. Our accountants check every AI output, and your reviewers apply professional judgment before anything is final.",
        },
        {
          icon: "consent",
          rule: "IRC §7216 · Rev. Proc. 2013-14",
          title: "Offshore consent, done right",
          body: "Tax return information can go to a preparer outside the US only with the taxpayer's signed consent, using the wording the IRS requires. We give you that language, and we work with Social Security numbers fully masked.",
        },
        {
          icon: "security",
          rule: "FTC Safeguards Rule",
          title: "Fits your security plan",
          body: "Tax and accounting firms must oversee the safeguards of their service providers. We document our security practices so you can add us to your written information security plan and review us each year.",
        },
      ],
      note: "This section explains how our service supports your firm's obligations. It is not legal advice, and your firm remains responsible for its own compliance.",
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
      { q: "Is using AI allowed under AICPA standards?", a: "Yes. No AICPA rule bans AI tools. The same duties apply as with any software or service provider: keep client information confidential, tell clients you use a third-party service provider, supervise the work and apply professional judgment to what tools produce. Our process is built around each of those duties." },
      { q: "Will our clients know we outsource?", a: "Yes, and they should. The AICPA Code asks you to tell clients, preferably in writing, before you share their information with a third-party service provider, and offshore tax work needs each taxpayer's signed Section 7216 consent. We give you the language for both. Day to day, your clients keep working with your firm, not with us." },
      { q: "Who signs the returns?", a: "You do. Your firm stays the preparer of record, reviews every return and keeps the client relationship. We prepare the workpapers and drafts." },
      { q: "Do we need client consent to send tax work offshore?", a: "Yes. IRC Section 7216 requires written taxpayer consent before tax return information is disclosed to a preparer outside the US. We walk you through it during onboarding." },
      { q: "How do you keep client data secure?", a: "We sign a confidentiality agreement before we see any client data, work inside your firm's software with access you can revoke at any time, and keep Social Security numbers fully masked. We walk through our security practices on the discovery call." },
      { q: "How is it priced?", a: "It depends on the work and the volume. We scope it on the discovery call and start with a pilot on one client, so you can judge the quality before you commit to more." },
    ],
  },
};
