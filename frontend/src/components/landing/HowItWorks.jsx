import React from "react";
import {
  Compass, Plug, Sparkles, Layers, BarChart3, ChevronRight,
} from "lucide-react";

/**
 * The 8-week build — cinematic dark timeline with 4 phase stations
 * connected by an emerald rail. Matches the UseCases dark palette so
 * both dark sections share a family of aesthetics.
 */
const PHASES = [
  {
    weeks: "Week 1–2",
    icon: Plug,
    title: "Discovery",
    body:
      "A forward-deployed engineer and finance architect map every entity, chart of accounts, dimension and source system, ERP, HRIS, CRM, warehouse.",
    deliverables: ["Systems map", "Entity graph", "Close blueprint"],
  },
  {
    weeks: "Week 3–4",
    icon: Sparkles,
    title: "Custom pipelines",
    body:
      "We build ingestion, classification, inter-company logic, eliminations and dimensional models end-to-end, tailored to how your group actually operates.",
    deliverables: ["Semantic layer", "IC auto-match", "Governance"],
  },
  {
    weeks: "Week 5–6",
    icon: Layers,
    title: "Consolidation live",
    body:
      "Consolidated P&L, BS and Cash Flow go live with every adjustment traceable. Close moves from spreadsheet archaeology to a review.",
    deliverables: ["Group P&L / BS / CF", "Audit trail", "Historicals"],
  },
  {
    weeks: "Week 7–8",
    icon: BarChart3,
    title: "Reports & reviews",
    body:
      "Live dashboards, KPI scorecards and board packs refresh in real time. We stay embedded, iterating models with you every quarter.",
    deliverables: ["Live dashboards", "Board pack", "Quarterly reviews"],
  },
];

const METRICS = [
  { v: "8 weeks", l: "typical build" },
  { v: "4",       l: "phases" },
  { v: "Weekly",  l: "reviews" },
  { v: "0",       l: "upfront cost" },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative bg-[#171310] text-white overflow-hidden scroll-mt-20"
      data-testid="how-it-works-section"
    >
      {/* Blueprint grid, radially masked */}
      <div
        className="absolute inset-0 opacity-[0.35] pointer-events-none"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,1), rgba(0,0,0,0.35) 70%, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,0,0,1), rgba(0,0,0,0.35) 70%, transparent)",
        }}
      />
      {/* Warm sand + emerald ambience */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 50% at 20% 0%, rgba(245,240,232,0.08), transparent 65%), radial-gradient(60% 45% at 80% 100%, rgba(16,185,129,0.09), transparent 60%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Editorial header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-7 w-7 rounded-md grid place-items-center bg-white/[0.06] border border-white/15 text-white/85">
              <Compass size={13} strokeWidth={1.75} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
              The 8-week build
            </span>
          </div>
          <h2
            className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight text-white"
            data-testid="how-heading"
          >
            From your systems to a live, <span className="italic text-[#F5F0E8]">audit-ready workspace</span>.
          </h2>
          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-white/70">
            A forward-deployed pod goes from the first discovery call to a live consolidated close in about eight weeks. Fixed cadence, weekly reviews, and you pay nothing until it&apos;s deployed.
          </p>
        </div>

        {/* Timeline rail */}
        <div className="mt-14 relative" data-testid="how-timeline">
          {/* Horizontal rail — desktop only */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[54px] left-6 right-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.06) 0%, rgba(16,185,129,0.55) 20%, rgba(16,185,129,0.55) 80%, rgba(255,255,255,0.06) 100%)",
            }}
          />
          {/* Traveling pulse dot */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[50px] left-6 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(16,185,129,0.9)] animate-[travel_9s_ease-in-out_infinite]"
          />

          <ol className="grid lg:grid-cols-4 gap-6 lg:gap-4">
            {PHASES.map((p, i) => {
              const Icon = p.icon;
              return (
                <li
                  key={p.title}
                  data-testid={`how-phase-${i}`}
                  className="relative"
                >
                  {/* Station node */}
                  <div className="flex flex-col items-start">
                    <div className="text-[10px] uppercase tracking-[0.22em] text-white/50 mb-3">
                      {p.weeks}
                    </div>

                    <div className="relative">
                      {/* Emerald ring + inner disc */}
                      <div className="h-14 w-14 rounded-full bg-[#171310] border border-white/20 grid place-items-center relative">
                        <div
                          aria-hidden
                          className="absolute -inset-[3px] rounded-full"
                          style={{
                            background:
                              "conic-gradient(from 220deg, rgba(16,185,129,0.6), rgba(16,185,129,0) 40%, rgba(16,185,129,0.35) 70%, rgba(16,185,129,0) 100%)",
                            maskImage:
                              "radial-gradient(circle, transparent 62%, black 63%)",
                            WebkitMaskImage:
                              "radial-gradient(circle, transparent 62%, black 63%)",
                          }}
                        />
                        <Icon size={18} strokeWidth={1.75} className="text-white" />
                      </div>
                      {/* Phase number ticker */}
                      <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-[#F5F0E8] text-[#0A0A0A] text-[10px] font-serif-display tabular-nums grid place-items-center">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="mt-5 font-serif-display text-xl leading-tight text-white">
                      {p.title}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                      {p.body}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {p.deliverables.map((d) => (
                        <li
                          key={d}
                          className="text-[10.5px] px-2 py-1 rounded-full bg-white/[0.06] text-white/75 border border-white/15"
                        >
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mobile connector arrow */}
                  {i < PHASES.length - 1 && (
                    <div className="lg:hidden mt-6 mb-2 flex items-center gap-2 text-white/25">
                      <span className="h-px flex-1 bg-white/15" />
                      <ChevronRight size={14} />
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Metric strip */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 lg:divide-y-0 lg:divide-x">
            {METRICS.map((m) => (
              <div key={m.l} className="px-6 py-5">
                <div className="font-serif-display text-3xl tracking-tight tabular-nums text-white">
                  {m.v}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/50">
                  {m.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes for the traveling pulse */}
      <style>{`
        @keyframes travel {
          0%   { left: 6%;  opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 94%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
