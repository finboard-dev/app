import React from "react";
import { ArrowRight, ArrowUpRight, Check, Linkedin } from "lucide-react";
import { WRAP } from "@/components/consolidation/primitives";
import { Reveal } from "./motion";
import { FOUNDER, FOUNDER_PROFILE } from "@/data/accountingServices";

/** The finance co-founder's profile, right below the hero: PwC rigor, Rippling payroll and tax. */
export default function Founder({ onDiscovery }) {
  const p = FOUNDER_PROFILE;
  return (
    <section id="founder" data-testid="accounting-founder" className="relative scroll-mt-20">
      <div className={`${WRAP} pt-12 pb-20 lg:pt-16 lg:pb-28`}>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#EDE6DA] shadow-[0_40px_80px_-40px_rgba(10,10,10,.55)]">
              <img
                src={FOUNDER.photo}
                alt={`${FOUNDER.name}, ${FOUNDER.role}`}
                className="h-full w-full object-cover object-[center_15%]"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute left-5 top-5 flex flex-wrap gap-1.5">
                {p.experience.map(({ company }) => (
                  <span
                    key={company}
                    className="rounded-full bg-[#0A0A0A]/85 px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white backdrop-blur"
                  >
                    Ex-{company}
                  </span>
                ))}
              </div>
              <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 text-white">
                <div>
                  <div className="font-serif-display text-[1.4rem] leading-tight">{FOUNDER.name}</div>
                  <div className="text-[13px] text-white/75">{FOUNDER.role}</div>
                </div>
                <a
                  href={FOUNDER.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${FOUNDER.name} on LinkedIn`}
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-[#0A66C2] transition hover:scale-105"
                >
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E0301E]" />
                {p.eyebrow}
              </div>
              <h2 className="mt-4 font-serif-display text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem] leading-[1.02] tracking-[-0.035em]">
                {p.title}
                <br />
                <span className="italic">{p.titleAccent}</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[16px] lg:text-[18px] leading-relaxed text-[#0A0A0A]/65 [text-wrap:pretty]">{p.lead}</p>
            </Reveal>

            <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" delay={100}>
              {p.experience.map(({ company, tag, title, body, color }) => (
                <div key={company} className="card-white relative overflow-hidden p-6 lg:p-7">
                  <span className="absolute inset-x-0 top-0 h-1" style={{ background: color }} aria-hidden />
                  <div className="font-serif-display text-[1.9rem] leading-none tracking-[-0.03em]">{company}</div>
                  <div className="mt-2 text-[12px] uppercase tracking-[0.14em] text-[#0A0A0A]/45">{tag}</div>
                  <div className="mt-6 text-[15.5px] font-semibold">{title}</div>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-[#0A0A0A]/65">{body}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5" delay={150}>
              {p.facts.map((f) => (
                <span key={f} className="inline-flex items-center gap-2 text-[14px] text-[#0A0A0A]/75">
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {f}
                </span>
              ))}
            </Reveal>

            <Reveal className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" delay={200}>
              <button type="button" onClick={onDiscovery} className="btn-primary" data-testid="accounting-founder-call">
                {p.cta} <ArrowRight size={16} />
              </button>
              <a
                href={FOUNDER.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[14px] text-[#0A0A0A]/65 transition-colors hover:text-[#0A0A0A]"
              >
                {p.linkedinLabel} <ArrowUpRight size={14} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
