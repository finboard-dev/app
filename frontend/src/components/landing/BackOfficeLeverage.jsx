import React from "react";
import {
  Users, Globe2, Sparkles, ArrowRight, Check,
  UserRoundCog, ClipboardCheck, Briefcase, Clock,
} from "lucide-react";

const POINTS = [
  { icon: Users,          label: "Embedded in your team" },
  { icon: ClipboardCheck, label: "Recruitment & payroll" },
  { icon: Briefcase,      label: "Admin work off your plate" },
  { icon: Clock,          label: "Manager bridges time zones" },
  { icon: UserRoundCog,   label: "Engagement-friendly contracts" },
];

const STATS = [
  { v: "25–33%", l: "Big 4 India headcount" },
  { v: "90k+",   l: "per firm · D/EY/PwC/KPMG" },
  { v: "40–60%", l: "cheaper vs onshore" },
];

export default function BackOfficeLeverage({ onBookDemo }) {
  return (
    <section
      id="back-office"
      className="relative bg-sand border-b border-line"
      data-testid="backoffice-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* Left — cinematic video, matches the hero video frame above */}
          <div className="animate-fade-up" data-testid="backoffice-video-wrap">
            <div
              className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
              style={{ aspectRatio: "16 / 10" }}
            >
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
                onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
                aria-label="FinBoard BackOffice preview"
                data-testid="backoffice-video"
              >
                <source src="/videos/backoffice.mp4" type="video/mp4" />
              </video>
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))" }}
                aria-hidden
              />
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                  <Globe2 size={11} /> India · BackOffice
                </span>
              </div>
            </div>
          </div>

          {/* Right — punchy narrative */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2">
              <span className="h-7 w-7 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                <Sparkles size={13} strokeWidth={1.75} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#0A0A0A]/60">
                FinBoard BackOffice
              </span>
            </div>

            <h2 className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight" data-testid="backoffice-heading">
              Big 4 talent, <span className="italic">at a fraction of the cost</span>.
            </h2>

            <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
              Deloitte, EY, PwC and KPMG run global delivery from India, 90k+ people each. Tap the same pool for your firm. No entity. No HR. No recruiting.
            </p>

            {/* Stat trio */}
            <div className="mt-6 grid grid-cols-3 gap-4" data-testid="backoffice-stats">
              {STATS.map((s) => (
                <div key={s.l} className="border-t border-line pt-3">
                  <div className="font-serif-display text-2xl leading-none tracking-tight tabular-nums text-[#0A0A0A]">
                    {s.v}
                  </div>
                  <div className="mt-1 text-[10.5px] uppercase tracking-[0.15em] text-[#0A0A0A]/55 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>

            {/* 5-point offer — 2 per line */}
            <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-2.5" data-testid="backoffice-points">
              {POINTS.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/85">
                  <span className="h-6 w-6 shrink-0 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                    <Icon size={12} strokeWidth={1.75} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookDemo}
                data-testid="backoffice-cta"
                className="btn-primary"
              >
                Get a pod in 2 weeks <ArrowRight size={16} />
              </button>
              <a
                href="#advisory-leverage-block"
                data-testid="backoffice-link"
                className="btn-secondary"
              >
                How it works <Check size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
