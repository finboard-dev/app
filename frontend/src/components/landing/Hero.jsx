import React from "react";
import { ArrowRight, PlayCircle, Sparkles, Layers, Zap, LineChart, Database, Users } from "lucide-react";
import HeroCarousel from "@/components/landing/HeroCarousel";

export default function Hero({ onBookDemo }) {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-6 lg:pt-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 animate-fade-up">
            <span className="kbd-chip" data-testid="hero-eyebrow">
              <Sparkles size={12} /> For the Office of the CFO
            </span>

            <div className="mt-5 font-serif-display italic text-xl sm:text-2xl text-[#0A0A0A]/60" data-testid="hero-kicker">
              Multi-entity CFO?
            </div>

            <h1 className="mt-2 font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[0.98] tracking-tight text-[#0A0A0A]" data-testid="hero-heading">
              Finance stack for<br />
              <span className="italic">multi-entity</span> groups.
            </h1>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 max-w-xl" data-testid="hero-capabilities">
              {[
                { icon: Layers,     label: "Consolidate entities" },
                { icon: Zap,        label: "Automate month-end close" },
                { icon: LineChart,  label: "Planning & forecasting" },
                { icon: Database,   label: "Centralise business data & ops" },
                { icon: Users,      label: "People & manager scorecards" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                  <span className="h-7 w-7 shrink-0 rounded-md border border-line bg-[#F5F0E8] grid place-items-center">
                    <Icon size={13} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>

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
                Touchless close
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

          <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <HeroCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
