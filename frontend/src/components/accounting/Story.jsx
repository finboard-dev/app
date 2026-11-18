"use client";

import React from "react";
import { Quote, Laptop, ShoppingBag } from "lucide-react";
import { Band, Head, Aurora } from "./Layout";
import { Reveal } from "./motion";
import { STORIES } from "@/data/accountingServices";

const STEP_COLORS = ["#E11D48", "#7C3AED", "#059669"];
const TAB_ICONS = { b2b: Laptop, ecommerce: ShoppingBag };

function StoryBody({ story }) {
  return (
    <div className="acct-pop grid grid-cols-1 gap-4 lg:grid-cols-12" role="tabpanel" aria-label={story.tab}>
      <div className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] p-8 text-white lg:col-span-5 lg:p-10">
        <Aurora className="opacity-70" />
        <div className="relative flex h-full flex-col">
          <span className="self-start rounded-full bg-white/10 px-3 py-1 text-[11.5px] text-white/75">{story.company}</span>
          <Quote size={28} className="mt-8 text-white/30" />
          <blockquote className="mt-4 font-serif-display text-[22px] leading-snug lg:text-[26px]">{story.quote}</blockquote>
          <div className="mt-auto pt-10 text-[13px]">
            <div className="font-semibold">{story.role}</div>
            <div className="text-white/50">{story.sector}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col rounded-3xl border border-line bg-white lg:col-span-7">
        <div className="p-8 pb-0 lg:p-10 lg:pb-0">
          <h3 className="font-serif-display text-[1.6rem] leading-tight [text-wrap:balance] lg:text-[2rem]">
            {story.title} <span className="italic">{story.titleAccent}</span>.
          </h3>
        </div>
        <ol className="flex flex-col gap-7 p-8 lg:p-10">
          {story.steps.map(({ label, body }, i) => (
            <li key={label} className="relative pl-8">
              {i < story.steps.length - 1 && <span className="absolute left-[5px] top-5 h-[calc(100%+1.25rem)] w-px bg-[#E5E0D8]" aria-hidden />}
              <span className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full ring-4 ring-white" style={{ background: STEP_COLORS[i] }} aria-hidden />
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0A0A0A]/50">{label}</div>
              <p className="mt-1.5 text-[15.5px] leading-relaxed text-[#0A0A0A]/80">{body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-auto grid grid-cols-1 gap-px overflow-hidden rounded-b-3xl border-t border-line bg-[#E5E0D8] sm:grid-cols-3">
          {story.metrics.map(({ value, label }) => (
            <div key={label} className="bg-white px-8 py-6 lg:px-10">
              <div className="font-serif-display text-[1.6rem] leading-none tabular-nums">{value}</div>
              <div className="mt-2 text-[12.5px] text-[#0A0A0A]/55">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Anonymised customer stories, one per business type, picked with a switcher. */
export default function Story() {
  const [active, setActive] = React.useState(0);
  const story = STORIES[active];
  return (
    <Band id="story" testid="accounting-story">
      <Head eyebrow="Customer stories" color="#059669" title={<>Founders who stopped <span className="italic">doing the books</span>.</>} />
      <Reveal className="mt-10" delay={100}>
        <div className="mb-6 inline-flex gap-1 rounded-full border border-line bg-white p-1" role="tablist" aria-label="Customer stories">
          {STORIES.map(({ key, tab, short }, i) => {
            const Icon = TAB_ICONS[key];
            const on = i === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(i)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  on ? "bg-[#0A0A0A] text-white" : "text-[#0A0A0A]/65 hover:bg-[#F5F0E8]"
                }`}
              >
                <Icon size={15} />
                <span className="sm:hidden">{short}</span>
                <span className="hidden sm:inline">{tab}</span>
              </button>
            );
          })}
        </div>
        <StoryBody key={story.key} story={story} />
      </Reveal>
    </Band>
  );
}
