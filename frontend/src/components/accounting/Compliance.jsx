import React from "react";
import { Bot, Check, ClipboardCheck, FileCheck2, FileSignature, Lock, ShieldCheck } from "lucide-react";
import { IconBadge } from "@/components/consolidation/primitives";
import { Band, Head } from "./Layout";
import { Reveal } from "./motion";
import { useCopy, HeadTitle } from "./copy";

const ICONS = {
  confidentiality: { icon: Lock, c: "#059669" },
  notice: { icon: FileSignature, c: "#2563EB" },
  supervision: { icon: ClipboardCheck, c: "#7C3AED" },
  ai: { icon: Bot, c: "#D97706" },
  consent: { icon: FileCheck2, c: "#E11D48" },
  security: { icon: ShieldCheck, c: "#0891B2" },
};

/** How the work lines up with the professional rules a CPA firm follows (CPA page only). */
export default function Compliance() {
  const { COMPLIANCE: c } = useCopy();
  if (!c) return null;
  return (
    <Band id="compliance" testid="accounting-compliance">
      <Head eyebrow={c.eyebrow} color="#059669" title={<HeadTitle head={c} />} lead={c.lead} />
      <Reveal className="mt-8 flex flex-wrap gap-2.5" delay={50}>
        {c.principles.map((p) => (
          <span key={p} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[13.5px] font-medium">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-600 text-white">
              <Check size={10} strokeWidth={3} />
            </span>
            {p}
          </span>
        ))}
      </Reveal>
      <Reveal className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={100}>
        {c.items.map(({ icon, rule, title, body }) => (
          <div key={title} className="card-white flex flex-col p-6 lg:p-7">
            <div className="flex items-center justify-between gap-3">
              <IconBadge {...ICONS[icon]} size="h-9 w-9" iconSize={16} rounded="rounded-xl" />
              <span className="rounded-full bg-[#F5F0E8] px-2.5 py-1 font-mono text-[10.5px] text-[#0A0A0A]/65">{rule}</span>
            </div>
            <div className="mt-5 text-[17px] font-semibold leading-snug">{title}</div>
            <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/60">{body}</p>
          </div>
        ))}
      </Reveal>
      <p className="mt-6 max-w-3xl text-[12.5px] leading-relaxed text-[#0A0A0A]/45">{c.note}</p>
    </Band>
  );
}
