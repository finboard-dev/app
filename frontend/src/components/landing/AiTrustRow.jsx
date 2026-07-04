import React from "react";
import { ShieldCheck, Check } from "lucide-react";

/**
 * Shared "AI-native, human-approved" trust qualifiers. Used in the hero and
 * on every product / advisory / industry page so the AI-native argument reads
 * consistently across the site.
 */
const TAGS = ["Auditable", "Human approval layer", "Explainable", "Fully traceable"];

export default function AiTrustRow({ className = "", testid = "ai-trust-row" }) {
  return (
    <div className={className} data-testid={testid}>
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">
        <ShieldCheck size={12} /> Enterprise-safe AI
      </div>
      <div className="mt-2 grid grid-cols-[max-content_max-content] gap-x-3 gap-y-2">
        {TAGS.map((t) => (
          <span
            key={t}
            className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2.5 py-1 text-[11px] text-[#0A0A0A]/75"
          >
            <Check size={11} className="text-emerald-600" /> {t}
          </span>
        ))}
      </div>
    </div>
  );
}
