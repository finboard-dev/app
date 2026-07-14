import {
  Utensils, HardHat, ShoppingBag, ShoppingCart, Stethoscope,
  Layers, LineChart, CircleDollarSign, Boxes, Users,
  Percent, ClipboardList, Building2, Truck, HeartPulse,
  Code, Clock, Briefcase, Zap,
} from "lucide-react";

/**
 * Industry catalog. Each entry drives an /industries/:slug page and the
 * hero "tuned for your industry" links. `order` sets listing order.
 */
export const INDUSTRIES = [
  {
    slug: "restaurants",
    order: 1,
    nav: "Restaurants",
    icon: Utensils,
    accent: "#C2410C",
    tint: "#FFF7ED",
    eyebrow: "Restaurants & hospitality",
    headlineLead: "Multi-location",
    headlineItalic: "restaurant",
    headlineTail: "finance, consolidated.",
    subhead:
      "Roll up every location into one P&L. Track food and labor cost as a % of sales, compare stores side by side, and close the month across the whole group without chasing spreadsheets.",
    metaDescription:
      "Roll up every location into one P&L. Track food and labor cost as a % of sales, compare stores side by side, and close the month across the whole group.",
    pains: [
      "Stitching together four POS exports by hand every month-end.",
      "Not knowing which location is actually profitable until weeks later.",
      "Prime cost creeping past 60% before anyone catches it.",
    ],
    capabilities: [
      { icon: Building2,  label: "Location-level P&L" },
      { icon: Percent,    label: "Food & labor cost %" },
      { icon: LineChart,  label: "Same-store sales" },
      { icon: Layers,     label: "Group consolidation" },
    ],
    features: [
      { icon: Building2, title: "P&L by location", body: "Every restaurant rolls into a consolidated group view, and drills back down to a single store's line items." },
      { icon: Percent,   title: "Prime cost control", body: "Food and labor cost as a live % of sales, benchmarked across locations so outliers surface immediately." },
      { icon: LineChart, title: "Same-store trends", body: "Comp sales, average check and cover counts tracked period over period across the whole fleet." },
    ],
    integrations: ["Toast", "7shifts", "QuickBooks", "Restaurant365", "Square"],
    metric: { value: "Per location", label: "consolidated P&L" },
    metrics: [
      { value: "Per location", label: "P&L" },
      { value: "< 60%", label: "prime-cost target" },
      { value: "10 days", label: "group close" },
    ],
  },
  {
    slug: "construction",
    order: 2,
    nav: "Construction",
    icon: HardHat,
    accent: "#B45309",
    tint: "#FEF3C7",
    eyebrow: "Construction & contractors",
    headlineLead: "Job costing and",
    headlineItalic: "WIP",
    headlineTail: "that actually tie out.",
    subhead:
      "Percentage-of-completion, WIP schedules, retainage and job-level margin across every entity, reconciled to your GL so the board sees the real project picture.",
    pains: [
      "WIP schedules built by hand in Excel that never tie to the GL.",
      "Job margins you only find out at close-out, when it's too late.",
      "Retainage tracked across a dozen disconnected spreadsheets.",
    ],
    capabilities: [
      { icon: ClipboardList,    label: "Job costing" },
      { icon: LineChart,        label: "WIP schedules" },
      { icon: Percent,          label: "% completion" },
      { icon: CircleDollarSign, label: "Retainage tracking" },
    ],
    features: [
      { icon: ClipboardList, title: "Job-level margin", body: "See gross margin by project and phase, with committed costs and change orders rolled in automatically." },
      { icon: LineChart,     title: "WIP that reconciles", body: "Over/under billings and percentage-of-completion tie straight back to the GL, no more year-end surprises." },
      { icon: CircleDollarSign, title: "Retainage & AR", body: "Track retainage held and released across jobs alongside AR aging, per entity and consolidated." },
    ],
    integrations: ["Procore", "Buildertrend", "Sage 300 CRE", "QuickBooks", "Foundation"],
    metric: { value: "Per job", label: "margin & WIP" },
    metrics: [
      { value: "Per job", label: "margin & WIP" },
      { value: "POC", label: "revenue recognition" },
      { value: "Real-time", label: "over/under billing" },
    ],
  },
  {
    slug: "retail",
    order: 3,
    nav: "Retail",
    icon: ShoppingBag,
    accent: "#7C3AED",
    tint: "#F5F3FF",
    eyebrow: "Multi-store retail",
    headlineLead: "Store-by-store",
    headlineItalic: "margins",
    headlineTail: "in one view.",
    subhead:
      "Consolidate every store, track SKU and category profitability, and watch inventory and comp sales across the fleet, with a group P&L that closes on time.",
    pains: [
      "Store P&Ls that land three weeks after month-end.",
      "Inventory shrink you can't pin to a location.",
      "No clear view of which categories actually carry margin.",
    ],
    capabilities: [
      { icon: Building2, label: "Store-level P&L" },
      { icon: Boxes,     label: "Inventory & COGS" },
      { icon: Percent,   label: "Category margin" },
      { icon: LineChart, label: "Comp-store sales" },
    ],
    features: [
      { icon: Building2, title: "P&L by store", body: "Each location consolidates into the group while staying drillable down to register-level detail." },
      { icon: Boxes,     title: "Inventory-aware margin", body: "COGS and inventory turns by SKU and category, so you see what's actually making money." },
      { icon: LineChart, title: "Comp sales & trends", body: "Like-for-like sales, basket size and margin trends across every store, period over period." },
    ],
    integrations: ["Shopify POS", "Lightspeed", "NetSuite", "QuickBooks", "Square"],
    metric: { value: "Per store", label: "margin view" },
    metrics: [
      { value: "Per store", label: "margin view" },
      { value: "SKU-level", label: "profitability" },
      { value: "Comp", label: "sales tracking" },
    ],
  },
  {
    slug: "ecommerce",
    order: 4,
    nav: "E-commerce",
    icon: ShoppingCart,
    accent: "#0D9488",
    tint: "#F0FDFA",
    eyebrow: "E-commerce & DTC",
    headlineLead: "Multi-channel",
    headlineItalic: "contribution",
    headlineTail: "margin, clarified.",
    subhead:
      "Blend Shopify, Amazon and marketplace revenue, net out fees and COGS, and see true contribution margin and blended CAC across channels, reconciled to the bank.",
    pains: [
      "Marketplace and payment fees quietly eating your margin.",
      "Blended CAC you can't tie back to channel revenue.",
      "Reconciling Shopify, Amazon and the bank by hand every month.",
    ],
    capabilities: [
      { icon: LineChart,        label: "Multi-channel revenue" },
      { icon: Percent,          label: "Contribution margin" },
      { icon: CircleDollarSign, label: "Marketplace fees" },
      { icon: Truck,            label: "COGS & fulfillment" },
    ],
    features: [
      { icon: LineChart, title: "One revenue picture", body: "Shopify, Amazon and wholesale channels blended into a single, reconciled revenue and margin view." },
      { icon: Percent,   title: "True contribution margin", body: "Net out payment, marketplace and fulfillment fees to see what each channel and SKU really earns." },
      { icon: CircleDollarSign, title: "Blended CAC & LTV", body: "Marketing spend tied to channel revenue so blended CAC and payback are always current." },
    ],
    integrations: ["Shopify", "Amazon", "Stripe", "NetSuite", "QuickBooks"],
    metric: { value: "Per channel", label: "contribution margin" },
    metrics: [
      { value: "Per channel", label: "contribution" },
      { value: "Blended", label: "CAC & LTV" },
      { value: "Net", label: "of all fees" },
    ],
  },
  {
    slug: "healthcare",
    order: 5,
    nav: "Healthcare",
    icon: Stethoscope,
    accent: "#0E7490",
    tint: "#ECFEFF",
    eyebrow: "Healthcare & clinics",
    headlineLead: "Multi-entity",
    headlineItalic: "clinic",
    headlineTail: "finance, in control.",
    subhead:
      "Consolidate clinics and practices, track payer mix and revenue cycle, and measure cost per visit across the group, with governed, board-ready reporting.",
    pains: [
      "Clinic P&Ls buried inside the practice-management system.",
      "Payer mix and cost-per-visit you can't compare across sites.",
      "Days in AR climbing with no early warning.",
    ],
    capabilities: [
      { icon: Building2,  label: "Per-clinic P&L" },
      { icon: HeartPulse, label: "Revenue cycle" },
      { icon: Users,      label: "Payer mix" },
      { icon: Percent,    label: "Cost per visit" },
    ],
    features: [
      { icon: Building2,  title: "Consolidated clinics", body: "Every location and entity rolls into one group view, drillable to a single clinic's P&L." },
      { icon: HeartPulse, title: "Revenue cycle visibility", body: "Track collections, denials and days in AR across the group alongside the financials." },
      { icon: Users,      title: "Payer & service mix", body: "See payer mix and cost per visit by location so you know where margin comes from." },
    ],
    integrations: ["Epic", "athenahealth", "Kareo", "NetSuite", "QuickBooks"],
    metric: { value: "Per clinic", label: "P&L & cost/visit" },
    metrics: [
      { value: "Per clinic", label: "P&L" },
      { value: "Payer mix", label: "visibility" },
      { value: "Days in AR", label: "tracked live" },
    ],
  },
  {
    slug: "software-and-services",
    order: 6,
    nav: "Software & Services",
    icon: Code,
    accent: "#4F46E5",
    tint: "#EEF2FF",
    eyebrow: "SaaS & professional services",
    headlineLead: "Recurring revenue and",
    headlineItalic: "utilization",
    headlineTail: "as one story.",
    subhead:
      "SaaS metrics and services margin in one workspace. ARR, NRR, magic number, and utilization by team all consolidated back to the ledger - no more juggling Stripe, Xero and Google Sheets.",
    metaDescription:
      "SaaS metrics and services margin in one workspace. ARR, NRR, magic number and utilization by team, all consolidated back to the ledger.",
    pains: [
      "ARR waterfalls rebuilt from scratch every board cycle.",
      "Services margin only surfacing after the quarter has closed.",
      "Utilization and revenue tracked in three different systems.",
    ],
    capabilities: [
      { icon: Zap,              label: "ARR & NRR" },
      { icon: Clock,            label: "Utilization by team" },
      { icon: Briefcase,        label: "Services margin" },
      { icon: CircleDollarSign, label: "Deferred revenue" },
    ],
    features: [
      { icon: Zap,       title: "Live SaaS metrics", body: "ARR waterfall, net revenue retention, gross churn and magic number reconciled to your subscription ledger, no rebuild required." },
      { icon: Clock,     title: "Utilization & margin", body: "Billable hours, bench and utilization by team roll into services margin and revenue per FTE, live across every entity." },
      { icon: Briefcase, title: "Bookings to cash", body: "From closed-won to invoice to cash - bookings, billings, deferred revenue and collections tied together in one view." },
    ],
    integrations: ["Stripe", "Salesforce", "HubSpot", "Xero", "Rippling"],
    metric: { value: "Per team", label: "utilization & margin" },
    metrics: [
      { value: "ARR & NRR", label: "reconciled" },
      { value: "Per team", label: "utilization" },
      { value: "Services", label: "margin live" },
    ],
  },
];

export const INDUSTRIES_BY_SLUG = INDUSTRIES.reduce((acc, i) => {
  acc[i.slug] = i;
  return acc;
}, {});

export const INDUSTRY_NAV = [...INDUSTRIES].sort((a, b) => a.order - b.order);
