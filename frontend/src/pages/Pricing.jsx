import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Sparkles, ShieldCheck, Users, Database,
  Layers, Building2, Timer, MessageSquare,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { PRODUCT_NAV } from "@/data/products";

// Groups of modules for the "Platform > Modules" narrative.
// Kept intentionally price-free — everything is quote-based.
const CATEGORIES = [
  {
    id: "platform",
    kicker: "The platform",
    title: "The finance workspace",
    lede: "The governed core every FinBoard customer starts with. One workspace, every entity, every user, one audit trail.",
    items: [
      {
        icon: Layers,
        title: "FinBoard Platform",
        body: "The workspace that unifies every ledger, connector and person, with a single governed data model underneath.",
        bullets: [
          "Unified multi-entity workspace",
          "ERP, CRM & HRIS connectors",
          "Governed semantic layer",
          "Full audit trail & lineage",
          "Role-based access & SSO",
          "Forward-deployed onboarding",
        ],
        cta: null, // platform, no dedicated page
      },
    ],
  },
  {
    id: "close",
    kicker: "Close & Consolidation",
    title: "Close the group",
    lede: "Ingest every subsidiary, auto-match inter-company, post eliminations and translate currencies.",
    items: [
      pickProduct("consolidation"),
    ],
  },
  {
    id: "reporting",
    kicker: "Reporting & Planning",
    title: "Report and plan on one truth",
    lede: "Live board-ready dashboards and driver-based plans, built on the same governed data as your actuals.",
    items: [
      pickProduct("analytics"),
      pickProduct("fpa"),
    ],
  },
  {
    id: "spend",
    kicker: "Spend & Cash",
    title: "Move money on autopilot",
    lede: "AI agents that read vendor documents, run 3-way match, chase invoices and land the cash — traceable end-to-end.",
    items: [
      pickProduct("p2p"),
      pickProduct("o2c"),
    ],
  },
];

function pickProduct(slug) {
  const p = PRODUCT_NAV.find((x) => x.slug === slug);
  return {
    icon: p.icon,
    title: p.nav,
    body: p.subhead,
    bullets: p.capabilities.map((c) => c.label),
    cta: { label: "Explore module", to: `/products/${p.slug}` },
  };
}

const FAQS = [
  {
    q: "Do you publish list prices?",
    a: "No. Every group we work with has a different entity count, close cadence and module mix, so we quote per engagement. Tell us your setup — we'll send a tailored quote back within one business day.",
  },
  {
    q: "How is pricing structured?",
    a: "A platform base plus the modules you turn on. The platform gives you the workspace, connectors, users and governance layer; each module (Consolidation, Analytics, FP&A, Procure-to-Pay, Order-to-Cash) is added on top based on what you actually run.",
  },
  {
    q: "Can I start with one module and expand?",
    a: "Yes. Most customers start with the module that hurts the most — usually Consolidation or a P2P/O2C workflow — and layer the rest in as the workspace matures. Every module reuses the same governed data model.",
  },
  {
    q: "What's included in every quote?",
    a: "Forward-deployed onboarding, connector setup, SSO, audit trail, unlimited data sources on the platform tier, and a named point of contact. Enterprise engagements add SAML SSO, SCIM and a dedicated success manager.",
  },
  {
    q: "Do you offer firm / advisory pricing?",
    a: "Yes. Fractional CFOs, CAS practices and fund admins get per-client and per-seat pricing built for resale margin. See the For Firms page or ask us on the quote call.",
  },
];

const QUOTE_INCLUDES = [
  { icon: Timer,       label: "Tailored quote in 1 business day" },
  { icon: MessageSquare, label: "Answers to close, reporting & spend questions" },
  { icon: Database,    label: "Walk-through of how FinBoard scales with your group" },
  { icon: Sparkles,    label: "Forward-deployed build plan for your first 30 days" },
];

export default function Pricing() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="pricing-page">
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-12 lg:pt-20 pb-14 lg:pb-24">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-7 animate-fade-up">
                <div className="font-serif-display italic text-xl sm:text-2xl text-[#0A0A0A]/60" data-testid="pricing-kicker">
                  Pricing
                </div>

                <h1 className="mt-2 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight text-[#0A0A0A]" data-testid="pricing-heading">
                  The finance platform for <span className="italic">multi-entity operators</span>.
                </h1>

                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/75" data-testid="pricing-subhead">
                  Tell us what modules you need and how your group is structured, and we&apos;ll send you a custom quote. No sticker prices, no per-seat surprises, no fine print — just a plan that fits how you actually run finance.
                </p>

                <div className="mt-8 max-w-xl" data-testid="pricing-quote-includes">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#0A0A0A]/50">Reach out for</span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <ul className="mt-4 divide-y divide-line/70 border-y border-line/70">
                    {QUOTE_INCLUDES.map(({ icon: Icon, label }, i) => (
                      <li
                        key={label}
                        className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-[#F5F0E8]/40 -mx-2 px-2 rounded-sm"
                      >
                        <span className="font-serif-display text-[15px] tabular-nums text-[#0A0A0A]/35 w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-8 w-8 shrink-0 rounded-md border border-line bg-white grid place-items-center text-[#0A0A0A] group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                          <Icon size={14} strokeWidth={1.75} />
                        </span>
                        <span className="text-[13.5px] leading-snug text-[#0A0A0A]/85 flex-1">
                          {label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <AiTrustRow className="mt-6" />

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button onClick={openDemo} data-testid="pricing-hero-cta" className="btn-primary">
                    Get a custom quote <ArrowRight size={16} />
                  </button>
                  <a href="#modules" data-testid="pricing-modules-link" className="btn-secondary">
                    See what&apos;s included
                  </a>
                </div>
              </div>

              {/* Quote callout card */}
              <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <div
                  className="rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)] p-6 lg:p-8"
                  data-testid="pricing-quote-card"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-8 w-8 rounded-lg grid place-items-center bg-[#0A0A0A] text-white">
                      <MessageSquare size={15} />
                    </span>
                    <div className="leading-tight">
                      <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Request a quote</div>
                      <div className="font-serif-display text-lg">Priced around your group</div>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3">
                    {[
                      { l: "Entities you consolidate", v: "3 · 12 · 50+" },
                      { l: "Modules you need", v: "Consolidation · FP&A · P2P …" },
                      { l: "Close cadence", v: "Monthly · Quarterly" },
                      { l: "Team seats", v: "Named · Unlimited" },
                    ].map((row) => (
                      <div key={row.l} className="flex items-center justify-between text-[13px] border-b border-line/70 pb-2 last:border-b-0 last:pb-0">
                        <span className="text-[#0A0A0A]/60">{row.l}</span>
                        <span className="font-medium text-[#0A0A0A]/85 text-right">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-xl bg-[#F5F0E8] border border-line px-4 py-3 text-[12px] text-[#0A0A0A]/75 flex items-start gap-2">
                    <Timer size={13} className="mt-0.5 shrink-0" />
                    <span>Most quotes come back within one business day. A senior finance-lead reviews every one — no bots, no funnel.</span>
                  </div>

                  <button
                    onClick={openDemo}
                    data-testid="pricing-card-cta"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-[#262626] transition-colors"
                  >
                    Get my quote <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Jump nav */}
        <section className="border-y border-line bg-[#F5F0E8]/60" data-testid="pricing-jumpnav">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex flex-wrap items-center gap-x-8 gap-y-2 text-[13px]">
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/45 mr-2">What&apos;s included</span>
            {CATEGORIES.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                data-testid={`pricing-jump-${c.id}`}
                className="text-[#0A0A0A]/75 hover:text-[#0A0A0A] transition-colors"
              >
                {c.kicker}
              </a>
            ))}
          </div>
        </section>

        {/* Modules */}
        <section id="modules" className="scroll-mt-24">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={cat.id}
              className={`scroll-mt-24 border-b border-line ${idx % 2 === 1 ? "bg-white" : ""}`}
              data-testid={`pricing-category-${cat.id}`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
                <div className="grid lg:grid-cols-12 gap-10">
                  <div className="lg:col-span-4">
                    <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">{cat.kicker}</div>
                    <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">{cat.title}</h2>
                    <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/70 max-w-md">{cat.lede}</p>
                    <button
                      onClick={openDemo}
                      data-testid={`pricing-category-cta-${cat.id}`}
                      className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity"
                    >
                      Add to my quote <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
                    {cat.items.map((it) => {
                      const Icon = it.icon;
                      return (
                        <div
                          key={it.title}
                          className="card-white p-6 flex flex-col hover:-translate-y-0.5 transition-transform"
                          data-testid={`pricing-module-${it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
                              <Icon size={18} strokeWidth={1.75} />
                            </span>
                            <div className="leading-tight">
                              <div className="font-serif-display text-xl">{it.title}</div>
                            </div>
                          </div>

                          <p className="mt-3 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{it.body}</p>

                          <ul className="mt-4 space-y-2 text-[13px] text-[#0A0A0A]/80 flex-1">
                            {it.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2">
                                <Check size={13} className="mt-1 text-emerald-600 shrink-0" />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>

                          {it.cta ? (
                            <Link
                              to={it.cta.to}
                              data-testid={`pricing-module-learn-${it.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                              className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors"
                            >
                              {it.cta.label} <ArrowRight size={12} />
                            </Link>
                          ) : (
                            <div className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/45">Included with every plan</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Comparison-style trust strip */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="rounded-3xl border border-line bg-white p-8 lg:p-14 grid md:grid-cols-12 gap-8 items-center" data-testid="pricing-partner-strip">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">For firms & partners</div>
              <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Firm-friendly economics.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/70">
                Fractional CFOs, CAS practices and fund admins get per-client and per-seat pricing built for resale margin, plus a dedicated forward-deployed team. Land one firm, serve a whole portfolio.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#0A0A0A]/75">
                {["Per-client pricing", "Reseller margin", "Dedicated onboarding", "One workspace, every client"].map((x) => (
                  <li key={x} className="inline-flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <Link
                to="/advisory"
                data-testid="pricing-partner-cta"
                className="btn-primary"
              >
                See For Firms <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#F5F0E8] border-y border-line">
          <div className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Pricing FAQ</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Common questions.</h2>
            <div className="mt-10 divide-y divide-line border-t border-line" data-testid="pricing-faq">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  className="group py-5"
                  data-testid={`pricing-faq-item-${i}`}
                  open={i === 0}
                >
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none">
                    <span className="font-serif-display text-xl sm:text-2xl leading-snug tracking-tight text-[#0A0A0A]">
                      {f.q}
                    </span>
                    <span className="mt-2 h-6 w-6 rounded-full border border-line bg-white grid place-items-center text-[#0A0A0A] transition-transform group-open:rotate-45 shrink-0">
                      <span className="text-lg leading-none pb-0.5">+</span>
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
