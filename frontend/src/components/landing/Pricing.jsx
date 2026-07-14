"use client";

import React from "react";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$1,200",
    unit: "/month",
    desc: "For small groups just getting a handle on multi-entity close.",
    features: [
      "Up to 3 entities",
      "Consolidation & eliminations",
      "Group reporting: PY, YTD, budget vs actuals",
      "2 workspace users",
      "Email support",
    ],
    cta: "Start with a consultation",
  },
  {
    id: "growth",
    name: "Growth",
    price: "$3,400",
    unit: "/month",
    desc: "For scaling groups running planning, reporting and people ops.",
    features: [
      "Up to 15 entities",
      "Everything in Starter",
      "Financial planning & forecasting models",
      "People performance reports",
      "Unlimited users · SSO",
      "Priority Slack support",
    ],
    cta: "Book consultation",
    highlight: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    unit: "",
    desc: "For 20+ entity groups with complex reporting and governance needs.",
    features: [
      "Unlimited entities",
      "Everything in Growth",
      "Custom reporting models & dimensions",
      "SAML SSO · SCIM · Audit log",
      "Dedicated success manager",
      "White-glove onboarding",
    ],
    cta: "Talk to sales",
  },
];

export default function Pricing({ onBookDemo }) {
  return (
    <section id="pricing" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="max-w-2xl">
          <div className="kbd-chip" data-testid="pricing-eyebrow"><Sparkles size={12} /> Pricing</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="pricing-heading">
            Straightforward pricing for ambitious groups.
          </h2>
          <p className="mt-4 text-[#0A0A0A]/70">Every plan includes unlimited data sources, audit trails and hands-on onboarding.</p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div
              key={p.id}
              data-testid={`pricing-card-${p.id}`}
              className={`relative rounded-2xl p-8 flex flex-col ${
                p.highlight
                  ? "bg-[#0A0A0A] text-white border border-[#0A0A0A]"
                  : "bg-white border border-line"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-8 text-[10px] uppercase tracking-[0.22em] px-2 py-1 rounded-full bg-[#F5F0E8] text-[#0A0A0A] border border-line">
                  Most popular
                </div>
              )}
              <div className={`text-xs uppercase tracking-[0.22em] ${p.highlight ? "text-white/60" : "text-[#0A0A0A]/50"}`}>{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <div className="font-serif-display text-5xl tracking-tight">{p.price}</div>
                <div className={`${p.highlight ? "text-white/60" : "text-[#0A0A0A]/60"} text-sm`}>{p.unit}</div>
              </div>
              <div className={`mt-3 text-sm ${p.highlight ? "text-white/70" : "text-[#0A0A0A]/70"}`}>{p.desc}</div>

              <ul className="mt-6 space-y-3 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={16} className={`${p.highlight ? "text-white" : "text-[#0A0A0A]"} mt-0.5 shrink-0`} />
                    <span className={p.highlight ? "text-white/90" : "text-[#0A0A0A]/85"}>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                data-testid={`pricing-cta-${p.id}`}
                onClick={onBookDemo}
                className={`mt-8 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-colors ${
                  p.highlight
                    ? "bg-white text-[#0A0A0A] hover:bg-[#F5F0E8]"
                    : "bg-[#0A0A0A] text-white hover:bg-[#262626]"
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
