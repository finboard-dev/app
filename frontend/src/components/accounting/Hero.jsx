import React from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { LogoMark, CLIENT_LOGOS } from "@/components/landing/ClientLogos";
import { WRAP } from "@/components/consolidation/primitives";
import HeroCollage from "./HeroCollage";
import { Aurora } from "./Layout";
import { Reveal } from "./motion";
import { HERO, STATS, DISCOVERY_LABEL, CONTACT_EMAIL, EMAIL_CTA } from "@/data/accountingServices";

const ALL_LOGOS = [...CLIENT_LOGOS.operators.logos, ...CLIENT_LOGOS.firms.logos];
const STAT_COLORS = ["#059669", "#2563EB", "#7C3AED", "#D97706"];

/** Dark hero; the product collage straddles the edge into the sand page below. */
export function Hero({ onDiscovery }) {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white" data-testid="accounting-hero">
      <Aurora />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 lg:h-60 bg-sand" />
      <div className={`relative ${WRAP} pt-16 lg:pt-24 text-center animate-fade-up`}>
        <h1 className="mx-auto max-w-4xl font-serif-display text-[2.9rem] sm:text-[4rem] lg:text-[5.5rem] leading-[0.95] tracking-[-0.045em]">
          {HERO.titleLead}
          <br />
          <span className="acct-gradient-text italic pr-[0.08em]">{HERO.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed text-white/70 [text-wrap:pretty]">{HERO.lede}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
          <button
            type="button"
            onClick={onDiscovery}
            data-testid="accounting-discovery"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[#0A0A0A] shadow-[0_10px_40px_-10px_rgba(255,255,255,.45)] transition hover:-translate-y-0.5 hover:bg-[#F5F0E8]"
          >
            {DISCOVERY_LABEL} <ArrowRight size={16} />
          </button>
          <a href="#how" className="inline-flex items-center gap-2 text-[15px] text-white/75 transition-colors hover:text-white">
            {HERO.secondary} <ArrowDown size={15} />
          </a>
        </div>
        <p className="mt-4 text-[12.5px] text-white/45">
          {HERO.microcopy} ·{" "}
          <a href={EMAIL_CTA.href} data-testid="accounting-hero-email" className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
            {EMAIL_CTA.prompt} {CONTACT_EMAIL}
          </a>
        </p>
      </div>
      <div className={`relative ${WRAP} mt-14 lg:mt-20 pb-10 lg:pb-14 animate-fade-up`} style={{ animationDelay: "150ms" }}>
        <HeroCollage />
      </div>
    </section>
  );
}

/** Service commitments in big numbers, then the customer logo row. */
export function Proof() {
  return (
    <section aria-label="What you can count on" className={`${WRAP} pt-6 pb-20 lg:pb-24`} data-testid="accounting-proof">
      <Reveal className="grid grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-line bg-[#E5E0D8]">
        {STATS.map(({ label, value, note }, i) => (
          <div key={label} className="bg-white p-6 lg:p-8">
            <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#0A0A0A]/55">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: STAT_COLORS[i] }} />
              {label}
            </div>
            <div className="mt-4 font-serif-display text-[2.1rem] lg:text-[2.9rem] leading-none tracking-[-0.03em] tabular-nums">{value}</div>
            <p className="mt-3 text-[13px] leading-snug text-[#0A0A0A]/60">{note}</p>
          </div>
        ))}
      </Reveal>
      <Reveal className="mt-12 flex flex-col items-center gap-6" delay={100}>
        <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Trusted by finance teams at</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 opacity-80">
          {ALL_LOGOS.map((l) => <LogoMark key={l.name} {...l} imgClass="h-6" />)}
        </div>
      </Reveal>
    </section>
  );
}
