import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, X, Plug } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import IndustryScene from "@/components/industries/IndustryScene";
import IndustryArt from "@/components/industries/IndustryArt";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { INDUSTRIES_BY_SLUG, INDUSTRY_NAV } from "@/data/industries";
import { PRODUCT_NAV } from "@/data/products";

export default function Industry() {
  const { slug } = useParams();
  const industry = INDUSTRIES_BY_SLUG[slug];
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, [slug]);

  if (!industry) return <Navigate to="/" replace />;

  const {
    icon: Icon, nav, eyebrow, accent, tint,
    headlineLead, headlineItalic, headlineTail, subhead,
    capabilities, pains, features, integrations, metrics,
  } = industry;

  const others = INDUSTRY_NAV.filter((i) => i.slug !== slug);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`industry-page-${slug}`}>
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-14 lg:pb-24">
            <Link
              to="/"
              data-testid="industry-back-link"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
            >
              <ArrowLeft size={14} /> Back to overview
            </Link>

            <div className="mt-6 grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 animate-fade-up">
                <span className="kbd-chip" data-testid="industry-eyebrow">
                  <Icon size={12} style={{ color: accent }} /> {eyebrow}
                </span>

                <h1 className="mt-5 font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[0.98] tracking-tight text-[#0A0A0A]" data-testid="industry-heading">
                  {headlineLead} <span className="italic" style={{ color: accent }}>{headlineItalic}</span> {headlineTail}
                </h1>

                <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/75" data-testid="industry-subhead">
                  {subhead}
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 max-w-xl" data-testid="industry-capabilities">
                  {capabilities.map(({ icon: CapIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <span
                        className="h-7 w-7 shrink-0 rounded-md border grid place-items-center"
                        style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                      >
                        <CapIcon size={13} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <AiTrustRow className="mt-5" />

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button onClick={openDemo} data-testid="industry-book-demo-button" className="btn-primary">
                    Book consultation <ArrowRight size={16} />
                  </button>
                  <a href="#pains" data-testid="industry-how-link" className="btn-secondary">
                    See what you get
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 animate-fade-up space-y-4" style={{ animationDelay: "120ms" }}>
                <IndustryArt slug={slug} accent={accent} tint={tint} label={eyebrow} />
                <IndustryScene slug={slug} />
              </div>
            </div>
          </div>
        </section>

        {/* Sound familiar, industry pains */}
        <section id="pains" className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-line scroll-mt-20">
          <div className="text-xs uppercase tracking-[0.22em]" style={{ color: accent }}>Sound familiar?</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight max-w-3xl">
            The month-end you know too well.
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-4" data-testid="industry-pains">
            {pains.map((p, i) => (
              <div key={i} className="rounded-2xl border border-line bg-[#F5F0E8] p-6">
                <span className="h-8 w-8 rounded-full bg-white border border-line grid place-items-center text-[#0A0A0A]/40">
                  <X size={16} />
                </span>
                <p className="mt-4 text-[15px] leading-relaxed text-[#0A0A0A]/75">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-serif-display text-2xl sm:text-3xl tracking-tight max-w-3xl">
            FinBoard turns all of it into one workflow, for {nav.toLowerCase()}.
          </p>
        </section>

        {/* Feature grid + metrics */}
        <section className="bg-[#F5F0E8] border-y border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em]" style={{ color: accent }}>Built for {nav.toLowerCase()}</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight max-w-2xl">
              Finance tuned to how you actually operate.
            </h2>
            <div className="mt-10 grid sm:grid-cols-3 gap-4" data-testid="industry-features">
              {features.map(({ icon: FIcon, title, body }) => (
                <div key={title} className="card-white p-6 hover:-translate-y-0.5 transition-transform">
                  <div className="h-10 w-10 rounded-lg border grid place-items-center" style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}>
                    <FIcon size={18} />
                  </div>
                  <div className="mt-4 font-serif-display text-2xl leading-tight">{title}</div>
                  <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4" data-testid="industry-metrics">
              {metrics.map((m) => (
                <div key={m.label} className="card-white p-6 text-center">
                  <div className="font-serif-display text-3xl sm:text-4xl tracking-tight">{m.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integrations + modules */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Connects to your stack</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">The tools you already run.</h2>
          <div className="mt-8 flex flex-wrap gap-2.5" data-testid="industry-integrations">
            {integrations.map((name) => (
              <span key={name} className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3.5 py-2 text-[13px] font-medium">
                <Plug size={13} className="text-[#0A0A0A]/50" /> {name}
              </span>
            ))}
            <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-dashed border-[#0A0A0A]/20 px-3.5 py-2 text-[13px] text-[#0A0A0A]/60">
              + 100 more connectors
            </span>
          </div>

          <div className="mt-12 text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Your full finance stack</div>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-5 gap-3" data-testid="industry-modules">
            {PRODUCT_NAV.map((p) => {
              const PIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  data-testid={`industry-module-${p.slug}`}
                  className="card-white p-5 hover:-translate-y-0.5 transition-transform group"
                >
                  <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                    <PIcon size={18} />
                  </span>
                  <div className="mt-3 font-medium text-[14px]">{p.nav}</div>
                  <div className="text-[12px] text-[#0A0A0A]/55">{p.eyebrow}</div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Other industries */}
        <section className="bg-[#F5F0E8] border-y border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">More industries</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Tailored for your world too.</h2>
            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="industry-cross-links">
              {others.map((i) => {
                const OIcon = i.icon;
                return (
                  <Link
                    key={i.slug}
                    to={`/industries/${i.slug}`}
                    data-testid={`industry-cross-link-${i.slug}`}
                    className="card-white p-5 flex items-center gap-3 hover:-translate-y-0.5 transition-transform group"
                  >
                    <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
                      <OIcon size={18} />
                    </span>
                    <div className="min-w-0">
                      <div className="font-medium text-[14px] truncate">{i.nav}</div>
                      <div className="text-[12px] text-[#0A0A0A]/55 truncate">{i.eyebrow}</div>
                    </div>
                    <ArrowRight size={15} className="ml-auto shrink-0 text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] transition-colors" />
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
