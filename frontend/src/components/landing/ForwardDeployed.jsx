import React from "react";
import {
  UserRoundCog, Workflow, ShieldCheck, GaugeCircle,
  Users, Slack, MessageCircle, Sparkles,
} from "lucide-react";

/**
 * Forward-deployed engineering - sand-toned editorial section featuring
 * a "pod card" showpiece (3 named roles + live-in-slack indicator),
 * then a numbered 4-pillar strip, then an integration source strip.
 */

// Stylized pod avatars using initials + monochrome tints.
const POD = [
  {
    initials: "MK",
    name: "Maya K.",
    role: "Forward-deployed engineer",
    kicker: "Lead build",
    tint: "bg-[#0A0A0A] text-white",
  },
  {
    initials: "DR",
    name: "Daniel R.",
    role: "Finance architect",
    kicker: "Close & controllership",
    tint: "bg-[#3D2E1E] text-white",
  },
  {
    initials: "JS",
    name: "Jules S.",
    role: "Ops & data lead",
    kicker: "Pipelines & dashboards",
    tint: "bg-[#7B6444] text-white",
  },
];

const PILLARS = [
  {
    icon: UserRoundCog,
    title: "A pod, not a portal",
    body: "A senior FDE, finance architect and ops lead work alongside your team, on Slack, on calls, on-site when it matters.",
  },
  {
    icon: Workflow,
    title: "Custom data pipelines",
    body: "We map your entities, chart of accounts, dimensions and systems, then build the pipelines end-to-end. No off-the-shelf schemas.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready by design",
    body: "Every transformation is versioned and explainable. Consolidations, eliminations and journals leave a complete audit trail.",
  },
  {
    icon: GaugeCircle,
    title: "Live dashboards, always",
    body: "Once pipelines are live, FinBoard runs them for you, refreshing reports and dashboards in real time as data lands.",
  },
];

const INTEGRATIONS = [
  "QuickBooks","NetSuite","Xero","Sage Intacct","Snowflake","BigQuery",
  "Workday","Rippling","HubSpot","Salesforce","Stripe","Ramp","Brex","Gusto",
];

export default function ForwardDeployed() {
  return (
    <section
      id="approach"
      className="relative bg-[#F5F0E8] border-t border-line"
      data-testid="forward-deployed-section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
        {/* Editorial header */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2">
              <span className="h-7 w-7 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                <Users size={13} strokeWidth={1.75} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[#0A0A0A]/60">
                Forward-deployed engineering
              </span>
            </div>

            <h2
              className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight"
              data-testid="approach-heading"
            >
              A product <span className="italic">plus a team</span>, embedded in your business.
            </h2>
            <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/70">
              FinBoard isn&apos;t a form you fill in and hope. A senior pod embeds with your finance and ops leaders to design the pipelines, dashboards and reviews that match how <em>your</em> group actually operates, from day one and every quarter after.
            </p>

            {/* Big stat callouts */}
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { v: "3-person", l: "pod per engagement" },
                { v: "Weekly",   l: "reviews & shipping" },
                { v: "0",        l: "off-shore hand-offs" },
              ].map((s) => (
                <div key={s.l} className="flex items-baseline gap-2">
                  <span className="font-serif-display text-2xl tracking-tight tabular-nums text-[#0A0A0A]">{s.v}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pod showpiece */}
          <div className="lg:col-span-5">
            <div
              className="relative rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_50px_-24px_rgba(10,10,10,0.18)] overflow-hidden"
              data-testid="pod-card"
            >
              {/* Card chrome */}
              <div className="flex items-center justify-between border-b border-line px-4 py-2.5 bg-[#FAF6EE]">
                <div className="flex items-center gap-2 text-[11px] text-[#0A0A0A]/60">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Your pod · embedded in Slack
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/40">Live</div>
              </div>

              {/* Avatars */}
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">The Pod</div>
                <div className="mt-1 font-serif-display text-2xl leading-tight">Your dedicated 3-person team.</div>

                <div className="mt-6 space-y-3">
                  {POD.map((m) => (
                    <div key={m.name} className="flex items-center gap-3">
                      <div className={`h-11 w-11 rounded-full grid place-items-center font-serif-display text-[15px] tracking-tight ${m.tint} shrink-0`}>
                        {m.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2">
                          <span className="font-medium text-[14px] text-[#0A0A0A]">{m.name}</span>
                          <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#0A0A0A]/40 shrink-0">
                            {m.kicker}
                          </span>
                        </div>
                        <div className="text-[12px] text-[#0A0A0A]/60 leading-snug truncate">{m.role}</div>
                      </div>
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" aria-label="online" />
                    </div>
                  ))}
                </div>

                {/* Slack-style ambient row */}
                <div className="mt-6 rounded-lg border border-line bg-[#F5F0E8] px-3 py-2.5 flex items-start gap-2.5">
                  <span className="h-6 w-6 rounded-md grid place-items-center bg-white border border-line shrink-0">
                    <Slack size={13} strokeWidth={1.75} />
                  </span>
                  <div className="text-[12px] leading-snug text-[#0A0A0A]/75">
                    <span className="font-medium text-[#0A0A0A]">#finboard-yourco</span>
                    <span className="text-[#0A0A0A]/45"> · </span>
                    <span>“Group P&amp;L now live. Two IC pairs flagged for your review.”</span>
                  </div>
                </div>
                <div className="mt-2 rounded-lg border border-line bg-white px-3 py-2.5 flex items-start gap-2.5">
                  <span className="h-6 w-6 rounded-md grid place-items-center bg-[#F5F0E8] border border-line shrink-0">
                    <MessageCircle size={13} strokeWidth={1.75} />
                  </span>
                  <div className="text-[12px] leading-snug text-[#0A0A0A]/75">
                    <span className="font-medium text-[#0A0A0A]">Weekly review</span>
                    <span className="text-[#0A0A0A]/45"> · </span>
                    <span>Thursday 4pm ET, 30 mins with Maya & Daniel.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Numbered pillar strip */}
        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-4 gap-4" data-testid="approach-pillars">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                data-testid={`approach-pillar-${i}`}
                className="relative rounded-2xl border border-line bg-white p-6 flex flex-col hover:-translate-y-0.5 transition-transform"
              >
                <div className="flex items-start justify-between">
                  <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                    <Icon size={17} strokeWidth={1.75} />
                  </span>
                  <span className="font-serif-display text-[13px] tabular-nums text-[#0A0A0A]/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-6 font-serif-display text-xl leading-tight">{p.title}</div>
                <p className="mt-2 text-[13px] leading-relaxed text-[#0A0A0A]/65 flex-1">{p.body}</p>
              </div>
            );
          })}
        </div>

        {/* Integration source strip */}
        <div className="mt-14" data-testid="approach-integrations">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2">
              <span className="h-6 w-6 rounded-md grid place-items-center bg-white border border-line text-[#0A0A0A]">
                <Sparkles size={12} strokeWidth={1.75} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#0A0A0A]/60">
                Sources we plug into
              </span>
            </div>
            <span className="h-px flex-1 bg-line" />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {INTEGRATIONS.map((s) => (
              <span
                key={s}
                data-testid={`approach-source-${s.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-[11.5px] px-2.5 py-1 rounded-full bg-white border border-line text-[#0A0A0A]/80"
              >
                {s}
              </span>
            ))}
            <span className="text-[11.5px] px-2.5 py-1 rounded-full bg-[#F5F0E8] border border-line text-[#0A0A0A]/50">
              + your custom sources
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
