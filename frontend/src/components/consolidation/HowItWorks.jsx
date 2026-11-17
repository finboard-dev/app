"use client";

import React from "react";
import { STEPS, STATS, CHIPS, CONSOLIDATED_PL, WORKSPACE, AUDIENCES } from "@/data/consolidationPage";
import Sheet, { SheetTable, SheetSidebar } from "./SheetTable";
import { Section, SectionHead, Pill } from "./primitives";

const FRAME = "rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]";

export function HowItWorks() {
  const [step, setStep] = React.useState(0);
  const current = STEPS[step];

  return (
    <Section id="how" alt testid="product-steps">
      <SectionHead eyebrow="How it works" color="#D97706" title={<>From install to consolidated numbers <span className="italic">in three steps</span>.</>} />

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {STEPS.map((s, i) => {
          const on = i === step;
          return (
            <button
              key={s.title}
              type="button"
              aria-pressed={on}
              aria-controls="demo-frame"
              onClick={() => setStep(i)}
              className={`text-left card-white p-5 flex flex-col gap-1.5 transition-all ${
                on ? "border-[#0A0A0A] ring-1 ring-[#0A0A0A]" : "hover:-translate-y-0.5 hover:border-line-strong"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span className={`h-7 w-7 rounded-full grid place-items-center font-mono text-[11px] ${on ? "bg-[#0A0A0A] text-white" : "bg-[#F5F0E8] text-[#0A0A0A]/70"}`}>
                  {i + 1}
                </span>
                <span className={`text-[10.5px] uppercase tracking-[0.16em] font-semibold ${on ? "text-[#2563EB]" : "text-[#0A0A0A]/55"}`}>
                  Step {i + 1}
                </span>
              </span>
              <span className="mt-2 font-serif-display text-lg leading-tight">{s.title}</span>
              <span className="text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{s.body}</span>
            </button>
          );
        })}
      </div>

      <div id="demo-frame" aria-live="polite" className={`mt-6 aspect-[1600/878] ${FRAME}`}>
        {current.image ? (
          <img
            src={current.image.src}
            width={current.image.width}
            height={current.image.height}
            alt={current.image.alt}
            className="h-full w-full object-cover object-left-top"
          />
        ) : (
          <Sheet className="h-full">
            <SheetTable {...CONSOLIDATED_PL} />
            <SheetSidebar items={CONSOLIDATED_PL.sidebar} />
          </Sheet>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-line bg-white overflow-hidden" data-testid="product-metrics">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-line">
          {STATS.map((m) => (
            <div key={m.label} className="p-6 text-center">
              <div className="font-serif-display text-2xl sm:text-3xl tracking-tight">{m.value}</div>
              <div className="mt-1 text-[10.5px] uppercase tracking-[0.15em] text-[#0A0A0A]/55">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {CHIPS.map((c) => <Pill key={c}>{c}</Pill>)}
      </div>
    </Section>
  );
}

export function Workspace() {
  return (
    <Section id="workspace" testid="consolidation-workspace">
      <SectionHead
        eyebrow="Web workspace"
        color="#7C3AED"
        title={<>The setup lives in one place, <span className="italic">so every sheet stays consistent</span>.</>}
        lead="Alongside the add-on, FinBoard gives you a web workspace for mapping accounts and sharing dashboards, working from the same QuickBooks data as your sheet."
      />
      <div className="mt-12 flex flex-col gap-14 lg:gap-16">
        {WORKSPACE.map(({ title, body, image }, i) => (
          <div key={title} className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <figure className={`lg:col-span-7 m-0 ${FRAME} ${i % 2 ? "lg:order-2" : ""}`}>
              <img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" className="w-full h-auto" />
            </figure>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
              <h3 className="font-serif-display text-xl sm:text-2xl leading-tight">{title}</h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function Audiences() {
  return (
    <Section id="who" alt testid="consolidation-audiences">
      <SectionHead eyebrow="Who it’s for" color="#0891B2" title={<>For the people who <span className="italic">close the books</span>.</>} />
      <div className="mt-10 grid md:grid-cols-3 gap-8">
        {AUDIENCES.map(({ title, body }) => (
          <div key={title} className="border-t-2 border-[#0A0A0A] pt-5">
            <h3 className="font-serif-display text-lg leading-tight">{title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
