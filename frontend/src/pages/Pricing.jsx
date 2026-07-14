import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Sparkles, Database, Timer, MessageSquare,
  Tag, Percent, Rocket, LayoutGrid,
  ShieldCheck, FileCheck, UserCheck, Eye, Route,
  LifeBuoy, GraduationCap, Clock, Video, Mail, MonitorPlay, Slack,
} from "lucide-react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import { PRODUCT_NAV } from "@/data/products";

// Distinct icon color per module (matches the "Your full finance stack" section on industry pages).
const MODULE_ACCENT = {
  "Month-end close": "#7C3AED",
  "Consolidation":   "#2563EB",
  "Analytics":       "#0891B2",
  "FP&A":            "#059669",
  "Procure-to-Pay":  "#D97706",
  "Order-to-Cash":   "#E11D48",
};

const QUOTE_INCLUDES = [
  { icon: Timer,         label: "Tailored quote in 1 business day",                 c: "#2563EB" },
  { icon: MessageSquare, label: "Answers to close, reporting & spend questions",    c: "#059669" },
  { icon: Database,      label: "Walk-through of how FinBoard scales with your group", c: "#D97706" },
  { icon: Sparkles,      label: "Forward-deployed build plan for your first 30 days", c: "#7C3AED" },
];

// Support model - every plan comes with real finance experts, not a help desk.
const SUPPORT = [
  { icon: GraduationCap, title: "Expert-led support", c: "#2563EB",
    body: "Guidance from finance leads who know close, consolidation and FP&A - not a generic help desk." },
  { icon: Clock, title: "Seven days a week", c: "#059669",
    body: "Responsive support whenever your close is running, weekdays and weekends alike." },
  { icon: Rocket, title: "Dedicated implementation", c: "#D97706",
    body: "Our forward-deployed team configures FinBoard and stands up your workspace with you." },
  { icon: Video, title: "Video-call support", c: "#7C3AED",
    body: "Resolve issues faster with live screen-share sessions and hands-on assistance." },
];

const CHANNELS = [
  { icon: Mail, label: "Email" },
  { icon: Video, label: "Zoom" },
  { icon: MonitorPlay, label: "Screenshare" },
  { icon: Slack, label: "Slack channel" },
];

export default function Pricing() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="pricing-page">
      <Seo
        title="FinBoard Pricing | Priced Around Your Group"
        description="Custom-quoted pricing for your full finance stack, with a forward-deployed build in your first 30 days and support whenever your close is running."
        path="/pricing"
      />
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
                  Priced around your entities, modules and seats - not sticker prices. Tell us how you run finance and we&apos;ll send a quote in a day.
                </p>

                <div className="mt-8 max-w-xl" data-testid="pricing-quote-includes">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.28em] text-[#0A0A0A]/50">Reach out for</span>
                    <span className="h-px flex-1 bg-line" />
                  </div>
                  <ul className="mt-4 divide-y divide-line/70 border-y border-line/70">
                    {QUOTE_INCLUDES.map(({ icon: Icon, label, c }, i) => (
                      <li
                        key={label}
                        className="group flex items-center gap-4 py-3.5 transition-colors hover:bg-[#F5F0E8]/40 -mx-2 px-2 rounded-sm"
                      >
                        <span className="font-serif-display text-[15px] tabular-nums text-[#0A0A0A]/35 w-6 shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="h-8 w-8 shrink-0 rounded-md border grid place-items-center"
                          style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
                        >
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
                    <span>Back in one business day, reviewed by a senior finance lead.</span>
                  </div>

                  <button
                    onClick={openDemo}
                    data-testid="pricing-card-cta"
                    className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium bg-[#0A0A0A] text-white hover:bg-[#262626] transition-colors"
                  >
                    Get my quote <ArrowRight size={15} />
                  </button>

                  {/* Enterprise-safe AI, inside the quote card */}
                  <div className="mt-6 pt-5 border-t border-line" data-testid="ai-trust-row">
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/50">
                      <ShieldCheck size={12} /> Enterprise-safe AI
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-1.5 justify-items-start">
                      {[
                        { icon: FileCheck, l: "Auditable", c: "#2563EB" },
                        { icon: UserCheck, l: "Human approval layer", c: "#059669" },
                        { icon: Eye, l: "Explainable", c: "#D97706" },
                        { icon: Route, l: "Fully traceable", c: "#7C3AED" },
                      ].map(({ icon: Icon, l, c }) => (
                        <span
                          key={l}
                          className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white pl-1 pr-2.5 py-1 text-[11px] text-[#0A0A0A]/80"
                        >
                          <span
                            className="h-5 w-5 shrink-0 rounded-full grid place-items-center"
                            style={{ backgroundColor: c, color: "#fff" }}
                          >
                            <Icon size={11} strokeWidth={2.25} />
                          </span>
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Support - real finance experts, inspired by the "Why FinBoard" support model */}
        <section className="border-t border-line bg-[#F5F0E8]" data-testid="pricing-support-section">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">
                <LifeBuoy size={12} /> Why FinBoard
              </div>
              <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                We&apos;re here to help you succeed.
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/70">
                Every plan comes with real people - finance experts who know your workflows, not a ticket queue.
              </p>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="pricing-support">
              {SUPPORT.map(({ icon: Icon, title, body, c }) => (
                <div key={title} className="card-white p-6 flex flex-col gap-3">
                  <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ backgroundColor: c, color: "#fff" }}>
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div className="font-serif-display text-lg leading-tight">{title}</div>
                  <p className="text-[13px] leading-relaxed text-[#0A0A0A]/65">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/45 mr-1">Reach us on</span>
              {CHANNELS.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3 py-1.5 text-[12.5px] font-medium text-[#0A0A0A]/80">
                  <Icon size={13} className="text-[#0A0A0A]/50" /> {label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Modules - compact card grid, each linked to its product page */}
        <section id="modules" className="scroll-mt-24 border-t border-line bg-white">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">What&apos;s included</div>
              <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                Explore the modules.
              </h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/70">
                Every plan starts with the platform. Turn on the modules you run, swap them as you scale.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="pricing-modules-grid">
              {PRODUCT_NAV.map((p) => {
                const PIcon = p.icon;
                const c = MODULE_ACCENT[p.nav] || p.accent;
                return (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    data-testid={`pricing-module-${p.slug}`}
                    className="group card-white p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:border-line-strong transition-all"
                  >
                    <span
                      className="h-10 w-10 shrink-0 rounded-lg border grid place-items-center"
                      style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
                    >
                      <PIcon size={17} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] leading-tight">{p.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55">{p.eyebrow}</div>
                    </div>
                    <ArrowRight size={15} className="shrink-0 text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all" />
                  </Link>
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
              <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">Firm-friendly economics.</h2>
              <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#0A0A0A]/70">
                Per-client and per-seat pricing built for resale margin, plus a dedicated pod. Land one firm, serve a whole portfolio.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2.5 text-[13px] text-[#0A0A0A]/80">
                {[
                  { icon: Tag, l: "Per-client pricing", c: "#2563EB" },
                  { icon: Percent, l: "Reseller margin", c: "#059669" },
                  { icon: Rocket, l: "Dedicated onboarding", c: "#D97706" },
                  { icon: LayoutGrid, l: "One workspace, every client", c: "#7C3AED" },
                ].map(({ icon: Icon, l, c }) => (
                  <li key={l} className="inline-flex items-center gap-2">
                    <span
                      className="h-6 w-6 shrink-0 rounded-md border grid place-items-center"
                      style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
                    >
                      <Icon size={12} strokeWidth={1.75} />
                    </span>
                    {l}
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
