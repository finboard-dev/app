import React from "react";
import { Download, ShieldCheck } from "lucide-react";
import { LogoMark, CLIENT_LOGOS } from "@/components/landing/ClientLogos";
import { HERO, SHEETS_ADDON_URL, PRICE_PER_ENTITY } from "@/data/consolidationPage";
import { INSTALL_LABEL, TRIAL_DAYS } from "@/data/trial";
import { WRAP, CheckItem, Pill } from "./primitives";

const ALL_LOGOS = [...CLIENT_LOGOS.operators.logos, ...CLIENT_LOGOS.firms.logos];

export default function Hero() {
  return (
    <>
      <section className="relative overflow-hidden" data-testid="consolidation-hero">
        <div className="grain absolute inset-0" />
        <div className={`relative ${WRAP} pt-8 lg:pt-14 pb-12 lg:pb-20`}>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5 flex flex-col gap-6 animate-fade-up">
              <div className="font-serif-display italic text-lg sm:text-xl text-[#0A0A0A]/55">{HERO.eyebrow}</div>
              <h1 className="-mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.9rem] leading-[1.02] tracking-tight" data-testid="product-heading">
                {HERO.headlineLead} <span className="italic">{HERO.headlineItalic}</span>
              </h1>
              <p className="text-[15px] leading-relaxed text-[#0A0A0A]/75 max-w-xl">{HERO.lede}</p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5 text-[13.5px] text-[#0A0A0A]/85">
                {HERO.bullets.map((b) => <CheckItem key={b}>{b}</CheckItem>)}
              </ul>

              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 mr-1 text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A]/55">
                  <ShieldCheck size={12} /> Secure by design
                </span>
                {HERO.trust.map((t) => <Pill key={t}>{t}</Pill>)}
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <a href={SHEETS_ADDON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary" data-testid="consolidation-start-trial">
                  <Download size={16} /> {INSTALL_LABEL}
                </a>
                <a href="#how" className="btn-secondary">See how it works</a>
              </div>
              <p className="-mt-2 text-[13px] text-[#0A0A0A]/55">
                Free for {TRIAL_DAYS} days, then from {PRICE_PER_ENTITY} per entity per month.
              </p>
            </div>

            <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
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
