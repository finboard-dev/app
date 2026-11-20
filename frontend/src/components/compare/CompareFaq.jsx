"use client";

import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Section, SectionHead } from "@/components/consolidation/primitives";

/** Page-specific FAQs in the site's accordion. */
export default function CompareFaq({ page }) {
  return (
    <Section id="faq" testid="compare-faq">
      <div className="max-w-4xl">
        <SectionHead eyebrow="FAQ" color="#0A0A0A" title="Frequently asked questions." />
        <Accordion type="single" collapsible className="mt-8 border-t border-line">
          {page.faqs.map((it, i) => (
            <AccordionItem key={it.q} value={`item-${i}`} className="border-b border-line">
              <AccordionTrigger className="text-left text-[15.5px] font-medium py-4 hover:no-underline">{it.q}</AccordionTrigger>
              <AccordionContent className="text-[#0A0A0A]/70 leading-relaxed pb-4 text-[14px]">{it.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
