"use client";

import React from "react";
import { Layers, GitMerge, FileText, ListTree } from "lucide-react";
import { FEATURES, MODELING_ITEMS, MODELING_TABS } from "@/data/consolidationPage";
import Sheet, { SheetTable } from "./SheetTable";
import { Section, SectionHead } from "./primitives";

const FEATURE_ICONS = [Layers, GitMerge, FileText, ListTree];
const FEATURE_ACCENTS = ["#2563EB", "#7C3AED", "#0891B2", "#059669"];

export function Features() {
  return (
    <Section id="features" alt testid="product-features">
      <SectionHead
        eyebrow="What you get"
        title={<>Consolidation, <span className="italic">built into Google Sheets</span>.</>}
        lead="Your consolidation runs inside the Google Sheets you already use, on QuickBooks data that refreshes every hour. Teams save up to 4 hours per entity, every month."
      />
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {FEATURES.map(({ title, body }, i) => {
          const Icon = FEATURE_ICONS[i];
          const c = FEATURE_ACCENTS[i];
          return (
            <div key={title} className="group card-white p-6 lg:p-7 relative overflow-hidden hover:-translate-y-1 hover:border-line-strong transition-all">
              <div className="absolute inset-x-0 top-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: c }} aria-hidden />
              <div className="flex items-start justify-between">
                <span className="h-12 w-12 rounded-xl border grid place-items-center shadow-sm" style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}>
                  <Icon size={20} strokeWidth={1.75} />
                </span>
                <span className="font-serif-display text-[15px] tabular-nums text-[#0A0A0A]/25">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-5 font-serif-display text-xl leading-tight">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[14px] text-[#0A0A0A]/70">
        Also included: cash flow forecasts, project-level reports, drill down and live dashboards.
      </p>
    </Section>
  );
}

function ModelingTabs() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef([]);
  const select = (i) => { setActive(i); tabRefs.current[i]?.focus(); };
  const onKey = (e, i) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const n = MODELING_TABS.length;
    select((i + (e.key === "ArrowRight" ? 1 : -1) + n) % n);
  };
  const tab = MODELING_TABS[active];

  return (
    <div className="lg:col-span-7 min-w-0 flex flex-col rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]">
      <div role="tabpanel" id={`panel-${tab.id}`} aria-labelledby={`tab-${tab.id}`}>
        <Sheet><SheetTable title={tab.title} columns={tab.columns} rows={tab.rows} /></Sheet>
        <p className="px-3.5 py-2.5 border-t border-[#E2E3E3] text-[13px] text-[#202124]" style={{ fontFamily: "Arial, Roboto, Helvetica, sans-serif" }}>
          {tab.note}
        </p>
      </div>
      <div role="tablist" aria-label="Modeling examples" className="flex flex-wrap gap-0.5 px-2.5 pt-1.5 bg-[#F1F3F4] border-t border-[#E2E3E3]">
        {MODELING_TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => { tabRefs.current[i] = el; }}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-controls={`panel-${t.id}`}
            aria-selected={i === active}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={`min-h-[44px] px-3.5 rounded-t-md border-t-2 text-[13px] font-bold transition-colors ${
              i === active ? "bg-white text-[#202124] border-[#2563EB]" : "border-transparent text-[#3C4043] hover:bg-white/60"
            }`}
            style={{ fontFamily: "Arial, Roboto, Helvetica, sans-serif" }}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Modeling() {
  return (
    <Section id="modeling" testid="consolidation-modeling">
      <SectionHead
        eyebrow="Financial modeling"
        color="#059669"
        title={<>Plan, compare and explain performance <span className="italic">across every entity</span>.</>}
        lead="Once your entities sit in one sheet, it becomes your model. Roll up budgets, benchmark entities against each other and explain the variances, with numbers that refresh from QuickBooks."
      />
      <div className="mt-10 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-5 flex flex-col gap-6">
          {MODELING_ITEMS.map(({ title, body }) => (
            <div key={title}>
              <h3 className="font-serif-display text-lg leading-tight">{title}</h3>
              <p className="mt-1.5 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
            </div>
          ))}
          <p className="pt-5 border-t border-line text-[14px] leading-relaxed text-[#0A0A0A]/70">
            Build forecasts and your own models on top with ordinary Sheets formulas, and they update with every refresh.
          </p>
        </div>
        <ModelingTabs />
      </div>
    </Section>
  );
}
