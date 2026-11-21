import React from "react";
import { Section, SectionHead } from "@/components/consolidation/primitives";
import { CHECKED_ON } from "@/data/compare/pages";

/** Small "checked <month year>" note with the vendor pages each fact came from. */
function SourcesNote({ sources }) {
  if (!sources?.length) return null;
  return (
    <p className="mt-4 text-[12px] leading-relaxed text-[#0A0A0A]/55" data-testid="compare-sources">
      Checked {CHECKED_ON} on each vendor&apos;s own site:{" "}
      {sources.map((s, i) => (
        <React.Fragment key={s.url}>
          {i > 0 && " · "}
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[#0A0A0A]">
            {s.label}
          </a>
        </React.Fragment>
      ))}
      . Features and pricing change, so confirm with each vendor before you decide.
    </p>
  );
}

/** FinBoard and one competitor, row by row. A table on wide screens, stacked cards on phones. */
function SideBySide({ table }) {
  const { competitor, rows } = table;
  return (
    <>
      <div className="mt-10 hidden md:block overflow-hidden rounded-2xl border border-line bg-white">
        <table className="w-full text-left text-[14px]">
          <caption className="sr-only">FinBoard compared with {competitor}</caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="w-[24%] p-5 lg:px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/50">
                Compared on
              </th>
              <th scope="col" className="w-[38%] p-5 lg:px-7 bg-[#0A0A0A] text-white font-semibold">FinBoard</th>
              <th scope="col" className="w-[38%] p-5 lg:px-7 font-semibold text-[#0A0A0A]/70">{competitor}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-line align-top">
                <th scope="row" className="p-5 lg:px-7 font-medium text-[#0A0A0A]">{r.label}</th>
                <td className="p-5 lg:px-7 bg-[#F5F0E8]/60 text-[#0A0A0A]/85">{r.finboard}</td>
                <td className="p-5 lg:px-7 text-[#0A0A0A]/70">{r.competitor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <dl className="mt-8 flex flex-col gap-3 md:hidden">
        {rows.map((r) => (
          <div key={r.label} className="card-white p-5">
            <dt className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/50">{r.label}</dt>
            <dd className="mt-3 text-[14px] text-[#0A0A0A]/85">
              <span className="block text-[11px] font-semibold text-[#0A0A0A]">FinBoard</span>
              {r.finboard}
            </dd>
            <dd className="mt-3 border-t border-line pt-3 text-[14px] text-[#0A0A0A]/70">
              <span className="block text-[11px] font-semibold text-[#0A0A0A]">{competitor}</span>
              {r.competitor}
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}

/** "Questions worth asking", answered for FinBoard only. Competitors are named in the intro, not here. */
function Checklist({ table }) {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-white">
      <table className="w-full text-left text-[14px]">
        <caption className="sr-only">Questions worth asking any tool, with FinBoard&apos;s answers</caption>
        <thead className="hidden sm:table-header-group">
          <tr className="border-b border-line">
            <th scope="col" className="w-[42%] p-5 lg:px-7 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/50">
              Question worth asking
            </th>
            <th scope="col" className="p-5 lg:px-7 bg-[#0A0A0A] text-white font-semibold">FinBoard&apos;s answer</th>
          </tr>
        </thead>
        <tbody>
          {table.rows.map((r) => (
            <tr key={r.question} className="border-t border-line first:border-t-0 sm:first:border-t align-top flex flex-col sm:table-row">
              <th scope="row" className="px-5 pt-5 sm:p-5 lg:px-7 font-medium text-[#0A0A0A]">{r.question}</th>
              <td className="px-5 pb-5 pt-2 sm:p-5 lg:px-7 sm:bg-[#F5F0E8]/60 text-[#0A0A0A]/80">{r.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CompareTable({ page }) {
  const { table } = page;
  return (
    <Section id="compare" testid="compare-table">
      <SectionHead eyebrow="Side by side" color="#2563EB" title={table.title} lead={table.lead} />
      {table.kind === "sideBySide" ? <SideBySide table={table} /> : <Checklist table={table} />}
      <SourcesNote sources={page.sources} />
    </Section>
  );
}
