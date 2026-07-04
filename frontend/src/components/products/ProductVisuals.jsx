import React from "react";
import {
  Landmark, BarChart3, LineChart, Receipt, CircleDollarSign,
  Building2, ArrowRight, Check, FileText, ShieldCheck, Users,
  Mail, Database, Layers, Target, RefreshCw, Wallet, Briefcase,
} from "lucide-react";

/**
 * Product-specific hero graphics. Monochrome, editorial, per-product unique.
 * Called via <ProductVisual slug="consolidation" />
 */
export default function ProductVisual({ slug }) {
  switch (slug) {
    case "consolidation": return <ConsolidationVisual />;
    case "analytics":     return <AnalyticsVisual />;
    case "fpa":           return <FpaVisual />;
    case "p2p":           return <P2pVisual />;
    case "o2c":           return <O2cVisual />;
    default:              return null;
  }
}

/* ---------- Frame chrome (shared) ---------- */
function Frame({ url, title, children }) {
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-3 text-[11px] font-mono text-[#0A0A0A]/50 truncate">finboard.app / {url}</div>
        <div className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white border border-line">Live</div>
      </div>
      {title && (
        <div className="px-4 py-2 border-b border-line bg-white flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/55 font-semibold">{title}</span>
        </div>
      )}
      <div className="bg-white">{children}</div>
    </div>
  );
}

/* ================================================================ */
/* 1. Consolidation — entity roll-up tree                            */
/* ================================================================ */
function ConsolidationVisual() {
  const entities = [
    { name: "Home Care · North", rev: "$1.24M", curr: "USD" },
    { name: "Home Care · South", rev: "$0.98M", curr: "USD" },
    { name: "Clinical Group",    rev: "$1.42M", curr: "USD" },
    { name: "Feature UK Ltd",    rev: "£0.82M", curr: "GBP" },
    { name: "Feature EU GmbH",   rev: "€0.66M", curr: "EUR" },
  ];
  return (
    <Frame url="consolidation" title="Group close · Q2 · 2026">
      <div className="p-5">
        {/* Parent group */}
        <div className="mx-auto max-w-md rounded-lg border-2 border-[#0A0A0A] bg-[#0A0A0A] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="h-8 w-8 rounded-md bg-white/10 grid place-items-center">
              <Landmark size={16} />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.18em] text-white/55">Group parent</div>
              <div className="text-[14px] font-serif-display">FeatureCare Holdings</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/55">Consolidated</div>
            <div className="text-[14px] font-serif-display tabular-nums">$5.24M</div>
          </div>
        </div>

        {/* Connector lines */}
        <div className="relative h-6 my-1" aria-hidden>
          <svg viewBox="0 0 500 24" preserveAspectRatio="none" className="w-full h-full">
            {[50, 150, 250, 350, 450].map((x, i) => (
              <path key={i} d={`M250,0 C250,12 ${x},12 ${x},24`} stroke="#0A0A0A" strokeOpacity="0.25" strokeWidth="1" fill="none" />
            ))}
          </svg>
        </div>

        {/* Child entities */}
        <div className="grid grid-cols-5 gap-2">
          {entities.map((e, i) => (
            <div
              key={e.name}
              className="rounded-md border border-line bg-white p-2 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between">
                <Building2 size={11} className="text-[#0A0A0A]/60" />
                <span className="text-[9px] font-mono text-[#0A0A0A]/45">{e.curr}</span>
              </div>
              <div className="mt-1 text-[10.5px] font-medium leading-tight truncate">{e.name}</div>
              <div className="mt-1 text-[10px] font-mono tabular-nums text-[#0A0A0A]">{e.rev}</div>
            </div>
          ))}
        </div>

        {/* Elimination row */}
        <div className="mt-4 rounded-lg border border-line bg-[#F9F6F0] p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/60 font-semibold">Auto-eliminations</div>
            <span className="text-[10px] font-mono text-emerald-700 inline-flex items-center gap-1"><Check size={10} /> 4 matched</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 text-[10px]">
            {[
              { l: "Inter-co", v: "$142k" },
              { l: "Revenue", v: "$88k" },
              { l: "Loans", v: "$54k" },
              { l: "FX/CTA", v: "$12k" },
            ].map((c) => (
              <div key={c.l} className="rounded bg-white border border-line px-2 py-1">
                <div className="text-[9px] uppercase tracking-wider text-[#0A0A0A]/45">{c.l}</div>
                <div className="font-mono tabular-nums font-medium">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ================================================================ */
/* 2. Analytics — dashboard with charts                              */
/* ================================================================ */
function AnalyticsVisual() {
  const bars = [
    { l: "Manhattan", v: 100 },
    { l: "Brooklyn", v: 78 },
    { l: "Queens", v: 64 },
    { l: "Long Island", v: 52 },
    { l: "Newark", v: 39 },
  ];
  const kpis = [
    { l: "Revenue", v: "$5.24M", d: "+8%" },
    { l: "Margin", v: "24.6%", d: "+1.2pp" },
    { l: "Cash", v: "$1.82M", d: "+$120k" },
  ];
  return (
    <Frame url="analytics" title="Board pack · Q2 2026">
      <div className="p-4">
        {/* KPI tiles */}
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k, i) => (
            <div key={k.l} className="rounded-md border border-line px-3 py-2 animate-fade-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{k.l}</div>
              <div className="mt-0.5 font-serif-display text-lg leading-none">{k.v}</div>
              <div className="mt-1 text-[10px] text-emerald-700 font-mono">{k.d}</div>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="mt-3 rounded-md border border-line p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10.5px] font-medium">Revenue by location</div>
            <div className="text-[9px] font-mono text-[#0A0A0A]/50">USD · MTD</div>
          </div>
          <div className="space-y-1.5">
            {bars.map((b, i) => (
              <div key={b.l} className="flex items-center gap-2 text-[10px]">
                <div className="w-20 text-[#0A0A0A]/70 truncate shrink-0">{b.l}</div>
                <div className="flex-1 h-2.5 bg-[#F5F0E8] rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-[#0A0A0A] animate-fade-up"
                    style={{ width: `${b.v}%`, animationDelay: `${300 + i * 80}ms` }}
                  />
                </div>
                <div className="w-12 text-right font-mono tabular-nums text-[#0A0A0A]/70 shrink-0">{b.v}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend sparkline */}
        <div className="mt-3 rounded-md border border-line p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10.5px] font-medium">Revenue trend · YTD</div>
            <div className="flex items-center gap-3 text-[9px] text-[#0A0A0A]/50">
              <span className="inline-flex items-center gap-1"><span className="h-1 w-3 bg-[#0A0A0A]" /> Actual</span>
              <span className="inline-flex items-center gap-1"><span className="h-1 w-3 bg-[#0A0A0A]/30 border-b border-dashed border-[#0A0A0A]/50" /> Plan</span>
            </div>
          </div>
          <TrendLine />
        </div>
      </div>
    </Frame>
  );
}

function TrendLine() {
  const actual = [30, 42, 38, 55, 68, 62, 78, 88, 95];
  const plan = [32, 40, 45, 52, 60, 68, 74, 82, 90];
  const toPath = (arr) => arr.map((v, i) => `${i === 0 ? "M" : "L"}${(i / (arr.length - 1)) * 400},${80 - v * 0.7}`).join(" ");
  return (
    <svg viewBox="0 0 400 90" className="w-full h-16">
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#EFE9DE" strokeWidth="1" />
      ))}
      <path d={toPath(plan)} stroke="#0A0A0A" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeDasharray="4 4" />
      <path d={toPath(actual)} stroke="#0A0A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
      {actual.map((v, i) => (
        <circle key={i} cx={(i / (actual.length - 1)) * 400} cy={80 - v * 0.7} r="2.4" fill="#0A0A0A" />
      ))}
    </svg>
  );
}

/* ================================================================ */
/* 3. FP&A — driver model with scenarios                             */
/* ================================================================ */
function FpaVisual() {
  const drivers = [
    { l: "Headcount", v: "214", d: "×", d2: "$8.4k avg" },
    { l: "Locations", v: "12", d: "×", d2: "$180k avg" },
    { l: "Price index", v: "1.04", d: "×", d2: "vs 2025" },
  ];
  return (
    <Frame url="fpa" title="FY 2026 plan · Driver model">
      <div className="p-4">
        {/* Driver panel */}
        <div className="rounded-lg border border-line p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10.5px] font-medium">Revenue drivers</div>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#F5F0E8] border border-line">Live plan</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {drivers.map((d, i) => (
              <div key={d.l} className="rounded-md border border-line bg-[#F9F6F0] p-2 animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
                <div className="text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/55">{d.l}</div>
                <div className="mt-0.5 font-serif-display text-lg leading-none">{d.v}</div>
                <div className="text-[9px] text-[#0A0A0A]/50">{d.d} {d.d2}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-md bg-[#0A0A0A] text-white px-3 py-2 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-[0.15em] text-white/60">FY26 revenue plan</div>
            <div className="font-serif-display text-lg tabular-nums">$22.4M</div>
          </div>
        </div>

        {/* Scenario chart */}
        <div className="mt-3 rounded-lg border border-line p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="text-[10.5px] font-medium">Scenarios · quarterly</div>
            <div className="flex items-center gap-2 text-[9px] text-[#0A0A0A]/55">
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#0A0A0A]" /> Base</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#0A0A0A]/25" /> Best</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-[#0A0A0A]/55" /> Worst</span>
            </div>
          </div>
          <ScenarioBars />
        </div>

        {/* Plan vs actual strip */}
        <div className="mt-3 grid grid-cols-4 gap-1.5 text-[10px]">
          {[
            { l: "Q1 actual", v: "$5.2M", ok: true },
            { l: "Q2 forecast", v: "$5.6M", ok: true },
            { l: "Variance", v: "+2.1%", ok: true },
            { l: "Re-forecast", v: "Auto", ok: null },
          ].map((s) => (
            <div key={s.l} className="rounded border border-line bg-white px-2 py-1.5">
              <div className="text-[9px] uppercase tracking-wider text-[#0A0A0A]/45">{s.l}</div>
              <div className="font-mono tabular-nums font-medium">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

function ScenarioBars() {
  const scenarios = [
    { q: "Q1", base: 60, best: 74, worst: 48 },
    { q: "Q2", base: 65, best: 82, worst: 50 },
    { q: "Q3", base: 72, best: 90, worst: 55 },
    { q: "Q4", base: 80, best: 100, worst: 62 },
  ];
  return (
    <div className="flex items-end justify-around h-24 gap-3 px-2">
      {scenarios.map((s, i) => (
        <div key={s.q} className="flex-1 flex flex-col items-center gap-1">
          <div className="flex items-end gap-0.5 h-20">
            <div className="w-2.5 bg-[#0A0A0A]/25 rounded-sm animate-fade-up" style={{ height: `${s.best}%`, animationDelay: `${i * 90}ms` }} />
            <div className="w-2.5 bg-[#0A0A0A] rounded-sm animate-fade-up" style={{ height: `${s.base}%`, animationDelay: `${i * 90 + 50}ms` }} />
            <div className="w-2.5 bg-[#0A0A0A]/55 rounded-sm animate-fade-up" style={{ height: `${s.worst}%`, animationDelay: `${i * 90 + 100}ms` }} />
          </div>
          <div className="text-[9px] font-mono text-[#0A0A0A]/50">{s.q}</div>
        </div>
      ))}
    </div>
  );
}

/* ================================================================ */
/* 4. P2P — 3-column pipeline                                        */
/* ================================================================ */
function P2pVisual() {
  return (
    <Frame url="procure-to-pay" title="Procure-to-pay · Vendor: Orbital Supplies">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          <PipelineColumn n={1} title="Capture" delay={0}>
            <RowChip icon={Mail} label="finance@acme.com" note="12 new" />
            <RowChip icon={Database} label="NetSuite POs" note="live" />
            <div className="rounded-md border border-line bg-[#F9F6F0] p-2 mt-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <FileText size={11} /> Quote_88421.pdf
              </div>
              <div className="mt-1 text-[9px] text-[#0A0A0A]/60">$18,420 · Net-30</div>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex-1 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A0A0A]" style={{ width: "100%" }} />
                </div>
                <span className="text-[9px] font-mono text-emerald-700">Parsed</span>
              </div>
            </div>
          </PipelineColumn>

          <PipelineColumn n={2} title="Approve" delay={150}>
            <ApprovalChip name="Priya Rao" role="Controller" state="ok" />
            <ApprovalChip name="Marc Levy" role="VP Ops" state="ok" />
            <ApprovalChip name="Elena Marsh" role="CFO" state="pending" />
            <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[#0A0A0A]/60">
              <ShieldCheck size={10} /> Policy: over $10k → CFO
            </div>
          </PipelineColumn>

          <PipelineColumn n={3} title="Pay" delay={300}>
            <div className="rounded-md border border-line p-2 bg-white">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium">Orbital Supplies</div>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[#F5F0E8] font-mono">Awaiting</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[9px]">
                <span className="font-mono">PAY-4402</span>
                <span className="font-mono tabular-nums font-semibold">$18,420</span>
              </div>
            </div>
            <div className="rounded-md border border-line bg-[#F9F6F0] p-2 text-[9px] space-y-1">
              <div className="uppercase tracking-[0.15em] text-[#0A0A0A]/45 font-semibold">Context</div>
              <div className="flex justify-between"><span>Open balance</span><span className="font-mono tabular-nums">$42,180</span></div>
              <div className="flex justify-between"><span>YTD spend</span><span className="font-mono tabular-nums">$182k</span></div>
              <div className="flex justify-between"><span>Open POs</span><span className="font-mono tabular-nums">3</span></div>
            </div>
          </PipelineColumn>
        </div>
      </div>
    </Frame>
  );
}

/* ================================================================ */
/* 5. O2C — 3-column pipeline (revenue side)                         */
/* ================================================================ */
function O2cVisual() {
  return (
    <Frame url="order-to-cash" title="Order-to-cash · Customer: Meridian Retail">
      <div className="p-4">
        <div className="grid grid-cols-3 gap-3">
          <PipelineColumn n={1} title="Quote" delay={0}>
            <RowChip icon={Mail} label="orders@acme.com" note="8 new" />
            <RowChip icon={Briefcase} label="Salesforce CPQ" note="live" />
            <div className="rounded-md border border-line bg-[#F9F6F0] p-2 mt-1.5">
              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                <FileText size={11} /> Q-2214.pdf
              </div>
              <div className="mt-1 text-[9px] text-[#0A0A0A]/60">$32,900 · Net-45</div>
              <div className="mt-1 flex items-center gap-1.5">
                <div className="flex-1 h-1 bg-[#F5F0E8] rounded-full overflow-hidden">
                  <div className="h-full bg-[#0A0A0A]" style={{ width: "100%" }} />
                </div>
                <span className="text-[9px] font-mono text-emerald-700">Parsed</span>
              </div>
            </div>
          </PipelineColumn>

          <PipelineColumn n={2} title="Invoice" delay={150}>
            <ApprovalChip name="AI credit check" role="A2 rating" state="ok" />
            <ApprovalChip name="Sara Lindgren" role="AR Lead" state="ok" />
            <ApprovalChip name="Elena Marsh" role="CFO" state="pending" />
            <div className="mt-1 flex items-center gap-1.5 text-[9px] text-[#0A0A0A]/60">
              <ShieldCheck size={10} /> Policy: over $25k → CFO
            </div>
          </PipelineColumn>

          <PipelineColumn n={3} title="Collect" delay={300}>
            <div className="rounded-md border border-line p-2 bg-white">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium">Meridian Retail</div>
                <span className="text-[9px] px-1 py-0.5 rounded bg-[#F5F0E8] font-mono">Awaiting</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-[9px]">
                <span className="font-mono">INV-9021</span>
                <span className="font-mono tabular-nums font-semibold">$32,900</span>
              </div>
            </div>
            <div className="rounded-md border border-line bg-[#F9F6F0] p-2 text-[9px] space-y-1">
              <div className="uppercase tracking-[0.15em] text-[#0A0A0A]/45 font-semibold">Context</div>
              <div className="flex justify-between"><span>Open A/R</span><span className="font-mono tabular-nums">$71,240</span></div>
              <div className="flex justify-between"><span>DSO · 90d</span><span className="font-mono tabular-nums">41 days</span></div>
              <div className="flex justify-between"><span>Open orders</span><span className="font-mono tabular-nums">4</span></div>
            </div>
          </PipelineColumn>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Pipeline helpers ---------- */
function PipelineColumn({ n, title, children, delay }) {
  return (
    <div className="rounded-lg border border-line bg-white p-2.5 flex flex-col animate-fade-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold text-[#0A0A0A]/60 border-b border-line pb-2 mb-2">
        <span className="h-4 w-4 rounded-full bg-[#0A0A0A] text-white grid place-items-center text-[9px] font-mono">{n}</span>
        {title}
      </div>
      <div className="space-y-1.5 flex-1">{children}</div>
    </div>
  );
}

function RowChip({ icon: Icon, label, note }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5 bg-white">
      <span className="h-5 w-5 rounded bg-[#F5F0E8] border border-line grid place-items-center">
        <Icon size={10} />
      </span>
      <span className="text-[10px] flex-1 truncate">{label}</span>
      <span className="text-[9px] font-mono text-[#0A0A0A]/45">{note}</span>
    </div>
  );
}

function ApprovalChip({ name, role, state }) {
  const styles = state === "ok"
    ? { chip: "bg-emerald-50 text-emerald-700", label: "Approved" }
    : { chip: "bg-amber-50 text-amber-700", label: "Pending" };
  return (
    <div className="flex items-center gap-2 rounded-md border border-line px-2 py-1.5">
      <span className="h-5 w-5 rounded-full bg-[#F5F0E8] border border-line grid place-items-center text-[8px] font-medium">
        {name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
      </span>
      <div className="flex-1 min-w-0">
        <div className="text-[10px] font-medium truncate">{name}</div>
        <div className="text-[8.5px] text-[#0A0A0A]/50 truncate">{role}</div>
      </div>
      <span className={`text-[8.5px] px-1 py-0.5 rounded ${styles.chip}`}>{styles.label}</span>
    </div>
  );
}
