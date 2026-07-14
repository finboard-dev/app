import React from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { ArrowRight, X, Plug, Check, FileCheck, UserCheck, Eye, Route } from "lucide-react";
import Seo, { breadcrumbs } from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import IndustryScene, { hasIndustryScene } from "@/components/industries/IndustryScene";
import RestaurantReporting from "@/components/industries/RestaurantReporting";
import RestaurantStack from "@/components/industries/RestaurantStack";
import IndustryDeepDive from "@/components/industries/IndustryDeepDive";
import IndustryStack from "@/components/industries/IndustryStack";
import IndustryArt from "@/components/industries/IndustryArt";
import IndustryVideo, { hasIndustryVideo } from "@/components/industries/IndustryVideo";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { INDUSTRIES_BY_SLUG, INDUSTRY_NAV } from "@/data/industries";
import { DEEP_DIVE } from "@/data/industryDeepDive";
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
  const deepDive = DEEP_DIVE[slug];
  const isCustom = slug === "restaurants" || !!deepDive;

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`industry-page-${slug}`}>
      <Seo
        title={`Finance Software for ${nav} | FinBoard`}
        description={industry.metaDescription || subhead}
        path={`/industries/${slug}`}
        jsonLd={breadcrumbs([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/" },
          { name: nav, path: `/industries/${slug}` },
        ])}
      />
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO
        ============================================================ */}
        {hasIndustryVideo(slug) ? (
          <section
            className="relative overflow-hidden bg-[#0A0A0A] text-white flex flex-col"
            style={{ minHeight: "calc(100vh - 68px)" }}
          >
            {/* subtle dot texture for the whole hero */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
              aria-hidden
            />

            {/* Title strip - top, dark */}
            <div className="relative shrink-0">
              <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-6 lg:pt-10 pb-4 lg:pb-6">
                <h1
                  className="animate-fade-up font-serif-display text-2xl sm:text-3xl lg:text-[2.4rem] leading-[1.1] tracking-tight text-white lg:whitespace-nowrap"
                  data-testid="industry-heading"
                >
                  {headlineLead}{" "}
                  <span className="italic" style={{ color: accent }}>
                    {headlineItalic}
                  </span>{" "}
                  {headlineTail}
                </h1>
              </div>
            </div>

            {/* Video row - fills remaining vertical space */}
            <div
              className="relative w-full grid grid-cols-1 lg:grid-cols-4 items-stretch flex-1 min-h-[520px] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <div className="lg:col-span-3 relative">
                <IndustryVideo slug={slug} label={nav} accent={accent} tint={tint} variant="hero" fill />
              </div>

              {/* Dark contrast sidebar */}
              <aside
                className="lg:col-span-1 relative flex flex-col justify-between gap-6 px-6 lg:pl-8 lg:pr-10 py-6 lg:py-10 bg-[#0A0A0A] text-white overflow-hidden border-t lg:border-t-0 lg:border-l border-white/10"
                data-testid="industry-hero-sidebar"
              >
                {/* Capabilities */}
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/50">
                    What you get
                  </div>
                  <ul
                    className="mt-3 flex flex-col gap-2.5"
                    data-testid="industry-capabilities"
                  >
                    {capabilities.map(({ icon: CapIcon, label }) => (
                      <li key={label} className="flex items-center gap-2.5 text-[13.5px] text-white/90">
                        <span
                          className="h-6 w-6 shrink-0 rounded-md grid place-items-center"
                          style={{ backgroundColor: `${accent}22`, color: accent }}
                        >
                          <CapIcon size={12} strokeWidth={2} />
                        </span>
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* AI trust row (dark variant) */}
                <div className="relative">
                  <div className="inline-flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.18em] font-semibold text-white/50">
                    Enterprise-safe AI
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-1.5" data-testid="ai-trust-row">
                    {[
                      { icon: FileCheck, l: "Auditable", c: "#3B82F6" },
                      { icon: UserCheck, l: "Human approval", c: "#10B981" },
                      { icon: Eye, l: "Explainable", c: "#F59E0B" },
                      { icon: Route, l: "Fully traceable", c: "#8B5CF6" },
                    ].map(({ icon: Icon, l, c }) => (
                      <span
                        key={l}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] pl-1 pr-2 py-1 text-[11px] text-white/85"
                      >
                        <span
                          className="h-4 w-4 shrink-0 rounded-full grid place-items-center"
                          style={{ backgroundColor: c, color: "#fff" }}
                        >
                          <Icon size={9} strokeWidth={2.5} />
                        </span>
                        {l}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTAs */}
                <div className="relative flex flex-col gap-2.5">
                  <button
                    onClick={openDemo}
                    data-testid="industry-book-demo-button"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-[#0A0A0A] px-4 py-3 text-[14px] font-medium hover:bg-white/90 transition-colors w-full"
                  >
                    Book consultation <ArrowRight size={15} />
                  </button>
                  <a
                    href="#pains"
                    data-testid="industry-how-link"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-transparent text-white px-4 py-3 text-[14px] font-medium hover:bg-white/10 transition-colors w-full"
                  >
                    See what you get
                  </a>
                </div>
              </aside>
            </div>
          </section>
        ) : null}

        {/* Restaurants-only: finance problems + reporting standards, directly below the hero video */}
        {slug === "restaurants" && (
          <RestaurantReporting accent={accent} tint={tint} />
        )}

        {/* IndustryScene supporting card (video industries with a scene, below viewport hero).
            Restaurants render this inside RestaurantReporting's "Reporting standards" section. */}
        {hasIndustryVideo(slug) && hasIndustryScene(slug) && slug !== "restaurants" && (
          <section className="border-t border-line">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
              <IndustryScene slug={slug} />
            </div>
          </section>
        )}

        {!hasIndustryVideo(slug) && (
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

        {/* Deep-dive industries: research-backed pains + reporting standards (mirrors restaurants) */}
        {deepDive && (
          <IndustryDeepDive accent={accent} tint={tint} nav={nav} data={deepDive} />
        )}

        {/* PAINS + FEATURES/METRICS - hidden on custom deep-dive industries */}
        {!isCustom && (
          <>
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
                Every capability sits on the same governed data as your ledgers - drillable from group down to line item.
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
          </>
        )}

        {/* INTEGRATIONS + MODULES + OTHER INDUSTRIES - custom industries use their own Stack instead */}
        {!isCustom && (
          <>
        <section className="border-t border-line bg-[#F5F0E8]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
            <div className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: accent }}>
              Connects to your stack
            </div>
            <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
              The tools you already run.
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-[#0A0A0A]/60 max-w-xl">
              Two-way sync with the systems you run today - no rip-and-replace, no migration project.
            </p>
            <div
              className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
              data-testid="industry-integrations"
            >
              {integrations.map((name, i) => {
                const parts = name.trim().split(/\s+/).filter(Boolean);
                const mono = (parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0][0]).toUpperCase();
                return (
                  <div
                    key={name}
                    className="group card-white p-3.5 flex items-center gap-3 hover:-translate-y-0.5 hover:border-line-strong transition-all animate-fade-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <span className="h-10 w-10 shrink-0 rounded-lg border border-line bg-[#F9F6F0] grid place-items-center font-serif-display text-[15px] text-[#0A0A0A]/70 group-hover:text-[#0A0A0A] transition-colors">
                      {mono}
                    </span>
                    <span className="flex-1 min-w-0 text-[13.5px] font-medium truncate">{name}</span>
                    <Check size={14} className="shrink-0 text-emerald-600/80" />
                  </div>
                );
              })}
              <div className="rounded-xl border border-dashed border-[#0A0A0A]/20 bg-white/40 p-3.5 flex items-center gap-3">
                <span className="h-10 w-10 shrink-0 rounded-lg border border-dashed border-[#0A0A0A]/25 grid place-items-center text-[#0A0A0A]/45">
                  <Plug size={16} />
                </span>
                <div className="min-w-0 leading-tight">
                  <div className="text-[13.5px] font-medium text-[#0A0A0A]/70">+100 connectors</div>
                  <div className="text-[11px] text-[#0A0A0A]/45">and counting</div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">
              Your full finance stack
            </div>
            <div
              className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
              data-testid="industry-modules"
            >
              {PRODUCT_NAV.map((p) => {
                const PIcon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    to={`/products/${p.slug}`}
                    data-testid={`industry-module-${p.slug}`}
                    className="group card-white p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:border-line-strong transition-all"
                  >
                    <span
                      className="h-10 w-10 shrink-0 rounded-lg border grid place-items-center"
                      style={{ backgroundColor: `${p.accent}e6`, borderColor: `${p.accent}3d`, color: "#fff" }}
                    >
                      <PIcon size={17} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] truncate">{p.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55 truncate">{p.eyebrow}</div>
                    </div>
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#0A0A0A]/25 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all"
                    />
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
            <div className="text-[10.5px] uppercase tracking-[0.22em]" style={{ color: accent }}>
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
                    className="group card-white p-4 flex items-center gap-3 hover:-translate-y-0.5 hover:border-line-strong transition-all"
                  >
                    <span
                      className="h-10 w-10 rounded-lg border grid place-items-center shrink-0"
                      style={{ backgroundColor: `${i.accent}e6`, borderColor: `${i.accent}3d`, color: "#fff" }}
                    >
                      <OIcon size={17} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-[13.5px] truncate">{i.nav}</div>
                      <div className="text-[11.5px] text-[#0A0A0A]/55 truncate">{i.eyebrow}</div>
                    </div>
                    <ArrowRight
                      size={15}
                      className="shrink-0 text-[#0A0A0A]/30 group-hover:text-[#0A0A0A] group-hover:translate-x-0.5 transition-all"
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
          </>
        )}

        {slug === "restaurants" && (
          <RestaurantStack accent={accent} integrations={integrations} others={others} />
        )}

        {deepDive && (
          <IndustryStack
            accent={accent}
            nav={nav}
            connectors={deepDive.stack.connectors}
            others={others}
            stackSubhead={deepDive.stack.subhead}
            beyondSubhead={deepDive.stack.beyondSubhead}
          />
        )}

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
