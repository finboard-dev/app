import React from "react";
import {
  Building2, GitMerge, BarChart3, TrendingUp, Users, ArrowUpRight, ArrowDown, ArrowUp,
  RefreshCw, Zap, CheckCircle2, Sparkles,
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

const cases = [
  {
    id: "consolidation",
    tag: "01 · Multi-entity consolidation",
    icon: Building2,
    title: "Audit-ready consolidation across every entity.",
    copy:
      "Agents identify inter-company transactions, classify entries, and prepare consolidated financials — with every adjustment traceable.",
    bullets: [
      "Auto-detected inter-company entries",
      "Consolidated P&L, BS, Cash Flow",
    ],
    tiles: [
      { l: "Auto eliminations", v: "12 · Jun" },
      { l: "Adjustments", v: "6 posted" },
      { l: "Audit trail", v: "100%" },
    ],
    mockupKey: "consolidation",
  },
  {
    id: "group-reporting",
    tag: "02 · Group reporting",
    icon: BarChart3,
    title: "Real-time reporting across entities, departments, dimensions.",
    copy:
      "PY, PP, YTD, budget vs actuals — every slice, live. Dashboards shaped to your business by our engineering team.",
    bullets: [
      "KPI trends & budget rollups",
      "Variance & vendor analysis",
    ],
    tiles: [
      { l: "Live reports", v: "38" },
      { l: "Board prep", v: "5d → 4h" },
      { l: "Dimensions", v: "unlimited" },
    ],
    mockupKey: "reporting",
    reverse: true,
  },
  {
    id: "planning",
    tag: "03 · Financial planning",
    icon: TrendingUp,
    title: "Forecast revenue, expenses and cashflow with AI models.",
    copy:
      "Driver-based revenue and expense models. FinBoard keeps net income, EBITDA and cashflow live as actuals land.",
    bullets: [
      "Revenue & expense modelling",
      "Cashflow: short & long-term",
    ],
    tiles: [
      { l: "Scenarios", v: "3 · live" },
      { l: "Refresh", v: "real-time" },
      { l: "Horizons", v: "0–36 mo" },
    ],
    mockupKey: "planning",
  },
  {
    id: "people",
    tag: "04 · People performance",
    icon: Users,
    title: "Real-time people dashboards, from every system.",
    copy:
      "A custom data pipeline that ingests HRIS, CRM, ticketing and finance data — rendered as a live report per individual and team.",
    bullets: [
      "Per-person performance report",
      "Auto-refreshed manager reviews",
    ],
    tiles: [
      { l: "People", v: "214" },
      { l: "Systems", v: "5" },
      { l: "Refresh", v: "2 min" },
    ],
    mockupKey: "people",
    reverse: true,
  },
];

const MOCKUP_COMPONENTS = {
  consolidation: ConsolidationMockup,
  reporting: ReportingMockup,
  planning: PlanningMockup,
  people: PeopleMockup,
};

export default function UseCases() {
  return (
    <section id="use-cases" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="space-y-16">
          {cases.map((c) => (
            <UseCaseRow key={c.id} data={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCaseRow({ data }) {
  const Icon = data.icon;
  const Mockup = MOCKUP_COMPONENTS[data.mockupKey];
  return (
    <div className="grid lg:grid-cols-12 gap-10 items-center" data-testid={`use-case-${data.id}`}>
      <div className={`lg:col-span-5 ${data.reverse ? "lg:order-2" : ""}`}>
        <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50 flex items-center gap-2">
          <Icon size={14} /> {data.tag}
        </div>
        <h3 className="mt-3 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
          {data.title}
        </h3>
        <p className="mt-4 text-[#0A0A0A]/70 leading-relaxed">{data.copy}</p>
        <ul className="mt-5 space-y-2">
          {data.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 text-[15px]">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
              <span className="text-[#0A0A0A]/85">{b}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {data.tiles.map((t) => (
            <div key={t.l} className="rounded-lg border border-line bg-[#F5F0E8] px-3 py-2.5">
              <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{t.l}</div>
              <div className="mt-0.5 font-serif-display text-lg leading-none tracking-tight">{t.v}</div>
            </div>
          ))}
        </div>

        <a
          href="#book-demo"
          data-testid={`use-case-${data.id}-cta`}
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium border-b border-[#0A0A0A] hover:opacity-70 transition-opacity"
        >
          See it in action <ArrowUpRight size={14} />
        </a>
      </div>

      <div className={`lg:col-span-7 ${data.reverse ? "lg:order-1" : ""}`}>
        <div
          className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.03),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
          data-testid={`use-case-${data.id}-mockup`}
        >
          <Mockup />
        </div>
      </div>
    </div>
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

/* ---------- 1. Consolidation: rows animate detecting → clearing → cleared ---------- */
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
      <MockChrome
        title="consolidation"
        tabActive="Consolidation"
        phaseLabel={p.label}
      />
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

        {/* progress bar */}
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

        {/* Consolidated output appears when phase reaches 2 */}
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

/* ---------- 2. Reporting: KPIs tick, budget bars redraw, live refresh ---------- */
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
      <MockChrome
        title="reports"
        tabActive="Reports"
        phaseLabel="Refreshing · YTD 2026"
      />
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

/* ---------- 3. Planning: bars grow, forecast reveals progressively ---------- */
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
              // pulse the last "active" bar based on phase
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

/* ---------- 4. People: sources sync, scores animate up ---------- */
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

        {/* Source pings row */}
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
                  {p.n.split(" ").map(x=>x[0]).join("")}
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
