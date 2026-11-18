"use client";

import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { WRAP } from "@/components/consolidation/primitives";
import { Band, Aurora } from "./Layout";
import { Reveal } from "./motion";
import { FAQS, STEPS, FOUNDER, DISCOVERY_LABEL, HERO, CLOSE_DAYS } from "@/data/accountingServices";

/** FAQ: heading on the left, questions on the right. */
export function Faq({ onDiscovery }) {
  return (
    <Band id="faq" testid="accounting-faq">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> FAQ
          </div>
          <h2 className="mt-4 font-serif-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.04] tracking-[-0.03em]">
            Questions, <span className="italic">answered</span>.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-[#0A0A0A]/60">Anything else? Ask us on the call.</p>
          <button type="button" onClick={onDiscovery} className="btn-secondary mt-7">
            {DISCOVERY_LABEL} <ArrowRight size={15} />
          </button>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={100}>
          <Accordion type="single" collapsible className="border-t border-line">
            {FAQS.map((it, i) => (
              <AccordionItem key={it.q} value={`item-${i}`} className="border-b border-line">
                <AccordionTrigger className="py-5 text-left text-[17px] font-medium hover:no-underline">{it.q}</AccordionTrigger>
                <AccordionContent className="pb-5 text-[15px] leading-relaxed text-[#0A0A0A]/65">{it.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Band>
  );
}

/** Closing call to action: the discovery call, who you'll meet, and what happens next. */
export function FinalCta({ onDiscovery }) {
  return (
    <section className="relative" data-testid="accounting-cta">
      <div className={`${WRAP} pb-14 lg:pb-20`}>
        <Reveal className="relative grid grid-cols-1 overflow-hidden rounded-[2rem] bg-[#0A0A0A] text-white lg:grid-cols-12">
          <Aurora />
          <div className="relative p-8 sm:p-12 lg:col-span-7 lg:p-16">
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">Discovery call</div>
            <h2 className="mt-4 font-serif-display text-[2rem] sm:text-[2.6rem] lg:text-[3.25rem] leading-[1.02] tracking-[-0.035em]">
              See your books <span className="acct-gradient-text italic pr-[0.06em]">on a 30-minute call.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/65">
              Tell us about your company and your tools. We&apos;ll show you what your close and dashboards would look like.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <button
                type="button"
                onClick={onDiscovery}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[#0A0A0A] transition hover:-translate-y-0.5 hover:bg-[#F5F0E8]"
              >
                {DISCOVERY_LABEL} <ArrowRight size={16} />
              </button>
              <span className="text-[12.5px] text-white/50">{HERO.microcopy}</span>
            </div>
            <ol className="mt-10 grid gap-5 border-t border-white/10 pt-8 sm:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title}>
                  <span className="font-mono text-[11px] text-white/40">0{i + 1}</span>
                  <div className="mt-1 text-[14px] font-semibold">{s.title}</div>
                  <div className="mt-1 text-[12.5px] leading-snug text-white/55">{s.body}</div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative flex items-center p-8 pt-0 sm:p-12 sm:pt-0 lg:col-span-5 lg:p-16 lg:pl-4">
            <div className="relative w-full rounded-3xl bg-white/[0.06] p-6 ring-1 ring-white/10 backdrop-blur lg:p-7">
              <div className="flex items-center gap-4">
                <img src={FOUNDER.photo} alt={FOUNDER.name} className="h-16 w-16 rounded-2xl object-cover object-[center_15%]" />
                <div>
                  <div className="text-[15px] font-semibold">{FOUNDER.name}</div>
                  <div className="text-[12.5px] text-white/55">{FOUNDER.role}</div>
                </div>
              </div>
              <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">{FOUNDER.bio}</p>
              <div className="acct-float absolute -bottom-6 right-6 rounded-2xl bg-white px-4 py-3 text-[#0A0A0A] shadow-[0_20px_50px_-15px_rgba(0,0,0,.5)]">
                <div className="flex items-center gap-2 text-[12.5px] font-semibold">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-white"><Check size={10} strokeWidth={3} /></span>
                  October books closed
                </div>
                <div className="mt-0.5 pl-6 text-[11px] text-[#0A0A0A]/55">Day {CLOSE_DAYS} · Sample</div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
