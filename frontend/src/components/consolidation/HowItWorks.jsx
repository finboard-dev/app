"use client";

import React from "react";
import { Building2, UserRoundCheck, LineChart, LayoutDashboard, ListTree } from "lucide-react";

const WORKSPACE_ICONS = [
  { icon: LayoutDashboard, c: "#0891B2" },
  { icon: ListTree, c: "#7C3AED" },
];
import { STEPS, STATS, CHIPS, CONSOLIDATED_PL, WORKSPACE, AUDIENCES } from "@/data/consolidationPage";
import Sheet, { SheetTable, SheetSidebar } from "./SheetTable";
import { Section, SectionHead, Pill, IconBadge, CheckItem } from "./primitives";

const AUDIENCE_ICONS = [
  { icon: Building2, c: "#0891B2" },
  { icon: UserRoundCheck, c: "#7C3AED" },
  { icon: LineChart, c: "#059669" },
];

const FRAME = "rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]";

export function HowItWorks() {
  const [step, setStep] = React.useState(0);
  const current = STEPS[step];

  return (
    <Section id="how" alt testid="product-steps">
      <SectionHead eyebrow="How it works" color="#D97706" title={<>Live in <span className="italic">three steps</span>.</>} />

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
    <Section id="workspace" alt testid="consolidation-workspace">
      <SectionHead
        eyebrow="Visualisations"
        color="#7C3AED"
        title={<>See the whole group <span className="italic">at a glance</span>.</>}
        lead="Dashboards and account mapping in the FinBoard web app, on the same QuickBooks data as your sheet."
      />
      <div className="mt-12 flex flex-col gap-14 lg:gap-16">
        {WORKSPACE.map(({ eyebrow, title, body, points, image }, i) => (
          <div key={title} className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            <figure className={`lg:col-span-7 m-0 ${FRAME} ${i % 2 ? "lg:order-2" : ""}`}>
              <img src={image.src} width={image.width} height={image.height} alt={image.alt} loading="lazy" className="w-full h-auto" />
            </figure>
            <div className={`lg:col-span-5 ${i % 2 ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-2.5">
                <IconBadge {...WORKSPACE_ICONS[i]} size="h-8 w-8" iconSize={15} rounded="rounded-lg" />
                <span className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-[#0A0A0A]/55">{eyebrow}</span>
              </div>
              <h3 className="mt-4 font-serif-display text-2xl leading-tight tracking-tight">{title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
              <ul className="mt-5 flex flex-col gap-2.5 text-[14px] text-[#0A0A0A]/85">
                {points.map((p) => <CheckItem key={p}>{p}</CheckItem>)}
              </ul>
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
        {AUDIENCES.map(({ title, body }, i) => (
          <div key={title} className="border-t-2 border-[#0A0A0A] pt-5">
            <IconBadge {...AUDIENCE_ICONS[i]} size="h-10 w-10" iconSize={17} rounded="rounded-lg" />
            <h3 className="mt-4 font-serif-display text-lg leading-tight">{title}</h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
