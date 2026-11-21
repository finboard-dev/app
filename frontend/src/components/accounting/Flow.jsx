"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { Band, Head } from "./Layout";
import { Reveal, usePrefersReducedMotion } from "./motion";
import { SourceChip, AgentsCard, ReviewCard, BooksCard, SOURCE_ICONS } from "./FlowCards";
import { useCopy, HeadTitle } from "./copy";

// Diagram geometry in one coordinate space (W x H). HTML cards are placed with
// the same numbers as percentages, so lines and cards stay aligned at any width.
// Lines run between card centers; the opaque cards hide the ends.
const W = 1120;
const H = 520;
const SRC = { x: 0, w: 240, cy: (i) => 70 + i * 76 };
const MID = { x: 360, w: 390, cy: 260 };
const SIDE = { x: 860, w: 260, top: 150, bottom: 385 };

const pct = (v, total) => `${(v / total) * 100}%`;
const midX = MID.x + MID.w / 2;
const sideX = SIDE.x + SIDE.w / 2;

// The diagram is laid out for exactly six sources; every segment supplies six.
const SOURCE_PATHS = Array.from({ length: 6 }, (_, i) => {
  const y = SRC.cy(i);
  return `M ${SRC.w / 2} ${y} C ${SRC.w + 70} ${y}, ${MID.x - 80} ${MID.cy}, ${midX} ${MID.cy}`;
});
const TO_REVIEW = `M ${midX} ${MID.cy} C ${SIDE.x - 60} ${MID.cy}, ${SIDE.x - 90} ${SIDE.top}, ${sideX} ${SIDE.top}`;
const TO_BOOKS = `M ${sideX} ${SIDE.top} L ${sideX} ${SIDE.bottom}`;

function Particle({ path, color, delay, dur = 3.2 }) {
  return (
    <circle r="3.2" fill={color} filter="url(#acct-glow)">
      <animateMotion dur={`${dur}s`} begin={`${delay}s`} repeatCount="indefinite" path={path} />
    </circle>
  );
}

function Diagram() {
  const { SOURCES } = useCopy();
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative hidden lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
        <defs>
          <filter id="acct-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {[...SOURCE_PATHS, TO_REVIEW, TO_BOOKS].map((d) => (
          <path key={d} d={d} fill="none" stroke="rgba(255,255,255,.13)" strokeWidth="1.25" />
        ))}
        {!reduced && SOURCE_PATHS.map((d, i) => (
          <Particle key={d} path={d} color={SOURCE_ICONS[SOURCES[i].key].c} delay={i * 0.5} />
        ))}
        {!reduced && <Particle path={TO_REVIEW} color="#A78BFA" delay={0.8} dur={2.4} />}
        {!reduced && <Particle path={TO_BOOKS} color="#34D399" delay={1.6} dur={1.8} />}
      </svg>

      <div className="absolute text-[10.5px] uppercase tracking-[0.18em] text-white/45" style={{ left: 0, top: 0 }}>
        <span className="font-mono text-white/30">01</span> Your tools
      </div>
      {SOURCES.map(({ key, label }, i) => (
        <div key={key} className="absolute -translate-y-1/2" style={{ left: pct(SRC.x, W), width: pct(SRC.w, W), top: pct(SRC.cy(i), H) }}>
          <SourceChip k={key} label={label} />
        </div>
      ))}
      <div className="absolute -translate-y-1/2" style={{ left: pct(MID.x, W), width: pct(MID.w, W), top: pct(MID.cy, H) }}>
        <div className="mb-2 text-[10.5px] uppercase tracking-[0.18em] text-white/45"><span className="font-mono text-white/30">02</span> AI agents do the work</div>
        <AgentsCard />
      </div>
      <div className="absolute -translate-y-1/2" style={{ left: pct(SIDE.x, W), width: pct(SIDE.w, W), top: pct(SIDE.top, H) }}>
        <ReviewCard />
      </div>
      <div className="absolute -translate-y-1/2" style={{ left: pct(SIDE.x, W), width: pct(SIDE.w, W), top: pct(SIDE.bottom, H) }}>
        <BooksCard />
      </div>
    </div>
  );
}

function Down() {
  return (
    <div className="flex justify-center py-3" aria-hidden>
      <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-white/60"><ArrowDown size={14} /></span>
    </div>
  );
}

/** Below lg: the same flow, stacked. */
function Stacked() {
  const { SOURCES } = useCopy();
  return (
    <div className="lg:hidden">
      <div className="mb-3 text-[10.5px] uppercase tracking-[0.18em] text-white/45">Your tools</div>
      <div className="grid grid-cols-2 gap-2">
        {SOURCES.map(({ key, label }) => <SourceChip key={key} k={key} label={label} />)}
      </div>
      <Down />
      <AgentsCard />
      <Down />
      <ReviewCard />
      <Down />
      <BooksCard />
    </div>
  );
}

/** How it works: the client's tools feed the agents, an accountant checks, the books close. */
export default function Flow() {
  const { REPLACES, HEADS } = useCopy();
  return (
    <Band id="how" dark testid="accounting-how">
      <Head
        dark
        color="#A78BFA"
        eyebrow={HEADS.flow.eyebrow}
        title={<HeadTitle head={HEADS.flow} accentClass="italic text-white/60" />}
        lead={HEADS.flow.lead}
      />
      <Reveal className="mt-14 lg:mt-16" delay={100}>
        <Diagram />
        <Stacked />
      </Reveal>
      <Reveal className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-3" delay={150}>
        {REPLACES.map(({ title, body }) => (
          <div key={title} className="bg-[#0F0F0F] p-6">
            <div className="text-[14px] font-semibold">{title}</div>
            <p className="mt-1.5 text-[13.5px] text-white/55">{body}</p>
          </div>
        ))}
      </Reveal>
    </Band>
  );
}
