import React from "react";

/**
 * Per-industry hero videos. Auto-play, muted, loop for hero background use.
 * Mapping is done by slug so it aligns 1:1 with industries.js.
 */
const INDUSTRY_VIDEOS = {
  healthcare: "/videos/healthcare.mp4",
  construction: "/videos/construction.mp4",
  ecommerce: "/videos/ecommerce.mp4",
  restaurants: "/videos/restaurants.mp4",
  "software-and-services": "/videos/software-and-services.mp4",
};

export function hasIndustryVideo(slug) {
  return Boolean(INDUSTRY_VIDEOS[slug]);
}

export default function IndustryVideo({ slug, label, accent, tint, variant = "card", fill = false }) {
  const src = INDUSTRY_VIDEOS[slug];
  const videoRef = React.useRef(null);

  // Re-mount and re-play whenever the slug changes.
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.load();
    const play = () => v.play().catch(() => {});
    play();
  }, [slug]);

  if (!src) return null;

  const isHero = variant === "hero";

  return (
    <div
      data-testid={`industry-video-${slug}`}
      className={
        isHero
          ? `relative overflow-hidden bg-[#0A0A0A] ${fill ? "h-full min-h-[420px]" : ""}`
          : "card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
      }
    >
      {/* Chrome bar (only for card variant) */}
      {!isHero && (
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-line bg-[#F5F0E8]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
          <div className="ml-3 text-[11px] font-mono text-[#0A0A0A]/50 truncate">
            finboard.app / {slug}
          </div>
          <div className="ml-auto shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white border border-line inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </div>
        </div>
      )}

      {/* Video */}
      <div
        className={`relative bg-[#0A0A0A] ${fill ? "h-full" : ""}`}
        style={fill ? undefined : { aspectRatio: isHero ? "21 / 9" : "16 / 10" }}
      >
        <video
          ref={videoRef}
          key={src}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          aria-label={`${label || slug} industry preview`}
          onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
          onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
        >
          <source src={src} type="video/mp4" />
        </video>
        {/* Soft gradient overlay for readability */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))",
          }}
          aria-hidden
        />
        {/* Industry pill */}
        {label && (
          <div className={isHero ? "absolute bottom-5 left-6 lg:left-10" : "absolute bottom-3 left-3"}>
            <span
              className={
                isHero
                  ? "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] backdrop-blur"
                  : "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em] backdrop-blur"
              }
              style={{
                background: tint ? `${tint}CC` : "rgba(255,255,255,0.85)",
                borderColor: accent ? `${accent}55` : "rgba(10,10,10,0.15)",
                color: accent || "#0A0A0A",
              }}
            >
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
