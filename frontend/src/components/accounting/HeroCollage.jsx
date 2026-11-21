"use client";

import React from "react";
import { Bot, CalendarCheck, LayoutDashboard, Check, Clock, Sparkles } from "lucide-react";
import { IconBadge } from "@/components/consolidation/primitives";
import { MockCard, Chip, DataKpi, DataRows } from "./ui";
import RunwayChart from "./RunwayChart";
import { useCycle, usePrefersReducedMotion } from "./motion";
import { useCopy } from "./copy";

function FounderDashboard() {
  const d = useCopy().DASHBOARD;
  return (
    <MockCard title={d.title} icon={<IconBadge icon={LayoutDashboard} c="#0A0A0A" size="h-6 w-6" iconSize={12} />} live sample>
      <div className="grid grid-cols-3 gap-2.5">
        {d.kpis.map((k) => <DataKpi key={k.label} {...k} />)}
      </div>
      {d.chart && (
        <div className="mt-2.5 rounded-xl border border-line px-3 pt-3 pb-1">
          <div className="flex items-center justify-between gap-3 text-[11px] text-[#0A0A0A]/55">
            <span className="font-semibold text-[#0A0A0A]/75">{d.chart.title}</span>
            <span className="hidden sm:flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5"><i className="h-0.5 w-3 rounded bg-[#2563EB]" />{d.chart.legend[0]}</span>
              <span className="inline-flex items-center gap-1.5"><i className="h-0.5 w-3 rounded bg-[#2563EB]/45" />{d.chart.legend[1]}</span>
            </span>
          </div>
          <RunwayChart />
        </div>
      )}
      {d.rows && <div className="mt-2.5 rounded-xl border border-line px-3"><DataRows rows={d.rows} /></div>}
      <div className="mt-2.5 grid grid-cols-2 gap-2.5">
        {d.bottom.map((k) => <DataKpi key={k.label} {...k} />)}
      </div>
      <div className="mt-2.5 flex items-start gap-2 rounded-xl bg-[#F5F0E8] px-3 py-2.5 text-[12px] leading-snug text-[#0A0A0A]/75">
        <Sparkles size={13} className="mt-0.5 shrink-0 text-[#7C3AED]" />
        {d.insight}
      </div>
    </MockCard>
  );
}

function AgentFeed() {
  const { FEED } = useCopy();
  const reduced = usePrefersReducedMotion();
  const [k] = useCycle(FEED.length, 2600, reduced);
  const visible = [0, 1, 2].map((offset) => FEED[(k - offset + FEED.length) % FEED.length]);
  return (
    <MockCard title="AI agents" icon={<IconBadge icon={Bot} c="#7C3AED" size="h-6 w-6" iconSize={12} />} live>
      <ul className="flex flex-col gap-3">
        {visible.map(({ text, tag }, i) => (
          <li key={reduced ? text : `${k}-${text}`} className={`flex items-start gap-2.5 ${i === 0 ? "acct-pop" : ""}`}>
            <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-emerald-600 text-white grid place-items-center">
              <Check size={10} strokeWidth={3} />
            </span>
            <span className="min-w-0 text-[12px] leading-snug text-[#0A0A0A]/80">
              {text} <Chip>{tag}</Chip>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-[11px] text-[#0A0A0A]/50">
        <span className="flex gap-1" aria-hidden>
          {[0, 150, 300].map((d) => (
            <i key={d} className="h-1 w-1 rounded-full bg-[#7C3AED] animate-pulse" style={{ animationDelay: `${d}ms` }} />
          ))}
        </span>
        Working through today&apos;s transactions
      </div>
    </MockCard>
  );
}

function CloseCard() {
  const { CLOSE_ROWS, CLOSE_DAYS } = useCopy();
  return (
    <MockCard title="October close" icon={<IconBadge icon={CalendarCheck} c="#059669" size="h-6 w-6" iconSize={12} />}>
      <div className="flex items-baseline justify-between">
        <span className="font-serif-display text-lg leading-none">Day 4 of {CLOSE_DAYS}</span>
        <span className="text-[11px] text-emerald-700">On track</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F5F0E8]">
        <div className="h-full w-4/5 rounded-full bg-[#059669]" />
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {CLOSE_ROWS.map(({ label, state }) => (
          <li key={label} className="flex items-center gap-2 text-[12px]">
            {state === "done" && <Check size={13} strokeWidth={3} className="text-emerald-600" />}
            {state === "active" && <Clock size={13} className="text-[#1D4ED8]" />}
            {state === "next" && <span className="h-[13px] w-[13px] rounded-full border-2 border-[#0A0A0A]/20" />}
            <span className={state === "next" ? "text-[#0A0A0A]/50" : "text-[#0A0A0A]/80"}>{label}</span>
            {state === "active" && <span className="ml-auto"><Chip tone="soon">Today</Chip></span>}
          </li>
        ))}
      </ul>
    </MockCard>
  );
}

/**
 * Hero visual: the founder dashboard, flanked on wide screens by the agents'
 * live feed and the close tracker. Side cards tuck 20px into the dashboard's
 * padding so they add depth without hiding any of its numbers.
 */
export default function HeroCollage() {
  return (
    <div className="relative mx-auto max-w-6xl xl:grid xl:grid-cols-[290px_minmax(0,1fr)_270px] xl:items-start">
      <div className="hidden xl:block relative z-10 mt-28 -mr-5 acct-float"><AgentFeed /></div>
      <div className="mx-auto w-full max-w-3xl xl:max-w-none"><FounderDashboard /></div>
      <div className="hidden xl:block relative z-10 mt-64 -ml-5 acct-float-slow"><CloseCard /></div>
    </div>
  );
}
