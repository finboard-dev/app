import React from "react";
import { Download, GitMerge, ListTree, BarChart3, Gauge } from "lucide-react";
import { LogoMark, CLIENT_LOGOS } from "@/components/landing/ClientLogos";
import { HERO, SHEETS_ADDON_URL, PRICE_PER_ENTITY } from "@/data/consolidationPage";
import { TRIAL_DAYS } from "@/data/trial";
import { WRAP, IconBadge } from "./primitives";
import TrustBadges from "./TrustBadges";

// One icon per HERO.bullets entry, in order.
const BULLET_ICONS = [
  { icon: GitMerge, c: "#2563EB" },
  { icon: ListTree, c: "#7C3AED" },
  { icon: BarChart3, c: "#059669" },
  { icon: Gauge, c: "#D97706" },
];

const ALL_LOGOS = [...CLIENT_LOGOS.operators.logos, ...CLIENT_LOGOS.firms.logos];

export default function Hero({ onBookDemo }) {
  return (
    <>
      <section className="relative overflow-hidden" data-testid="consolidation-hero">
        <div className="grain absolute inset-0" />
        <div className={`relative ${WRAP} pt-8 lg:pt-14 pb-12 lg:pb-20`}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 animate-fade-up">
              <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight [text-wrap:balance]" data-testid="product-heading">
                {HERO.headlineLead} <span className="italic">{HERO.headlineItalic}</span>
              </h1>
              <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75">{HERO.lede}</p>

              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-xl">
                {HERO.bullets.map((b, i) => {
                  const { icon, c } = BULLET_ICONS[i];
                  return (
                    <li key={b} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <IconBadge icon={icon} c={c} />
                      <span>{b}</span>
                    </li>
                  );
                })}
              </ul>

              <TrustBadges className="mt-5" />

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a href={SHEETS_ADDON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" data-testid="consolidation-start-trial">
                  <Download size={16} /> Install free
                </a>
                <button type="button" onClick={onBookDemo} className="btn-secondary">Book Demo</button>
              </div>
              <p className="mt-3 text-[12.5px] text-[#0A0A0A]/55">
                Free for {TRIAL_DAYS} days, then from {PRICE_PER_ENTITY} per entity per month.
              </p>
            </div>

            <div className="lg:col-span-7 lg:pl-6 xl:pl-10 animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]">
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-line bg-[#F9F6F0] text-[12px] font-medium text-[#0A0A0A]/60">
                  <span>Google Sheets / FinBoard add-on</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <i className="h-2 w-2 rounded-full bg-current" aria-hidden /> Live
                  </span>
                </div>
                <img
                  src="/products/consolidation/sheets-addon.webp"
                  width={1600}
                  height={878}
                  alt="The FinBoard add-on open in the Google Sheets sidebar, next to a monthly profit and loss report pulled from QuickBooks"
                  className="w-full h-auto"
                  fetchPriority="high"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Customers" className={`${WRAP} pb-12 lg:pb-16`}>
        <div className="rounded-2xl border border-line bg-white px-6 lg:px-8 py-6 flex flex-wrap items-center gap-x-10 gap-y-5">
          <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">Trusted by finance teams at</p>
          <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
            {ALL_LOGOS.map((l) => <LogoMark key={l.name} {...l} imgClass="h-6" />)}
          </div>
        </div>
      </section>
    </>
  );
}
