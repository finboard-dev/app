"use client";

import React from "react";
import { ArrowDown, ArrowRight, Bot, Check, Clock, LayoutDashboard, MoonStar, Sparkles } from "lucide-react";
import { IconBadge, WRAP } from "@/components/consolidation/primitives";
import { Aurora } from "./Layout";
import { MockCard, DataKpi } from "./ui";
import { useCycle, usePrefersReducedMotion } from "./motion";
import { useCopy } from "./copy";

/**
 * Segment-page hero: copy on the left, an animated product card on the right
 * (HERO_VISUAL: "bars" or "timeline"), with the agents' activity and the close
 * status floating over its corners. All figures are sample data.
 */

const BAD = "#E11D48";

/** False on the first paint, true just after, so bars can grow in. */
function useGrown() {
  const reduced = usePrefersReducedMotion();
  const [grown, setGrown] = React.useState(false);
  React.useEffect(() => {
    const t = window.setTimeout(() => setGrown(true), reduced ? 0 : 350);
    return () => window.clearTimeout(t);
  }, [reduced]);
  return grown;
}

function Kpis() {
  const { DASHBOARD } = useCopy();
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {DASHBOARD.kpis.map((k) => <DataKpi key={k.label} {...k} />)}
    </div>
  );
}

function Insight({ children }) {
  return (
    <div className="mt-3 flex items-start gap-2 rounded-xl bg-[#F5F0E8] px-3 py-2.5 text-[12px] leading-snug text-[#0A0A0A]/75">
      <Sparkles size={13} className="mt-0.5 shrink-0 text-[#7C3AED]" /> {children}
    </div>
  );
}

function BarsScene({ v }) {
  const { DASHBOARD } = useCopy();
  const grown = useGrown();
  return (
    <MockCard title={DASHBOARD.title} icon={<IconBadge icon={LayoutDashboard} c="#0A0A0A" size="h-6 w-6" iconSize={12} />} live sample>
      <div className="hidden sm:block"><Kpis /></div>
      <div className="rounded-xl border border-line px-3.5 py-3 sm:mt-3">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-[#0A0A0A]/75">{v.title}</span>
          <span className="text-[#0A0A0A]/45">{v.period}</span>
        </div>
        <ul className="mt-3 flex flex-col gap-2.5">
          {v.bars.map((b, i) => (
            <li key={b.label} className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 text-[12px]">
              <span className="truncate font-medium">{b.label}</span>
              <span className="h-2 overflow-hidden rounded-full bg-[#F5F0E8]">
                <span
                  className="block h-full rounded-full transition-[width] duration-1000 ease-out"
                  style={{ width: grown ? `${b.pct}%` : "0%", background: b.tone === "bad" ? BAD : v.accent, transitionDelay: `${i * 140}ms` }}
                />
              </span>
              <span className={`text-right font-semibold tabular-nums ${b.tone === "bad" ? "text-[#BE123C]" : ""}`}>{b.display}</span>
            </li>
          ))}
        </ul>
      </div>
      <Insight>{v.insight}</Insight>
    </MockCard>
  );
}

function TimelineScene({ v }) {
  const reduced = usePrefersReducedMotion();
  const last = v.steps.length - 1;
  // One extra tick at the end holds the finished state before the loop restarts.
  const [tick] = useCycle(v.steps.length + 1, 1700, reduced);
  const active = reduced ? last : Math.min(tick, last);
  return (
    <MockCard title={v.title} icon={<IconBadge icon={MoonStar} c="#0A0A0A" size="h-6 w-6" iconSize={12} />} live sample>
      <ol className="relative">
        <span aria-hidden className="absolute left-[11px] top-4 bottom-4 w-0.5 rounded bg-[#F5F0E8]" />
        <span
          aria-hidden
          className="absolute left-[11px] top-4 w-0.5 rounded transition-[height] duration-700 ease-out"
          style={{ height: `calc((100% - 2rem) * ${active / last})`, background: v.accent }}
        />
        {v.steps.map((s, i) => {
          const state = i < active ? "done" : i === active ? "active" : "next";
          return (
            <li key={s.what} className="relative flex items-center gap-3 py-2.5 pl-9">
              <span
                className={`absolute left-0 grid h-6 w-6 place-items-center rounded-full text-[10px] font-semibold transition-colors ${
                  state === "done" ? "text-white" : state === "active" ? "bg-[#DBEAFE] text-[#1D4ED8]" : "bg-[#F5F0E8] text-[#0A0A0A]/45"
                }`}
                style={state === "done" ? { background: v.accent } : undefined}
              >
                {state === "done" ? <Check size={12} strokeWidth={3} /> : state === "active" ? <Clock size={12} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10.5px] uppercase tracking-[0.14em] text-[#0A0A0A]/45">{s.when}</span>
                <span className={`block truncate text-[13px] font-medium ${state === "next" ? "text-[#0A0A0A]/50" : ""}`}>{s.what}</span>
              </span>
              <span className="hidden shrink-0 text-[11px] text-[#0A0A0A]/45 sm:inline">{s.who}</span>
            </li>
          );
        })}
      </ol>
      <div className="mt-2 hidden border-t border-line pt-3 sm:block"><Kpis /></div>
    </MockCard>
  );
}

const SCENES = { bars: BarsScene, timeline: TimelineScene };

/** What the agents are doing right now: cycles through the page's FEED. */
function ActivityToast() {
  const { FEED } = useCopy();
  const reduced = usePrefersReducedMotion();
  const [k] = useCycle(FEED.length, 2800, reduced);
  const item = FEED[k];
  return (
    <div className="absolute -top-7 left-3 z-10 hidden max-w-[calc(100%-1.5rem)] sm:block lg:-left-8" aria-live="polite">
      <div key={reduced ? "static" : k} className="acct-pop flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#141414] py-2.5 pl-2.5 pr-3.5 text-[12.5px] text-white shadow-[0_24px_60px_-20px_rgba(0,0,0,.8)]">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[#7C3AED]"><Bot size={14} /></span>
        <span className="truncate">{item.text}</span>
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] text-white/75">{item.tag}</span>
      </div>
    </div>
  );
}

/** The close (or handoff) status, floating off the bottom corner. */
function StatusToast({ v }) {
  return (
    <div className="acct-float relative z-10 ml-auto mt-4 w-56 rounded-2xl bg-white px-4 py-3 text-[#0A0A0A] shadow-[0_24px_60px_-18px_rgba(0,0,0,.7)] sm:absolute sm:-bottom-14 sm:right-3 sm:mt-0 lg:-right-6">
      <div className="flex items-center gap-2 text-[12.5px] font-semibold">
        <span className="grid h-4 w-4 place-items-center rounded-full text-white" style={{ background: v.accent }}><Check size={10} strokeWidth={3} /></span>
        {v.status.title}
      </div>
      <div className="mt-0.5 pl-6 text-[11px] text-[#0A0A0A]/55">{v.status.detail}</div>
      <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#F5F0E8]">
        <div className="h-full rounded-full" style={{ width: `${v.status.progress}%`, background: v.accent }} />
      </div>
    </div>
  );
}

export default function SplitHero({ onDiscovery }) {
  const { HERO, HERO_VISUAL: v, DISCOVERY_LABEL, CONTACT_EMAIL, EMAIL_CTA } = useCopy();
  const Scene = SCENES[v.kind];
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] text-white" data-testid="accounting-hero" data-layout="split">
      <Aurora />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[720px] w-[720px] -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(closest-side, ${v.accent}, transparent)` }}
      />
      <div className={`relative ${WRAP} grid grid-cols-1 items-center gap-16 pb-20 pt-14 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-20`}>
        <div className="animate-fade-up lg:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/70">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: v.accent }} /> {HERO.eyebrow}
          </div>
          <h1 className="font-serif-display text-[2.6rem] leading-[0.98] tracking-[-0.04em] sm:text-[3.5rem] lg:text-[3.6rem] xl:text-[4.1rem]">
            {HERO.titleLead}
            <br />
            <span className="acct-gradient-text italic pr-[0.08em]">{HERO.titleAccent}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70 [text-wrap:pretty] sm:text-[17.5px]">{HERO.lede}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <button
              type="button"
              onClick={onDiscovery}
              data-testid="accounting-discovery"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-medium text-[#0A0A0A] shadow-[0_10px_40px_-10px_rgba(255,255,255,.45)] transition hover:-translate-y-0.5 hover:bg-[#F5F0E8]"
            >
              {DISCOVERY_LABEL} <ArrowRight size={16} />
            </button>
            <a href="#how" className="inline-flex items-center gap-2 text-[15px] text-white/75 transition-colors hover:text-white">
              {HERO.secondary} <ArrowDown size={15} />
            </a>
          </div>
          <p className="mt-4 text-[12.5px] text-white/45">
            {HERO.microcopy} ·{" "}
            <a href={EMAIL_CTA.href} data-testid="accounting-hero-email" className="text-white/70 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white">
              {EMAIL_CTA.prompt} {CONTACT_EMAIL}
            </a>
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-xl animate-fade-up lg:col-span-5 lg:max-w-none" style={{ animationDelay: "150ms" }} data-testid="accounting-hero-visual">
          <Scene v={v} />
          <ActivityToast />
          <StatusToast v={v} />
        </div>
      </div>
    </section>
  );
}
