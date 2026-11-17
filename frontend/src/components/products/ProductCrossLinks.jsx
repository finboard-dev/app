import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_NAV } from "@/data/products";
import { INDUSTRY_NAV } from "@/data/industries";

// Distinct icon color per module (matches the "Your full finance stack" section on industry pages).
const MODULE_ACCENT = {
  "Month-end close": "#7C3AED",
  "Consolidation":   "#2563EB",
  "Analytics":       "#0891B2",
  "FP&A":            "#059669",
  "Procure-to-Pay":  "#D97706",
  "Order-to-Cash":   "#E11D48",
};

const INDUSTRY_DESC = {
  "Restaurants": "Multi-location restaurant groups",
  "Construction": "Contractors & project accounting",
  "Retail": "Multi-store operations",
  "E-commerce": "DTC brands & marketplaces",
  "Healthcare": "Clinics & multi-site practices",
  "Software & Services": "SaaS & professional services",
};

/** "Your full finance stack" + "Tuned for your industry" sections shared by product pages. */
export default function ProductCrossLinks({ slug, accent }) {
  return (
    <>
        {/* ============================================================
            YOUR FULL FINANCE STACK
        ============================================================ */}
        <section className="border-t border-line bg-[#F5F0E8]" data-testid="product-stack">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <h2 className="font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              Your full finance stack.
            </h2>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="product-cross-links">
              {PRODUCT_NAV.map((p) => {
                const OIcon = p.icon;
                const c = MODULE_ACCENT[p.nav] || p.accent;
                const isCurrent = p.slug === slug;
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    data-testid={`product-cross-link-${p.slug}`}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`group card-white p-4 flex items-center gap-3 transition-all ${
                      isCurrent ? "border-line-strong ring-1 ring-[#0A0A0A]/10" : "hover:-translate-y-0.5 hover:border-line-strong"
                    }`}
                  >
                    <span
                      className="h-10 w-10 shrink-0 rounded-lg border grid place-items-center"
                      style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
                    >
                      <OIcon size={17} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] leading-tight">{p.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55">{p.eyebrow}</div>
                    </div>
                    {isCurrent ? (
                      <span className="shrink-0 text-[9px] uppercase tracking-[0.14em] font-semibold text-[#0A0A0A]/40">You&apos;re here</span>
                    ) : (
                      <ArrowRight size={15} className="shrink-0 text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            TUNED FOR YOUR INDUSTRY
        ============================================================ */}
        <section className="border-t border-line" data-testid="product-industries">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>Tuned for your industry</div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
              Built for how your industry runs.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">
              The same close, consolidate and report engine, reshaped to exactly how your industry books revenue, tracks jobs, and runs its month.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="product-industry-links">
              {INDUSTRY_NAV.map((ind, i) => {
                const IIcon = ind.icon;
                const desc = INDUSTRY_DESC[ind.nav] || ind.eyebrow;
                return (
                  <Link
                    key={ind.slug}
                    href={`/industries/${ind.slug}`}
                    data-testid={`product-industry-${ind.slug}`}
                    className="group card-white p-5 hover:-translate-y-0.5 hover:border-line-strong transition-all animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="h-11 w-11 rounded-lg border grid place-items-center"
                        style={{ backgroundColor: `${ind.accent}e6`, borderColor: `${ind.accent}3d`, color: "#fff" }}
                      >
                        <IIcon size={18} strokeWidth={1.75} />
                      </span>
                      <ArrowRight size={16} className="text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div className="mt-4 font-medium text-[15px] leading-tight">{ind.nav}</div>
                    <div className="mt-1 text-[12.5px] text-[#0A0A0A]/55">{desc}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
    </>
  );
}
