"use client";

import React from "react";
import { Flame, ReceiptText, HandCoins, CalendarCheck, FileCheck2, LayoutDashboard } from "lucide-react";
import { IconBadge } from "@/components/consolidation/primitives";
import { Band, Head } from "./Layout";
import { MockCard } from "./ui";
import { Reveal, useCycle, usePrefersReducedMotion } from "./motion";
import { ANSWER_VIEWS } from "./AnswerViews";
import { useCopy, HeadTitle } from "./copy";

const ICONS = {
  runway: { icon: Flame, c: "#D97706" },
  payables: { icon: ReceiptText, c: "#2563EB" },
  receivables: { icon: HandCoins, c: "#E11D48" },
  close: { icon: CalendarCheck, c: "#059669" },
  tax: { icon: FileCheck2, c: "#7C3AED" },
};
const STEP_MS = 6000;

/**
 * Real-time visibility as a product demo: pick a founder question, see the
 * live answer. It cycles on its own until the visitor picks one.
 */
export default function AskPanel() {
  const { ASK, HEADS } = useCopy();
  const reduced = usePrefersReducedMotion();
  const [picked, setPicked] = React.useState(false);
  const [index, setIndex] = useCycle(ASK.length, STEP_MS, picked || reduced);
  const active = ASK[index];
  const View = ANSWER_VIEWS[active.key];
  const choose = (i) => { setPicked(true); setIndex(i); };

  return (
    <Band id="visibility" testid="accounting-answers">
      <Head
        eyebrow={HEADS.ask.eyebrow}
        color="#2563EB"
        title={<HeadTitle head={HEADS.ask} />}
        lead={HEADS.ask.lead}
      />
      <Reveal className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8" delay={100}>
        <div className="lg:col-span-5" role="tablist" aria-label="Questions">
          <div className="-mx-6 flex snap-x gap-2 overflow-x-auto px-6 pb-2 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0 lg:pb-0">
            {ASK.map(({ key, label, q, sub }, i) => {
              const on = i === index;
              return (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => choose(i)}
                  className={`relative shrink-0 snap-start overflow-hidden rounded-2xl border text-left transition-all lg:w-full ${
                    on ? "border-line bg-white shadow-[0_12px_32px_-12px_rgba(10,10,10,.18)]" : "border-transparent hover:bg-white/60"
                  }`}
                >
                  <span className="flex items-center gap-3.5 px-4 py-3.5 lg:px-5 lg:py-4">
                    <IconBadge {...ICONS[key]} size="h-9 w-9" iconSize={16} rounded="rounded-xl" />
                    <span className="min-w-0">
                      <span className="hidden lg:block text-[16px] font-medium leading-snug">{q}</span>
                      <span className="lg:hidden text-[14px] font-medium whitespace-nowrap">{label}</span>
                      <span className="hidden lg:block mt-0.5 text-[12.5px] text-[#0A0A0A]/50">{sub}</span>
                    </span>
                  </span>
                  {on && !picked && !reduced && (
                    <span
                      key={index}
                      className="acct-progress absolute bottom-0 left-0 h-0.5 bg-[#0A0A0A]/70"
                      style={{ "--acct-ms": `${STEP_MS}ms` }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <div className="lg:col-span-7" role="tabpanel" aria-label={active.q}>
          <p className="mb-3 font-serif-display text-xl leading-snug lg:hidden">&ldquo;{active.q}&rdquo;</p>
          <MockCard
            key={active.key}
            className="acct-pop"
            title={active.q}
            icon={<IconBadge icon={LayoutDashboard} c="#0A0A0A" size="h-6 w-6" iconSize={12} />}
            live
            sample
          >
            <View />
          </MockCard>
        </div>
      </Reveal>
    </Band>
  );
}
