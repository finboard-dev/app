import React from "react";
import { Check } from "lucide-react";

/** Shared building blocks for the consolidation product page, in site theme. */

export const WRAP = "max-w-7xl mx-auto px-6 lg:px-10";

export function Section({ id, alt = false, className = "", children, testid }) {
  return (
    <section
      id={id}
      data-testid={testid}
      className={`scroll-mt-20 border-t border-line ${alt ? "bg-[#F5F0E8]" : ""} ${className}`}
    >
      <div className={`${WRAP} py-16 lg:py-24`}>{children}</div>
    </section>
  );
}

export function Eyebrow({ children, color = "#2563EB" }) {
  return (
    <div className="inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {children}
    </div>
  );
}

export function SectionHead({ eyebrow, title, lead, color }) {
  return (
    <div className="max-w-3xl">
      {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
      <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl lg:text-[2.2rem] leading-[1.1] tracking-tight">
        {title}
      </h2>
      {lead && <p className="mt-4 text-[15px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">{lead}</p>}
    </div>
  );
}

export function CheckItem({ children, className = "" }) {
  return (
    <li className={`flex items-start gap-2.5 ${className}`}>
      <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-emerald-600 text-white grid place-items-center">
        <Check size={12} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white px-3 py-1 text-[12px] text-[#0A0A0A]/80">
      {children}
    </span>
  );
}
