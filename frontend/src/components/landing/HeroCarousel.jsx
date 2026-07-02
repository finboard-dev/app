import React from "react";
import {
  ArrowUp, ArrowDown, Check, Users, Database, Briefcase,
  Mail, Receipt, ShieldCheck, Landmark, User, CircleDollarSign, FileText,
  Sparkles, Timer, Utensils, HardHat, Stethoscope, BookOpen, BarChart3,
} from "lucide-react";

/**
 * HeroCarousel — auto-rotates through 5 product views.
 * 1. Board dashboard
 * 2. Inter-company reconciliation (spreadsheet grid)
 * 3. People scorecards (sources merging)
 * 4. Procure-to-pay (scan → approve → pay)
 * 5. Order-to-cash (quote → invoice → collect)
 */
const VIEWS = [
  { id: "warehouse", label: "Semantic layer",                  team: "Data & Finance",    days: 15 },
  { id: "board",     label: "Board meeting review",          team: "Finance & Ops",     days: 12 },
  { id: "recon",     label: "Inter-company reconciliation",  team: "Group Controllers", days: 10 },
  { id: "people",    label: "People scorecards",             team: "HR & Ops",          days: 14 },
  { id: "p2p",       label: "Procure-to-pay",                team: "AP team",           days: 10 },
  { id: "o2c",       label: "Order-to-cash",                 team: "AR team",           days: 10 },
];

export default function HeroCarousel() {
  const [idx, setIdx] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setIdx((v) => (v + 1) % VIEWS.length), 5200);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      data-testid="hero-carousel"
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Value ribbon above the app frame — single row */}
      <div
        className="flex flex-wrap items-center gap-1.5 mb-3 px-1"
        data-testid="hero-carousel-ribbon"
      >
        <div className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#0A0A0A] bg-white border border-line rounded-full pl-2 pr-3 py-1">
          <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-[#0A0A0A] text-white">
            <Sparkles size={11} />
          </span>
          Custom workflows
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-1 text-[11px] text-[#0A0A0A]/70">
          <Timer size={11} /> Live in 15 days or less
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] border border-[#059669]/30 px-2 py-1 text-[11px] text-[#065F46]">
          <ShieldCheck size={11} /> No upfront cost · pay on value
        </span>
      </div>

      <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
        <MockChrome viewLabel={VIEWS[idx].label} />
        <div className="relative min-h-[420px] bg-white">
          {VIEWS.map((v, i) => (
            <div
              key={v.id}
              data-testid={`hero-carousel-view-${v.id}`}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                i === idx ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
              }`}
            >
              {v.id === "board" && <BoardView />}
              {v.id === "warehouse" && <WarehouseView active={i === idx} />}
              {v.id === "recon" && <ReconView active={i === idx} />}
              {v.id === "people" && <PeopleView active={i === idx} />}
              {v.id === "p2p" && <ProcureToPayView active={i === idx} />}
              {v.id === "o2c" && <OrderToCashView active={i === idx} />}
            </div>
          ))}
        </div>

        {/* Per-view caption strip */}
        <div
          className="flex flex-nowrap items-center justify-between gap-3 px-4 py-2.5 border-t border-line bg-[#F9F6F0] text-[11px]"
          data-testid="hero-carousel-caption"
        >
          <div className="text-[#0A0A0A]/70 min-w-0 flex items-center gap-2 truncate">
            <span className="font-medium text-[#0A0A0A] truncate">{VIEWS[idx].label}</span>
            <span className="text-[#0A0A0A]/30 shrink-0">·</span>
            <span className="shrink-0">Built for <span className="font-medium text-[#0A0A0A]">{VIEWS[idx].team}</span></span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5 whitespace-nowrap">
              <Timer size={10} /> {VIEWS[idx].days} days
            </span>
          </div>
        </div>
      </div>

      {/* indicators */}
      <div className="mt-4 flex items-center justify-center gap-2" data-testid="hero-carousel-indicators">
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            aria-label={`Show ${v.label}`}
            data-testid={`hero-carousel-dot-${v.id}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-8 bg-[#0A0A0A]" : "w-3 bg-[#0A0A0A]/25 hover:bg-[#0A0A0A]/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------- Shared chrome ---------- */
function MockChrome({ viewLabel }) {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
      <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
      <div className="ml-4 text-[11px] text-[#0A0A0A]/50">finboard.app / {viewLabel.toLowerCase().replace(/\s+/g, "-")}</div>
      <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-white border border-line">Live</div>
    </div>
  );
}

/* ---------- View 1: Board dashboard ---------- */
function BoardView() {
  return (
    <div className="grid grid-cols-12 h-full">
      <aside className="col-span-3 bg-[#F5F0E8] border-r border-line py-4 px-3 hidden sm:block">
        <div className="flex items-center gap-2 px-2 py-2 rounded-md bg-white border border-line">
          <div className="h-6 w-6 rounded bg-[#0A0A0A] text-white text-[10px] grid place-items-center">4</div>
          <div className="text-[11px] leading-tight">
            <div className="font-medium">4 Seasons Home…</div>
            <div className="text-[9px] text-emerald-600">● Connected</div>
          </div>
        </div>
        <nav className="mt-4 space-y-1 text-[12px]">
          {["Workbook", "KPI", "Reports", "Regroup", "Budgets", "Reporting Models"].map((label, i) => (
            <div key={label} className={`px-2 py-1.5 rounded-md ${i === 2 ? "bg-white border border-line" : "text-[#0A0A0A]/70"}`}>
              {label}
            </div>
          ))}
        </nav>
      </aside>
      <div className="col-span-12 sm:col-span-9 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Board meeting · Performance review</div>
            <div className="font-serif-display text-lg mt-0.5">Q2 · Consolidated group review</div>
          </div>
          <div className="text-[10px] px-2 py-1 rounded-full bg-[#F5F0E8] border border-line">Jun 2026</div>
        </div>

        {/* Top row: horizontal bars + donut */}
        <div className="grid grid-cols-5 gap-3 mt-3">
          <div className="col-span-3 rounded-lg border border-line p-3">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium">Restaurant costs by location</div>
              <div className="text-[9px] text-[#0A0A0A]/50">USD · MTD</div>
            </div>
            <HBarChart />
          </div>
          <div className="col-span-2 rounded-lg border border-line p-3 min-w-0">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium truncate">Revenue by entity</div>
              <div className="text-[9px] text-[#0A0A0A]/50 shrink-0">$4.82M</div>
            </div>
            <DonutChart />
          </div>
        </div>

        {/* Bottom: dual-axis line chart */}
        <div className="mt-3 rounded-lg border border-line p-3">
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-medium">Revenue · YTD · %MoM growth</div>
            <div className="flex items-center gap-2 text-[9px] text-[#0A0A0A]/60">
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-[#0A0A0A]" /> Revenue</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-[#2563EB]" /> Revenue YTD</span>
              <span className="inline-flex items-center gap-1"><span className="h-1.5 w-3 rounded-sm bg-amber-500" /> %MoM</span>
            </div>
          </div>
          <DualAxisChart />
        </div>
      </div>
    </div>
  );
}

function HBarChart() {
  const rows = [
    { l: "Manhattan",   v: 184, p: 100 },
    { l: "Brooklyn",    v: 142, p: 77  },
    { l: "Queens",      v: 118, p: 64  },
    { l: "Long Island", v: 96,  p: 52  },
    { l: "Newark",      v: 72,  p: 39  },
  ];
  return (
    <div className="mt-2 space-y-1.5">
      {rows.map((r) => (
        <div key={r.l} className="flex items-center gap-2 text-[10px]">
          <div className="w-16 shrink-0 text-[#0A0A0A]/70 truncate">{r.l}</div>
          <div className="flex-1 h-3 bg-[#F5F0E8] rounded-sm relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-[#0A0A0A] rounded-sm" style={{ width: `${r.p}%` }} />
          </div>
          <div className="w-12 text-right tabular-nums text-[#0A0A0A]/80">${r.v}k</div>
        </div>
      ))}
    </div>
  );
}

function DonutChart() {
  // Revenue by entity - percentages sum to 100
  const data = [
    { l: "North",    v: 32, c: "#0A0A0A" },
    { l: "South",    v: 24, c: "#2563EB" },
    { l: "Clinical", v: 22, c: "#059669" },
    { l: "Holdings", v: 14, c: "#D97706" },
    { l: "Other",    v: 8,  c: "#9CA3AF" },
  ];
  const R = 34;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div className="mt-2 flex items-center gap-2">
      <svg viewBox="0 0 100 100" className="h-20 w-20 shrink-0 -rotate-90">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#F5F0E8" strokeWidth="14" />
        {data.map((d) => {
          const len = (d.v / 100) * C;
          const dash = `${len} ${C - len}`;
          const el = (
            <circle
              key={d.l}
              cx="50" cy="50" r={R}
              fill="none"
              stroke={d.c}
              strokeWidth="14"
              strokeDasharray={dash}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="flex-1 space-y-[3px] min-w-0">
        {data.map((d) => (
          <div key={d.l} className="flex items-center justify-between gap-1 text-[9px]">
            <div className="flex items-center gap-1 min-w-0">
              <span className="h-1.5 w-1.5 rounded-sm shrink-0" style={{ background: d.c }} />
              <span className="truncate text-[#0A0A0A]/80">{d.l}</span>
            </div>
            <span className="tabular-nums text-[#0A0A0A]/60 shrink-0">{d.v}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DualAxisChart() {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  // Monthly revenue in $k
  const rev = [340, 355, 370, 360, 395, 420, 430, 455, 480, 495, 510, 530];
  // %MoM growth (approx)
  const mom = [null, 4.4, 4.2, -2.7, 9.7, 6.3, 2.4, 5.8, 5.5, 3.1, 3.0, 3.9];
  const maxRev = 600;
  // YTD cumulative
  const ytd = rev.reduce((acc, v, i) => {
    acc.push((acc[i - 1] || 0) + v);
    return acc;
  }, []);
  const maxYtd = ytd[ytd.length - 1];
  // chart geometry
  const W = 460, H = 130, pl = 26, pr = 26, pt = 8, pb = 20;
  const iw = W - pl - pr;
  const ih = H - pt - pb;
  const step = iw / (months.length - 1);

  const revPts = rev.map((v, i) => [pl + i * step, pt + ih - (v / maxRev) * ih]);
  const ytdPts = ytd.map((v, i) => [pl + i * step, pt + ih - (v / maxYtd) * ih]);
  const momPts = mom.map((v, i) => (v === null ? null : [pl + i * step, pt + ih - ((v + 4) / 16) * ih])); // secondary axis from -4 to +12

  const linePath = (pts) => pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  const momPath = momPts
    .filter(Boolean)
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full mt-1.5 h-[110px]">
      {/* grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => (
        <line key={i} x1={pl} x2={W - pr} y1={pt + ih * f} y2={pt + ih * f} stroke="#EFE9DE" strokeWidth="1" />
      ))}
      {/* left axis labels (Revenue $k) */}
      {[0, 0.5, 1].map((f, i) => (
        <text key={i} x={pl - 4} y={pt + ih * (1 - f) + 3} textAnchor="end" fontSize="7" fill="#525252" fontFamily="ui-monospace,monospace">
          ${Math.round(maxRev * f)}k
        </text>
      ))}
      {/* right axis labels (%MoM) */}
      {[-4, 0, 4, 8, 12].map((val, i) => (
        <text key={i} x={W - pr + 4} y={pt + ih * (1 - (val + 4) / 16) + 3} textAnchor="start" fontSize="7" fill="#525252" fontFamily="ui-monospace,monospace">
          {val}%
        </text>
      ))}

      {/* Revenue bars */}
      {rev.map((v, i) => {
        const barW = step * 0.5;
        const x = pl + i * step - barW / 2;
        const h = (v / maxRev) * ih;
        return <rect key={i} x={x} y={pt + ih - h} width={barW} height={h} fill="#0A0A0A" opacity="0.85" rx="1.5" />;
      })}

      {/* YTD line */}
      <path d={linePath(ytdPts)} fill="none" stroke="#2563EB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {ytdPts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill="#2563EB" />
      ))}

      {/* MoM line (secondary axis) */}
      <path d={momPath} fill="none" stroke="#D97706" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
      {momPts.map((p, i) => (p ? <circle key={i} cx={p[0]} cy={p[1]} r="1.4" fill="#D97706" /> : null))}

      {/* x labels */}
      {months.map((m, i) => (
        <text key={i} x={pl + i * step} y={H - 6} textAnchor="middle" fontSize="7" fill="#525252">{m}</text>
      ))}
    </svg>
  );
}

/* ---------- View 2: Inter-company reconciliation (spreadsheet grid) ---------- */
const SS_COLS = [
  { key: "A", label: "Pair", w: 44 },
  { key: "B", label: "From entity", w: 130 },
  { key: "C", label: "To entity", w: 130 },
  { key: "D", label: "Ref", w: 78 },
  { key: "E", label: "Amount (USD)", w: 110, right: true },
  { key: "F", label: "Status", w: 80 },
];

const SS_ROWS = [
  ["A", "Home Care · North", "Home Care · South", "IC-8842", "142,300.00", { status: "match" }],
  ["A", "Home Care · South", "Home Care · North", "IC-8842", "142,300.00", { status: "match" }],
  ["B", "Clinical Group",    "Feature Holdings",  "IC-9013", "54,780.00",  { status: "match" }],
  ["B", "Feature Holdings",  "Clinical Group",    "IC-9013", "54,780.00",  { status: "match" }],
  ["C", "Home Care · North", "Feature Holdings",  "IC-9110", "18,940.00",  { status: "delta" }],
  ["C", "Feature Holdings",  "Home Care · North", "IC-9110", "18,900.00",  { status: "delta" }],
];

function ReconView({ active }) {
  const rowNumW = 28;
  return (
    <div className="bg-white h-full flex flex-col">
      {/* Source files strip - multiple QuickBooks files */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-line bg-[#F9F6F0] overflow-hidden">
        <span className="text-[10px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 shrink-0">Ingesting</span>
        <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
          {[
            "QB_HomeCare-North.QBO",
            "QB_HomeCare-South.QBO",
            "QB_Clinical.QBO",
            "QB_Feature-Holdings.QBO",
          ].map((f, i) => (
            <div
              key={f}
              data-testid={`recon-source-${i}`}
              className={`shrink-0 inline-flex items-center gap-1 text-[10px] rounded-full border border-line bg-white px-2 py-1 ${active ? "animate-fade-up" : ""}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="h-3 w-3 rounded-[3px] bg-[#2CA01C] text-white grid place-items-center text-[7px] font-bold shrink-0">Q</span>
              <span className="font-mono truncate max-w-[140px]">{f}</span>
              <span className="text-[8px] text-emerald-700 shrink-0">✓</span>
            </div>
          ))}
        </div>
        <span className="shrink-0 text-[10px] text-[#0A0A0A]/50 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> syncing
        </span>
      </div>

      {/* toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-line bg-[#F9F6F0]">
        <div className="flex items-center gap-2 text-[11px] text-[#0A0A0A]/70">
          <span className="font-mono px-1.5 py-0.5 rounded bg-white border border-line">fx</span>
          <span className="font-mono text-[#0A0A0A]/60">=MATCH(E2:E7, &quot;IC-*&quot;)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px]">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-50 text-emerald-700"><Check size={10} /> 4 matched</span>
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700">2 mismatch</span>
        </div>
      </div>

      {/* Excel-style column-letter header (A B C D E F) */}
      <div
        className="grid text-[10px] font-mono text-[#0A0A0A]/50 bg-[#F5F0E8]/70 border-b border-line"
        style={{ gridTemplateColumns: `${rowNumW}px ${SS_COLS.map((c) => `${c.w}px`).join(" ")}` }}
      >
        <div className="border-r border-line py-1.5 text-center">·</div>
        {SS_COLS.map((c) => (
          <div key={c.key} className="border-r border-line last:border-r-0 py-1.5 text-center">{c.key}</div>
        ))}
      </div>

      {/* Header row (row 1) with column labels */}
      <div
        className="grid text-[10px] uppercase tracking-[0.12em] text-[#0A0A0A]/70 bg-white border-b border-line-strong"
        style={{ gridTemplateColumns: `${rowNumW}px ${SS_COLS.map((c) => `${c.w}px`).join(" ")}` }}
      >
        <div className="border-r border-line py-1.5 text-center font-mono text-[#0A0A0A]/50 bg-[#F5F0E8]/70">1</div>
        {SS_COLS.map((c) => (
          <div
            key={c.key}
            className={`border-r border-line last:border-r-0 py-1.5 px-2 font-semibold ${c.right ? "text-right" : "text-left"}`}
          >
            {c.label}
          </div>
        ))}
      </div>

      {/* Data rows */}
      <div className="flex-1 overflow-hidden">
        {SS_ROWS.map((r, i) => {
          const meta = r[5];
          const pair = r[0];
          const pairDot =
            pair === "A" ? "bg-[#2563EB]" : pair === "B" ? "bg-emerald-500" : "bg-amber-500";
          const isDelta = meta.status === "delta";
          const isSelected = i === 3; // simulate active cell in row 5 (data row 4)
          return (
            <div
              key={i}
              className={`grid text-[12px] border-b border-line group ${isDelta ? "bg-amber-50/40" : "bg-white"} ${active ? "animate-fade-up" : ""}`}
              style={{
                gridTemplateColumns: `${rowNumW}px ${SS_COLS.map((c) => `${c.w}px`).join(" ")}`,
                animationDelay: `${i * 90}ms`,
              }}
            >
              <div className="border-r border-line py-2 text-center font-mono text-[10px] text-[#0A0A0A]/50 bg-[#F5F0E8]/70">
                {i + 2}
              </div>

              {/* A: pair dot */}
              <div className="border-r border-line py-2 flex items-center justify-center">
                <span className={`h-2 w-2 rounded-full ${pairDot}`} />
                <span className="ml-1.5 font-mono text-[10px] text-[#0A0A0A]/60">{pair}</span>
              </div>

              {/* B */}
              <div className="border-r border-line py-2 px-2 truncate">{r[1]}</div>
              {/* C */}
              <div className="border-r border-line py-2 px-2 truncate text-[#0A0A0A]/75">{r[2]}</div>
              {/* D */}
              <div className="border-r border-line py-2 px-2 font-mono text-[11px] text-[#0A0A0A]/70">{r[3]}</div>
              {/* E */}
              <div className={`border-r border-line py-2 px-2 text-right font-mono tabular-nums ${isSelected ? "ring-2 ring-inset ring-[#2563EB] relative z-10" : ""}`}>
                {r[4]}
              </div>
              {/* F */}
              <div className="py-2 px-2">
                {meta.status === "match" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
                    <Check size={10} /> match
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700">
                    Δ $40
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="border-t border-line px-4 py-2 flex items-center gap-2 text-[10px] text-[#0A0A0A]/60 bg-[#F9F6F0]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
        Sheet1 · AI matched 4 pairs across 3 entities · flagged 1 for review
      </div>
    </div>
  );
}

/* ---------- View 3: People scorecards ---------- */
const SOURCES = [
  { id: "crm",  label: "Salesforce", sub: "CRM",  icon: Briefcase },
  { id: "erp",  label: "NetSuite",   sub: "ERP",  icon: Database },
  { id: "hris", label: "Workday",    sub: "HRIS", icon: Users },
];

const PEOPLE = [
  { n: "Amara Chen", r: "AE · Sales", s: 92 },
  { n: "Devin Cole", r: "Nurse Manager", s: 88 },
  { n: "Priya Rao", r: "Controller", s: 95 },
  { n: "Jonas Weber", r: "Operations", s: 79 },
];

function PeopleView({ active }) {
  const kpis = [
    { l: "Headcount",    v: "214",   d: "+12 QTD" },
    { l: "Attrition",    v: "6.2%",  d: "-1.1pp" },
    { l: "Utilisation",  v: "84%",   d: "+3pp" },
    { l: "Comp/Rev",     v: "38%",   d: "flat" },
  ];
  const teamRows = [
    { d: "Sales",       hc: 42, util: 88, att: 4.1, rev: 1.82 },
    { d: "Clinical",    hc: 78, util: 91, att: 6.8, rev: 1.24 },
    { d: "Operations",  hc: 34, util: 79, att: 5.2, rev: 0.68 },
    { d: "Finance",     hc: 18, util: 82, att: 3.9, rev: 0.31 },
    { d: "Engineering", hc: 42, util: 86, att: 7.8, rev: 0.77 },
  ];
  return (
    <div className="bg-white h-full p-4 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">People scorecards · Live</div>
          <div className="font-serif-display text-lg mt-0.5">Team performance dashboard</div>
        </div>
        <div className="text-[10px] px-2 py-1 rounded-full bg-[#F5F0E8] border border-line">Q2 · 2026</div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {kpis.map((k, i) => (
          <div key={k.l} className={`rounded-lg border border-line p-2.5 ${active ? "animate-fade-up" : ""}`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{k.l}</div>
            <div className="mt-0.5 text-lg font-semibold tracking-tight">{k.v}</div>
            <div className="text-[9px] text-[#0A0A0A]/60">{k.d}</div>
          </div>
        ))}
      </div>

      {/* Team table */}
      <div className="mt-3 rounded-lg border border-line overflow-hidden">
        <div className="grid grid-cols-[1fr_60px_1fr_60px_70px] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 bg-[#F5F0E8]/70 border-b border-line">
          <div>Department</div>
          <div className="text-right">HC</div>
          <div>Utilisation</div>
          <div className="text-right">Attrition</div>
          <div className="text-right">Rev/HC</div>
        </div>
        {teamRows.map((t, i) => (
          <div key={t.d} className={`grid grid-cols-[1fr_60px_1fr_60px_70px] items-center px-3 py-2 border-b border-line last:border-0 text-[11px] ${active ? "animate-fade-up" : ""}`} style={{ animationDelay: `${400 + i * 90}ms` }}>
            <div className="truncate">{t.d}</div>
            <div className="text-right tabular-nums">{t.hc}</div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#F5F0E8] rounded-full overflow-hidden">
                <div className="h-full bg-[#0A0A0A]" style={{ width: `${t.util}%` }} />
              </div>
              <span className="text-[9px] tabular-nums text-[#0A0A0A]/70 w-6 text-right">{t.util}%</span>
            </div>
            <div className={`text-right tabular-nums text-[10px] ${t.att > 6.5 ? "text-rose-700" : "text-emerald-700"}`}>{t.att}%</div>
            <div className="text-right tabular-nums text-[10px] font-medium">${t.rev.toFixed(2)}M</div>
          </div>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 text-[10px] text-[#0A0A0A]/60">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
        Merged multiple systems: NetSuite · Salesforce · Workday · Rippling · Zendesk
      </div>
    </div>
  );
}

function FlowLines({ active }) {
  return (
    <svg viewBox="0 0 100 300" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="flowg" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <path d="M0,40  C 30,40  50,150 60,150" stroke="url(#flowg)" strokeWidth="1.6" fill="none" strokeLinecap="round"
        strokeDasharray="4 6"
        style={active ? { animation: "dash 3s linear infinite" } : {}}
      />
      <path d="M0,150 C 30,150 50,150 60,150" stroke="url(#flowg)" strokeWidth="1.6" fill="none" strokeLinecap="round"
        strokeDasharray="4 6"
        style={active ? { animation: "dash 3s linear infinite", animationDelay: "0.4s" } : {}}
      />
      <path d="M0,260 C 30,260 50,150 60,150" stroke="url(#flowg)" strokeWidth="1.6" fill="none" strokeLinecap="round"
        strokeDasharray="4 6"
        style={active ? { animation: "dash 3s linear infinite", animationDelay: "0.8s" } : {}}
      />
      <circle cx="62" cy="150" r="6" fill="#0A0A0A" />
      <circle cx="62" cy="150" r="11" fill="none" stroke="#0A0A0A" strokeOpacity="0.15" strokeWidth="1"
        style={active ? { animation: "pulse 2s ease-out infinite" } : {}}
      />
      <path d="M62,150 C 78,150 90,150 100,150" stroke="#0A0A0A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <style>{`
        @keyframes dash { to { stroke-dashoffset: -80; } }
        @keyframes pulse {
          0% { r: 8; opacity: 0.35; }
          80% { r: 22; opacity: 0; }
          100% { r: 22; opacity: 0; }
        }
      `}</style>
    </svg>
  );
}

/* ---------- View: AI-Native warehouse ---------- */
const WH_SOURCES = [
  { id: "qbo",   label: "QuickBooks", sub: "Accounting · ERP", icon: BookOpen,          tag: "featured" },
  { id: "erp",   label: "NetSuite",   sub: "ERP",              icon: Database,          tag: "core" },
  { id: "crm",   label: "Salesforce", sub: "CRM",              icon: Briefcase,         tag: "core" },
  { id: "hris",  label: "Workday",    sub: "HRIS",             icon: Users,             tag: "core" },
  { id: "ap",    label: "Bill.com",   sub: "AP",               icon: Receipt,           tag: "core" },
  { id: "rest",  label: "Toast",       sub: "Restaurant · POS",   icon: Utensils,          tag: "industry" },
  { id: "cons",  label: "Procore",     sub: "Construction",       icon: HardHat,           tag: "industry" },
  { id: "bldr",  label: "BuilderTrend",sub: "Construction · PM",  icon: HardHat,           tag: "industry" },
  { id: "hlth",  label: "Epic",        sub: "Healthcare · EHR",   icon: Stethoscope,       tag: "industry" },
  { id: "more",  label: "and 100 more",sub: "connectors",       icon: null,              tag: "more" },
];

const WH_PROCESSES = [
  {
    id: "analytics",
    label: "Analytics",
    sub: "Dashboards · Board pack",
    icon: BarChart3,
    items: [
      { id: "board", label: "Board dashboard", icon: FileText },
      { id: "recon", label: "Consolidation",   icon: Landmark },
      { id: "score", label: "Scorecards",      icon: Users },
      { id: "plan",  label: "Planning models", icon: Sparkles },
    ],
  },
  {
    id: "p2p",
    label: "Procure-to-Pay",
    sub: "AP · approvals · pay",
    icon: Receipt,
    items: [
      { id: "po",     label: "PO issued",       icon: FileText },
      { id: "match",  label: "3-way match",     icon: ShieldCheck },
      { id: "approve",label: "Approvals",       icon: Users },
      { id: "pay",    label: "Payment run",     icon: CircleDollarSign },
    ],
  },
  {
    id: "o2c",
    label: "Order-to-Cash",
    sub: "AR · billing · collect",
    icon: CircleDollarSign,
    items: [
      { id: "quote",  label: "Quote → Order",   icon: FileText },
      { id: "invoice",label: "Invoice sent",    icon: Receipt },
      { id: "collect",label: "Collections",     icon: CircleDollarSign },
      { id: "dso",    label: "DSO tracker",     icon: Sparkles },
    ],
  },
];

function WarehouseView({ active }) {
  return (
    <div className="bg-white h-full p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">ACME Corp</div>
          <div className="font-serif-display text-xl mt-0.5">Business Data Hub</div>
        </div>
        <div className="text-[11px] text-[#0A0A0A]/60">9 sources + 100 more</div>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(140px,160px)_1fr_minmax(140px,160px)] gap-3 items-stretch flex-1">
        {/* Sources */}
        <div className="flex flex-col gap-[3px]">
          {WH_SOURCES.map((s, i) => {
            const Icon = s.icon;
            const isIndustry = s.tag === "industry";
            const isMore = s.tag === "more";
            const isFeatured = s.tag === "featured";
            if (isMore) {
              return (
                <div
                  key={s.id}
                  className={`rounded-md border border-dashed border-[#0A0A0A]/20 bg-[#F5F0E8]/40 px-2 py-0.5 flex items-center gap-2 ${active ? "animate-fade-up" : ""}`}
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="h-5 w-5 rounded grid place-items-center border border-dashed border-[#0A0A0A]/25 bg-white text-[#0A0A0A]/50 text-[9px] tracking-widest">···</div>
                  <div className="min-w-0 leading-tight flex-1">
                    <div className="text-[10px] font-medium truncate">and 100+ more</div>
                    <div className="text-[8px] text-[#0A0A0A]/50 truncate">connectors</div>
                  </div>
                </div>
              );
            }
            const styles = isFeatured
              ? { row: "border-[#059669]/30 bg-white ring-1 ring-[#059669]/15", icon: "border-[#059669]/35 bg-[#ECFDF5] text-[#059669]", sub: "text-[#059669]/85", badge: "text-[#059669]/85" }
              : isIndustry
              ? { row: "border-[#2563EB]/25 bg-white ring-1 ring-[#2563EB]/10", icon: "border-[#2563EB]/30 bg-[#EEF2FF] text-[#2563EB]", sub: "text-[#2563EB]/80", badge: "text-[#2563EB]/80" }
              : { row: "border-line bg-[#F5F0E8]", icon: "border-line bg-white", sub: "text-[#0A0A0A]/50", badge: "" };
            return (
              <div
                key={s.id}
                className={`rounded-md border px-2 py-0.5 flex items-center gap-2 ${styles.row} ${active ? "animate-fade-up" : ""}`}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={`h-5 w-5 rounded grid place-items-center border ${styles.icon}`}>
                  <Icon size={11} />
                </div>
                <div className="min-w-0 leading-tight flex-1">
                  <div className="text-[10px] font-medium truncate">{s.label}</div>
                  <div className={`text-[8px] truncate ${styles.sub}`}>{s.sub}</div>
                </div>
                {isFeatured && (
                  <span className={`text-[8px] uppercase tracking-[0.12em] shrink-0 ${styles.badge}`}>popular</span>
                )}
                {isIndustry && (
                  <span className={`text-[8px] uppercase tracking-[0.12em] shrink-0 ${styles.badge}`}>industry</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Warehouse core */}
        <div className={`relative rounded-lg border border-line bg-[#F9F6F0] p-3 flex flex-col ${active ? "animate-fade-up" : ""}`} style={{ animationDelay: "500ms" }}>
          <WarehouseFlowLines active={active} />
          <div className="relative z-10 mx-auto mt-2 rounded-md bg-[#0A0A0A] text-white px-3 py-2 flex items-center gap-2 shadow-[0_10px_24px_-16px_rgba(10,10,10,0.6)]">
            <Database size={14} />
            <div className="leading-tight">
              <div className="text-[9px] uppercase tracking-[0.18em] text-white/55">FinBoard</div>
              <div className="text-[12px] font-medium">Semantic Layer</div>
            </div>
            <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">AI-Native</span>
          </div>

          <div className="relative z-10 mt-3 grid grid-cols-3 gap-2 text-center">
            {[
              { l: "Ingest",     v: "128 tables" },
              { l: "Model",      v: "AI schema" },
              { l: "Serve",      v: "real-time" },
            ].map((c) => (
              <div key={c.l} className="rounded-md border border-line bg-white px-2 py-1.5">
                <div className="text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">{c.l}</div>
                <div className="text-[11px] font-medium mt-0.5">{c.v}</div>
              </div>
            ))}
          </div>

          <div className="relative z-10 mt-auto pt-4 flex items-center gap-1.5 text-[10px] text-[#0A0A0A]/60 bg-[#F9F6F0]">
            <ShieldCheck size={11} /> Governed · lineage tracked
          </div>
        </div>

        {/* Outputs — rotates between Analytics, P2P, O2C */}
        <WHProcesses active={active} />
      </div>
    </div>
  );
}

function WHProcesses({ active }) {
  const [procIdx, setProcIdx] = React.useState(0);
  React.useEffect(() => {
    if (!active) return undefined;
    const t = setInterval(() => setProcIdx((v) => (v + 1) % WH_PROCESSES.length), 3200);
    return () => clearInterval(t);
  }, [active]);
  const proc = WH_PROCESSES[procIdx];
  const HeadIcon = proc.icon;
  return (
    <div className="flex flex-col gap-2 justify-start min-w-0">
      {/* Process tab strip */}
      <div className="flex items-center gap-1" data-testid="wh-process-tabs">
        {WH_PROCESSES.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setProcIdx(i)}
            data-testid={`wh-process-tab-${p.id}`}
            className={`text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full border transition-colors ${
              i === procIdx
                ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                : "border-line bg-white text-[#0A0A0A]/55 hover:text-[#0A0A0A]"
            }`}
          >
            {p.id === "analytics" ? "Analytics" : p.id === "p2p" ? "P2P" : "O2C"}
          </button>
        ))}
      </div>

      {/* Header row */}
      <div
        key={`head-${proc.id}`}
        className="flex items-center gap-2 rounded-md border border-line bg-[#F9F6F0] px-2 py-1.5 animate-fade-up"
      >
        <div className="h-6 w-6 rounded bg-white border border-line grid place-items-center">
          <HeadIcon size={12} />
        </div>
        <div className="leading-tight min-w-0">
          <div className="text-[11px] font-medium truncate">{proc.label}</div>
          <div className="text-[9px] text-[#0A0A0A]/55 truncate">{proc.sub}</div>
        </div>
      </div>

      {/* Item options */}
      <div className="flex flex-col gap-1.5" data-testid={`wh-process-panel-${proc.id}`}>
        {proc.items.map((it, i) => {
          const ItIcon = it.icon;
          return (
            <div
              key={`${proc.id}-${it.id}`}
              className="rounded-md border border-line bg-white px-2 py-1.5 flex items-center gap-2 animate-fade-up"
              style={{ animationDelay: `${100 + i * 90}ms` }}
            >
              <div className="h-5 w-5 rounded bg-[#F5F0E8] border border-line grid place-items-center">
                <ItIcon size={11} />
              </div>
              <div className="text-[11px] font-medium truncate">{it.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WarehouseFlowLines({ active }) {
  return (
    <svg viewBox="0 0 200 200" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-70">
      <defs>
        <linearGradient id="whflow" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#0A0A0A" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {[10, 40, 70, 130, 160, 190].map((y, i) => (
        <path
          key={i}
          d={`M0,${y} C 50,${y} 60,100 100,100`}
          stroke="url(#whflow)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="3 5"
          style={active ? { animation: `dash 3s linear infinite`, animationDelay: `${i * 0.15}s` } : {}}
        />
      ))}
      {[70, 100, 130, 160].map((y, i) => (
        <path
          key={`o${i}`}
          d={`M100,100 C 140,100 160,${y} 200,${y}`}
          stroke="#0A0A0A"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      <style>{`@keyframes dash { to { stroke-dashoffset: -80; } }`}</style>
    </svg>
  );
}

/* ---------- View 4: Procure-to-Pay ---------- */
function ProcureToPayView({ active }) {
  return (
    <div className="bg-white h-full p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Procure-to-Pay · AI agent</div>
          <div className="font-serif-display text-xl mt-0.5">Vendor quote → approved payment</div>
        </div>
        <div className="text-[11px] text-[#0A0A0A]/60">42 in flight · 3 need attention</div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 flex-1">
        {/* Stage 1: Scan */}
        <StageColumn title="1 · Scan inbox & ERP" delay={0} active={active}>
          <SourceRow icon={Mail} label="finance@acme.com" note="12 new" />
          <SourceRow icon={Database} label="NetSuite POs" note="live sync" />
          <div className="mt-2 rounded-md border border-line bg-[#F9F6F0] p-2.5">
            <div className="flex items-center gap-2 text-[11px]">
              <FileText size={12} /> <span className="font-medium">Quote_88421.pdf</span>
            </div>
            <div className="mt-1.5 text-[10px] text-[#0A0A0A]/60 leading-relaxed">
              Vendor: <span className="text-[#0A0A0A]">Orbital Supplies</span> · $18,420.00 · Net-30
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <ProgressBar pct={100} />
              <span className="text-[9px] text-emerald-700">Parsed</span>
            </div>
          </div>
        </StageColumn>

        {/* Stage 2: Approvals */}
        <StageColumn title="2 · Approval chain" delay={200} active={active}>
          <ApprovalStep name="Priya Rao" role="Controller" state="approved" />
          <ApprovalStep name="Marc Levy" role="VP Ops" state="approved" />
          <ApprovalStep name="Elena Marsh" role="CFO" state="pending" />
          <div className="mt-1 text-[10px] text-[#0A0A0A]/60 flex items-center gap-1.5">
            <ShieldCheck size={11} /> Policy: over $10k → CFO
          </div>
        </StageColumn>

        {/* Stage 3: Payment with context */}
        <StageColumn title="3 · Payment entry" delay={400} active={active}>
          <div className="rounded-md border border-line p-2.5 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium">Orbital Supplies</div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700">Awaiting CFO</span>
            </div>
            <div className="mt-1.5 text-[10px] text-[#0A0A0A]/60 flex items-center justify-between">
              <span>Payment · <span className="font-mono">PAY-4402</span></span>
              <span className="tabular-nums font-semibold text-[#0A0A0A]">$18,420.00</span>
            </div>
          </div>
          {/* linked context */}
          <div className="mt-2 rounded-md border border-line bg-[#F9F6F0] p-2.5 text-[10px]">
            <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">Vendor context</div>
            <ContextRow icon={Landmark} label="Open balance" value="$42,180.00" />
            <ContextRow icon={FileText} label="Open POs" value="3 · $61.4k" />
            <ContextRow icon={CircleDollarSign} label="YTD spend" value="$182k" />
            <div className="mt-1 pt-1.5 border-t border-line flex items-center gap-1.5 text-[9px] text-[#0A0A0A]/60">
              <Receipt size={11} /> Fully traceable · 6 linked docs
            </div>
          </div>
        </StageColumn>
      </div>
    </div>
  );
}

/* ---------- View 5: Order-to-Cash ---------- */
function OrderToCashView({ active }) {
  return (
    <div className="bg-white h-full p-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Order-to-Cash · AI agent</div>
          <div className="font-serif-display text-xl mt-0.5">Customer quote → cash in bank</div>
        </div>
        <div className="text-[11px] text-[#0A0A0A]/60">27 in flight · 2 escalated</div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3 flex-1">
        {/* Stage 1: Scan / Order */}
        <StageColumn title="1 · Ingest quote" delay={0} active={active}>
          <SourceRow icon={Mail} label="orders@acme.com" note="8 new" />
          <SourceRow icon={Briefcase} label="Salesforce · CPQ" note="live sync" />
          <div className="mt-2 rounded-md border border-line bg-[#F9F6F0] p-2.5">
            <div className="flex items-center gap-2 text-[11px]">
              <FileText size={12} /> <span className="font-medium">Quote_Q-2214.pdf</span>
            </div>
            <div className="mt-1.5 text-[10px] text-[#0A0A0A]/60 leading-relaxed">
              Customer: <span className="text-[#0A0A0A]">Meridian Retail</span> · $32,900.00 · Net-45
            </div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <ProgressBar pct={100} />
              <span className="text-[9px] text-emerald-700">Parsed</span>
            </div>
          </div>
        </StageColumn>

        {/* Stage 2: Approvals / Credit */}
        <StageColumn title="2 · Credit & approval" delay={200} active={active}>
          <ApprovalStep name="AI credit check" role="A2 rating" state="approved" />
          <ApprovalStep name="Sara Lindgren" role="AR Lead" state="approved" />
          <ApprovalStep name="Elena Marsh" role="CFO" state="pending" />
          <div className="mt-1 text-[10px] text-[#0A0A0A]/60 flex items-center gap-1.5">
            <ShieldCheck size={11} /> Policy: over $25k → CFO
          </div>
        </StageColumn>

        {/* Stage 3: Invoice + Context */}
        <StageColumn title="3 · Invoice & collect" delay={400} active={active}>
          <div className="rounded-md border border-line p-2.5 bg-white">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-medium">Meridian Retail</div>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-700">Awaiting CFO</span>
            </div>
            <div className="mt-1.5 text-[10px] text-[#0A0A0A]/60 flex items-center justify-between">
              <span>Invoice · <span className="font-mono">INV-9021</span></span>
              <span className="tabular-nums font-semibold text-[#0A0A0A]">$32,900.00</span>
            </div>
          </div>
          <div className="mt-2 rounded-md border border-line bg-[#F9F6F0] p-2.5 text-[10px]">
            <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">Customer context</div>
            <ContextRow icon={Landmark} label="Open A/R" value="$71,240.00" />
            <ContextRow icon={FileText} label="Open orders" value="4 · $118k" />
            <ContextRow icon={User} label="DSO · 90d" value="41 days" />
            <div className="mt-1 pt-1.5 border-t border-line flex items-center gap-1.5 text-[9px] text-[#0A0A0A]/60">
              <Receipt size={11} /> Traceable · linked to Q-2214, SO-1180
            </div>
          </div>
        </StageColumn>
      </div>
    </div>
  );
}

/* ---------- shared stage helpers ---------- */
function StageColumn({ title, children, delay, active }) {
  return (
    <div
      className={`rounded-lg border border-line bg-white p-3 flex flex-col ${active ? "animate-fade-up" : ""}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50 border-b border-line pb-2 mb-2">
        {title}
      </div>
      <div className="space-y-2 flex-1">{children}</div>
    </div>
  );
}

function SourceRow({ icon: Icon, label, note }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 bg-white">
      <div className="h-6 w-6 rounded bg-[#F5F0E8] border border-line grid place-items-center">
        <Icon size={12} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] truncate">{label}</div>
      </div>
      <div className="text-[9px] text-[#0A0A0A]/50">{note}</div>
    </div>
  );
}

function ApprovalStep({ name, role, state }) {
  const badge =
    state === "approved"
      ? { bg: "bg-emerald-50", tx: "text-emerald-700", label: "Approved" }
      : state === "pending"
      ? { bg: "bg-amber-50", tx: "text-amber-700", label: "Pending" }
      : { bg: "bg-rose-50", tx: "text-rose-700", label: "Rejected" };
  return (
    <div className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5">
      <div className="h-6 w-6 rounded-full bg-[#F5F0E8] border border-line grid place-items-center text-[9px] font-medium">
        {name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[11px] font-medium truncate">{name}</div>
        <div className="text-[9px] text-[#0A0A0A]/50 truncate">{role}</div>
      </div>
      <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${badge.bg} ${badge.tx}`}>{badge.label}</span>
    </div>
  );
}

function ContextRow({ icon: Icon, label, value }) {
  return (
    <div className="mt-1 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[#0A0A0A]/70">
        <Icon size={11} /> {label}
      </div>
      <div className="tabular-nums font-medium text-[#0A0A0A]">{value}</div>
    </div>
  );
}

function ProgressBar({ pct }) {
  return (
    <div className="flex-1 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
      <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }} />
    </div>
  );
}
