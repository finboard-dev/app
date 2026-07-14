"use client";

import React from "react";
import { ShieldCheck, Plus, TrendingUp, TrendingDown } from "lucide-react";

/* ---------- Mock financial sheets (spreadsheet style) ---------- */
const SHEETS = [
  {
    id: "pl", tab: "P&L",
    cols: ["Actual", "YTD", "Prior", "Var"],
    rows: [
      { key: "revenue",   label: "Revenue",        v: ["4.82", "27.9", "4.55", "+5.9%"],  up: true },
      { key: "cogs",      label: "Cost of sales",  v: ["(1.83)", "(10.6)", "(1.75)", "+4.6%"] },
      { key: "gross",     label: "Gross profit",   v: ["2.99", "17.3", "2.80", "+6.8%"], strong: true, up: true },
      { key: "personnel", label: "Personnel cost", v: ["(1.10)", "(6.6)", "(1.15)", "−4.3%"], good: true },
      { key: "opex",      label: "Other opex",     v: ["(0.78)", "(4.6)", "(0.74)", "+5.4%"] },
      { key: "ebitda",    label: "EBITDA",         v: ["1.11", "6.1", "0.91", "+22.0%"], strong: true, up: true },
      { key: "netprofit", label: "Net profit",     v: ["0.74", "4.0", "0.60", "+23.3%"], strong: true, up: true },
    ],
  },
  {
    id: "bs", tab: "Balance Sheet",
    cols: ["Balance", "YTD Δ", "Prior", "Var"],
    rows: [
      { key: "cash",      label: "Cash & equivalents",  v: ["3.20", "+0.70", "2.50", "+28.0%"], up: true },
      { key: "ar",        label: "Accounts receivable", v: ["4.70", "−0.80", "5.50", "−14.5%"], good: true },
      { key: "inventory", label: "Inventory",           v: ["1.95", "−0.15", "2.10", "−7.1%"] },
      { key: "ap",        label: "Accounts payable",    v: ["(2.30)", "+0.55", "(1.75)", "+31.4%"], good: true },
      { key: "debt",      label: "Debt",                v: ["(3.60)", "−0.50", "(4.10)", "−12.2%"] },
      { key: "equity",    label: "Net equity",          v: ["6.85", "+1.10", "5.75", "+19.1%"], strong: true, up: true },
    ],
  },
  {
    id: "cf", tab: "Cash Flow",
    cols: ["Actual", "YTD", "Prior", "Var"],
    rows: [
      { key: "ocf", label: "Operating cash flow", v: ["1.35", "7.4", "1.06", "+27.4%"], strong: true, up: true },
      { key: "wc",  label: "Working capital Δ",   v: ["0.28", "0.9", "(0.10)", "▲"], up: true },
      { key: "icf", label: "Investing",           v: ["(0.45)", "(2.1)", "(0.40)", "+12.5%"] },
      { key: "fcf", label: "Financing",           v: ["(0.35)", "(1.4)", "(0.30)", "+16.7%"] },
      { key: "net", label: "Net change in cash",  v: ["0.55", "3.9", "0.36", "+52.8%"], strong: true, up: true },
    ],
  },
];
const SHEET_BY_ID = SHEETS.reduce((a, s) => { a[s.id] = s; return a; }, {});

/* ---------- Improvements, shown above the sheet ---------- */
const IMPACTS = [
  { id: "headcount", sheet: "pl", row: "personnel", dir: "down", label: "Headcount",  value: "20%" },
  { id: "dso",       sheet: "bs", row: "ar",        dir: "down", label: "DSO",        value: "11 days" },
  { id: "dpo",       sheet: "bs", row: "ap",        dir: "up",   label: "DPO",        value: "10 days" },
  { id: "ebitda",    sheet: "pl", row: "ebitda",    dir: "up",   label: "EBITDA",     value: "22%" },
  { id: "cashflow",  sheet: "cf", row: "ocf",       dir: "up",   label: "Cash flow",  value: "27%" },
];

const LETTERS = ["A", "B", "C", "D", "E"];
const GRID = "grid-cols-[30px_minmax(130px,1.7fr)_repeat(4,minmax(58px,0.9fr))]";
const ROW_COUNT = 12; // data + filler rows; +1 header row = 13 total rows

export default function Outcomes() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((v) => (v + 1) % IMPACTS.length), 800);
    return () => clearInterval(t);
  }, [paused]);

  const impact = IMPACTS[active];
  const sheet = SHEET_BY_ID[impact.sheet];
  const fillers = Math.max(0, ROW_COUNT - sheet.rows.length);

  const selectSheet = (id) => {
    const i = IMPACTS.findIndex((x) => x.sheet === id);
    if (i >= 0) setActive(i);
  };

  return (
    <section
      id="outcomes"
      className="border-y border-line bg-[#F5F0E8]"
      data-testid="outcomes"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50"><TrendingUp size={12} /> Business impact</div>
        <div className="mt-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left, heading + guarantee */}
          <div className="lg:col-span-4">
            <h2 className="font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
              Performance Accounting<br />
              <span className="italic">that drives your P&amp;L.</span>
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-md">
              Every workflow moves a real line on your financials.
            </p>

            {/* Live impact ticker + pay-on-value, one container */}
            <div className="mt-6 rounded-2xl border border-line bg-white overflow-hidden">
              <div className="p-4" data-testid="outcomes-ticker">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50 font-semibold">
                    What's moving right now
                  </div>
                  <span className="text-[9.5px] font-mono px-1.5 py-0.5 rounded bg-[#F5F0E8] border border-line text-[#0A0A0A]/60">
                    live
                  </span>
                </div>
                <div className="space-y-2">
                  {IMPACTS.map((im, i) => {
                    const on = i === active;
                    const DirIcon = im.dir === "down" ? TrendingDown : TrendingUp;
                    return (
                      <div
                        key={im.id}
                        onClick={() => setActive(i)}
                        className={`flex items-center gap-2.5 py-1.5 px-2 rounded-md cursor-pointer transition-colors ${
                          on ? "bg-[#0A0A0A] text-white" : "hover:bg-[#F5F0E8]"
                        }`}
                      >
                        <DirIcon
                          size={13}
                          className={on ? "text-emerald-400" : "text-emerald-600"}
                        />
                        <span className={`text-[12.5px] flex-1 ${on ? "" : "text-[#0A0A0A]/80"}`}>
                          {im.label}
                        </span>
                        <span className={`font-mono tabular-nums text-[12px] font-semibold ${on ? "text-white" : "text-[#0A0A0A]"}`}>
                          {im.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pay on value - dark band inside the same container */}
              <div
                className="relative overflow-hidden bg-[#0A0A0A] text-white p-5 flex items-start gap-3.5"
                data-testid="outcomes-guarantee"
              >
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }}
                  aria-hidden
                />
                <span className="relative h-9 w-9 shrink-0 rounded-lg bg-emerald-600 text-white grid place-items-center">
                  <ShieldCheck size={17} />
                </span>
                <div className="relative">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-emerald-400 font-semibold">Pay on value</div>
                  <p className="mt-1.5 font-serif-display text-[15.5px] leading-snug tracking-tight">
                    If FinBoard doesn&apos;t improve your financials, <span className="italic">we don&apos;t get paid.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right, improvement (above) + the spreadsheet */}
          <div className="lg:col-span-8">
            {/* Static improvement tags, active one highlights in black, in sync with the sheet */}
            <div className="mb-3 flex flex-wrap gap-2" data-testid="outcomes-tags">
              {IMPACTS.map((im, i) => {
                const on = i === active;
                const DirIcon = im.dir === "down" ? TrendingDown : TrendingUp;
                return (
                  <button
                    key={im.id}
                    onClick={() => setActive(i)}
                    data-testid={`outcomes-tag-${im.id}`}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[12.5px] font-medium border transition-colors ${
                      on ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#0A0A0A]/55 border-line hover:text-[#0A0A0A]"
                    }`}
                  >
                    <DirIcon size={13} className={on ? "text-emerald-400" : "text-emerald-600"} />
                    {im.label} {im.value}
                  </button>
                );
              })}
            </div>

            <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.03),0_24px_48px_-24px_rgba(10,10,10,0.18)]" data-testid="outcomes-sheet">
              {/* chrome */}
              <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
                <div className="ml-4 text-[11px] text-[#0A0A0A]/50">yourco.finboard.app · financials</div>
                <div className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white border border-line">Live</div>
              </div>

              {/* grid */}
              <div className="overflow-x-auto bg-white">
                <div className="min-w-[560px]">
                  {/* column letters */}
                  <div className={`grid ${GRID} text-[10px] font-mono text-[#0A0A0A]/40 bg-[#F5F0E8]/70 border-b border-line`}>
                    <div className="border-r border-line py-1 text-center">▦</div>
                    {LETTERS.map((l, i) => (
                      <div key={l} className={`py-1 text-center ${i < LETTERS.length - 1 ? "border-r border-line" : ""}`}>{l}</div>
                    ))}
                  </div>

                  {/* row 1, header labels */}
                  <div className={`grid ${GRID} text-[10px] uppercase tracking-[0.1em] text-[#0A0A0A]/70 bg-white border-b border-line-strong`}>
                    <div className="border-r border-line py-1.5 text-center font-mono text-[#0A0A0A]/40 bg-[#F5F0E8]/70">1</div>
                    <div className="border-r border-line py-1.5 px-2.5 font-semibold">Account</div>
                    {sheet.cols.map((c, i) => (
                      <div key={c} className={`py-1.5 px-2.5 text-right font-semibold ${i < sheet.cols.length - 1 ? "border-r border-line" : ""}`}>{c}</div>
                    ))}
                  </div>

                  {/* data rows */}
                  {sheet.rows.map((r, i) => {
                    const hl = r.key === impact.row;
                    return (
                      <div
                        key={r.key}
                        className={`grid ${GRID} text-[12.5px] border-b border-line transition-colors duration-300 ${hl ? "bg-emerald-50" : r.strong ? "bg-[#F9F6F0]" : "bg-white"}`}
                      >
                        <div className="border-r border-line py-1.5 text-center font-mono text-[10px] text-[#0A0A0A]/40 bg-[#F5F0E8]/70">{i + 2}</div>
                        <div className={`border-r border-line py-1.5 px-2.5 truncate ${r.strong || hl ? "font-medium" : ""}`}>{r.label}</div>
                        {r.v.map((val, ci) => {
                          const isVar = ci === r.v.length - 1;
                          const selected = hl && isVar;
                          const tone = isVar && (r.up || r.good) ? "text-emerald-700" : "text-[#0A0A0A]/75";
                          return (
                            <div
                              key={ci}
                              className={`py-1.5 px-2.5 text-right tabular-nums ${ci < r.v.length - 1 ? "border-r border-line" : ""} ${tone} ${selected ? "ring-2 ring-inset ring-emerald-500 relative z-10 font-semibold" : ""}`}
                            >
                              {val}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}

                  {/* filler rows, keep image height constant across sheets */}
                  {Array.from({ length: fillers }).map((_, i) => {
                    const rowNum = sheet.rows.length + 2 + i;
                    return (
                      <div key={`filler-${i}`} className={`grid ${GRID} text-[12.5px] border-b border-line last:border-0 bg-white`}>
                        <div className="border-r border-line py-1.5 text-center font-mono text-[10px] text-[#0A0A0A]/30 bg-[#F5F0E8]/70">{rowNum}</div>
                        <div className="border-r border-line py-1.5 px-2.5">&nbsp;</div>
                        {[0, 1, 2, 3].map((ci) => (
                          <div key={ci} className={`py-1.5 px-2.5 ${ci < 3 ? "border-r border-line" : ""}`}>&nbsp;</div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* sheet tabs (Google-Sheets style) */}
              <div className="flex items-center gap-1 px-2 pt-1.5 border-t border-line bg-[#F5F0E8]">
                {SHEETS.map((s) => {
                  const on = s.id === impact.sheet;
                  return (
                    <button
                      key={s.id}
                      onClick={() => selectSheet(s.id)}
                      data-testid={`outcomes-tab-${s.id}`}
                      className={`text-[11px] px-3 py-1.5 rounded-t-md border border-b-0 -mb-px transition-colors ${
                        on ? "bg-white border-line text-[#0A0A0A] font-medium" : "border-transparent text-[#0A0A0A]/50 hover:text-[#0A0A0A]"
                      }`}
                    >
                      {s.tab}
                    </button>
                  );
                })}
                <span className="ml-1 mb-1 h-5 w-5 grid place-items-center text-[#0A0A0A]/30" aria-hidden="true"><Plus size={12} /></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
