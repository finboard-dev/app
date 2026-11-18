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
      <div className={`${WRAP} py-16 lg:py-20`}>{children}</div>
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

/** Eyebrow, heading and its description stacked directly beneath it. */
export function SectionHead({ eyebrow, title, lead, color }) {
  return (
    <div>
      <div>
        {eyebrow && <Eyebrow color={color}>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-2xl [text-wrap:balance]">
          {title}
        </h2>
      </div>
      {lead && (
        <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#0A0A0A]/65">{lead}</p>
      )}
    </div>
  );
}

export function CheckItem({ children, className = "" }) {
  return (
    <li className={`flex items-start gap-2 ${className}`}>
      <span className="mt-[3px] h-4 w-4 shrink-0 rounded-full bg-emerald-600 text-white grid place-items-center">
        <Check size={10} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-[#0A0A0A]/80">
      {children}
    </span>
  );
}

/** Colored icon tile used across the site (module and feature icons). */
export function IconBadge({ icon: Icon, c, size = "h-6 w-6", iconSize = 12, rounded = "rounded-md" }) {
  return (
    <span
      className={`${size} ${rounded} shrink-0 border grid place-items-center`}
      style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}
    >
      <Icon size={iconSize} strokeWidth={1.9} />
    </span>
  );
}
