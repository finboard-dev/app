import React from "react";
import {
  Landmark, CreditCard, Mail, Receipt, Users, BookOpen, Bot, UserCheck, BookCheck, ArrowRight, Check,
  ShoppingBag, Megaphone, Package, Clapperboard, Handshake, Clock, FileText,
} from "lucide-react";
import { IconBadge } from "@/components/consolidation/primitives";
import { useCopy } from "./copy";

/** Dark cards for the "how it works" flow (sample data). */

export const SOURCE_ICONS = {
  bank: { icon: Landmark, c: "#2563EB" },
  billing: { icon: CreditCard, c: "#7C3AED" },
  inbox: { icon: Mail, c: "#E11D48" },
  bills: { icon: Receipt, c: "#D97706" },
  payroll: { icon: Users, c: "#059669" },
  ledger: { icon: BookOpen, c: "#0891B2" },
  store: { icon: ShoppingBag, c: "#7C3AED" },
  ads: { icon: Megaphone, c: "#E11D48" },
  inventory: { icon: Package, c: "#D97706" },
  platform: { icon: Clapperboard, c: "#E11D48" },
  sponsors: { icon: Handshake, c: "#7C3AED" },
  time: { icon: Clock, c: "#D97706" },
  returns: { icon: FileText, c: "#7C3AED" },
};

const CARD = "rounded-2xl border border-white/10 bg-[#141414] text-white";

function CardHead({ n, icon, c, title, right }) {
  return (
    <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
      <IconBadge icon={icon} c={c} size="h-7 w-7" iconSize={13} rounded="rounded-lg" />
      <span className="text-[13px] font-semibold">{title}</span>
      <span className="ml-auto font-mono text-[11px] text-white/35">{right ?? n}</span>
    </div>
  );
}

export function SourceChip({ k, label }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#141414] px-2.5 py-2 text-[12.5px] text-white/85">
      <IconBadge {...SOURCE_ICONS[k]} size="h-7 w-7" iconSize={13} rounded="rounded-lg" />
      <span className="truncate">{label}</span>
    </div>
  );
}

export function AgentsCard() {
  const { AGENT_ROWS, FLOW_CARDS } = useCopy();
  return (
    <div className={`${CARD} shadow-[0_0_0_1px_rgba(124,58,237,.35),0_30px_90px_-20px_rgba(124,58,237,.55)]`}>
      <CardHead
        icon={Bot}
        c="#7C3AED"
        title="FinBoard AI agents"
        right={
          <span className="inline-flex items-center gap-1.5 font-sans text-emerald-400">
            <i className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" aria-hidden /> Working
          </span>
        }
      />
      <ul className="divide-y divide-white/[0.07] px-4">
        {AGENT_ROWS.map(({ name, detail, to, confidence }) => {
          const sure = confidence >= 90;
          return (
            <li key={name} className="flex items-center gap-3 py-2.5">
              <div className="min-w-0 flex-1">
                <div className="truncate text-[12.5px] font-medium">{name}</div>
                <div className="truncate text-[11px] text-white/45">{detail}</div>
              </div>
              <div className="hidden sm:flex min-w-0 items-center gap-1.5 text-[11.5px] text-white/70">
                <ArrowRight size={11} className="shrink-0 text-white/35" />
                <span className="truncate">{to}</span>
              </div>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold tabular-nums ${
                  sure ? "bg-emerald-400/15 text-emerald-300" : "bg-amber-400/15 text-amber-300"
                }`}
              >
                {confidence}%
              </span>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-white/10 px-4 py-3 text-[11.5px] text-white/50">
        {FLOW_CARDS.agentsNote}
      </p>
    </div>
  );
}

export function ReviewCard() {
  const { REVIEW_ROWS, FLOW_CARDS } = useCopy();
  return (
    <div className={CARD}>
      <CardHead n="03" icon={UserCheck} c="#059669" title={FLOW_CARDS.reviewTitle} />
      <ul className="flex flex-col gap-2 px-4 py-3">
        {REVIEW_ROWS.map(({ label, state }) => (
          <li key={label} className="flex items-center gap-2 text-[12px] text-white/80">
            <Check size={13} strokeWidth={3} className="shrink-0 text-emerald-400" />
            <span className="min-w-0 truncate">{label}</span>
            <span className="ml-auto shrink-0 text-[10.5px] text-white/45">{state}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BooksCard() {
  const { BOOK_OUTPUTS, FLOW_CARDS, CLOSE_DAYS } = useCopy();
  return (
    <div className={`${CARD} shadow-[0_0_0_1px_rgba(16,185,129,.3),0_24px_70px_-24px_rgba(16,185,129,.5)]`}>
      <CardHead n="04" icon={BookCheck} c="#0891B2" title={FLOW_CARDS.booksTitle} />
      <div className="px-4 py-3">
        <div className="font-serif-display text-[17px] leading-tight">{FLOW_CARDS.booksHeadline} · Day {CLOSE_DAYS}</div>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {BOOK_OUTPUTS.map((o) => (
            <span key={o} className="rounded-full bg-white/[0.07] px-2 py-0.5 text-[10.5px] text-white/75">{o}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
