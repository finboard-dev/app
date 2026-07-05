import React from "react";
import {
  Landmark, BarChart3, CircleDollarSign, Receipt,
  ArrowUp, ArrowDown, RefreshCw, Zap, CheckCircle2, Sparkles, ShieldCheck,
  ClipboardCheck, Clock, Compass,
} from "lucide-react";

/**
 * Small hook: returns an integer that increments every `interval` ms,
 * mod `count`. Pauses when tab is hidden.
 */
function useCycle(count, interval = 2600) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % count), interval);
    return () => clearInterval(t);
  }, [count, interval]);
  return i;
}

/**
 * Two-level product explorer:
 *   top tab (module)  ×  left sub-tab (workflow)  →  a live visual
 */
const TABS = [
  {
    id: "close",
    label: "Month-end close",
    icon: ClipboardCheck,
    headline: "Close the books in days, not weeks",
    subs: [
      { id: "gl",        label: "GL Accounting",         desc: "Journal entries & ledger tie-out",  Mockup: () => <CloseMockup activeIdx={0} /> },
      { id: "recon",     label: "Reconciliation",        desc: "Bank & subledger reconciliations",  Mockup: () => <CloseMockup activeIdx={1} /> },
      { id: "consol",    label: "Consolidation",         desc: "Multi-entity roll-up & FX",         Mockup: () => <CloseMockup activeIdx={2} /> },
      { id: "prepaid",   label: "Prepaid",               desc: "Prepaid amortization schedule",     Mockup: () => <CloseMockup activeIdx={3} /> },
      { id: "accruals",  label: "Accruals",              desc: "Recognition & auto-reversal",       Mockup: () => <CloseMockup activeIdx={4} /> },
      { id: "fa",        label: "Fixed Asset Register",  desc: "Depreciation & FA schedule",        Mockup: () => <CloseMockup activeIdx={5} /> },
      { id: "board",     label: "Board Reporting Packs", desc: "Board-ready packs & narrative",     Mockup: () => <CloseMockup activeIdx={6} /> },
    ],
  },
  {
    id: "consolidation",
    label: "Consolidation",
    icon: Landmark,
    headline: "Audit-ready consolidations",
    subs: [
      { id: "interco",  label: "Inter-company eliminations", desc: "Auto-detect & clear IC balances", Mockup: ConsolidationMockup },
      { id: "group-pl", label: "Consolidated P&L", desc: "Every entity in one statement",    Mockup: GroupPnLMockup },
      { id: "fx",       label: "FX translation",   desc: "Month-end rates, CTA booked",      Mockup: FxMockup },
    ],
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    headline: "Board-ready analytics",
    subs: [
      { id: "dashboards", label: "Dashboards", desc: "Live KPIs & budget vs actuals", Mockup: ReportingMockup },
      { id: "planning",   label: "Planning",   desc: "Scenarios & cashflow forecast",  Mockup: PlanningMockup },
      { id: "scorecards", label: "Scorecards", desc: "People & team performance",      Mockup: PeopleMockup },
    ],
  },
  {
    id: "o2c",
    label: "O2C",
    icon: CircleDollarSign,
    headline: "Order-to-cash, automated",
    subs: [
      { id: "quote-cash",  label: "Quote → Cash", desc: "Quote to invoice, credit-checked", Mockup: O2CFlowMockup },
      { id: "collections", label: "Collections",  desc: "AR aging & automated dunning",     Mockup: CollectionsMockup },
    ],
  },
  {
    id: "p2p",
    label: "P2P",
    icon: Receipt,
    headline: "Procure-to-pay, automated",
    subs: [
      { id: "capture-pay", label: "Capture → Pay", desc: "Invoice capture to payment run",   Mockup: P2PFlowMockup },
      { id: "match",       label: "3-way match",   desc: "PO, receipt & invoice reconciled", Mockup: MatchMockup },
    ],
  },
];

export default function UseCases() {
  const [topId, setTopId] = React.useState(TABS[0].id);
  const top = TABS.find((t) => t.id === topId) || TABS[0];
  const [subId, setSubId] = React.useState(top.subs[0].id);
  const sub = top.subs.find((s) => s.id === subId) || top.subs[0];
  const Mockup = sub.Mockup;

  const selectTop = (id) => {
    const t = TABS.find((x) => x.id === id) || TABS[0];
    setTopId(id);
    setSubId(t.subs[0].id);
  };

  return (
    <section id="use-cases" className="relative bg-[#171310] text-white overflow-hidden">
      {/* Warm-charcoal base with layered ambience */}
      {/* Blueprint-style grid pattern */}
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
      {/* Warm sand radial + subtle emerald */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 50% at 20% 0%, rgba(245,240,232,0.08), transparent 65%), radial-gradient(60% 45% at 80% 100%, rgba(16,185,129,0.09), transparent 60%), radial-gradient(45% 30% at 50% 55%, rgba(255,255,255,0.05), transparent 70%)",
        }}
      />
      {/* Grain layer */}
      <div className="grain absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none" aria-hidden />
      {/* Subtle top/bottom hairline separators */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/15" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" aria-hidden />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Editorial header, inverted */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2">
            <span className="h-7 w-7 rounded-md grid place-items-center bg-white/[0.06] border border-white/15 text-white/85">
              <Compass size={13} strokeWidth={1.75} />
            </span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-white/70">
              Product studio
            </span>
          </div>
          <h2
            className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight text-white"
            data-testid="use-cases-heading"
          >
            One workspace, <span className="italic text-[#F5F0E8]">every finance workflow</span>.
          </h2>
        </div>

        {/* Module rail — four rich cards, filmstrip style */}
        <div
          className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3"
          data-testid="explorer-top-tabs"
        >
          {TABS.map((t, i) => {
            const TIcon = t.icon;
            const active = t.id === topId;
            return (
              <button
                key={t.id}
                onClick={() => selectTop(t.id)}
                data-testid={`explorer-top-${t.id}`}
                className={`group relative text-left rounded-2xl p-5 border-2 transition-all overflow-hidden ${
                  active
                    ? "bg-emerald-50 text-[#0A0A0A] border-emerald-500 shadow-[0_20px_50px_-16px_rgba(16,185,129,0.45)] scale-[1.02]"
                    : "bg-[#F5F0E8] text-[#0A0A0A] border-transparent hover:border-[#DDD1B8] hover:bg-[#EFE7D6] hover:-translate-y-0.5"
                }`}
              >
                {active && (
                  <span aria-hidden className="absolute inset-y-0 left-0 w-[3px] bg-emerald-500" />
                )}
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={`h-10 w-10 rounded-lg grid place-items-center transition-colors ${
                      active
                        ? "bg-emerald-500 text-white border border-emerald-600"
                        : "bg-white text-[#0A0A0A] border border-[#EDE4D2] group-hover:bg-white"
                    }`}
                  >
                    <TIcon size={16} strokeWidth={1.75} />
                  </span>
                  <span
                    className={`font-serif-display text-[13px] tabular-nums ${
                      active ? "text-emerald-700" : "text-[#0A0A0A]/35"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 font-serif-display text-lg leading-tight">
                  {t.label}
                </div>
                <div
                  className={`mt-1 text-[12.5px] leading-snug ${
                    active ? "text-[#0A0A0A]/75" : "text-[#0A0A0A]/65"
                  }`}
                >
                  {t.headline}
                </div>
                <div
                  className={`mt-4 pt-3 border-t flex items-center justify-between text-[10.5px] uppercase tracking-[0.2em] ${
                    active ? "border-emerald-500/25 text-emerald-800" : "border-[#EDE4D2] text-[#0A0A0A]/55"
                  }`}
                >
                  <span>{t.subs.length} workflows</span>
                  {active && (
                    <span className="inline-flex items-center gap-1.5 text-emerald-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Selected
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Workflow chip row */}
        <div className="mt-10 flex flex-wrap items-center gap-2" data-testid="explorer-sub-tabs">
          <span className="text-[10px] uppercase tracking-[0.22em] text-white/60 mr-2">
            Workflow
          </span>
          {top.subs.map((s, i) => {
            const active = s.id === subId;
            return (
              <button
                key={s.id}
                onClick={() => setSubId(s.id)}
                data-testid={`explorer-sub-${s.id}`}
                className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium border-2 transition-all ${
                  active
                    ? "bg-emerald-50 text-emerald-800 border-emerald-500 shadow-[0_4px_14px_-4px_rgba(16,185,129,0.5)]"
                    : "bg-[#F5F0E8] text-[#0A0A0A] border-transparent hover:border-[#DDD1B8] hover:bg-[#EFE7D6]"
                }`}
              >
                {active && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                )}
                <span
                  className={`font-serif-display text-[11px] tabular-nums ${
                    active ? "text-emerald-700" : "text-[#0A0A0A]/40"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Title strip above the mockup */}
        <div
          key={`title-${topId}-${subId}`}
          className="mt-8 mb-4 flex items-end justify-between gap-4 animate-fade-up"
          data-testid="explorer-title"
        >
          <div>
            <div className="text-[11px] text-white/55 font-mono tracking-tight">
              {top.label} <span className="opacity-50">/</span> {sub.label}
            </div>
            <div className="mt-1 font-serif-display text-2xl sm:text-3xl leading-tight tracking-tight text-white">
              {top.headline}
            </div>
            <div className="mt-1 text-[13px] text-white/70 max-w-xl">{sub.desc}</div>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/60 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live preview
          </div>
        </div>

        {/* Big light-card mockup floating on the dark canvas — with warm glow */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -inset-6 sm:-inset-10 rounded-[32px] pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 60% at 50% 50%, rgba(245,240,232,0.12), transparent 70%)",
            }}
          />
          <div
            key={`${topId}-${subId}`}
            className="relative rounded-2xl overflow-hidden bg-white text-[#0A0A0A] shadow-[0_1px_2px_rgba(0,0,0,0.25),0_50px_100px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10 animate-fade-up"
            data-testid="explorer-visual"
          >
            <Mockup />
          </div>
        </div>

        {/* Editorial footer strip */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] text-white/60" data-testid="explorer-footer">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Streaming from your governed ledger
          </span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span>ERP · CRM · HRIS unified</span>
          <span className="hidden sm:inline text-white/30">·</span>
          <span>Every number traceable to source</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Mockup chrome ---------- */
function MockChrome({ title, tabActive = "Overview", right, phaseLabel }) {
  const tabs = ["Overview", "Consolidation", "Reports"];
  return (
    <>
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-4 text-[11px] text-[#0A0A0A]/50">finboard.app · {title}</div>
        <div className="ml-auto flex items-center gap-2">
          {phaseLabel && (
            <div key={phaseLabel} className="text-[10px] px-2 py-1 rounded-full bg-white border border-line inline-flex items-center gap-1 animate-fade-up">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {phaseLabel}
            </div>
          )}
          {!phaseLabel && (
            <div className="text-[10px] px-2 py-1 rounded-full bg-white border border-line">{right || "Synced"}</div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-6 px-5 pt-3 text-[12px] border-b border-line bg-white">
        {tabs.map((t) => (
          <div key={t} className={`pb-2 ${t === tabActive ? "border-b-2 border-[#0A0A0A] font-medium" : "text-[#0A0A0A]/50"}`}>{t}</div>
        ))}
      </div>
    </>
  );
}

/* ---------- Consolidation: rows animate detecting → clearing → cleared ---------- */
const CONSOL_PHASES = [
  { label: "Detecting IC", cleared: 9, ready: false, dot: "amber" },
  { label: "Auto-clearing", cleared: 11, ready: false, dot: "amber" },
  { label: "Consolidation ready", cleared: 12, ready: true, dot: "emerald" },
];

function ConsolidationMockup() {
  const phase = useCycle(CONSOL_PHASES.length, 2800);
  const p = CONSOL_PHASES[phase];

  const rows = [
    { entity: "Home Care · North",  ic: "$142,300", clearedIn: 0 },
    { entity: "Home Care · South",  ic: "$88,120",  clearedIn: 0 },
    { entity: "Clinical Group",     ic: "$54,780",  clearedIn: 1 },
    { entity: "Feature Holdings",   ic: "$210,940", clearedIn: 2 },
  ];

  return (
    <>
      <MockChrome title="consolidation" tabActive="Consolidation" phaseLabel={p.label} />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Inter-company</div>
            <div className="font-serif-display text-xl mt-0.5">Eliminations queue</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60 flex items-center gap-2">
            <RefreshCw size={11} className={phase < 2 ? "animate-spin" : ""} style={{ animationDuration: "1.6s" }} />
            <span>12 detected · <span key={p.cleared} className="text-[#0A0A0A] font-medium animate-fade-up inline-block tabular-nums">{p.cleared} auto-cleared</span></span>
          </div>
        </div>

        <div className="mt-3 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0A0A0A] transition-all duration-[1200ms] ease-out"
            style={{ width: `${(p.cleared / 12) * 100}%` }}
          />
        </div>

        <div className="mt-4 rounded-lg border border-line overflow-hidden">
          <div className="grid grid-cols-12 px-4 py-2 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50 bg-[#F5F0E8]/60 border-b border-line">
            <div className="col-span-7">Entity</div>
            <div className="col-span-3 text-right">IC balance</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          {rows.map((r) => {
            const isCleared = phase >= r.clearedIn;
            return (
              <div key={r.entity} className="grid grid-cols-12 px-4 py-3 items-center border-b border-line last:border-0 text-[13px]">
                <div className="col-span-7 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full transition-colors duration-500 ${isCleared ? "bg-emerald-500" : "bg-amber-500"}`} />
                  {r.entity}
                </div>
                <div className="col-span-3 text-right tabular-nums">{r.ic}</div>
                <div className="col-span-2 text-right">
                  <span
                    key={isCleared ? "c" : "r"}
                    className={`text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 animate-fade-up ${isCleared ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                  >
                    {isCleared && <CheckCircle2 size={9} />}
                    {isCleared ? "Reconciled" : "Reviewing"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`mt-3 rounded-lg border border-line bg-[#F9F6F0] p-3 flex items-center justify-between transition-all duration-700 ${p.ready ? "opacity-100 translate-y-0" : "opacity-40 translate-y-1"}`}>
          <div className="flex items-center gap-2 text-[11px] text-[#0A0A0A]/80">
            <Sparkles size={12} />
            <span>Consolidated <span className="font-medium">P&amp;L · Balance Sheet · Cash Flow</span></span>
          </div>
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${p.ready ? "bg-emerald-50 text-emerald-700" : "bg-[#F5F0E8] text-[#0A0A0A]/40"}`}>
            {p.ready ? "Audit-ready" : "Pending"}
          </span>
        </div>
      </div>
    </>
  );
}

/* ---------- Consolidated P&L ---------- */
function GroupPnLMockup() {
  const cols = ["North", "South", "Clinical", "Elim", "Group"];
  const rows = [
    { l: "Revenue",       v: ["1.82", "1.24", "0.96", "(0.14)", "3.88"] },
    { l: "COGS",          v: ["(0.71)", "(0.49)", "(0.36)", "0.05", "(1.51)"] },
    { l: "Gross profit",  v: ["1.11", "0.75", "0.60", "(0.09)", "2.37"], strong: true },
    { l: "Operating exp", v: ["(0.68)", "(0.44)", "(0.33)", "0.04", "(1.41)"] },
    { l: "EBITDA",        v: ["0.43", "0.31", "0.27", "(0.05)", "0.96"], strong: true },
  ];
  const grid = "grid-cols-[1.4fr_repeat(5,0.8fr)]";
  return (
    <>
      <MockChrome title="consolidated-p&l" tabActive="Consolidation" phaseLabel="Consolidated · Jun 2026" />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Consolidated</div>
            <div className="font-serif-display text-xl mt-0.5">Group P&amp;L · $M</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60">4 entities · 1 elimination</div>
        </div>
        <div className="mt-4 rounded-lg border border-line overflow-hidden">
          <div className={`grid ${grid} px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#0A0A0A]/50 bg-[#F5F0E8]/60 border-b border-line`}>
            <div>Line</div>
            {cols.map((c) => (
              <div key={c} className={`text-right ${c === "Group" ? "text-[#0A0A0A] font-semibold" : ""}`}>{c}</div>
            ))}
          </div>
          {rows.map((r, ri) => (
            <div
              key={r.l}
              className={`grid ${grid} px-3 py-2 items-center border-b border-line last:border-0 text-[12px] animate-fade-up ${r.strong ? "bg-[#F9F6F0]" : ""}`}
              style={{ animationDelay: `${ri * 70}ms` }}
            >
              <div className={r.strong ? "font-medium" : ""}>{r.l}</div>
              {r.v.map((v, ci) => (
                <div key={ci} className={`text-right tabular-nums ${ci === 4 ? "font-semibold" : ci === 3 ? "text-[#0A0A0A]/45" : "text-[#0A0A0A]/70"}`}>{v}</div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-[#0A0A0A]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Eliminations column removes inter-company revenue &amp; cost automatically.
        </div>
      </div>
    </>
  );
}

/* ---------- FX translation ---------- */
function FxMockup() {
  const rows = [
    { e: "UK · Ltd",  loc: "£1.20M",  rate: "1.27", usd: "$1.52M" },
    { e: "EU · GmbH", loc: "€0.98M",  rate: "1.08", usd: "$1.06M" },
    { e: "CA · Inc",  loc: "C$0.74M", rate: "0.73", usd: "$0.54M" },
    { e: "US · Corp", loc: "$2.10M",  rate: "1.00", usd: "$2.10M" },
  ];
  const grid = "grid-cols-[1.3fr_0.9fr_0.7fr_0.9fr]";
  return (
    <>
      <MockChrome title="fx-translation" tabActive="Consolidation" phaseLabel="Month-end rates" />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Currency translation</div>
            <div className="font-serif-display text-xl mt-0.5">Entities → USD</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60">4 currencies</div>
        </div>
        <div className="mt-4 rounded-lg border border-line overflow-hidden">
          <div className={`grid ${grid} px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-[#0A0A0A]/50 bg-[#F5F0E8]/60 border-b border-line`}>
            <div>Entity</div>
            <div className="text-right">Local</div>
            <div className="text-right">Rate</div>
            <div className="text-right">USD</div>
          </div>
          {rows.map((r, i) => (
            <div key={r.e} className={`grid ${grid} px-3 py-2.5 items-center border-b border-line last:border-0 text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
              <div className="font-medium">{r.e}</div>
              <div className="text-right tabular-nums text-[#0A0A0A]/70">{r.loc}</div>
              <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.rate}</div>
              <div className="text-right tabular-nums font-medium">{r.usd}</div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-line bg-[#F9F6F0] p-3 flex items-center justify-between text-[11px]">
          <span className="flex items-center gap-2 text-[#0A0A0A]/80"><Sparkles size={12} /> Cumulative translation adjustment</span>
          <span className="font-medium tabular-nums">$42,180 → equity</span>
        </div>
      </div>
    </>
  );
}

/* ---------- Analytics · Dashboards: KPIs tick, budget bars redraw ---------- */
const KPI_SETS = [
  [
    { l: "Revenue", v: "$4.82M", d: "+8.4%", up: true },
    { l: "Gross Margin", v: "62.4%", d: "+1.1pp", up: true },
    { l: "EBITDA", v: "$1.14M", d: "-1.2%", up: false },
    { l: "Opex / Rev", v: "38.2%", d: "-0.8pp", up: true },
  ],
  [
    { l: "Revenue", v: "$4.91M", d: "+9.2%", up: true },
    { l: "Gross Margin", v: "62.8%", d: "+1.3pp", up: true },
    { l: "EBITDA", v: "$1.18M", d: "+2.1%", up: true },
    { l: "Opex / Rev", v: "37.9%", d: "-1.1pp", up: true },
  ],
  [
    { l: "Revenue", v: "$4.87M", d: "+8.8%", up: true },
    { l: "Gross Margin", v: "62.6%", d: "+1.2pp", up: true },
    { l: "EBITDA", v: "$1.16M", d: "+0.4%", up: true },
    { l: "Opex / Rev", v: "38.0%", d: "-0.9pp", up: true },
  ],
];
const BUDGET_SETS = [
  [92, 78, 106, 84],
  [95, 82, 108, 88],
  [93, 80, 104, 86],
];
const LABELS = ["North", "South", "Clinical", "Holdings"];

function ReportingMockup() {
  const idx = useCycle(KPI_SETS.length, 2400);
  const kpis = KPI_SETS[idx];
  const budget = BUDGET_SETS[idx];

  return (
    <>
      <MockChrome title="reports" tabActive="Reports" phaseLabel="Refreshing · YTD 2026" />
      <div className="p-5 bg-white">
        <div className="grid grid-cols-4 gap-3">
          {kpis.map((k) => (
            <div key={k.l} className="rounded-lg border border-line p-3 relative overflow-hidden">
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{k.l}</div>
              <div key={k.v} className="text-lg mt-1 font-semibold tracking-tight animate-fade-up tabular-nums">
                {k.v}
              </div>
              <div className={`mt-1 inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded ${k.up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
                {k.up ? <ArrowUp size={10} /> : <ArrowDown size={10} />} {k.d}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-line p-4">
          <div className="flex items-center justify-between text-[11px] text-[#0A0A0A]/60">
            <div className="flex items-center gap-2">
              <Zap size={11} className="text-[#0A0A0A]" />
              Budget vs Actuals · by Entity
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live · Jun 2026
            </div>
          </div>
          <div className="mt-3 space-y-2">
            {budget.map((val, i) => (
              <div key={LABELS[i]} className="flex items-center gap-3 text-[12px]">
                <div className="w-16 text-[#0A0A0A]/60">{LABELS[i]}</div>
                <div className="flex-1 h-2 bg-[#F5F0E8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0A0A0A] transition-[width] duration-[1200ms] ease-out"
                    style={{ width: `${Math.min(val, 100)}%` }}
                  />
                </div>
                <div key={val} className="w-12 text-right tabular-nums text-[#0A0A0A]/60 animate-fade-up">{val}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- Analytics · Planning: bars grow, forecast reveals ---------- */
function PlanningMockup() {
  const bars = [10, 12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 27];
  const forecast = [null, null, null, null, null, null, null, null, 22, 25, 28, 31];
  const scenarios = [
    { label: "Base",       ebitda: "$1.42M", tint: "bg-[#0A0A0A]" },
    { label: "Optimistic", ebitda: "$1.68M", tint: "bg-emerald-600" },
    { label: "Downside",   ebitda: "$1.18M", tint: "bg-amber-600" },
  ];
  const s = useCycle(scenarios.length, 2600);
  const [phase, setPhase] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPhase((p) => (p + 1) % 12), 260);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <MockChrome title="planning" tabActive="Overview" phaseLabel={`Scenario · ${scenarios[s].label}`} />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Cashflow model</div>
            <div className="font-serif-display text-xl mt-0.5">12-month projection</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60 flex items-center gap-1.5">
            <RefreshCw size={11} className="animate-spin" style={{ animationDuration: "2.4s" }} />
            Actuals · Forecast
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-line p-4">
          <div className="grid grid-cols-12 gap-1 items-end h-32">
            {bars.map((h, i) => {
              const isForecast = !!forecast[i];
              const target = forecast[i] || h;
              const activePulse = i === phase;
              return (
                <div key={i} className="flex flex-col items-center justify-end h-full">
                  <div
                    className={`w-full rounded-sm transition-all duration-500 ${isForecast ? scenarios[s].tint + "/40" : "bg-[#0A0A0A]"} ${activePulse ? "ring-2 ring-[#2563EB]/40" : ""}`}
                    style={{ height: `${target * 3}px` }}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1 text-[9px] text-[#0A0A0A]/40 text-center">
            {["J","F","M","A","M","J","J","A","S","O","N","D"].map((m,i)=>(<div key={i}>{m}</div>))}
          </div>
          <div className="mt-3 flex items-center gap-4 text-[10px] text-[#0A0A0A]/60">
            <div className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-sm bg-[#0A0A0A]" /> Actuals</div>
            <div className="flex items-center gap-1.5"><span className={`h-2 w-2 rounded-sm ${scenarios[s].tint}/40`} /> Forecast</div>
            <div className="ml-auto">EBITDA proj. <span key={scenarios[s].ebitda} className="text-[#0A0A0A] font-medium animate-fade-up inline-block tabular-nums">{scenarios[s].ebitda}</span></div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {scenarios.map((sc, i) => (
            <div key={sc.label} className={`rounded-md border px-2.5 py-1.5 text-[11px] flex items-center justify-between transition-colors ${i === s ? "border-[#0A0A0A] bg-[#F9F6F0]" : "border-line bg-white text-[#0A0A0A]/60"}`}>
              <span className="flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${sc.tint}`} />
                {sc.label}
              </span>
              <span className="tabular-nums">{sc.ebitda}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- Analytics · Scorecards: sources sync, scores animate up ---------- */
const PEOPLE_BASE = [
  { n: "Amara Chen", r: "AE · Sales",       s: [88, 92, 90] },
  { n: "Devin Cole", r: "Nurse Manager",    s: [84, 88, 91] },
  { n: "Priya Rao",  r: "Controller",       s: [93, 95, 96] },
  { n: "Jonas Weber",r: "Operations",       s: [76, 79, 82] },
];
const SYSTEMS = ["Workday", "Salesforce", "Zendesk", "NetSuite", "Rippling"];

function PeopleMockup() {
  const idx = useCycle(3, 2500);
  const [pinged, setPinged] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPinged((v) => (v + 1) % SYSTEMS.length), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <MockChrome title="people" tabActive="Overview" phaseLabel="Live · Q2 2026" />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Performance</div>
            <div className="font-serif-display text-xl mt-0.5">Team overview</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60">5 systems · 214 people</div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {SYSTEMS.map((s, i) => (
            <span
              key={s}
              className={`inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-full border border-line bg-white transition-all ${i === pinged ? "ring-2 ring-emerald-400/50 -translate-y-0.5" : ""}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${i === pinged ? "bg-emerald-500" : "bg-[#0A0A0A]/30"}`} />
              {s}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {PEOPLE_BASE.map((p) => {
            const score = p.s[idx];
            return (
              <div key={p.n} className="rounded-lg border border-line p-3 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#F5F0E8] border border-line grid place-items-center text-[11px] font-medium">
                  {p.n.split(" ").map((x) => x[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium truncate">{p.n}</div>
                  <div className="text-[10px] text-[#0A0A0A]/50 truncate">{p.r}</div>
                  <div className="mt-1.5 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#0A0A0A] transition-[width] duration-[1000ms] ease-out"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
                <div key={score} className="text-[11px] tabular-nums text-[#0A0A0A]/70 animate-fade-up">{score}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ---------- Shared 3-stage flow board (O2C / P2P) ---------- */
function FlowBoard({ chromeTitle, phase, stages }) {
  return (
    <>
      <MockChrome title={chromeTitle} tabActive="Overview" phaseLabel={phase} />
      <div className="p-5 bg-white">
        <div className="grid grid-cols-3 gap-3">
          {stages.map((st, i) => (
            <div key={st.title} className="rounded-lg border border-line bg-white p-3 flex flex-col animate-fade-up" style={{ animationDelay: `${i * 130}ms` }}>
              <div className="text-[10px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 border-b border-line pb-2 mb-2">{st.title}</div>
              <div className="space-y-2">
                {st.items.map((it, j) => (
                  <div key={j} className="rounded-md border border-line bg-[#F9F6F0] px-2.5 py-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium">{it.a}</span>
                      {it.badge && (
                        <span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 ${it.tone === "ok" ? "bg-emerald-50 text-emerald-700" : it.tone === "warn" ? "bg-amber-50 text-amber-700" : "bg-[#F5F0E8] text-[#0A0A0A]/55"}`}>{it.badge}</span>
                      )}
                    </div>
                    {it.b && <div className="mt-1 text-[10px] text-[#0A0A0A]/55">{it.b}</div>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---------- O2C · Quote → Cash ---------- */
function O2CFlowMockup() {
  return (
    <FlowBoard
      chromeTitle="order-to-cash"
      phase="AR agent · live"
      stages={[
        { title: "1 · Ingest quote", items: [
          { a: "Quote Q-2214", b: "Meridian Retail · $32,900" },
          { a: "Salesforce CPQ", b: "live sync", badge: "Synced", tone: "ok" },
        ] },
        { title: "2 · Credit & approve", items: [
          { a: "AI credit check", b: "rating A2", badge: "Pass", tone: "ok" },
          { a: "Sara Lindgren · AR", badge: "Approved", tone: "ok" },
          { a: "Elena Marsh · CFO", badge: "Pending", tone: "warn" },
        ] },
        { title: "3 · Invoice & collect", items: [
          { a: "INV-9021", b: "$32,900 · Net-45" },
          { a: "DSO 41 days", b: "dunning scheduled", badge: "Auto", tone: "ok" },
        ] },
      ]}
    />
  );
}

/* ---------- P2P · Capture → Pay ---------- */
function P2PFlowMockup() {
  return (
    <FlowBoard
      chromeTitle="procure-to-pay"
      phase="AP agent · live"
      stages={[
        { title: "1 · Capture invoice", items: [
          { a: "Quote_88421.pdf", b: "Orbital Supplies · $18,420" },
          { a: "NetSuite POs", b: "live sync", badge: "Synced", tone: "ok" },
        ] },
        { title: "2 · Approvals", items: [
          { a: "Priya Rao · Controller", badge: "Approved", tone: "ok" },
          { a: "Marc Levy · VP Ops", badge: "Approved", tone: "ok" },
          { a: "Elena Marsh · CFO", badge: "Pending", tone: "warn" },
        ] },
        { title: "3 · Payment run", items: [
          { a: "PAY-4402", b: "$18,420 · Net-30" },
          { a: "6 linked docs", b: "fully traceable", badge: "Ready", tone: "ok" },
        ] },
      ]}
    />
  );
}

/* ---------- O2C · Collections (AR aging) ---------- */
function CollectionsMockup() {
  const buckets = [
    { l: "Current", v: 182, p: 100 },
    { l: "1–30", v: 96, p: 53 },
    { l: "31–60", v: 54, p: 30 },
    { l: "61–90", v: 28, p: 16 },
    { l: "90+", v: 14, p: 8 },
  ];
  return (
    <>
      <MockChrome title="collections" tabActive="Overview" phaseLabel="AR · live" />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Accounts receivable</div>
            <div className="font-serif-display text-xl mt-0.5">Aging &amp; collections</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60">$374k open</div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[{ l: "DSO", v: "41 d" }, { l: "Overdue", v: "$96k" }, { l: "Collected MTD", v: "$212k" }].map((t) => (
            <div key={t.l} className="rounded-lg border border-line bg-[#F5F0E8] px-3 py-2.5">
              <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{t.l}</div>
              <div className="mt-0.5 font-serif-display text-lg leading-none tracking-tight">{t.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-lg border border-line p-4">
          <div className="text-[11px] text-[#0A0A0A]/60 mb-2">Aging buckets · $k</div>
          <div className="space-y-2">
            {buckets.map((b, i) => (
              <div key={b.l} className="flex items-center gap-3 text-[12px] animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="w-14 text-[#0A0A0A]/60">{b.l}</div>
                <div className="flex-1 h-2.5 bg-[#F5F0E8] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${i >= 3 ? "bg-rose-500" : "bg-[#0A0A0A]"}`} style={{ width: `${b.p}%` }} />
                </div>
                <div className="w-12 text-right tabular-nums text-[#0A0A0A]/70">${b.v}k</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------- P2P · 3-way match ---------- */
function MatchMockup() {
  const rows = [
    { d: "Purchase order", ref: "PO-8842", v: "$18,420.00" },
    { d: "Goods receipt", ref: "GRN-8842", v: "$18,420.00" },
    { d: "Vendor invoice", ref: "INV-3391", v: "$18,420.00" },
  ];
  return (
    <>
      <MockChrome title="3-way-match" tabActive="Overview" phaseLabel="Matched" />
      <div className="p-5 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Orbital Supplies</div>
            <div className="font-serif-display text-xl mt-0.5">3-way match</div>
          </div>
          <span className="text-[10px] px-2 py-1 rounded-full bg-emerald-50 text-emerald-700 inline-flex items-center gap-1"><CheckCircle2 size={11} /> Matched</span>
        </div>
        <div className="mt-4 space-y-2">
          {rows.map((r, i) => (
            <div key={r.ref} className="rounded-lg border border-line px-4 py-3 flex items-center justify-between animate-fade-up" style={{ animationDelay: `${i * 120}ms` }}>
              <div>
                <div className="text-[13px] font-medium">{r.d}</div>
                <div className="text-[10px] text-[#0A0A0A]/50 font-mono">{r.ref}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[13px] tabular-nums">{r.v}</span>
                <CheckCircle2 size={16} className="text-emerald-600" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-line bg-[#F9F6F0] p-3 flex items-center justify-between text-[11px]">
          <span className="text-[#0A0A0A]/70 flex items-center gap-2"><ShieldCheck size={12} /> Variance within tolerance</span>
          <span className="font-medium">Ready to pay</span>
        </div>
      </div>
    </>
  );
}


/* ---------- Month-end close: shared multi-workflow mockup ---------- */
const CLOSE_STEPS = [
  { id: "gl",       label: "GL Accounting",         status: "done" },
  { id: "recon",    label: "Reconciliation",        status: "done" },
  { id: "consol",   label: "Consolidation",         status: "wip"  },
  { id: "prepaid",  label: "Prepaid",               status: "wip"  },
  { id: "accruals", label: "Accruals",              status: "pending" },
  { id: "fa",       label: "Fixed Asset Register",  status: "pending" },
  { id: "board",    label: "Board Reporting Packs", status: "pending" },
];

const CLOSE_DETAIL = {
  0: {
    // GL Accounting
    kicker: "Journal entries",
    title: "GL · June 2026",
    cols: ["JE #", "Description", "Debit", "Credit"],
    grid: "grid-cols-[0.7fr_2fr_0.8fr_0.8fr]",
    rows: [
      { c: ["JE-4412", "Payroll accrual · Ops",     "18,400", "—"],       tag: "Posted",  tone: "ok"   },
      { c: ["JE-4413", "Payroll accrual · Ops",     "—",       "18,400"], tag: "Posted",  tone: "ok"   },
      { c: ["JE-4418", "Revenue cutoff · NA",       "22,150", "—"],       tag: "Posted",  tone: "ok"   },
      { c: ["JE-4419", "Deferred rev · NA",         "—",       "22,150"], tag: "Posted",  tone: "ok"   },
      { c: ["JE-4426", "FX gain · EU · GmbH",       "1,820",  "—"],       tag: "Review",  tone: "warn" },
    ],
    summary: "12 posted · 3 pending review",
  },
  1: {
    // Reconciliation
    kicker: "Bank & subledger recs",
    title: "Reconciliations",
    cols: ["Account",    "GL Balance", "Bank / Sub", "Δ"],
    grid: "grid-cols-[1.6fr_0.9fr_0.9fr_0.7fr]",
    rows: [
      { c: ["Chase · 4421 · Ops",         "482,190", "482,190", "0"],        tag: "Matched",  tone: "ok"   },
      { c: ["Chase · 8811 · Payroll",     "182,050", "182,050", "0"],        tag: "Matched",  tone: "ok"   },
      { c: ["Wise · EUR ops",             "96,410",  "96,410",  "0"],        tag: "Matched",  tone: "ok"   },
      { c: ["Stripe · US receivable",     "142,720", "141,900", "820"],      tag: "Investigating", tone: "warn" },
      { c: ["AP subledger · NetSuite",    "216,340", "216,340", "0"],        tag: "Matched",  tone: "ok"   },
    ],
    summary: "24 accounts · 1 under review",
  },
  2: {
    // Consolidation
    kicker: "Group consolidation",
    title: "Entities → Group",
    cols: ["Entity",              "Currency", "Local", "USD"],
    grid: "grid-cols-[1.6fr_0.7fr_0.8fr_0.8fr]",
    rows: [
      { c: ["Home Care · North",  "USD", "1.82M", "1.82M"],   tag: "Consolidated", tone: "ok"   },
      { c: ["Home Care · South",  "USD", "1.24M", "1.24M"],   tag: "Consolidated", tone: "ok"   },
      { c: ["Clinical Group",     "USD", "0.96M", "0.96M"],   tag: "Consolidated", tone: "ok"   },
      { c: ["Feature · UK Ltd",   "GBP", "0.74M", "0.94M"],   tag: "FX applied",   tone: "ok"   },
      { c: ["Feature · GmbH",     "EUR", "0.51M", "0.55M"],   tag: "IC pending",   tone: "warn" },
    ],
    summary: "5 entities · 1 IC elimination outstanding",
  },
  3: {
    // Prepaid
    kicker: "Prepaid amortization",
    title: "Prepaid schedule",
    cols: ["Vendor", "Total", "Monthly", "Remaining"],
    grid: "grid-cols-[1.6fr_0.8fr_0.7fr_0.8fr]",
    rows: [
      { c: ["Rippling · HR platform", "24,000", "2,000", "8,000"],    tag: "Auto",   tone: "ok"   },
      { c: ["Sage · Insurance",       "18,600", "1,550", "9,300"],    tag: "Auto",   tone: "ok"   },
      { c: ["AWS · Reserved",         "48,000", "4,000", "20,000"],   tag: "Auto",   tone: "ok"   },
      { c: ["Legal · retainer",       "12,000", "1,000", "6,000"],    tag: "Auto",   tone: "ok"   },
      { c: ["Rent · NYC office",      "84,000", "7,000", "35,000"],   tag: "Auto",   tone: "ok"   },
    ],
    summary: "17 prepaid contracts · $15.5k monthly amortization",
  },
  4: {
    // Accruals
    kicker: "Accrual recognition",
    title: "Accruals · Jun 2026",
    cols: ["Type", "Estimated", "Recognized", "Reversal"],
    grid: "grid-cols-[1.4fr_0.9fr_0.9fr_0.8fr]",
    rows: [
      { c: ["Legal · Q2 fees",           "14,200", "14,200", "Jul 2026"], tag: "Booked", tone: "ok"   },
      { c: ["Audit · YE prep",           "22,000", "22,000", "Sep 2026"], tag: "Booked", tone: "ok"   },
      { c: ["Payroll · variable comp",   "48,500", "48,500", "Jul 2026"], tag: "Booked", tone: "ok"   },
      { c: ["Utilities · Jun est",       "6,800",  "6,800",  "Jul 2026"], tag: "Booked", tone: "ok"   },
      { c: ["Marketing · agency",        "9,200",  "—",      "—"],        tag: "Draft",  tone: "warn" },
    ],
    summary: "9 accruals · auto-reversed next period",
  },
  5: {
    // Fixed Asset Register
    kicker: "Fixed asset register",
    title: "Depreciation · Jun 2026",
    cols: ["Asset", "Cost", "Life", "Deprec / mo"],
    grid: "grid-cols-[1.7fr_0.8fr_0.6fr_0.8fr]",
    rows: [
      { c: ["MacBook Pro · fleet (42)",  "126,000", "36 mo", "3,500"], tag: "Active", tone: "ok" },
      { c: ["Office fit-out · NYC",      "310,000", "60 mo", "5,167"], tag: "Active", tone: "ok" },
      { c: ["Warehouse racking · Cle",   "88,400",  "60 mo", "1,473"], tag: "Active", tone: "ok" },
      { c: ["Server room · SF",          "44,000",  "36 mo", "1,222"], tag: "Active", tone: "ok" },
      { c: ["Trade booths",              "18,500",  "24 mo", "771"],   tag: "Retiring", tone: "warn" },
    ],
    summary: "134 assets · $19,412 monthly depreciation",
  },
  6: {
    // Board Reporting Packs
    kicker: "Board pack",
    title: "Board pack · Jun 2026",
    cols: ["Section",              "Owner",     "Pages", "Status"],
    grid: "grid-cols-[1.6fr_1fr_0.6fr_0.8fr]",
    rows: [
      { c: ["Executive summary",     "CFO",       "2",    "Drafting"],  tag: "AI", tone: "warn" },
      { c: ["Consolidated P&L",      "Controller","3",    "Ready"],     tag: "Auto", tone: "ok" },
      { c: ["Balance Sheet",         "Controller","2",    "Ready"],     tag: "Auto", tone: "ok" },
      { c: ["Cash Flow",             "Controller","2",    "Ready"],     tag: "Auto", tone: "ok" },
      { c: ["KPI scorecard",         "FP&A",      "1",    "Ready"],     tag: "Auto", tone: "ok" },
    ],
    summary: "10 sections · 1 narrative in review",
  },
};

function CloseMockup({ activeIdx = 0 }) {
  const d = CLOSE_DETAIL[activeIdx];
  const activeId = CLOSE_STEPS[activeIdx].id;

  return (
    <>
      <MockChrome title="month-end-close" tabActive="Overview" phaseLabel="Close · Jun 2026" />
      <div className="p-5 bg-white">
        {/* Progress strip */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Month-end close</div>
            <div className="font-serif-display text-xl mt-0.5">Day 3 of 6 · June 2026</div>
          </div>
          <div className="text-[11px] text-[#0A0A0A]/60 flex items-center gap-1.5">
            <Clock size={11} />
            <span>28% left · <span className="text-[#0A0A0A] font-medium">on track</span></span>
          </div>
        </div>
        <div className="mt-3 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
          <div className="h-full bg-[#0A0A0A] transition-all duration-700 ease-out" style={{ width: "72%" }} />
        </div>

        {/* Body: checklist + detail */}
        <div className="mt-4 grid grid-cols-12 gap-3">
          {/* Checklist */}
          <div className="col-span-12 md:col-span-5">
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50 mb-2">Close checklist</div>
            <ol className="rounded-lg border border-line overflow-hidden divide-y divide-line">
              {CLOSE_STEPS.map((s, i) => {
                const on = s.id === activeId;
                const done = s.status === "done";
                const wip  = s.status === "wip";
                return (
                  <li
                    key={s.id}
                    className={`flex items-center gap-3 px-3 py-2 text-[12.5px] transition-colors ${
                      on ? "bg-[#F5F0E8]" : "bg-white"
                    }`}
                  >
                    <span className={`font-serif-display text-[13px] tabular-nums w-6 shrink-0 ${
                      on ? "text-[#0A0A0A]/70" : "text-[#0A0A0A]/30"
                    }`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className={`h-5 w-5 shrink-0 rounded-full grid place-items-center transition-colors ${
                      done ? "bg-emerald-500 text-white" :
                      wip  ? "bg-amber-100 text-amber-700 border border-amber-300" :
                             "bg-[#F5F0E8] text-[#0A0A0A]/40 border border-line"
                    }`}>
                      {done ? <CheckCircle2 size={11} /> : wip ? <RefreshCw size={10} className="animate-spin" style={{ animationDuration: "2.4s" }} /> : <span className="h-1 w-1 rounded-full bg-current" />}
                    </span>
                    <span className={`flex-1 truncate ${on ? "font-medium text-[#0A0A0A]" : "text-[#0A0A0A]/70"}`}>
                      {s.label}
                    </span>
                    {on && (
                      <span className="text-[9px] uppercase tracking-[0.18em] text-emerald-700 shrink-0 inline-flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Workflow detail */}
          <div className="col-span-12 md:col-span-7">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{d.kicker}</div>
                <div className="font-serif-display text-lg leading-tight">{d.title}</div>
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-700 inline-flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live
              </div>
            </div>

            <div className="rounded-lg border border-line overflow-hidden">
              <div className={`grid ${d.grid} px-3 py-2 text-[9.5px] uppercase tracking-[0.12em] text-[#0A0A0A]/50 bg-[#F5F0E8]/60 border-b border-line`}>
                {d.cols.map((c, i) => (
                  <div key={c} className={i === 0 ? "" : "text-right"}>{c}</div>
                ))}
              </div>
              {d.rows.map((r, i) => (
                <div
                  key={i}
                  className={`grid ${d.grid} px-3 py-2 items-center border-b border-line last:border-0 text-[11.5px] animate-fade-up`}
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {r.c.map((cell, ci) => (
                    <div
                      key={ci}
                      className={`${ci === 0 ? "text-[#0A0A0A]/80 truncate" : "text-right tabular-nums text-[#0A0A0A]/75"} ${ci === r.c.length - 1 ? "flex items-center justify-end gap-1.5" : ""}`}
                    >
                      {ci === r.c.length - 1 ? (
                        <>
                          <span>{cell}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full shrink-0 ${
                            r.tone === "ok"   ? "bg-emerald-50 text-emerald-700" :
                            r.tone === "warn" ? "bg-amber-50 text-amber-700" :
                                                "bg-[#F5F0E8] text-[#0A0A0A]/50"
                          }`}>{r.tag}</span>
                        </>
                      ) : (
                        cell
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-lg border border-line bg-[#F9F6F0] px-3 py-2 flex items-center justify-between text-[11px] text-[#0A0A0A]/75">
              <span className="inline-flex items-center gap-2"><Sparkles size={12} /> {d.summary}</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/45">Audit trail on</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
