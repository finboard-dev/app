import React from "react";
import { ScrollText } from "lucide-react";

const beliefs = [
  {
    n: "01",
    t: "Every group deserves a bespoke stack",
    b: "Off-the-shelf finance tools force your business into their schema. We build software around your entities, chart of accounts and dimensions — not the other way around.",
  },
  {
    n: "02",
    t: "AI belongs inside the audit trail",
    b: "AI should never post silently. Every classification, elimination and adjustment is explainable, versioned and reviewable — so auditors can trust it and CFOs can sign it.",
  },
  {
    n: "03",
    t: "Software is only half the answer",
    b: "The other half is people. Our forward-deployed engineers embed with your team from day one and stay through every quarter after — because tools don't ship outcomes, teams do.",
  },
  {
    n: "04",
    t: "Speed compounds",
    b: "A month-end that used to take three weeks should take two afternoons. Every hour returned to finance is an hour invested in the business — and it compounds forever.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifesto" className="relative bg-[#0A0A0A] text-[#F5F0E8]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-24 lg:py-32">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/50" data-testid="manifesto-eyebrow">
            <ScrollText size={12} /> Manifesto
          </div>
          <h2
            className="mt-4 font-serif-display text-4xl sm:text-5xl lg:text-6xl leading-[1.02] tracking-tight"
            data-testid="manifesto-heading"
          >
            Finance deserves better than <span className="italic">stitched-together spreadsheets.</span>
          </h2>
          <p className="mt-6 text-[#F5F0E8]/70 leading-relaxed text-lg">
            We started FinBoard because the office of the CFO in a multi-entity group runs on the wrong shape of tools. Every close is a reconstruction. Every board deck is a museum. Every dashboard is a Frankenstein of exports.
          </p>
          <p className="mt-4 text-[#F5F0E8]/70 leading-relaxed text-lg">
            It doesn't have to be this way. This is what we believe.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-x-10 gap-y-10">
          {beliefs.map((b) => (
            <div key={b.n} data-testid={`manifesto-belief-${b.n}`} className="border-t border-[#F5F0E8]/15 pt-6">
              <div className="text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/50">{b.n}</div>
              <div className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
                {b.t}
              </div>
              <div className="mt-3 text-[#F5F0E8]/70 leading-relaxed">{b.b}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[#F5F0E8]/15 flex items-end justify-between gap-6 flex-wrap">
          <div className="font-serif-display italic text-3xl sm:text-4xl leading-tight tracking-tight">
            &mdash; The FinBoard team
          </div>
          <a
            href="#book-demo"
            data-testid="manifesto-cta"
            className="inline-flex items-center gap-2 bg-[#F5F0E8] text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-white transition-colors"
          >
            Work with us
          </a>
        </div>
      </div>
    </section>
  );
}
