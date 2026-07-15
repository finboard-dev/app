"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

export default function TemplatesIndex({ templates = [], categories = [] }) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const [active, setActive] = React.useState("all");
  const openDemo = () => setDemoOpen(true);

  const visible =
    active === "all" ? templates : templates.filter((t) => t.category === active);
  const filters = [{ name: "all", label: "All" }, ...categories.map((c) => ({ name: c.name, label: c.name }))];

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="templates-index-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-12 lg:pt-16 pb-6">
          <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#2563EB] mb-3">
            Resources
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl tracking-tight leading-[1.02]">
            Finance templates<span className="text-[#2563EB]">.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#0A0A0A]/60">
            Free, QuickBooks Online–ready spreadsheets — budgets, forecasts, P&amp;L,
            cash flow, calculators and more. Open any template in Google Sheets and make
            it yours.
          </p>

          {categories.length > 1 ? (
            <div className="mt-7 flex flex-wrap gap-2" data-testid="template-category-filters">
              {filters.map((f) => {
                const isActive = active === f.name;
                return (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setActive(f.name)}
                    aria-pressed={isActive}
                    className={
                      "rounded-full border px-3.5 py-1.5 text-[13px] transition-colors " +
                      (isActive
                        ? "border-[#0A0A0A] bg-[#0A0A0A] text-white"
                        : "border-line bg-white text-[#0A0A0A]/70 hover:border-line-strong hover:text-[#0A0A0A]")
                    }
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </section>

        <section className="max-w-6xl mx-auto px-6 lg:px-8 pb-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" data-testid="template-grid">
            {visible.map((tpl) => (
              <Link
                key={tpl.slug}
                href={`/templates/${tpl.slug}`}
                data-testid={`template-card-${tpl.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white hover:border-line-strong hover:-translate-y-0.5 transition-all"
              >
                {tpl.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tpl.image}
                    alt={tpl.imageAlt}
                    loading="lazy"
                    className="h-40 w-full object-cover border-b border-line bg-sand"
                  />
                ) : null}
                <div className="flex flex-1 flex-col p-5">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2563EB]">
                    {tpl.category}
                  </span>
                  <h2 className="mt-2 font-serif-display text-lg leading-tight tracking-tight text-[#0A0A0A]">
                    {tpl.title}
                  </h2>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#0A0A0A]/60 flex-1 line-clamp-3">
                    {tpl.shortDescription}
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1 text-[12.5px] font-medium text-[#0A0A0A]/70 group-hover:text-[#2563EB] transition-colors">
                    View template <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
