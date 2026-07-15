"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

function formatDate(value) {
  if (!value) return null;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

// Fixed display order for the category filters: Accounting & Finance first,
// then Engineering, then anything else.
const CATEGORY_ORDER = { accounting: 0, tech: 1 };

function deriveCategories(posts) {
  const seen = new Map();
  for (const post of posts) {
    if (!seen.has(post.category)) seen.set(post.category, post.categoryLabel);
  }
  return Array.from(seen, ([key, label]) => ({ key, label })).sort(
    (a, b) => (CATEGORY_ORDER[a.key] ?? 9) - (CATEGORY_ORDER[b.key] ?? 9)
  );
}

export default function BlogIndex({ posts = [] }) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const [active, setActive] = React.useState("all");
  const openDemo = () => setDemoOpen(true);

  const categories = React.useMemo(() => deriveCategories(posts), [posts]);
  const visible = active === "all" ? posts : posts.filter((p) => p.category === active);

  const filters = [{ key: "all", label: "All" }, ...categories];

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="blog-index-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <section className="max-w-5xl mx-auto px-6 lg:px-8 pt-12 lg:pt-16 pb-6">
          <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#2563EB] mb-3">
            Resources
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl tracking-tight leading-[1.02]">
            The FinBoard blog<span className="text-[#2563EB]">.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[15px] sm:text-base leading-relaxed text-[#0A0A0A]/60">
            Playbooks, benchmarks and engineering notes on multi-entity finance — close,
            consolidation, FP&amp;A and the systems behind them.
          </p>

          {categories.length > 1 ? (
            <div className="mt-7 flex flex-wrap gap-2" data-testid="blog-category-filters">
              {filters.map((f) => {
                const isActive = active === f.key;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActive(f.key)}
                    data-testid={`blog-filter-${f.key}`}
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

        <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-16">
          {visible.length === 0 ? (
            <p className="text-[#0A0A0A]/50 py-16 text-center" data-testid="blog-empty">
              No articles yet — check back soon.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 gap-5" data-testid="blog-post-grid">
              {visible.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  data-testid={`blog-card-${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white hover:border-line-strong hover:-translate-y-0.5 transition-all"
                >
                  {post.coverImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt || post.title}
                      className="aspect-video w-full object-cover border-b border-line bg-sand"
                    />
                  ) : null}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#2563EB]">
                        {post.categoryLabel}
                      </span>
                    </div>
                    <h2 className="font-serif-display text-xl leading-tight tracking-tight text-[#0A0A0A]">
                      {post.title}
                    </h2>
                    <p className="mt-2.5 text-[13.5px] leading-relaxed text-[#0A0A0A]/65 flex-1 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-[12px] text-[#0A0A0A]/45">
                      <span>
                        {formatDate(post.date)} · {post.readingTime} min read
                      </span>
                      <ArrowUpRight
                        size={15}
                        className="text-[#0A0A0A]/40 group-hover:text-[#2563EB] transition-colors"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
