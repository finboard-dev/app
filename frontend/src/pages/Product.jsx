import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check, Sparkles, Timer, ShieldCheck } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { PRODUCTS_BY_SLUG, PRODUCT_NAV } from "@/data/products";

export default function Product() {
  const { slug } = useParams();
  const product = PRODUCTS_BY_SLUG[slug];
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  // Scroll to top whenever the product changes
  React.useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!product) return <Navigate to="/" replace />;

  const {
    icon: Icon, nav, eyebrow, kicker,
    headlineLead, headlineItalic, headlineTail, subhead,
    capabilities, features, steps, metrics,
  } = product;

  const others = PRODUCT_NAV.filter((p) => p.slug !== slug);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`product-page-${slug}`}>
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-14 lg:pb-24">
            <Link
              to="/"
              data-testid="product-back-link"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
            >
              <ArrowLeft size={14} /> Back to overview
            </Link>

            <div className="mt-6 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 animate-fade-up">
                <span className="kbd-chip" data-testid="product-eyebrow">
                  <Icon size={12} /> {eyebrow}
                </span>

                <div className="mt-5 font-serif-display italic text-xl sm:text-2xl text-[#0A0A0A]/60" data-testid="product-kicker">
                  {kicker}
                </div>

                <h1 className="mt-2 font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[0.98] tracking-tight text-[#0A0A0A]" data-testid="product-heading">
                  {headlineLead} <span className="italic">{headlineItalic}</span> {headlineTail}
                </h1>

                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/75" data-testid="product-subhead">
                  {subhead}
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 max-w-xl" data-testid="product-capabilities">
                  {capabilities.map(({ icon: CapIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <span className="h-7 w-7 shrink-0 rounded-md border border-line bg-[#F5F0E8] grid place-items-center">
                        <CapIcon size={13} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <AiTrustRow className="mt-5" />

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button onClick={openDemo} data-testid="product-book-demo-button" className="btn-primary">
                    Book consultation <ArrowRight size={16} />
                  </button>
                  <a href="#how" data-testid="product-how-link" className="btn-secondary">
                    See how it works
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <ProductVisual product={product} />
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-line">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">What you get</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight max-w-2xl">
            {nav}, built for multi-entity groups.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-4" data-testid="product-features">
            {features.map(({ icon: FIcon, title, body }) => (
              <div key={title} className="card-white p-6 hover:-translate-y-0.5 transition-transform">
                <div className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                  <FIcon size={18} />
                </div>
                <div className="mt-4 font-serif-display text-2xl leading-tight">{title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="bg-[#F5F0E8] border-y border-line scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">How it works</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Live in 30 days or less.</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-4" data-testid="product-steps">
              {steps.map((s, i) => (
                <div key={s.title} className="relative card-white p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Step {i + 1}</div>
                  <div className="mt-3 font-serif-display text-2xl leading-tight">{s.title}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
                </div>
              ))}
            </div>

            {/* Metrics band */}
            <div className="mt-4 grid grid-cols-3 gap-4" data-testid="product-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="card-white p-6 text-center">
                  <div className="font-serif-display text-4xl sm:text-5xl tracking-tight">{m.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Explore other products */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Explore the platform</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">One workspace, every finance workflow.</h2>
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="product-cross-links">
            {others.map((p) => {
              const OIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  data-testid={`product-cross-link-${p.slug}`}
                  className="card-white p-5 flex items-center gap-3 hover:-translate-y-0.5 transition-transform group"
                >
                  <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
                    <OIcon size={18} />
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium text-[14px] truncate">{p.nav}</div>
                    <div className="text-[12px] text-[#0A0A0A]/55 truncate">{p.eyebrow}</div>
                  </div>
                  <ArrowRight size={15} className="ml-auto shrink-0 text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] transition-colors" />
                </Link>
              );
            })}
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}

/* ---------- Product hero visual ---------- */
function ProductVisual({ product }) {
  const { icon: Icon, nav, capabilities, metrics } = product;
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      {/* chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-4 text-[11px] text-[#0A0A0A]/50">finboard.app / {product.slug}</div>
        <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-white border border-line">Live</div>
      </div>

      <div className="p-5 bg-white">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-lg grid place-items-center text-white shrink-0 bg-[#0A0A0A]">
            <Icon size={18} />
          </span>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">FinBoard</div>
            <div className="font-serif-display text-lg leading-tight">{nav}</div>
          </div>
        </div>

        {/* capability checklist */}
        <div className="mt-4 grid grid-cols-1 gap-2">
          {capabilities.map(({ icon: CapIcon, label }, i) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-md border border-line bg-[#F9F6F0] px-3 py-2 animate-fade-up"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="h-6 w-6 rounded border border-line bg-white grid place-items-center shrink-0">
                <CapIcon size={12} />
              </span>
              <span className="text-[12px] font-medium flex-1">{label}</span>
              <Check size={14} className="text-emerald-600 shrink-0" />
            </div>
          ))}
        </div>

        {/* mini metric strip */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-md border border-line bg-white px-2 py-2 text-center">
              <div className="font-serif-display text-lg tracking-tight">{m.value}</div>
              <div className="text-[9px] uppercase tracking-[0.1em] text-[#0A0A0A]/50 truncate">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* footer ribbon */}
      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-t border-line bg-[#F9F6F0] text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5">
          <Sparkles size={11} /> Custom workflow
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5">
          <Timer size={11} /> 30 days
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-[#ECFDF5] border border-[#059669]/30 px-2 py-0.5 text-[#065F46]">
          <ShieldCheck size={11} /> Pay on value
        </span>
      </div>
    </div>
  );
}
