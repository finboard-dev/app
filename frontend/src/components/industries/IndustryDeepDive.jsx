import React from "react";
import { ArrowRight } from "lucide-react";

/**
 * Generic, data-driven "deep dive" for an industry — mirrors the restaurant benchmark
 * (RestaurantReporting): Block 1 pain cards with micro-graphics, Block 2 group P&L +
 * by-unit tables side by side, then reporting-standard cards. Content comes from
 * src/data/industryDeepDive.js. Monochrome + accent language throughout.
 */

const shade = (tone, accent) =>
  tone === "accent" ? accent
  : tone === "warn" ? "#F59E0B"
  : tone === "s1" ? "rgba(10,10,10,0.55)"
  : tone === "s2" ? "rgba(10,10,10,0.35)"
  : "rgba(10,10,10,0.18)";

const statusColor = (s) =>
  s === "good" ? "text-emerald-700" : s === "warn" ? "text-amber-700" : "text-rose-700";

/* ---------- Panel (Frame-style title bar) ---------- */
function Panel({ title, right, children }) {
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-3 text-[11px] text-[#0A0A0A]/55 truncate">{title}</div>
        {right && <div className="ml-auto pl-2 text-[10px] text-[#0A0A0A]/45 truncate">{right}</div>}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

/* ---------- Micro-graphic renderers ---------- */
function Graphic({ viz, d, accent, tint }) {
  switch (viz) {
    case "ladder":
      return (
        <div className="space-y-1">
          {d.rows.map((r, i) => (
            <div
              key={i}
              className={`flex items-center justify-between rounded-md px-2 py-1.5 text-[11.5px] ${r.kind === "result" ? "font-medium" : ""}`}
              style={r.kind === "result" ? { backgroundColor: tint } : undefined}
            >
              <span
                className={r.kind === "minus" ? "text-[#0A0A0A]/50" : "text-[#0A0A0A]/70"}
                style={r.kind === "result" ? { color: accent } : undefined}
              >
                {r.l}
              </span>
              <span
                className={`tabular-nums ${r.kind === "minus" ? "text-[#0A0A0A]/50" : ""}`}
                style={r.kind === "result" ? { color: accent } : undefined}
              >
                {r.v}
              </span>
            </div>
          ))}
        </div>
      );

    case "segbar":
      return (
        <div>
          {d.value && <div className="text-[10.5px] text-[#0A0A0A]/55 mb-1.5">{d.value}</div>}
          <div className="flex h-6 rounded-md overflow-hidden border border-line">
            {d.segs.map((s, i) => (
              <div key={i} style={{ width: `${s.pct}%`, background: shade(s.tone, accent) }} />
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-2.5 gap-y-0.5 text-[9.5px] text-[#0A0A0A]/55">
            {d.segs.map((s, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-sm" style={{ background: shade(s.tone, accent) }} />
                {s.l}
              </span>
            ))}
          </div>
        </div>
      );

    case "bars": {
      const max = Math.max(...d.items.map((b) => b.v));
      return (
        <div>
          <div className="flex items-end gap-2 h-[64px] border-b border-line-strong">
            {d.items.map((b, i) => (
              <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1">
                <span className={`text-[9px] tabular-nums ${b.over ? "text-rose-700" : "text-[#0A0A0A]/50"}`}>
                  {d.prefix || ""}{b.v}{d.suffix || ""}
                </span>
                <div
                  className={`w-full rounded-t-sm ${b.over ? "bg-rose-500" : "bg-[#0A0A0A]/70"}`}
                  style={{ height: `${(b.v / max) * 44}px` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-1 flex gap-2 text-[8px] tabular-nums text-[#0A0A0A]/40">
            {d.items.map((b, i) => (
              <div key={i} className="flex-1 text-center">{b.l}</div>
            ))}
          </div>
        </div>
      );
    }

    case "progress":
      return (
        <div>
          <div className="space-y-2">
            {d.rows.map((r, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#0A0A0A]/70 truncate pr-2">{r.l}</span>
                  <span className="tabular-nums font-medium shrink-0">{r.v}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: r.tone === "accent" ? accent : r.tone === "warn" ? "#F59E0B" : "rgba(10,10,10,0.55)" }} />
                </div>
              </div>
            ))}
          </div>
          {d.note && <div className="mt-2 text-[10px] text-[#0A0A0A]/50">{d.note}</div>}
        </div>
      );

    case "compare": {
      const max = Math.max(...d.rows.flatMap((r) => [r.a, r.b || 0]));
      return (
        <div>
          <div className="space-y-2.5">
            {d.rows.map((r, i) => (
              <div key={i}>
                <div className="text-[10.5px] text-[#0A0A0A]/65 truncate mb-1">{r.l}</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(r.a / max) * 100}%`, background: accent }} />
                  </div>
                  <span className="w-11 text-right tabular-nums text-[10px]" style={{ color: accent }}>{r.a}{d.unit}</span>
                </div>
                {!d.single && r.b != null && (
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className="flex-1 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden">
                      <div className="h-full rounded-full bg-[#0A0A0A]/40" style={{ width: `${(r.b / max) * 100}%` }} />
                    </div>
                    <span className="w-11 text-right tabular-nums text-[10px] text-[#0A0A0A]/50">{r.b}{d.unit}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[9.5px] text-[#0A0A0A]/50">
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm" style={{ background: accent }} />{d.aLabel}</span>
            {!d.single && d.bLabel && <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-sm bg-[#0A0A0A]/40" />{d.bLabel}</span>}
          </div>
          {d.note && <div className="mt-1 text-[9.5px] text-[#0A0A0A]/45">{d.note}</div>}
        </div>
      );
    }

    case "rank":
      return (
        <div>
          <div className="space-y-1.5">
            {d.rows.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-[10.5px]">
                <span className="w-20 shrink-0 truncate text-[#0A0A0A]/65">{r.l}</span>
                <div className="flex-1 h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: i === 0 ? accent : r.tone === "warn" ? "#F59E0B" : "rgba(10,10,10,0.55)" }} />
                </div>
                <span className="w-16 text-right tabular-nums text-[#0A0A0A]/60">{r.v}</span>
              </div>
            ))}
          </div>
          {d.note && <div className="mt-2 text-[10px] text-[#0A0A0A]/50">{d.note}</div>}
        </div>
      );

    case "flow":
      return (
        <div className="flex items-center flex-wrap gap-1.5 text-[10px]">
          {d.steps.map((s, i) => (
            <React.Fragment key={i}>
              <span className="rounded-md border border-line bg-white px-2 py-1 text-center leading-tight">
                <span className="block text-[#0A0A0A]/70">{s.l}</span>
                {s.v && <span className="block tabular-nums font-medium">{s.v}</span>}
              </span>
              {i < d.steps.length - 1 && <ArrowRight size={12} style={{ color: accent }} className="shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export default function IndustryDeepDive({ accent = "#C2410C", tint = "#FFF7ED", nav = "operators", data }) {
  if (!data) return null;
  const { block1, pains, block2, pnl, byUnit, standards, footnote } = data;
  const plCols = "grid-cols-[1.6fr_0.85fr_0.6fr]";
  const unitCols = "grid-cols-[1.4fr_0.9fr_0.6fr]";

  return (
    <section id="reporting" className="scroll-mt-20 border-t border-line" data-testid="industry-deepdive">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* ---------- Block 1 — pains ---------- */}
        <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>{block1.eyebrow}</div>
        <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">{block1.heading}</h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">{block1.subhead}</p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-3" data-testid="deepdive-pains">
          {pains.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="card-white p-4 h-full flex flex-col gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-8 w-8 shrink-0 rounded-md border grid place-items-center"
                    style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="text-[13px] font-medium leading-snug">{p.t}</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <Graphic viz={p.viz} d={p.d} accent={accent} tint={tint} />
                </div>
              </div>
            );
          })}
        </div>

        {/* ---------- Block 2 — reporting standards ---------- */}
        <div className="mt-16 lg:mt-20">
          <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>{block2.eyebrow}</div>
          <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">{block2.heading}</h2>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">{block2.subhead}</p>

          {/* Group P&L + by-unit, side by side */}
          <div className="mt-8 grid lg:grid-cols-2 gap-3 items-start">
            <div data-testid="deepdive-pnl">
              <Panel title={pnl.title} right={pnl.right}>
                <div className="px-4 sm:px-5 pb-4 pt-3">
                  <div className={`grid ${plCols} px-2 pb-1.5 text-[11px] text-[#0A0A0A]/45`}>
                    <div>{pnl.cols.a}</div>
                    <div className="text-right">{pnl.cols.b}</div>
                    <div className="text-right">{pnl.cols.c}</div>
                  </div>
                  {pnl.rows.map((r, i) => (
                    <div
                      key={r.l}
                      className={`grid ${plCols} items-center px-2 py-2 text-[13px] animate-fade-up ${
                        r.total ? "border-t border-line-strong mt-1" : "border-b border-line last:border-0"
                      }`}
                      style={{ animationDelay: `${i * 40}ms`, ...(r.hi ? { backgroundColor: tint } : {}) }}
                    >
                      <div className={r.total || r.hi ? "font-medium" : ""} style={r.hi ? { color: accent } : undefined}>{r.l}</div>
                      <div className={`text-right tabular-nums ${r.total || r.hi ? "font-medium" : "text-[#0A0A0A]/70"}`}>{r.v}</div>
                      <div className={`text-right tabular-nums ${r.total || r.hi ? "font-medium" : "text-[#0A0A0A]/55"}`} style={r.hi ? { color: accent } : undefined}>{r.p}</div>
                    </div>
                  ))}
                  <div className="mt-3 flex items-start gap-2 text-[11px] text-[#0A0A0A]/55">
                    <span className="h-1.5 w-1.5 rounded-full mt-1 shrink-0" style={{ background: accent }} />
                    {pnl.footnote}
                  </div>
                </div>
              </Panel>
            </div>

            <div data-testid="deepdive-byunit">
              <Panel title={byUnit.title} right={byUnit.right}>
                <div className="px-4 pb-4 pt-2">
                  <div className={`grid ${unitCols} px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line`}>
                    <div>{byUnit.cols.name}</div>
                    <div className="text-right">{byUnit.cols.metric}</div>
                    <div className="text-right">{byUnit.cols.head}</div>
                  </div>
                  {byUnit.rows.map((r, i) => (
                    <div
                      key={r.l}
                      className={`grid ${unitCols} items-center px-2 py-2 border-b border-line last:border-0 text-[12px] animate-fade-up`}
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className="font-medium truncate">{r.l}</div>
                      <div className="text-right tabular-nums text-[#0A0A0A]/70">{r.v}</div>
                      <div className={`text-right tabular-nums font-medium ${statusColor(r.status)}`}>{r.m}</div>
                    </div>
                  ))}
                  <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5 flex items-center justify-between text-[10px]">
                    <span className="text-[#0A0A0A]/60">{byUnit.summary.l}</span>
                    <span className="font-medium">{byUnit.summary.v} <span className="text-[#0A0A0A]/40">· {byUnit.summary.t}</span></span>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          {/* Reporting-standard cards */}
          <div className="mt-3 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="deepdive-standards">
            {standards.map((s) => (
              <div key={s.n} className="card-white p-4">
                <div className="flex items-center gap-2">
                  <span className="font-serif-display italic text-[15px] leading-none" style={{ color: accent }}>{s.n}</span>
                  <span className="text-[13px] font-medium leading-tight">{s.name}</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-[#0A0A0A]/60">{s.body}</p>
              </div>
            ))}
          </div>

          {footnote && (
            <p className="mt-6 text-[12px] leading-relaxed text-[#0A0A0A]/50 max-w-3xl">{footnote}</p>
          )}
        </div>
      </div>
    </section>
  );
}
