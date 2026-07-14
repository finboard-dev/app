"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";

// Re-exported for backward compatibility with existing imports.
export { FAQ_ITEMS };

export default function FAQ() {
  const [expanded, setExpanded] = React.useState(false);
  const visible = expanded ? FAQ_ITEMS : FAQ_ITEMS.slice(0, 3);
  const remaining = FAQ_ITEMS.length - 3;

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

        {FAQ_ITEMS.length > 3 && (
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
