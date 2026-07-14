import React from "react";

/**
 * Client-logo strip used on the For Operators and For Firms pages.
 * Real customer logos (public/logos/), rendered as uniform dark marks
 * so mixed brand colors sit quietly on the sand background.
 * TreeHouse Health has no usable logo asset, so it renders as a wordmark.
 */

export const CLIENT_LOGOS = {
  operators: {
    label: "The operators that run on FinBoard",
    logos: [
      { name: "Old World Coffee", src: "/logos/old-world-coffee.svg" },
      { name: "Three Wide Brewing", src: "/logos/three-wide-brewing.svg" },
      { name: "Kindbridge Behavioral Health", src: "/logos/kindbridge.webp" },
      { name: "Parker Clay", src: "/logos/parker-clay.png" },
      { name: "TreeHouse Health", src: null },
    ],
  },
  firms: {
    label: "The advisory firms that scale their practice on FinBoard",
    logos: [
      { name: "AVL Growth Partners", src: "/logos/avl-growth.webp" },
      { name: "SPRCHRGR", src: "/logos/sprchrgr.svg" },
      { name: "VAAS CPA", src: "/logos/vaas-cpa.png" },
    ],
  },
};

export function LogoMark({ name, src, imgClass = "h-7" }) {
  if (!src) {
    return (
      <span className="font-serif-display text-[17px] leading-none tracking-tight whitespace-nowrap text-[#0A0A0A]/70">
        {name}
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      className={`${imgClass} w-auto max-w-[150px] object-contain select-none`}
      style={{ filter: "brightness(0)", opacity: 0.62 }}
      draggable="false"
    />
  );
}

export default function ClientLogos({ variant = "operators", testid = "client-logos" }) {
  const set = CLIENT_LOGOS[variant] || CLIENT_LOGOS.operators;
  return (
    <section
      data-testid={testid}
      className="max-w-7xl mx-auto px-6 lg:px-10 pt-14 lg:pt-20"
      aria-label={set.label}
    >
      <div className="rounded-2xl border border-line bg-white px-6 lg:px-10 py-8 lg:py-10">
        <div className="text-center text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">
          {set.label}
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-7">
          {set.logos.map((l) => (
            <div key={l.name} className="flex items-center justify-center" title={l.name}>
              <LogoMark {...l} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
