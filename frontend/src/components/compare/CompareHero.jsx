import React from "react";
import { GitMerge, ListTree, RefreshCw, Scale } from "lucide-react";
import { WRAP, IconBadge } from "@/components/consolidation/primitives";
import { HERO_POINTS, MARKETPLACE_PROOF, PRICE_LINE } from "@/data/compare/finboard";
import CtaButtons from "./CtaButtons";

// One icon per HERO_POINTS entry, in order.
const POINT_ICONS = [
  { icon: Scale, c: "#2563EB" },
  { icon: GitMerge, c: "#7C3AED" },
  { icon: ListTree, c: "#059669" },
  { icon: RefreshCw, c: "#D97706" },
];

/** Comparison hero: the search-matching question, a short answer, both CTAs and the product. */
export default function CompareHero({ page }) {
  return (
    <section className="relative overflow-hidden" data-testid="compare-hero">
      <div className="grain absolute inset-0" />
      <div className={`relative ${WRAP} pt-8 lg:pt-14 pb-12 lg:pb-20`}>
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 animate-fade-up">
            <h1
              className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.04] tracking-tight [text-wrap:balance]"
              data-testid="compare-heading"
            >
              {page.h1}
            </h1>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75">{page.lede}</p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-xl">
              {HERO_POINTS.map((point, i) => (
                <li key={point} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                  <IconBadge {...POINT_ICONS[i]} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <CtaButtons className="mt-7" testidPrefix="compare-hero" />
            <p className="mt-3 text-[12.5px] text-[#0A0A0A]/55">{PRICE_LINE}</p>
            {MARKETPLACE_PROOF && (
              <p className="mt-1 text-[12.5px] text-[#0A0A0A]/55">{MARKETPLACE_PROOF}</p>
            )}
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
                alt="The FinBoard add-on open in the Google Sheets sidebar, next to a monthly profit and loss report pulled from QuickBooks Online"
                className="w-full h-auto"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
