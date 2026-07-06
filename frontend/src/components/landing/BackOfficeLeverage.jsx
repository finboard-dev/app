import React from "react";
import {
  Users, Globe2, Sparkles, ArrowRight, Check,
  UserRoundCog, ClipboardCheck, Briefcase, Clock,
} from "lucide-react";

/**
 * BackOfficeLeverage — landing-page section placed directly under the hero.
 * Left: looping cinematic video. Right: title, description, and 5-point
 * offer with an "India talent pool" stat callout that explains why this
 * matters for CPA and advisory firms.
 */
const POINTS = [
  { icon: Users,          label: "Embedded in your team" },
  { icon: ClipboardCheck, label: "Managed recruitment and payroll" },
  { icon: Briefcase,      label: "Managed admin work" },
  { icon: Clock,          label: "In-house manager to coordinate time zones" },
  { icon: UserRoundCog,   label: "Engagement-friendly contracts" },
];

const STATS = [
  { v: "25–33%", l: "of Big 4 global headcount is India-based" },
  { v: "90k+",   l: "people per firm at Deloitte, EY, PwC, KPMG" },
  { v: "40–60%", l: "typical cost delta vs. onshore hires" },
];

export default function BackOfficeLeverage({ onBookDemo }) {
  return (
    <section
      id="back-office"
      className="relative bg-sand border-b border-line"
      data-testid="backoffice-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left — cinematic video */}
          <div className="lg:col-span-6" data-testid="backoffice-video-wrap">
            <div className="relative rounded-2xl overflow-hidden bg-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.06),0_30px_60px_-20px_rgba(10,10,10,0.35)] ring-1 ring-black/5">
              <div className="aspect-[4/5] lg:aspect-[5/6]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                  data-testid="backoffice-video"
                >
                  <source src="/videos/backoffice.mp4" type="video/mp4" />
                </video>
              </div>
              {/* Subtle vignette + label */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0) 70%, rgba(0,0,0,0.35) 100%)",
                }}
              />
              <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-sm text-white/95 text-[10.5px] uppercase tracking-[0.22em] px-3 py-1.5 border border-white/15">
                <Globe2 size={11} strokeWidth={1.75} />
                <span>India · FinBoard BackOffice</span>
              </div>
            </div>
          </div>

          {/* Right — narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-7 w-7 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                <Sparkles size={13} strokeWidth={1.75} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#0A0A0A]/60">
                FinBoard BackOffice · for accounting firms
              </span>
            </div>

            <h2 className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight" data-testid="backoffice-heading">
              Leverage <span className="italic">Big 4-grade talent</span> at a fraction of the cost.
            </h2>

            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
              The Big 4 quietly run their global delivery out of India — Deloitte, EY, PwC and KPMG each employ 90k+ people there. Tap the same talent pool for your firm, without the entity, the HR team or the recruiting overhead.
            </p>

            {/* Stat trio — the "why now" */}
            <div className="mt-6 grid grid-cols-3 gap-4 max-w-xl" data-testid="backoffice-stats">
              {STATS.map((s) => (
                <div key={s.l} className="border-t border-line pt-3">
                  <div className="font-serif-display text-2xl sm:text-[26px] leading-none tracking-tight tabular-nums text-[#0A0A0A]">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-[0.15em] text-[#0A0A0A]/55 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* 5-point offer */}
            <ul className="mt-8 grid sm:grid-cols-2 gap-x-6 gap-y-2.5 max-w-xl" data-testid="backoffice-points">
              {POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-start gap-2.5 text-[13.5px] text-[#0A0A0A]/85 leading-snug">
                  <span className="h-6 w-6 shrink-0 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                    <Icon size={12} strokeWidth={1.75} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookDemo}
                data-testid="backoffice-cta"
                className="btn-primary"
              >
                Get a pod ready in 2 weeks <ArrowRight size={16} />
              </button>
              <a
                href="/advisory#advisory-leverage-block"
                data-testid="backoffice-link"
                className="btn-secondary"
              >
                See how it works <Check size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
