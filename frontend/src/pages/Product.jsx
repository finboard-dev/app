import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight, Check, Timer, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import ProductVisual from "@/components/products/ProductVisuals";
import { PRODUCTS_BY_SLUG, PRODUCT_NAV } from "@/data/products";

export default function Product() {
  const { slug } = useParams();
  const product = PRODUCTS_BY_SLUG[slug];
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!product) return <Navigate to="/" replace />;

  const {
    nav, kicker, headlineLead, headlineItalic, headlineTail, subhead,
    capabilities, features, steps, metrics,
  } = product;

  const others = PRODUCT_NAV.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`product-page-${slug}`}>
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO
        ============================================================ */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-12 lg:pb-20">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-5 animate-fade-up">
                <div className="font-serif-display italic text-lg sm:text-xl text-[#0A0A0A]/55" data-testid="product-kicker">
                  {kicker}
                </div>

                <h1
                  className="mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight text-[#0A0A0A]"
                  data-testid="product-heading"
                >
                  {headlineLead} <span className="italic">{headlineItalic}</span> {headlineTail}
                </h1>

                <p
                  className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75"
                  data-testid="product-subhead"
                >
                  {subhead}
                </p>

                <ul
                  className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-xl"
                  data-testid="product-capabilities"
                >
                  {capabilities.map(({ icon: CapIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <span className="h-6 w-6 shrink-0 rounded-md border border-line bg-white grid place-items-center">
                        <CapIcon size={12} strokeWidth={1.75} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <AiTrustRow className="mt-5" />

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button
                    onClick={openDemo}
                    data-testid="product-book-demo-button"
                    className="btn-primary"
                  >
                    Book consultation <ArrowRight size={16} />
                  </button>
                  <a href="#how" data-testid="product-how-link" className="btn-secondary">
                    See how it works
                  </a>
                </div>
              </div>

              {/* Right: product-specific graphic */}
              <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <ProductVisual slug={slug} />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            FEATURES
        ============================================================ */}
        <section className="border-t border-line bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
                  What you get
                </div>
                <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-2xl">
                  {nav}, built for multi-entity groups.
                </h2>
              </div>
              <div className="lg:col-span-5 text-[13.5px] text-[#0A0A0A]/60 lg:text-right">
                Every capability sits on the same governed data as your ledgers — everything traceable, everything auditable.
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-3" data-testid="product-features">
              {features.map(({ icon: FIcon, title, body }, i) => (
                <div
                  key={title}
                  className="card-white p-5 flex gap-4 hover:-translate-y-0.5 transition-transform animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="h-10 w-10 rounded-md border border-line bg-white grid place-items-center shrink-0 text-[#0A0A0A]">
                    <FIcon size={17} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-serif-display text-lg leading-tight">{title}</div>
                    <p className="mt-1 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================
            HOW IT WORKS + METRICS
        ============================================================ */}
        <section id="how" className="scroll-mt-20 border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              How it works
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              Live in 30 days or less.
            </h2>

            {/* Steps timeline */}
            <div className="mt-10 relative" data-testid="product-steps">
              {/* Horizontal spine */}
              <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-line" aria-hidden />

              <div className="grid md:grid-cols-3 gap-4">
                {steps.map((s, i) => (
                  <div key={s.title} className="relative">
                    <div className="relative bg-sand px-3">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-7 w-7 rounded-full bg-[#0A0A0A] text-white grid place-items-center font-mono text-[11px]">
                          {i + 1}
                        </span>
                        <span className="text-[10.5px] uppercase tracking-[0.16em] text-[#0A0A0A]/55 font-semibold">
                          Step {i + 1}
                        </span>
                      </span>
                    </div>
                    <div className="mt-4 card-white p-5">
                      <div className="font-serif-display text-lg leading-tight">{s.title}</div>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics band */}
            <div className="mt-8 rounded-2xl border border-line bg-white overflow-hidden" data-testid="product-metrics">
              <div className="grid grid-cols-3 divide-x divide-line">
                {metrics.map((m) => (
                  <div key={m.label} className="p-6 text-center">
                    <div className="font-serif-display text-2xl sm:text-3xl tracking-tight">{m.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3 border-t border-line bg-[#F9F6F0] text-[12px] text-[#0A0A0A]/70">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles size={12} /> Custom workflow
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Timer size={12} /> 30 days or less
                </span>
                <span className="inline-flex items-center gap-1.5 text-emerald-700">
                  <ShieldCheck size={12} /> Pay on value
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 text-[#0A0A0A]/60">
                  <Check size={12} /> Governed, auditable, drillable
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            EXPLORE OTHER PRODUCTS
        ============================================================ */}
        <section className="border-t border-line bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
            <div className="flex items-end justify-between flex-wrap gap-3">
              <div>
                <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
                  Explore the platform
                </div>
                <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
                  One workspace, every finance workflow.
                </h2>
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="product-cross-links">
              {others.map((p) => {
                const OIcon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    data-testid={`product-cross-link-${p.slug}`}
                    className="card-white p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform group"
                  >
                    <span className="h-9 w-9 rounded-md border border-line bg-white grid place-items-center shrink-0 text-[#0A0A0A]">
                      <OIcon size={16} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] truncate">{p.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55 truncate">{p.eyebrow}</div>
                    </div>
                    <ArrowRight
                      size={14}
                      className="shrink-0 text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] transition-colors"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
