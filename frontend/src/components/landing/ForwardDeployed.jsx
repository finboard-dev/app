import React from "react";
import { UserRoundCog, Workflow, ShieldCheck, GaugeCircle } from "lucide-react";

const pillars = [
  {
    icon: UserRoundCog,
    title: "A pod, not a portal",
    copy:
      "A senior forward-deployed engineer, a finance architect and an ops lead work alongside your team &mdash; on Slack, on calls, on-site when it matters.",
  },
  {
    icon: Workflow,
    title: "Custom data pipelines",
    copy:
      "We map your entities, chart of accounts, dimensions and systems, then build the pipelines end-to-end. No off-the-shelf schemas. No forcing your business into ours.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready by design",
    copy:
      "Every transformation is versioned and explainable. Consolidations, eliminations and journals leave a full audit trail your auditors will actually enjoy reviewing.",
  },
  {
    icon: GaugeCircle,
    title: "Live dashboards, always",
    copy:
      "Once pipelines are live, FinBoard runs them for you &mdash; refreshing reports and dashboards in real time as data lands from every source.",
  },
];

export default function ForwardDeployed() {
  return (
    <section id="approach" className="relative bg-[#F5F0E8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <div className="kbd-chip" data-testid="approach-eyebrow">
              <UserRoundCog size={12} /> Forward-deployed engineering
            </div>
            <h2
              className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight"
              data-testid="approach-heading"
            >
              A product <em>plus</em> a team, built into your business.
            </h2>
            <p className="mt-5 text-[#0A0A0A]/70 leading-relaxed">
              FinBoard isn&apos;t a form you fill in and hope. We embed engineers with your finance and ops leaders to design the pipelines, dashboards and reviews that match how <em>your</em> group actually operates &mdash; from day one and every quarter after.
            </p>

            <div className="mt-8 flex flex-wrap gap-2 text-[11px] text-[#0A0A0A]/70">
              {["QuickBooks","NetSuite","Xero","Sage Intacct","Snowflake","BigQuery","Workday","Rippling","HubSpot","Salesforce","Stripe"].map((s) => (
                <span key={s} className="kbd-chip" data-testid={`approach-source-${s.toLowerCase().replace(/\s+/g,"-")}`}>{s}</span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  data-testid={`approach-pillar-${i}`}
                  className="card-white p-6 hover:-translate-y-1 transition-transform"
                >
                  <div className="h-9 w-9 rounded-full bg-[#F5F0E8] border border-line grid place-items-center">
                    <Icon size={16} />
                  </div>
                  <div className="mt-4 font-serif-display text-2xl leading-tight" dangerouslySetInnerHTML={{ __html: p.title }} />
                  <div className="mt-2 text-sm text-[#0A0A0A]/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.copy }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
