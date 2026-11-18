import React from "react";
import { ShieldCheck, Server, Lock, BadgeCheck } from "lucide-react";
import { HERO } from "@/data/consolidationPage";

// One icon and color per HERO.trust entry, in order.
const BADGE_ICONS = [Server, Lock, BadgeCheck];

/** "Secure by design" label with icon badges on the row below it. */
export default function TrustBadges({ className = "" }) {
  return (
    <div className={className} data-testid="trust-badges">
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">
        <ShieldCheck size={12} /> Secure by design
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {HERO.trust.map((label, i) => {
          const Icon = BADGE_ICONS[i];
          return (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white pl-1 pr-2.5 py-1 text-[11px] text-[#0A0A0A]/80"
            >
              <span className="h-5 w-5 shrink-0 rounded-full grid place-items-center bg-[#0A0A0A]/[0.06] text-[#6B7280]">
                <Icon size={11} strokeWidth={2.25} />
              </span>
              {label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
