import React from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import { Kpi, Chip, MiniRows } from "./ui";
import RunwayChart from "./RunwayChart";
import { CLOSE_DAYS } from "@/data/accountingServices";

/** One live view per founder question (all sample data). */

function Insight({ children }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F5F0E8] px-3 py-2.5 text-[12.5px] leading-snug text-[#0A0A0A]/75">
      <Sparkles size={13} className="mt-0.5 shrink-0 text-[#7C3AED]" /> {children}
    </div>
  );
}

function Runway() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        <Kpi label="Cash" value="$2.84M" note="3 bank accounts" />
        <Kpi label="Net burn" value="$158K" note="↓ 2.5% vs Sep" tone="text-emerald-700" />
        <Kpi label="Runway" value="18 mo" note="Cash-out Apr 2028" />
      </div>
      <div className="mt-2.5 rounded-xl border border-line px-3 pt-3 pb-1">
        <div className="text-[11px] font-semibold text-[#0A0A0A]/70">Cash balance, actual and at current burn</div>
        <RunwayChart />
      </div>
      <Insight>At $158K a month, cash lasts until April 2028. Burn fell 2.5% in October.</Insight>
    </>
  );
}

const AGING = [
  { l: "Current", v: 96, c: "#2563EB" }, { l: "1–30", v: 42, c: "#60A5FA" },
  { l: "31–60", v: 12, c: "#F59E0B" }, { l: "60+", v: 4, c: "#EA580C" },
];

function Payables() {
  const total = AGING.reduce((s, b) => s + b.v, 0);
  return (
    <>
      <div className="flex h-2.5 overflow-hidden rounded-full">
        {AGING.map((b) => <div key={b.l} style={{ width: `${(b.v / total) * 100}%`, background: b.c }} />)}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2 text-[11px]">
        {AGING.map((b) => (
          <div key={b.l}>
            <div className="flex items-center gap-1 text-[#0A0A0A]/55"><i className="h-1.5 w-1.5 rounded-full" style={{ background: b.c }} />{b.l}</div>
            <div className="font-semibold tabular-nums">${b.v}K</div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <MiniRows rows={[
          { name: "AWS", detail: "Due Nov 20", amount: "$18,240", chip: <Chip tone="soon">This week</Chip> },
          { name: "Gusto payroll", detail: "Due Nov 21", amount: "$22,600", chip: <Chip tone="soon">This week</Chip> },
          { name: "WeWork", detail: "Due Dec 1", amount: "$5,400", chip: <Chip>Scheduled</Chip> },
          { name: "Figma", detail: "Due Oct 28", amount: "$1,150", chip: <Chip tone="late">Overdue</Chip> },
        ]} />
      </div>
      <Insight>$46.2K is due this week across 14 bills. One bill is overdue.</Insight>
    </>
  );
}

function Receivables() {
  return (
    <>
      <div className="grid grid-cols-3 gap-2.5">
        <Kpi label="Open AR" value="$212K" note="38 invoices" />
        <Kpi label="Overdue" value="$31.8K" note="3 customers" tone="text-[#BE123C]" />
        <Kpi label="DSO" value="34 days" note="↓ 4 days vs Sep" tone="text-emerald-700" />
      </div>
      <div className="mt-3">
        <MiniRows rows={[
          { name: "Northwind Labs", detail: "INV-1042", amount: "$24,000", chip: <Chip tone="late">18 days late</Chip> },
          { name: "Brightline", detail: "INV-1039", amount: "$7,800", chip: <Chip tone="late">9 days late</Chip> },
          { name: "Acme Health", detail: "INV-1051", amount: "$12,500", chip: <Chip>Due Nov 22</Chip> },
          { name: "Kestrel AI", detail: "INV-1056", amount: "$18,000", chip: <Chip>Due Dec 2</Chip> },
        ]} />
      </div>
      <Insight>Northwind Labs is 18 days late on $24,000, your largest overdue invoice.</Insight>
    </>
  );
}

const CLOSE_TASKS = [
  { day: 1, task: "Bank and card reconciliations", by: "AI agents", state: "done" },
  { day: 2, task: "Bills and invoices matched", by: "AI agents", state: "done" },
  { day: 3, task: "Revenue calculated and scheduled", by: "AI agents", state: "done" },
  { day: 4, task: "Accruals, prepaids and payroll", by: "Accountant", state: "active" },
  { day: 5, task: "Review and tax-ready books", by: "Accountant", state: "next" },
];

function Close() {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <span className="font-serif-display text-2xl leading-none">Day 4 of {CLOSE_DAYS}</span>
        <Chip tone="done">On track</Chip>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#F5F0E8]">
        <div className="h-full w-4/5 rounded-full bg-[#059669]" />
      </div>
      <ul className="mt-3 divide-y divide-line">
        {CLOSE_TASKS.map(({ day, task, by, state }) => (
          <li key={day} className="flex items-center gap-3 py-2.5">
            <span
              className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${
                state === "done" ? "bg-[#059669] text-white" : state === "active" ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#F5F0E8] text-[#0A0A0A]/45"
              }`}
            >
              {state === "done" ? <Check size={12} strokeWidth={3} /> : state === "active" ? <Clock size={12} /> : day}
            </span>
            <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium">{task}</span>
            <span className="hidden sm:inline text-[11px] text-[#0A0A0A]/50">{by}</span>
          </li>
        ))}
      </ul>
      <Insight>On track to close by day {CLOSE_DAYS}. Two entries are with your accountant.</Insight>
    </>
  );
}

const TAX_CHECKS = [
  "Every bank and card account reconciled",
  "Revenue and expenses categorized",
  "Payroll and contractor payments recorded",
  "Checked by your accountant",
];
const PNL = [
  ["Revenue", "$412K", "$396K"],
  ["Expenses", "$569K", "$572K"],
  ["Net loss", "($157K)", "($176K)"],
];

function TaxReady() {
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold">October books</span>
        <Chip tone="done">Tax-ready</Chip>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {TAX_CHECKS.map((c) => (
          <li key={c} className="flex items-center gap-2 text-[12.5px] text-[#0A0A0A]/80">
            <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-600 text-white">
              <Check size={10} strokeWidth={3} />
            </span>
            {c}
          </li>
        ))}
      </ul>
      <table className="mt-4 w-full text-[12.5px]">
        <thead>
          <tr className="text-left text-[10.5px] uppercase tracking-[0.12em] text-[#0A0A0A]/45">
            <th className="pb-2 font-semibold">Profit and loss</th>
            <th className="pb-2 text-right font-semibold">Oct</th>
            <th className="pb-2 text-right font-semibold">Sep</th>
          </tr>
        </thead>
        <tbody>
          {PNL.map(([k, a, b]) => (
            <tr key={k} className="border-t border-line">
              <td className="py-2 font-medium">{k}</td>
              <td className="py-2 text-right font-semibold tabular-nums">{a}</td>
              <td className="py-2 text-right tabular-nums text-[#0A0A0A]/55">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Insight>October is closed and reconciled. At year-end, your CPA gets tax-ready books, not a cleanup project.</Insight>
    </>
  );
}

export const ANSWER_VIEWS = { runway: Runway, payables: Payables, receivables: Receivables, close: Close, tax: TaxReady };
