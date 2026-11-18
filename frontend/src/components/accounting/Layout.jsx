import React from "react";
import { WRAP } from "@/components/consolidation/primitives";
import { Reveal } from "./motion";

/** Soft colored light behind dark sections (FinBoard accent colors). */
export function Aurora({ className = "" }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="acct-beam absolute -top-1/3 left-1/2 h-[140%] w-[140%] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(35% 30% at 50% 18%, rgba(147,197,253,.20), transparent 70%), radial-gradient(30% 35% at 18% 55%, rgba(124,58,237,.20), transparent 70%), radial-gradient(30% 35% at 82% 60%, rgba(16,185,129,.16), transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(70% 60% at 50% 30%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 30%, #000, transparent)",
        }}
      />
    </div>
  );
}

/** Full-width page band: sand by default, ink with aurora when dark. */
export function Band({ id, dark = false, testid, className = "", children }) {
  return (
    <section
      id={id}
      data-testid={testid}
      className={`relative scroll-mt-20 overflow-hidden ${dark ? "bg-[#0A0A0A] text-white" : "border-t border-line"} ${className}`}
    >
      {dark && <Aurora />}
      <div className={`relative ${WRAP} py-20 lg:py-28`}>{children}</div>
    </section>
  );
}

/** Eyebrow, large title and lead, in the page's display scale. */
export function Head({ eyebrow, color = "#2563EB", title, lead, dark = false, center = false }) {
  return (
    <Reveal className={center ? "mx-auto text-center" : ""}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] ${dark ? "text-white/55" : "text-[#0A0A0A]/55"}`}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          {eyebrow}
        </div>
      )}
      <h2
        className={`mt-4 font-serif-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] leading-[1.04] tracking-[-0.03em] [text-wrap:balance] ${
          center ? "mx-auto max-w-3xl" : "max-w-3xl"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 max-w-2xl text-[16px] lg:text-[18px] leading-relaxed [text-wrap:pretty] ${dark ? "text-white/60" : "text-[#0A0A0A]/60"} ${
            center ? "mx-auto" : ""
          }`}
        >
          {lead}
        </p>
      )}
    </Reveal>
  );
}
