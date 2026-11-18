import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Sheet as SheetIcon, LayoutGrid } from "lucide-react";
import { PLAN, PRICE_PER_ENTITY, TRIAL_DAYS } from "@/data/consolidationPage";
import { START_PATH } from "@/data/trial";
import { PRODUCT_NAV } from "@/data/products";

/**
 * Two ways to buy: consolidation in Google Sheets at a published per-entity
 * price, and the full platform on a custom quote.
 */
const PLATFORM_INCLUDES = [
  ...PRODUCT_NAV.map((p) => p.nav),
  "Web app, Google Sheets and AI Agent",
  "Forward-deployed build in 30 days",
];

// Items longer than this take a full row in the two-column list.
const LONG = 30;

function Includes({ items, columns = 1 }) {
  return (
    <ul className={`grid gap-x-5 gap-y-2.5 pt-5 border-t border-line text-[13.5px] text-[#0A0A0A]/85 ${columns === 2 ? "sm:grid-cols-2 sm:grid-flow-row-dense" : ""}`}>
      {items.map((t) => (
        <li key={t} className={`flex items-start gap-2 ${columns === 2 && t.length > LONG ? "sm:col-span-2" : ""}`}>
          <span className="mt-[3px] h-4 w-4 shrink-0 rounded-full bg-emerald-600 text-white grid place-items-center">
            <Check size={10} strokeWidth={3} />
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

function PlanHead({ icon: Icon, c, eyebrow, name, badge }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="h-10 w-10 shrink-0 rounded-lg border grid place-items-center" style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}>
          <Icon size={17} strokeWidth={1.75} />
        </span>
        <div className="leading-tight">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">{eyebrow}</div>
          <div className="font-serif-display text-lg">{name}</div>
        </div>
      </div>
      {badge}
    </div>
  );
}

export default function PricingPlans({ onQuote }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 lg:gap-5 items-stretch" data-testid="pricing-plans">
      <div className="card-white p-7 lg:p-8 flex flex-col gap-6 ring-1 ring-[#0A0A0A] border-[#0A0A0A]" data-testid="pricing-plan-consolidation">
        <PlanHead
          icon={SheetIcon}
          c="#2563EB"
          eyebrow="Self-serve"
          name="Consolidation in Google Sheets"
          badge={<span className="shrink-0 rounded-full bg-[#2563EB]/10 text-[#2563EB] px-3 py-1 text-[12px] font-semibold">{TRIAL_DAYS}-day free trial</span>}
        />
        <div>
          <div className="flex flex-wrap items-baseline gap-2 text-[#0A0A0A]/70">
            <span>From</span>
            <strong className="font-serif-display text-4xl leading-none tracking-tight text-[#0A0A0A]">{PRICE_PER_ENTITY}</strong>
            <span>per entity per month</span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">
            Every QuickBooks Online entity, consolidated in Google Sheets.
          </p>
        </div>
        <Includes items={PLAN.includes} columns={2} />
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <Link href={START_PATH} className="btn-primary" data-testid="pricing-plan-trial">
            Start free trial <ArrowRight size={16} />
          </Link>
          <Link href="/products/consolidation" className="text-[14px] font-medium underline underline-offset-4 decoration-[#0A0A0A]/25 hover:decoration-[#0A0A0A]">
            See how it works
          </Link>
        </div>
      </div>

      <div className="card-white p-7 lg:p-8 flex flex-col gap-6" data-testid="pricing-plan-platform">
        <PlanHead
          icon={LayoutGrid}
          c="#7C3AED"
          eyebrow="Full platform"
          name="FinBoard for multi-entity groups"
          badge={<span className="shrink-0 rounded-full bg-[#F5F0E8] text-[#0A0A0A]/70 px-3 py-1 text-[12px] font-semibold">Quote in 1 day</span>}
        />
        <div>
          <div className="flex flex-wrap items-baseline gap-2 text-[#0A0A0A]/70">
            <strong className="font-serif-display text-4xl leading-none tracking-tight text-[#0A0A0A]">Custom</strong>
            <span>quote for your group</span>
          </div>
          <p className="mt-3 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">
            Your whole finance stack, priced around your entities, modules and seats.
          </p>
        </div>
        <Includes items={PLATFORM_INCLUDES} columns={2} />
        <div className="mt-auto flex flex-wrap items-center gap-3">
          <button type="button" onClick={onQuote} className="btn-secondary" data-testid="pricing-plan-quote">
            Get a custom quote <ArrowRight size={16} />
          </button>
          <a href="#quote" className="text-[14px] font-medium underline underline-offset-4 decoration-[#0A0A0A]/25 hover:decoration-[#0A0A0A]">
            What we&apos;ll ask
          </a>
        </div>
      </div>
    </div>
  );
}
