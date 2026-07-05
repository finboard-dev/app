import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Landmark, Rocket } from "lucide-react";

const PATHS = [
  {
    id: "cfo",
    tone: "dark",
    kicker: "Multi-entity operators",
    icon: Landmark,
    title: "I run finance for a group.",
    tags: ["Consolidate", "Close", "Board pack"],
    ctaLabel: "Book consultation",
    external: false,
  },
  {
    id: "founder",
    tone: "light",
    kicker: "Founders & operators",
    icon: Rocket,
    title: "I'm a founder.",
    tags: ["Runway", "Burn", "Investor packs"],
    ctaLabel: "Founder call",
    external: false,
  },
  {
    id: "advisory",
    tone: "light",
    kicker: "Advisory firms & CAS",
    icon: Building2,
    title: "I advise multiple clients.",
    tags: ["One workspace", "Partner pricing"],
    ctaLabel: "See firm workspace",
    external: "/advisory",
  },
];

export default function AudienceFork({ onBookDemo }) {
  return (
    <section
      className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20"
      data-testid="audience-fork"
    >
      <div className="max-w-3xl">
        <h2 className="font-serif-display text-3xl sm:text-4xl leading-[1.1] tracking-tight">
          One platform, <span className="italic">three ways in</span>.
        </h2>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-3">
        {PATHS.map((p) => {
          const Icon = p.icon;
          const isDark = p.tone === "dark";

          const cardBase =
            "group relative rounded-2xl p-6 lg:p-7 flex flex-col overflow-hidden transition-all hover:-translate-y-0.5";
          const cardTone = isDark
            ? "bg-[#0A0A0A] text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.4)]"
            : "card-white hover:border-line-strong";

          const content = (
            <>
              {isDark && (
                <div
                  className="absolute inset-0 opacity-[0.05] pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                  aria-hidden
                />
              )}

              <div className="relative flex items-start justify-between">
                <span
                  className={
                    isDark
                      ? "h-11 w-11 rounded-xl bg-white/10 border border-white/15 grid place-items-center"
                      : "h-11 w-11 rounded-xl border border-line bg-[#F5F0E8] grid place-items-center"
                  }
                >
                  <Icon size={19} strokeWidth={1.75} />
                </span>
                <ArrowRight
                  size={16}
                  className={
                    isDark
                      ? "text-white/40 group-hover:text-white transition-colors"
                      : "text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] transition-colors"
                  }
                />
              </div>

              <div
                className={
                  isDark
                    ? "relative mt-6 text-[10.5px] uppercase tracking-[0.22em] text-white/55"
                    : "relative mt-6 text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/50"
                }
              >
                {p.kicker}
              </div>

              <div className="relative mt-2 font-serif-display text-2xl leading-tight tracking-tight">
                {p.title}
              </div>

              <div className="relative mt-5 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className={
                      isDark
                        ? "inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[11px] text-white/85"
                        : "inline-flex items-center rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-[#0A0A0A]/75"
                    }
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="relative flex-1" />

              <div className="relative mt-6">
                {p.external ? (
                  <span
                    data-testid={`fork-${p.id}-cta`}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-[13px] font-medium group-hover:bg-black/5 transition-colors"
                  >
                    {p.ctaLabel}{" "}
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                ) : isDark ? (
                  <button
                    onClick={onBookDemo}
                    data-testid={`fork-${p.id}-cta`}
                    className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-4 py-2.5 text-[13px] font-medium hover:bg-[#F5F0E8] transition-colors"
                  >
                    {p.ctaLabel} <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    onClick={onBookDemo}
                    data-testid={`fork-${p.id}-cta`}
                    className="inline-flex items-center gap-2 border border-line-strong rounded-full px-4 py-2.5 text-[13px] font-medium hover:bg-black/5 transition-colors"
                  >
                    {p.ctaLabel} <ArrowRight size={14} />
                  </button>
                )}
              </div>
            </>
          );

          if (p.external) {
            return (
              <Link
                key={p.id}
                to={p.external}
                data-testid={`fork-${p.id}`}
                aria-label={p.title}
                className={`${cardBase} ${cardTone} cursor-pointer`}
              >
                {content}
              </Link>
            );
          }
          return (
            <div key={p.id} data-testid={`fork-${p.id}`} className={`${cardBase} ${cardTone}`}>
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
