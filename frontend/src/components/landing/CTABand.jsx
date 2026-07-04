import React from "react";
import { ArrowRight, PlayCircle } from "lucide-react";

export default function CTABand({ onBookDemo }) {
  return (
    <section id="book-demo" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="rounded-3xl bg-[#0A0A0A] text-white p-10 lg:p-16 grid md:grid-cols-12 gap-10 items-end" data-testid="cta-band">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-[0.22em] text-white/60">Talk to a forward-deployed engineer</div>
            <h2 className="mt-3 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">
              Bring every entity into one intelligent workspace.
            </h2>
            <p className="mt-4 text-white/70 max-w-xl">
              Book a 30-minute consultation with our team. Bring your trial balance, we&apos;ll walk through a live consolidation and scope your custom application.
            </p>
          </div>
          <div className="md:col-span-4 flex flex-wrap gap-3 md:justify-end">
            <button
              onClick={onBookDemo}
              data-testid="cta-book-demo-button"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-[#F5F0E8] transition-colors"
            >
              Book consultation <ArrowRight size={16} />
            </button>
            <a
              href="#case-studies"
              data-testid="cta-watch-tour"
              className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <PlayCircle size={16} /> Read case studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
