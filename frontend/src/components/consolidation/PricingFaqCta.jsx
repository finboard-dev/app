"use client";

import React from "react";
import { ArrowRight, ChevronDown, MessageSquareQuote } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PLAN, FAQS, SHEETS_ADDON_URL, PRICE_PER_ENTITY, TRIAL_DAYS } from "@/data/consolidationPage";
import { Section, SectionHead, CheckItem, WRAP } from "./primitives";
import { INSTALL_LABEL } from "@/data/trial";

const TRIAL_LABEL = INSTALL_LABEL;
const FAQ_VISIBLE = 4;

export function PricingPlan({ onBookDemo }) {
  return (
    <Section id="pricing" testid="consolidation-pricing">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5 flex flex-col gap-4">
          <SectionHead eyebrow="Pricing" title={<>Simple <span className="italic">per-entity</span> pricing.</>} />
          <p className="text-[14.5px] leading-relaxed text-[#0A0A0A]/70 max-w-md">
            {TRIAL_DAYS}-day free trial. Add entities as your group grows.
          </p>
          <p className="text-[14.5px] text-[#0A0A0A]/70">
            Consolidating a complex group?{" "}
            <button type="button" onClick={onBookDemo} className="font-semibold text-[#2563EB] underline underline-offset-2 hover:text-[#0A0A0A]">
              Book a demo
            </button>
          </p>
        </div>

        <div className="lg:col-span-7 card-white p-7 lg:p-8 flex flex-col gap-5" data-testid="consolidation-plan">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-medium">{PLAN.name}</span>
            <span className="rounded-full bg-[#2563EB]/10 text-[#2563EB] px-3 py-1 text-[12px] font-semibold">
              {TRIAL_DAYS}-day free trial
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2 text-[#0A0A0A]/70">
            <span>From</span>
            <strong className="font-serif-display text-4xl leading-none tracking-tight text-[#0A0A0A]">{PRICE_PER_ENTITY}</strong>
            <span>per entity per month</span>
          </div>
          <ul className="grid sm:grid-cols-2 sm:grid-flow-row-dense gap-x-5 gap-y-2.5 pt-5 border-t border-line text-[13.5px] text-[#0A0A0A]/85">
            {PLAN.includes.map((t) => <CheckItem key={t} className={t.length > 30 ? "sm:col-span-2" : ""}>{t}</CheckItem>)}
          </ul>
          <a href={SHEETS_ADDON_URL} target="_blank" rel="noopener noreferrer" className="btn-primary w-full">
            {TRIAL_LABEL} <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </Section>
  );
}

export function ConsolidationFaq() {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? FAQS : FAQS.slice(0, FAQ_VISIBLE);
  const remaining = FAQS.length - FAQ_VISIBLE;

  return (
    <Section id="faq" alt testid="consolidation-faq">
      <div className="max-w-4xl">
        <SectionHead eyebrow="FAQ" title="Frequently asked questions." />
        <Accordion type="single" collapsible className="mt-8 border-t border-line">
          {visible.map((it, i) => (
            <AccordionItem key={it.q} value={`item-${i}`} className="border-b border-line">
              <AccordionTrigger className="text-left text-[15.5px] font-medium py-4 hover:no-underline">{it.q}</AccordionTrigger>
              <AccordionContent className="text-[#0A0A0A]/70 leading-relaxed pb-4 text-[14px]">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-line bg-white hover:bg-[#F5F0E8] transition-colors"
        >
          {expanded ? "Show fewer questions" : `Show ${remaining} more questions`}
          <ChevronDown size={15} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </Section>
  );
}

export function ClosingBand({ onBookDemo }) {
  return (
    <section className="relative">
      <div className={`${WRAP} py-10 lg:py-12`}>
        <div className="rounded-3xl bg-[#0A0A0A] text-white p-10 lg:p-16 grid md:grid-cols-12 gap-10 items-end" data-testid="cta-band">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-[0.22em] text-white/60">Start in Google Sheets</div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              Your consolidated financials are <span className="italic">one install away</span>.
            </h2>
            <p className="mt-4 text-white/70 max-w-xl">
              Connect QuickBooks and see the whole group in Google Sheets.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
            <a
              href={SHEETS_ADDON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-[#F5F0E8] transition-colors"
            >
              Install free <ArrowRight size={16} />
            </a>
            <button
              type="button"
              onClick={onBookDemo}
              className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <MessageSquareQuote size={16} /> Book Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
