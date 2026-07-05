import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Sparkles, Database,
  Layers, Timer, MessageSquare,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { PRODUCT_NAV } from "@/data/products";

// Flat module list — each links to the matching product page.
// Platform is the shared foundation and has no dedicated product page.
const MODULES = [
  {
    slug: "platform",
    icon: Layers,
    tag: "Platform",
    title: "FinBoard Platform",
    body: "The workspace that unifies every ledger, connector and person, with one governed data model, audit trail and role-based access.",
    to: null,
  },
  ...PRODUCT_NAV.map((p) => ({
    slug: p.slug,
    icon: p.icon,
    tag: p.eyebrow,
    title: p.nav,
    body: p.subhead,
    to: `/products/${p.slug}`,
  })),
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
                <h1 className="font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight text-[#0A0A0A]" data-testid="pricing-heading">
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

                <AiTrustRow className="mt-6" />
              </div>
            </div>
          </div>
        </section>

        {/* Modules — compact card grid, each linked to its product page */}
        <section id="modules" className="scroll-mt-24 border-t border-line bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">What&apos;s included</div>
              <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                Explore the modules.
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/70">
                Every plan starts with the FinBoard platform. Turn on the modules your group actually runs — swap them in and out as you scale.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4" data-testid="pricing-modules-grid">
              {MODULES.map((m) => {
                const Icon = m.icon;
                const cardBody = (
                  <div
                    className={`card-white p-6 flex flex-col h-full ${m.to ? "group cursor-pointer hover:-translate-y-0.5 transition-transform" : ""}`}
                    data-testid={`pricing-module-${m.slug}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
                        <Icon size={18} strokeWidth={1.75} />
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/40">
                        {m.tag}
                      </span>
                    </div>
                    <div className="mt-4 font-serif-display text-xl leading-tight">{m.title}</div>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#0A0A0A]/65 flex-1">{m.body}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#0A0A0A]/70 group-hover:text-[#0A0A0A] transition-colors">
                      {m.to ? (
                        <>Explore module <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" /></>
                      ) : (
                        <span className="text-[11px] uppercase tracking-[0.2em] text-[#0A0A0A]/45">Included with every plan</span>
                      )}
                    </div>
                  </div>
                );
                return m.to ? (
                  <Link key={m.slug} to={m.to} className="block h-full">
                    {cardBody}
                  </Link>
                ) : (
                  <div key={m.slug} className="h-full">{cardBody}</div>
                );
              })}
            </div>
          </div>
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

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
