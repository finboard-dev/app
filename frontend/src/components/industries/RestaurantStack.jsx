import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Square as SquareIcon } from "lucide-react";
import { PRODUCT_NAV } from "@/data/products";

/**
 * Restaurants "stack" block - redesigned integrations + finance stack + cross-industry links.
 * Same monochrome + accent language as the rest of the site (card-white surfaces,
 * hairline borders, serif headings); brand colors are used only for the connector logos.
 */

// Brand-colored connector logos (restaurants integrations).
const BRAND = {
  "Toast":         { bg: "#FF4C00", label: "T" },
  "7shifts":       { bg: "#E5484D", label: "7" },
  "QuickBooks":    { bg: "#2CA01C", label: "qb" },
  "Restaurant365": { bg: "#12284C", label: "365" },
  "Square":        { bg: "#0A0A0A", label: null },
};

// Distinct icon color per module (product data marks a couple as ink/black, which reads as grey).
const MODULE_ACCENT = {
  "Month-end close": "#7C3AED",
  "Consolidation":   "#2563EB",
  "Analytics":       "#0891B2",
  "FP&A":            "#059669",
  "Procure-to-Pay":  "#D97706",
  "Order-to-Cash":   "#E11D48",
};

// Cross-industry descriptions (keyed by nav label; falls back to the industry eyebrow).
const CROSS_DESC = {
  "Construction": "Contractors & project accounting",
  "Retail": "Multi-store operations",
  "E-commerce": "DTC brands & marketplaces",
  "Healthcare": "Clinics & multi-site practices",
  "Software & Services": "SaaS & professional services",
};

function IndexLabel({ n, children, accent }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif-display italic text-[15px] leading-none" style={{ color: accent }}>
        {n}
      </span>
      <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55 whitespace-nowrap">
        {children}
      </span>
      <span className="flex-1 h-px bg-line" />
    </div>
  );
}

function Eyebrow({ accent, children }) {
  return (
    <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>
      {children}
    </div>
  );
}

export default function RestaurantStack({ accent = "#C2410C", integrations = [], others = [] }) {
  return (
    <>
      {/* Connects to your stack */}
      <section className="border-t border-line bg-[#F5F0E8]" data-testid="restaurant-stack">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <Eyebrow accent={accent}>Connects to your stack</Eyebrow>
          <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
            The tools you already run.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">
            Two-way sync with the systems you run today. No rip-and-replace. No six-month migration
            project - just a live connection.
          </p>

          {/* 01 - live connectors */}
          <div className="mt-10">
            <IndexLabel n="01" accent={accent}>Live connectors</IndexLabel>
            <div
              className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              data-testid="industry-integrations"
            >
              {integrations.map((name, i) => {
                const b = BRAND[name] || { bg: "#0A0A0A", label: name.slice(0, 2) };
                return (
                  <div
                    key={name}
                    className="card-white p-4 flex items-center gap-3 animate-fade-up"
                    style={{ animationDelay: `${i * 50}ms` }}
                  >
                    <span
                      className="h-10 w-10 shrink-0 rounded-lg grid place-items-center text-white font-semibold text-[12px] tracking-tight"
                      style={{ background: b.bg }}
                    >
                      {b.label === null ? <SquareIcon size={16} strokeWidth={2.25} /> : b.label}
                    </span>
                    <span className="text-[14px] font-medium">{name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 02 - full finance stack */}
          <div className="mt-10">
            <IndexLabel n="02" accent={accent}>Your full finance stack</IndexLabel>
            <div
              className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              data-testid="industry-modules"
            >
              {PRODUCT_NAV.map((p) => {
                const PIcon = p.icon;
                const c = MODULE_ACCENT[p.nav] || p.accent;
                return (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    data-testid={`industry-module-${p.slug}`}
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
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Beyond restaurants */}
      <section className="border-t border-line" data-testid="restaurant-beyond">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
          <Eyebrow accent={accent}>Beyond restaurants</Eyebrow>
          <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
            Not a restaurant? <span className="italic">We&apos;ve got you covered.</span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">
            Don&apos;t worry - the same close, consolidate and report engine, reshaped to exactly how
            your industry books revenue, tracks jobs, and runs its month.
          </p>

          <div
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            data-testid="industry-cross-links"
          >
            {others.map((ind, i) => {
              const OIcon = ind.icon;
              const desc = CROSS_DESC[ind.nav] || ind.eyebrow;
              return (
                <Link
                  key={ind.slug}
                  to={`/industries/${ind.slug}`}
                  data-testid={`industry-cross-link-${ind.slug}`}
                  className="group card-white p-5 hover:-translate-y-0.5 hover:border-line-strong transition-all animate-fade-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="h-11 w-11 rounded-lg border grid place-items-center"
                      style={{ backgroundColor: `${ind.accent}e6`, borderColor: `${ind.accent}3d`, color: "#fff" }}
                    >
                      <OIcon size={18} strokeWidth={1.75} />
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all"
                    />
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
