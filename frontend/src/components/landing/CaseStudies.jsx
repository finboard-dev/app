import React from "react";
import { BookOpenText, ArrowUpRight } from "lucide-react";

const cases = [
  {
    id: "meridian",
    company: "Meridian Retail Group",
    industry: "Multi-brand retail · 9 entities",
    quote:
      "We closed our 9-entity month-end in a single afternoon. What used to be spreadsheet archaeology is now a review, not a reconstruction.",
    author: "Elena Marsh · CFO",
    metrics: [
      { l: "Close time", v: "3 wks → 2 days" },
      { l: "Manual JEs", v: "-82%" },
      { l: "Go-live", v: "42 days" },
    ],
  },
  {
    id: "sable",
    company: "Sable Ventures",
    industry: "Family office · 14 entities",
    quote:
      "Inter-company eliminations are the moment of truth. FinBoard is the first tool that handled ours automatically, and we trusted the numbers.",
    author: "Rohan Patel · Group Controller",
    metrics: [
      { l: "IC eliminations", v: "100% auto" },
      { l: "Audit hours", v: "-58%" },
      { l: "Go-live", v: "55 days" },
    ],
  },
  {
    id: "orbital",
    company: "Orbital Health",
    industry: "Homecare · 6 entities",
    quote:
      "Board reporting is now a Tuesday, not a fire drill. Variance commentary writes itself and every roll-up ties.",
    author: "Sara Lindgren · VP Finance",
    metrics: [
      { l: "Board prep", v: "5d → 4h" },
      { l: "Reports built", v: "38 live" },
      { l: "Go-live", v: "30 days" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="relative bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div className="max-w-2xl">
            <div className="kbd-chip" data-testid="case-studies-eyebrow"><BookOpenText size={12} /> Case studies</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="case-studies-heading">
              What the office of the CFO ships with FinBoard.
            </h2>
          </div>
          <a
            href="#book-demo"
            data-testid="case-studies-all-cta"
            className="btn-secondary text-sm"
          >
            View all case studies <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <article
              key={c.id}
              data-testid={`case-study-${c.id}`}
              className="card-white p-7 flex flex-col hover:-translate-y-0.5 transition-transform"
            >
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">{c.industry}</div>
              <div className="mt-2 font-serif-display text-2xl tracking-tight">{c.company}</div>

              <blockquote className="mt-5 font-serif-display text-[19px] leading-[1.3] text-[#0A0A0A]">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <div className="mt-3 text-xs text-[#0A0A0A]/60">{c.author}</div>

              <div className="mt-6 pt-6 border-t border-line grid grid-cols-3 gap-3">
                {c.metrics.map((m) => (
                  <div key={m.l}>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.l}</div>
                    <div className="mt-1 font-serif-display text-lg tracking-tight">{m.v}</div>
                  </div>
                ))}
              </div>

              <a
                href="#book-demo"
                data-testid={`case-study-${c.id}-cta`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium border-b border-[#0A0A0A] self-start hover:opacity-70 transition-opacity"
              >
                Read the story <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
