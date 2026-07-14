import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

/**
 * Landing-page collage: 2x2 grid of industry videos with a centered FinBoard logo mark.
 * Sits between UseCases and ForwardDeployed on the landing page.
 */

const CELLS = [
  { slug: "restaurants",  label: "Restaurants",  accent: "#D97706", src: "/videos/collage/restaurants.mp4",  origin: "top left"     },
  { slug: "healthcare",   label: "Healthcare",   accent: "#0891B2", src: "/videos/collage/healthcare.mp4",   origin: "top right"    },
  { slug: "construction", label: "Construction", accent: "#B45309", src: "/videos/collage/construction.mp4", origin: "bottom left"  },
  { slug: "ecommerce",    label: "E-commerce",   accent: "#059669", src: "/videos/collage/ecommerce.mp4",    origin: "bottom right" },
];

export default function IndustryCollage() {
  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0A] text-white border-y border-white/10"
      data-testid="industry-collage"
    >
      {/* dot texture */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-6 mb-8 lg:mb-10">
          <div>
            <h2 className="font-serif-display text-3xl sm:text-4xl leading-[1.1] tracking-tight max-w-3xl">
              Real-time visibility into your <span className="italic text-white/85">business and operations</span>.
            </h2>
          </div>
          <p className="max-w-md text-[13.5px] leading-relaxed text-white/60">
            Accounting that improves Business and People performance.
          </p>
        </div>

        {/* Collage */}
        <div className="relative rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
          {/* 2x2 grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-0 aspect-[16/9] bg-[#0A0A0A]">
            {CELLS.map((c) => (
              <CollageCell key={c.slug} {...c} />
            ))}
          </div>

          {/* Center logo badge */}
          <div className="absolute inset-0 grid place-items-center pointer-events-none">
            <Link
              to="/"
              data-testid="collage-logo"
              className="pointer-events-auto group relative flex items-center gap-3 rounded-full bg-white text-[#0A0A0A] pl-2 pr-5 py-2 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] ring-1 ring-black/5 hover:-translate-y-0.5 transition-transform"
              aria-label="FinBoard - home"
            >
              <img
                src="/brand/finboard-mark-dark.png"
                alt=""
                className="h-10 w-10 rounded-full select-none"
                draggable="false"
              />
              <span className="font-serif-display text-[22px] leading-none tracking-tight">
                FinBoard
              </span>
            </Link>
          </div>

          {/* Cross-hair dividers to emphasise the quadrant meeting point */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-white/25 mix-blend-overlay pointer-events-none" aria-hidden />
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/25 mix-blend-overlay pointer-events-none" aria-hidden />
        </div>

        {/* Small footer row */}
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {CELLS.map((c) => (
            <Link
              key={c.slug}
              to={`/industries/${c.slug}`}
              data-testid={`collage-link-${c.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full" style={{ background: c.accent }} />
                <span className="text-[13px] font-medium">{c.label}</span>
              </div>
              <ArrowUpRight
                size={14}
                className="text-white/50 group-hover:text-white transition-colors"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function CollageCell({ slug, label, accent, src, origin }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  }, []);

  // Position the label away from the center so it doesn't collide with the logo
  const labelPos = {
    "top left":     "top-4 left-4",
    "top right":    "top-4 right-4",
    "bottom left":  "bottom-4 left-4",
    "bottom right": "bottom-4 right-4",
  }[origin];

  return (
    <Link
      to={`/industries/${slug}`}
      data-testid={`collage-cell-${slug}`}
      className="relative block overflow-hidden group focus:outline-none"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
        onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
        aria-label={`${label} industry preview`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {/* Vignette so the center logo has contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.15) 100%)",
        }}
        aria-hidden
      />

      {/* Industry label pill */}
      <div className={`absolute ${labelPos} pointer-events-none`}>
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-semibold uppercase tracking-[0.18em] backdrop-blur bg-black/40 border-white/20 text-white"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {label}
        </span>
      </div>
    </Link>
  );
}
