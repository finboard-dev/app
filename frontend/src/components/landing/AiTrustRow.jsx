import React from "react";
import { ShieldCheck, FileCheck, UserCheck, Eye, Route } from "lucide-react";

/**
 * Shared "AI-native, human-approved" trust qualifiers. Used in the hero and
 * on every product / advisory / industry page so the AI-native argument reads
 * consistently across the site. Each qualifier gets its own colorful icon badge.
 */
const TAGS = [
  { icon: FileCheck, label: "Auditable", c: "#2563EB" },
  { icon: UserCheck, label: "Human approval layer", c: "#059669" },
  { icon: Eye, label: "Explainable", c: "#D97706" },
  { icon: Route, label: "Fully traceable", c: "#7C3AED" },
];

export default function AiTrustRow({ className = "", testid = "ai-trust-row" }) {
  return (
    <div className={className} data-testid={testid}>
      <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">
        <ShieldCheck size={12} /> Enterprise-safe AI
      </div>
      <div className="mt-2 grid grid-cols-[max-content_max-content] gap-x-3 gap-y-2">
        {TAGS.map(({ icon: Icon, label, c }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white pl-1 pr-2.5 py-1 text-[11px] text-[#0A0A0A]/80"
          >
            <span
              className="h-5 w-5 shrink-0 rounded-full grid place-items-center"
              style={{ backgroundColor: c, color: "#fff" }}
            >
              <Icon size={11} strokeWidth={2.25} />
            </span>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
