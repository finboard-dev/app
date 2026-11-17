import React from "react";
import { Check } from "lucide-react";

/**
 * Google Sheets style mock table. Stays light and spreadsheet-like on purpose
 * so it reads as "your sheet", not as site chrome.
 */
const TONE = {
  pos: "text-[#0000F5]",
  neg: "text-[#C62828]",
  flag: "bg-[#FDECEA] text-[#A8302A] font-bold",
};

function cellClass(tone, isElim, rowKind) {
  const elimBg = isElim ? (rowKind ? "bg-[#EEEFFC]" : "bg-[#F6F6FE]") : "";
  return `px-2 py-1.5 text-right whitespace-nowrap ${TONE[tone] || ""} ${elimBg}`;
}

export function SheetTable({ title, columns, rows, elimColumn = -1 }) {
  return (
    <div className="min-w-0 flex-1 overflow-x-auto p-3.5">
      <div className="mb-2.5 flex flex-wrap items-baseline justify-between gap-1.5 text-[14px]">
        <strong>{title}</strong>
        <span className="rounded-full bg-[#F5F0E8] px-2 py-0.5 text-[11px] font-bold text-[#0A0A0A]/70">Sample data</span>
      </div>
      <table className="w-full min-w-[470px] border-collapse text-[12px]">
        <thead>
          <tr>
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`border-b border-[#18181B] px-2 py-1.5 font-bold ${i === 0 ? "text-left" : "text-right"} ${
                  i === elimColumn ? "bg-[#EEEFFC] text-[#4547C9]" : "bg-[#F1F3F4]"
                }`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ label, cells, kind }) => (
            <tr
              key={label}
              className={`border-b border-[#E2E3E3] ${kind ? "border-t border-t-[#18181B] font-bold" : ""} ${
                kind === "final" ? "border-b-2 border-b-[#18181B]" : ""
              }`}
            >
              <th scope="row" className={`px-2 py-1.5 text-left ${kind ? "font-bold" : "font-normal"}`}>{label}</th>
              {cells.map(([v, tone], i) => (
                <td key={i} className={cellClass(tone, i + 1 === elimColumn, kind)}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SheetSidebar({ items }) {
  return (
    <aside
      aria-label="FinBoard sidebar"
      className="hidden sm:flex w-44 shrink-0 flex-col gap-2.5 border-l border-[#E2E3E3] px-3 py-3.5"
    >
      <div className="flex items-center gap-2 text-[15px] font-bold">
        <img src="/brand/finboard-mark-dark.png" alt="" className="h-6 w-6 rounded-[5px]" />
        FinBoard
      </div>
      <p className="text-[14px] font-bold">Consolidation</p>
      <ul className="flex flex-col gap-2 text-[12px]">
        {items.map((t) => (
          <li key={t} className="flex items-center gap-1.5">
            <Check size={14} className="shrink-0 text-emerald-700" strokeWidth={2.5} />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default function Sheet({ children, className = "" }) {
  return (
    <div className={`flex bg-white text-[#202124] leading-[1.3] ${className}`} style={{ fontFamily: "Arial, Roboto, Helvetica, sans-serif" }}>
      {children}
    </div>
  );
}
