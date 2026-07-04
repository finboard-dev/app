import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

/**
 * ProductMockup, a fully HTML/Tailwind SaaS UI mimicking the user's
 * real product screenshots (warm sand sidebar + white main area).
 */
export default function ProductMockup() {
  return (
    <div
      className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
      data-testid="hero-product-mockup"
    >
      {/* window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-4 text-[11px] text-[#0A0A0A]/50">finboard.app / dashboard</div>
        <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-white border border-line">Synced now</div>
      </div>

      <div className="grid grid-cols-12 min-h-[380px]">
        {/* sidebar */}
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
              <div
                key={label}
                className={`px-2 py-1.5 rounded-md ${i === 2 ? "bg-white border border-line" : "text-[#0A0A0A]/70"}`}
              >
                {label}
              </div>
            ))}
          </nav>
        </aside>

        {/* main */}
        <div className="col-span-12 sm:col-span-9 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Custom pipeline · Group</div>
              <div className="font-serif-display text-xl mt-0.5">Live board dashboard</div>
            </div>
            <div className="text-[10px] px-2 py-1 rounded-full bg-[#F5F0E8] border border-line">Jun 2026</div>
          </div>

          {/* KPI cards */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <KPI label="Total Revenue" value="$4.82M" delta="+8.4%" up />
            <KPI label="EBITDA" value="$1.14M" delta="-1.2%" up={false} />
          </div>

          {/* mini chart */}
          <div className="mt-4 rounded-lg border border-line p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[#0A0A0A]/60">Group revenue · TTM</div>
              <div className="text-[10px] text-[#0A0A0A]/40">6 entities</div>
            </div>
            <Sparkline />
          </div>

          {/* eliminations tag */}
          <div className="mt-3 flex items-center gap-2 text-[11px] text-[#0A0A0A]/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
            AI detected 12 inter-company entries, auto-reconciled.
          </div>
        </div>
      </div>
    </div>
  );
}

function KPI({ label, value, delta, up }) {
  return (
    <div className="rounded-lg border border-line p-3">
      <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{label}</div>
      <div className="mt-1 text-xl font-semibold tracking-tight">{value}</div>
      <div className={`mt-1 inline-flex items-center gap-1 text-[11px] px-1.5 py-0.5 rounded ${up ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
        {up ? <ArrowUp size={10} /> : <ArrowDown size={10} />} {delta}
      </div>
    </div>
  );
}

function Sparkline() {
  // Static polyline for a small realistic trend
  const points = "0,42 20,38 40,40 60,30 80,34 100,26 120,28 140,20 160,24 180,16 200,18";
  return (
    <svg viewBox="0 0 200 50" className="w-full mt-2 h-16">
      <defs>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={`0,50 ${points} 200,50`} fill="url(#fill)" stroke="none" />
      <polyline points={points} fill="none" stroke="#2563EB" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
