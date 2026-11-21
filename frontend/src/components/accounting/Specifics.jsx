import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Band, Head } from "./Layout";
import { Reveal } from "./motion";
import { useCopy, HeadTitle } from "./copy";
import { ACCOUNTING_PATH } from "@/data/accountingServices";
import { BUSINESS_SEGMENTS } from "@/data/accounting/segments";

/** Segment pages only: the parts of the books that are hard in this business. */
export function Specifics() {
  const { SPECIFICS } = useCopy();
  if (!SPECIFICS) return null;
  return (
    <Band id="built-for" testid="accounting-specifics">
      <Head eyebrow={SPECIFICS.eyebrow} color="#059669" title={<HeadTitle head={SPECIFICS} />} lead={SPECIFICS.lead} />
      <Reveal className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-[#E5E0D8] sm:grid-cols-2 lg:grid-cols-3" delay={100}>
        {SPECIFICS.items.map(({ title, body }, i) => (
          <div key={title} className="bg-white p-6 lg:p-8">
            <span className="font-mono text-[11px] text-[#0A0A0A]/35">0{i + 1}</span>
            <div className="mt-3 text-[17px] font-semibold leading-snug">{title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/60">{body}</p>
          </div>
        ))}
      </Reveal>
    </Band>
  );
}

/** Links to the other accounting pages, so each segment page leads to the rest. */
export function SegmentLinks({ current }) {
  const others = [
    { slug: null, nav: "Startups", blurb: "Books, burn and runway for venture-backed teams." },
    ...BUSINESS_SEGMENTS,
  ].filter((s) => s.slug !== current);
  return (
    <Band id="who-we-serve" testid="accounting-segments">
      <Head eyebrow="Who we work with" color="#7C3AED" title={<>Accounting, <span className="italic">built for your business</span>.</>} />
      <Reveal className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3" delay={100}>
        {others.map(({ slug, nav, blurb }) => (
          <Link
            key={nav}
            href={slug ? `${ACCOUNTING_PATH}/${slug}` : ACCOUNTING_PATH}
            className="group card-white flex flex-col p-6 transition hover:-translate-y-0.5"
          >
            <span className="flex items-center justify-between text-[16px] font-semibold">
              {nav} <ArrowUpRight size={16} className="text-[#0A0A0A]/40 transition group-hover:text-[#0A0A0A]" />
            </span>
            <span className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/60">{blurb}</span>
          </Link>
        ))}
      </Reveal>
    </Band>
  );
}
