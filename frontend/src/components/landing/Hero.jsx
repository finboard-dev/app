import React from "react";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import HeroCarousel from "@/components/landing/HeroCarousel";

export default function Hero({ onBookDemo }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-6 lg:pt-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 animate-fade-up">
            <span className="kbd-chip" data-testid="hero-eyebrow">
              <Sparkles size={12} /> For the Office of the CFO
            </span>

            <div className="mt-5 font-serif-display italic text-2xl sm:text-3xl text-[#0A0A0A]/60" data-testid="hero-kicker">
              Multi-entity CFO?
            </div>

            <h1 className="mt-2 font-serif-display text-5xl sm:text-6xl lg:text-7xl leading-[0.98] tracking-tight text-[#0A0A0A]" data-testid="hero-heading">
              The finance stack for<br />
              <span className="italic">multi-entity</span> groups.
            </h1>

            <p className="mt-6 text-lg text-[#0A0A0A]/70 max-w-xl leading-relaxed" data-testid="hero-subheading">
              Software and services for consolidating entities, month-end close, planning and forecasting, centralising business data across systems, and people scorecards — one intelligent workspace for the whole group.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookDemo}
                data-testid="hero-book-demo-button"
                className="btn-primary"
              >
                Book consultation <ArrowRight size={16} />
              </button>
              <a
                href="#tour"
                data-testid="hero-watch-tour-button"
                className="btn-secondary"
              >
                <PlayCircle size={16} /> Watch product tour
              </a>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-[#0A0A0A]/60">
              <div className="flex items-center gap-2" data-testid="hero-stat-close">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                Close 6× faster
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-entities">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                50+ entity consolidation
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-integrations">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                ERP, CRM, HRMS · 100+ connections
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-people">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                People scorecards
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-manager">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                Manager scorecards
              </div>
              <div className="flex items-center gap-2" data-testid="hero-stat-business">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" />
                Business scorecards
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
