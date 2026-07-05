import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ChevronDown } from "lucide-react";

const items = [
  {
    q: "How is FinBoard different from a generic BI or FP&A tool?",
    a: "Off-the-shelf tools force your business into their schema. FinBoard is a product plus a forward-deployed engineering team: we build custom pipelines around your entities, chart of accounts and systems, then the platform runs them in real time.",
  },
  {
    q: "How many entities can FinBoard consolidate?",
    a: "From 2 to 200+. The platform is built for groups, inter-company eliminations, currency, dimensions and roll-ups scale together.",
  },
  {
    q: "Which systems does FinBoard connect to?",
    a: "QuickBooks Online, NetSuite, Xero, Sage Intacct, and any HRIS/CRM/ticketing tool via our data connectors. Custom sources are supported on Growth and Enterprise plans.",
  },
  {
    q: "Is the AI reliable for close?",
    a: "Every AI action, classification, elimination, adjustment, is fully explained and reviewable, with a complete audit trail. FinBoard never posts silently.",
  },
  {
    q: "Who is FinBoard for?",
    a: "CFOs, group controllers, FP&A leads and founders of multi-entity businesses, anywhere spreadsheets and stitched-together tools have become the bottleneck.",
  },
  {
    q: "How does implementation work?",
    a: "A forward-deployed engineer and finance architect embed with your team. Typical onboarding is 2–4 weeks: discovery, custom pipeline build, historical validation, then go-live. We stay embedded to iterate models and dashboards every quarter.",
  },
  {
    q: "Where is my data stored?",
    a: "In SOC 2 Type II-audited infrastructure. Data is encrypted in transit and at rest. Enterprise plans support customer-managed encryption keys.",
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? items : items.slice(0, 3);
  const remaining = items.length - 3;

  return (
    <section id="faq" className="bg-white border-y border-line">
      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="kbd-chip" data-testid="faq-eyebrow"><HelpCircle size={12} /> FAQ</div>
        <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight" data-testid="faq-heading">
          Frequently asked questions.
        </h2>

        <Accordion type="single" collapsible className="mt-10" data-testid="faq-accordion">
          {visible.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b border-line">
              <AccordionTrigger
                data-testid={`faq-trigger-${i}`}
                className="text-left text-lg font-medium py-5 hover:no-underline"
              >
                {it.q}
              </AccordionTrigger>
              <AccordionContent
                data-testid={`faq-content-${i}`}
                className="text-[#0A0A0A]/70 leading-relaxed pb-5 text-[15px]"
              >
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {items.length > 3 && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              data-testid="faq-toggle"
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium border border-line bg-white text-[#0A0A0A] hover:bg-[#F5F0E8] transition-colors"
            >
              {expanded ? "Show less" : `Show ${remaining} more question${remaining === 1 ? "" : "s"}`}
              <ChevronDown
                size={15}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
