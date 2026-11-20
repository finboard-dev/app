import React from "react";
import { Download, PlugZap, ListTree, FileSpreadsheet } from "lucide-react";
import { WRAP, Section, SectionHead, IconBadge, CheckItem } from "@/components/consolidation/primitives";
import {
  PRICE_PER_ENTITY, PRICING_INCLUDES, SPEED_CLAIMS, SWITCH_STEPS, TRIAL_DAYS,
} from "@/data/compare/finboard";
import CtaButtons from "./CtaButtons";

/** Honest fit: where FinBoard wins, and where the other tool is the better choice. */
export function FitSection({ page }) {
  const { fit } = page;
  return (
    <Section id="fit" alt testid="compare-fit">
      <SectionHead eyebrow="Who each fits" color="#059669" title={fit.title} lead={fit.lead} />
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          { name: "FinBoard", points: fit.finboard, highlight: true },
          { name: fit.otherName, points: fit.other, highlight: false },
        ].map(({ name, points, highlight }) => (
          <div key={name} className={`card-white p-6 lg:p-7 ${highlight ? "ring-1 ring-[#0A0A0A]/10" : ""}`}>
            <h3 className="font-serif-display text-xl leading-tight">
              {name} is a better fit if…
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-[14px] text-[#0A0A0A]/80">
              {points.map((p) => <CheckItem key={p}>{p}</CheckItem>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

const STEP_ICONS = [
  { icon: Download, c: "#2563EB" },
  { icon: PlugZap, c: "#7C3AED" },
  { icon: ListTree, c: "#059669" },
  { icon: FileSpreadsheet, c: "#D97706" },
];

/** How switching works: install, connect, map, report. */
export function SwitchSteps({ page }) {
  return (
    <Section id="switch" testid="compare-switch">
      <SectionHead eyebrow="How switching works" color="#7C3AED" title={page.switchTitle} lead="Four steps, all inside Google Sheets." />
      <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SWITCH_STEPS.map((s, i) => (
          <li key={s.title} className="card-white p-6 flex flex-col">
            <div className="flex items-center justify-between">
              <IconBadge {...STEP_ICONS[i]} size="h-10 w-10" iconSize={17} rounded="rounded-lg" />
              <span className="font-mono text-[12px] text-[#0A0A0A]/35">Step {i + 1}</span>
            </div>
            <h3 className="mt-5 font-serif-display text-lg leading-tight">{s.title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/** FinBoard's published price next to what the page can say about the alternative. */
export function PricingSection({ page }) {
  return (
    <Section id="pricing" alt testid="compare-pricing">
      <SectionHead eyebrow="Pricing" color="#D97706" title={page.pricing.title} />
      <div className="mt-10 grid gap-4 lg:grid-cols-12">
        <div className="card-white p-6 lg:p-8 lg:col-span-7">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/50">FinBoard</div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-[13px] text-[#0A0A0A]/60">From</span>
            <strong className="font-serif-display text-4xl leading-none tracking-tight">{PRICE_PER_ENTITY}</strong>
            <span className="text-[13px] text-[#0A0A0A]/60">per entity per month</span>
          </div>
          <p className="mt-2 text-[13px] text-[#0A0A0A]/60">{TRIAL_DAYS}-day free trial.</p>
          <ul className="mt-6 grid gap-x-6 gap-y-2.5 text-[14px] text-[#0A0A0A]/80 sm:grid-cols-2">
            {PRICING_INCLUDES.map((p) => <CheckItem key={p}>{p}</CheckItem>)}
          </ul>
          <CtaButtons className="mt-7" testidPrefix="compare-pricing" />
        </div>
        <div className="card-white p-6 lg:p-8 lg:col-span-5 flex flex-col">
          <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/50">{page.pricing.otherLabel}</div>
          <p className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/80">{page.pricing.other}</p>
          <div className="mt-auto pt-6 border-t border-line text-[12.5px] leading-relaxed text-[#0A0A0A]/55">
            FinBoard&apos;s own figures: {SPEED_CLAIMS.join("; ").toLowerCase()}.
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Closing call to action. */
export function FinalCta({ page }) {
  return (
    <section className="relative" data-testid="compare-final-cta">
      <div className={`${WRAP} py-10 lg:py-12`}>
        <div className="rounded-3xl bg-[#0A0A0A] text-white p-10 lg:p-16 grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.22em] text-white/60">{TRIAL_DAYS}-day free trial</div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight [text-wrap:balance]">
              {page.finalCta}
            </h2>
            <p className="mt-4 text-white/70 max-w-xl text-[14.5px]">
              Install the add-on, connect your QuickBooks Online entities and see a consolidated P&amp;L in Google Sheets.
            </p>
          </div>
          <div className="md:col-span-5 md:flex md:justify-end">
            <CtaButtons dark testidPrefix="compare-final" />
          </div>
        </div>
      </div>
    </section>
  );
}
