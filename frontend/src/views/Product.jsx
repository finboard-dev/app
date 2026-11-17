"use client";

import React from "react";
import { ArrowRight, Check, Timer, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import ProductVisual from "@/components/products/ProductVisuals";
import ProductCrossLinks from "@/components/products/ProductCrossLinks";
import { PRODUCTS_BY_SLUG } from "@/data/products";


// Vibrant per-feature accent cycle for the "What you get" cards.
const FEATURE_ACCENTS = ["#7C3AED", "#2563EB", "#0891B2", "#059669", "#D97706", "#E11D48"];


export default function Product({ slug }) {
  const product = PRODUCTS_BY_SLUG[slug];
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  const {
    nav, kicker, headlineLead, headlineItalic, headlineTail, subhead,
    capabilities, features, steps, metrics,
  } = product;

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`product-page-${slug}`}>
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO
        ============================================================ */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-12 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-5 animate-fade-up">
                <div className="font-serif-display italic text-lg sm:text-xl text-[#0A0A0A]/55" data-testid="product-kicker">
                  {kicker}
                </div>

                <h1
                  className="mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight text-[#0A0A0A]"
                  data-testid="product-heading"
                >
                  {headlineLead} <span className="italic">{headlineItalic}</span> {headlineTail}
                </h1>

                <p
                  className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75"
                  data-testid="product-subhead"
                >
                  {subhead}
                </p>

                <ul
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-xl"
                  data-testid="product-capabilities"
                >
                  {capabilities.map(({ icon: CapIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <span className="h-6 w-6 shrink-0 rounded-md border border-line bg-white grid place-items-center">
                        <CapIcon size={12} strokeWidth={1.75} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <AiTrustRow className="mt-5" />

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openDemo}
                    data-testid="product-book-demo-button"
                    className="btn-primary"
                  >
                    Book Demo <ArrowRight size={16} />
                  </button>
                  <a href="#how" data-testid="product-how-link" className="btn-secondary">
                    See how it works
                  </a>
                </div>
              </div>

              {/* Right: product-specific graphic */}
              <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <ProductVisual slug={slug} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FEATURES
        ============================================================ */}
        <section className="border-t border-line bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: FEATURE_ACCENTS[0] }} />
                  What you get
                </div>
                <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-2xl">
                  {nav}, <span className="italic">built for multi-entity groups</span>.
                </h2>
              </div>
              <div className="lg:col-span-5 text-[13.5px] text-[#0A0A0A]/60 lg:text-right">
                Every capability sits on the same governed data as your ledgers - everything traceable, everything auditable.
              </div>
            </div>

            <div className="mt-10 grid sm:grid-cols-2 gap-4" data-testid="product-features">
              {features.map(({ icon: FIcon, title, body }, i) => {
                const c = FEATURE_ACCENTS[i % FEATURE_ACCENTS.length];
                return (
                  <div
                    key={title}
                    className="group card-white p-6 relative overflow-hidden hover:-translate-y-1 hover:border-line-strong transition-all animate-fade-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    {/* accent wash that reveals on hover */}
                    <div
                      className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: c }}
                      aria-hidden
                    />
                    <div className="flex items-start justify-between">
                      <span
                        className="h-12 w-12 rounded-xl border grid place-items-center shadow-sm"
                        style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
                      >
                        <FIcon size={20} strokeWidth={1.75} />
                      </span>
                      <span className="font-serif-display text-[15px] tabular-nums text-[#0A0A0A]/25">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-5 font-serif-display text-xl leading-tight">{title}</h3>
                    <p className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW IT WORKS + METRICS
        ============================================================ */}
        <section id="how" className="scroll-mt-20 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              How it works
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              Live in 30 days or less.
            </h2>

            {/* Steps timeline */}
            <div className="mt-10 relative" data-testid="product-steps">
              {/* Horizontal spine */}
              <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-line" aria-hidden />

              <div className="grid md:grid-cols-3 gap-4">
                {steps.map((s, i) => (
                  <div key={s.title} className="relative">
                    <div className="relative bg-sand px-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-7 w-7 rounded-full bg-[#0A0A0A] text-white grid place-items-center font-mono text-[11px]">
                          {i + 1}
                        </span>
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#0A0A0A]/55 font-semibold">
                          Step {i + 1}
                        </span>
                      </span>
                    </div>
                    <div className="mt-4 card-white p-5">
                      <div className="font-serif-display text-lg leading-tight">{s.title}</div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics band */}
            <div className="mt-8 rounded-2xl border border-line bg-white overflow-hidden" data-testid="product-metrics">
              <div className="grid grid-cols-3 divide-x divide-line">
                {metrics.map((m) => (
                  <div key={m.label} className="p-6 text-center">
                    <div className="font-serif-display text-2xl sm:text-3xl tracking-tight">{m.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 border-t border-line bg-[#F9F6F0] text-[12px] text-[#0A0A0A]/70">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={12} /> Custom workflow
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Timer size={12} /> 30 days or less
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck size={12} /> Pay on value
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[#0A0A0A]/60">
                  <Check size={12} /> Governed, auditable, drillable
                </span>
              </div>
            </div>
          </div>
        </section>

        <ProductCrossLinks slug={slug} accent={product.accent} />

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
