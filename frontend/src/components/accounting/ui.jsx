import React from "react";

/** Small building blocks for the accounting page's product mocks (all sample data). */

export const SHADOW = "shadow-[0_1px_2px_rgba(10,10,10,.06),0_24px_48px_-12px_rgba(10,10,10,.18)]";

export function MockCard({ title, icon, live = false, sample = false, className = "", children }) {
  return (
    <div className={`rounded-2xl border border-line bg-white text-[#0A0A0A] text-left ${SHADOW} ${className}`}>
      <div className="flex items-center gap-2.5 px-4 pt-3.5 pb-3 border-b border-line">
        {icon}
        <span className="text-[13px] font-semibold truncate">{title}</span>
        <span className="ml-auto flex items-center gap-2 shrink-0">
          {sample && (
            <span className="rounded-full bg-[#F5F0E8] px-2 py-0.5 text-[10px] font-semibold text-[#0A0A0A]/55">Sample data</span>
          )}
          {live && (
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700">
              <i className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" aria-hidden /> Live
            </span>
          )}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export function Kpi({ label, value, note, tone = "text-[#0A0A0A]/55" }) {
  return (
    <div className="min-w-0 rounded-xl border border-line px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 truncate">{label}</div>
      <div className="mt-1 font-serif-display text-lg sm:text-xl tabular-nums leading-none">{value}</div>
      <div className={`mt-1 text-[11px] leading-snug ${tone}`}>{note}</div>
    </div>
  );
}

const CHIP_TONES = {
  late: "bg-[#FFE4E6] text-[#BE123C]",
  soon: "bg-[#DBEAFE] text-[#1D4ED8]",
  done: "bg-[#D1FAE5] text-[#047857]",
  muted: "bg-[#F5F0E8] text-[#0A0A0A]/60",
};

export function Chip({ tone = "muted", children }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10.5px] font-semibold whitespace-nowrap ${CHIP_TONES[tone]}`}>
      {children}
    </span>
  );
}

/** Compact ledger-style rows: name and detail on the left, amount and status on the right. */
export function MiniRows({ rows }) {
  return (
    <ul className="divide-y divide-line">
      {rows.map(({ name, detail, amount, chip }) => (
        <li key={name} className="flex items-center gap-3 py-2.5">
          <div className="min-w-0 flex-1">
            <div className="text-[12.5px] font-medium truncate">{name}</div>
            <div className="text-[11px] text-[#0A0A0A]/50">{detail}</div>
          </div>
          <span className="text-[12.5px] font-semibold tabular-nums">{amount}</span>
          {chip}
        </li>
      ))}
    </ul>
  );
}

const KPI_TONES = { good: "text-emerald-700", bad: "text-[#BE123C]" };

/** A KPI from sample data, where tone is "good", "bad" or absent. */
export function DataKpi({ tone, ...rest }) {
  return <Kpi {...rest} tone={KPI_TONES[tone]} />;
}

/** A chip from sample data: { text, tone }. */
export function DataChip({ chip }) {
  return <Chip tone={chip.tone ?? undefined}>{chip.text}</Chip>;
}

/** Sample rows whose chip is data, rendered as MiniRows. */
export function DataRows({ rows }) {
  return <MiniRows rows={rows.map((r) => ({ ...r, chip: <DataChip chip={r.chip} /> }))} />;
}
