import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight, X, Plug } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import IndustryScene from "@/components/industries/IndustryScene";
import IndustryArt from "@/components/industries/IndustryArt";
import IndustryVideo, { hasIndustryVideo } from "@/components/industries/IndustryVideo";
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
    nav, accent, tint,
    headlineLead, headlineItalic, headlineTail, subhead,
    capabilities, pains, features, integrations, metrics,
  } = industry;

  const others = INDUSTRY_NAV.filter((i) => i.slug !== slug);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`industry-page-${slug}`}>
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO
        ============================================================ */}
        {slug === "restaurants" ? (
          <section className="relative overflow-hidden">
            <div className="grain absolute inset-0" />
            <div className="relative">
              {/* Copy block — top row */}
              <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-6 lg:pb-8">
                <div className="animate-fade-up">
                  <h1
                    className="font-serif-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.1] tracking-tight text-[#0A0A0A] lg:whitespace-nowrap"
                    data-testid="industry-heading"
                  >
                    {headlineLead}{" "}
                    <span className="italic" style={{ color: accent }}>
                      {headlineItalic}
                    </span>{" "}
                    {headlineTail}
                  </h1>

                  <div className="mt-4 grid lg:grid-cols-12 gap-6 items-start">
                    <p
                      className="lg:col-span-7 max-w-2xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75"
                      data-testid="industry-subhead"
                    >
                      {subhead}
                    </p>
                    <ul
                      className="lg:col-span-5 flex flex-wrap gap-x-4 gap-y-2"
                      data-testid="industry-capabilities"
                    >
                      {capabilities.map(({ icon: CapIcon, label }) => (
                        <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                          <span
                            className="h-6 w-6 shrink-0 rounded-md border grid place-items-center"
                            style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                          >
                            <CapIcon size={12} strokeWidth={1.75} />
                          </span>
                          <span>{label}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Full-width row: video (75%) + sidebar (25%) */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-4 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <div className="lg:col-span-3">
                  <IndustryVideo slug={slug} label={nav} accent={accent} tint={tint} variant="hero" />
                </div>
                <aside
                  className="lg:col-span-1 flex flex-col justify-between gap-6 px-6 lg:pl-8 lg:pr-10 py-6 lg:py-8 border-t lg:border-t-0 lg:border-l border-line bg-[#F9F6F0]"
                  data-testid="industry-hero-sidebar"
                >
                  <AiTrustRow />
                  <div className="flex flex-col gap-2.5">
                    <button
                      onClick={openDemo}
                      data-testid="industry-book-demo-button"
                      className="btn-primary justify-center w-full"
                    >
                      Book consultation <ArrowRight size={16} />
                    </button>
                    <a
                      href="#pains"
                      data-testid="industry-how-link"
                      className="btn-secondary justify-center w-full"
                    >
                      See what you get
                    </a>
                  </div>
                </aside>
              </div>

              {/* IndustryScene below */}
              <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-12 pb-10 lg:pb-14">
                <IndustryScene slug={slug} />
              </div>
            </div>
          </section>
        ) : (
          <section className="relative overflow-hidden">
            <div className="grain absolute inset-0" />
            <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-8 lg:pt-12 pb-12 lg:pb-20">
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-5 animate-fade-up">
                  <h1
                    className="font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight text-[#0A0A0A]"
                    data-testid="industry-heading"
                  >
                    {headlineLead}{" "}
                    <span className="italic" style={{ color: accent }}>
                      {headlineItalic}
                    </span>{" "}
                    {headlineTail}
                  </h1>

                  <p
                    className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75"
                    data-testid="industry-subhead"
                  >
                    {subhead}
                  </p>

                  <ul
                    className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 max-w-xl"
                    data-testid="industry-capabilities"
                  >
                    {capabilities.map(({ icon: CapIcon, label }) => (
                      <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                        <span
                          className="h-6 w-6 shrink-0 rounded-md border grid place-items-center"
                          style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                        >
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
                      data-testid="industry-book-demo-button"
                      className="btn-primary"
                    >
                      Book consultation <ArrowRight size={16} />
                    </button>
                    <a href="#pains" data-testid="industry-how-link" className="btn-secondary">
                      See what you get
                    </a>
                  </div>
                </div>

                <div
                  className="lg:col-span-7 animate-fade-up space-y-4"
                  style={{ animationDelay: "120ms" }}
                >
                  {hasIndustryVideo(slug) ? (
                    <IndustryVideo slug={slug} label={nav} accent={accent} tint={tint} />
                  ) : (
                    <IndustryArt slug={slug} accent={accent} tint={tint} label={nav} />
                  )}
                  <IndustryScene slug={slug} />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================
            PAINS
        ============================================================ */}
        <section
          id="pains"
          className="scroll-mt-20 border-t border-line bg-[#F5F0E8]"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: accent }}>
              Sound familiar?
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
              The month-end you know too well.
            </h2>
            <div className="mt-8 grid md:grid-cols-3 gap-3" data-testid="industry-pains">
              {pains.map((p, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-line bg-white p-5 animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <span className="h-8 w-8 rounded-full border border-line grid place-items-center text-[#0A0A0A]/40">
                    <X size={14} />
                  </span>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/75">{p}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 font-serif-display text-xl sm:text-2xl leading-snug tracking-tight max-w-3xl">
              FinBoard turns all of it into one workflow, for{" "}
              <span className="italic" style={{ color: accent }}>{nav.toLowerCase()}</span>.
            </p>
          </div>
        </section>

        {/* ============================================================
            FEATURES + METRICS
        ============================================================ */}
        <section className="border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="grid lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-7">
                <div
                  className="text-[10.5px] uppercase tracking-[0.22em]"
                  style={{ color: accent }}
                >
                  Built for {nav.toLowerCase()}
                </div>
                <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-2xl">
                  Finance tuned to how you actually operate.
                </h2>
              </div>
              <div className="lg:col-span-5 text-[13.5px] text-[#0A0A0A]/60 lg:text-right">
                Every capability sits on the same governed data as your ledgers — drillable from group down to line item.
              </div>
            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-3" data-testid="industry-features">
              {features.map(({ icon: FIcon, title, body }, i) => (
                <div
                  key={title}
                  className="card-white p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform animate-fade-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div
                    className="h-10 w-10 rounded-md border grid place-items-center"
                    style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                  >
                    <FIcon size={17} strokeWidth={1.75} />
                  </div>
                  <div className="font-serif-display text-lg leading-tight">{title}</div>
                  <p className="text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-6 rounded-2xl border border-line bg-white overflow-hidden"
              data-testid="industry-metrics"
            >
              <div className="grid grid-cols-3 divide-x divide-line">
                {metrics.map((m) => (
                  <div key={m.label} className="p-6 text-center">
                    <div className="font-serif-display text-xl sm:text-2xl tracking-tight">
                      {m.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">
                      {m.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            INTEGRATIONS + MODULES
        ============================================================ */}
        <section className="border-t border-line bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              Connects to your stack
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              The tools you already run.
            </h2>
            <div className="mt-6 flex flex-wrap gap-2" data-testid="industry-integrations">
              {integrations.map((name) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-2 rounded-full bg-white border border-line px-3 py-1.5 text-[12.5px] font-medium"
                >
                  <Plug size={12} className="text-[#0A0A0A]/50" /> {name}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-dashed border-[#0A0A0A]/20 px-3 py-1.5 text-[12.5px] text-[#0A0A0A]/60">
                + 100 more connectors
              </span>
            </div>

            <div className="mt-10 text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              Your full finance stack
            </div>
            <div
              className="mt-4 grid sm:grid-cols-2 lg:grid-cols-5 gap-3"
              data-testid="industry-modules"
            >
              {PRODUCT_NAV.map((p) => {
                const PIcon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    data-testid={`industry-module-${p.slug}`}
                    className="card-white p-4 hover:-translate-y-0.5 transition-transform group"
                  >
                    <span className="h-9 w-9 rounded-md border border-line bg-white grid place-items-center text-[#0A0A0A]">
                      <PIcon size={16} strokeWidth={1.75} />
                    </span>
                    <div className="mt-3 font-medium text-[13.5px]">{p.nav}</div>
                    <div className="text-[11.5px] text-[#0A0A0A]/55">{p.eyebrow}</div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            OTHER INDUSTRIES
        ============================================================ */}
        <section className="border-t border-line">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-16">
            <div className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              More industries
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              Tailored for your world too.
            </h2>
            <div
              className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3"
              data-testid="industry-cross-links"
            >
              {others.map((i) => {
                const OIcon = i.icon;
                return (
                  <Link
                    key={i.slug}
                    to={`/industries/${i.slug}`}
                    data-testid={`industry-cross-link-${i.slug}`}
                    className="card-white p-4 flex items-center gap-3 hover:-translate-y-0.5 transition-transform group"
                  >
                    <span className="h-9 w-9 rounded-md border border-line bg-white grid place-items-center shrink-0 text-[#0A0A0A]">
                      <OIcon size={16} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] truncate">{i.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55 truncate">{i.eyebrow}</div>
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
