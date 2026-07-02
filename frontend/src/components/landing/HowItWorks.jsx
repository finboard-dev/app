import React from "react";
import { Plug, Sparkles, Layers, FileText } from "lucide-react";

const steps = [
  {
    icon: Plug,
    step: "01",
    title: "Discovery with a forward-deployed engineer",
    copy: "We map your entities, chart of accounts, dimensions and every source system — from QuickBooks and NetSuite to HRIS, CRM and your data warehouse.",
  },
  {
    icon: Sparkles,
    step: "02",
    title: "We build your custom pipelines",
    copy: "Our engineers build the data pipelines end-to-end: ingestion, classification, inter-company logic, eliminations and dimensional models — tailored to how your group actually operates.",
  },
  {
    icon: Layers,
    step: "03",
    title: "Audit-ready consolidation goes live",
    copy: "Consolidated P&L, Balance Sheet, Cash Flow — with every adjustment traceable. Your close moves from spreadsheet archaeology to a review.",
  },
  {
    icon: FileText,
    step: "04",
    title: "Real-time dashboards & reviews",
    copy: "Reports and dashboards for people and business refresh in real time. We stay embedded — iterating models and dashboards every quarter.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="kbd-chip" data-testid="how-eyebrow"><Layers size={12} /> How it works</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="how-heading">
            From your systems to an audit-ready group narrative.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                data-testid={`how-step-${s.step}`}
                className="rounded-xl border border-line bg-[#F5F0E8] p-6 flex flex-col gap-4 hover:-translate-y-1 transition-transform"
              >
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Step {s.step}</div>
                  <div className="h-9 w-9 rounded-full bg-white border border-line grid place-items-center">
                    <Icon size={16} />
                  </div>
                </div>
                <div className="font-serif-display text-2xl leading-tight">{s.title}</div>
                <div className="text-sm text-[#0A0A0A]/70 leading-relaxed">{s.copy}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
