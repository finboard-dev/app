import React from "react";
import { Check, Clock, Sparkles } from "lucide-react";
import { Chip, DataKpi, DataRows } from "./ui";
import RunwayChart from "./RunwayChart";
import { useCopy } from "./copy";

/** One live view per visitor question (all sample data, from the page copy). */

function Insight({ children }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F5F0E8] px-3 py-2.5 text-[12.5px] leading-snug text-[#0A0A0A]/75">
      <Sparkles size={13} className="mt-0.5 shrink-0 text-[#7C3AED]" /> {children}
    </div>
  );
}

function Kpis({ kpis }) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {kpis.map((k) => <DataKpi key={k.label} {...k} />)}
    </div>
  );
}

function Runway() {
  const d = useCopy().ANSWERS.runway;
  return (
    <>
      <Kpis kpis={d.kpis} />
      <div className="mt-2.5 rounded-xl border border-line px-3 pt-3 pb-1">
        <div className="text-[11px] font-semibold text-[#0A0A0A]/70">{d.chartTitle}</div>
        <RunwayChart />
      </div>
      <Insight>{d.insight}</Insight>
    </>
  );
}

function Payables() {
  const d = useCopy().ANSWERS.payables;
  const total = d.aging.reduce((s, b) => s + b.v, 0);
  return (
    <>
      <div className="flex h-2.5 overflow-hidden rounded-full">
        {d.aging.map((b) => <div key={b.l} style={{ width: `${(b.v / total) * 100}%`, background: b.c }} />)}
      </div>
      <div className="mt-2 grid grid-cols-4 gap-2 text-[11px]">
        {d.aging.map((b) => (
          <div key={b.l}>
            <div className="flex items-center gap-1 text-[#0A0A0A]/55"><i className="h-1.5 w-1.5 rounded-full" style={{ background: b.c }} />{b.l}</div>
            <div className="font-semibold tabular-nums">${b.v}K</div>
          </div>
        ))}
      </div>
      <div className="mt-3"><DataRows rows={d.rows} /></div>
      <Insight>{d.insight}</Insight>
    </>
  );
}

function Receivables() {
  const d = useCopy().ANSWERS.receivables;
  return (
    <>
      <Kpis kpis={d.kpis} />
      <div className="mt-3"><DataRows rows={d.rows} /></div>
      <Insight>{d.insight}</Insight>
    </>
  );
}

function Close() {
  const { ANSWERS, CLOSE_DAYS } = useCopy();
  const d = ANSWERS.close;
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
        {d.tasks.map(({ day, task, by, state }) => (
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
      <Insight>{d.insight}</Insight>
    </>
  );
}

function TaxReady() {
  const d = useCopy().ANSWERS.tax;
  return (
    <>
      <div className="flex items-center justify-between gap-2">
        <span className="text-[13px] font-semibold">October books</span>
        <Chip tone="done">Tax-ready</Chip>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {d.checks.map((c) => (
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
          {d.pnl.map(([k, a, b]) => (
            <tr key={k} className="border-t border-line">
              <td className="py-2 font-medium">{k}</td>
              <td className="py-2 text-right font-semibold tabular-nums">{a}</td>
              <td className="py-2 text-right tabular-nums text-[#0A0A0A]/55">{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Insight>{d.insight}</Insight>
    </>
  );
}

export const ANSWER_VIEWS = { runway: Runway, payables: Payables, receivables: Receivables, close: Close, tax: TaxReady };
