import React from "react";
import { LogoMark } from "@/components/landing/ClientLogos";

const logos = [
  { name: "Old World Coffee", src: "/logos/old-world-coffee.svg" },
  { name: "Three Wide Brewing", src: "/logos/three-wide-brewing.svg" },
  { name: "TreeHouse Health", src: null },
  { name: "Kindbridge Behavioral Health", src: "/logos/kindbridge.webp" },
  { name: "AVL Growth Partners", src: "/logos/avl-growth.webp" },
  { name: "Parker Clay", src: "/logos/parker-clay.png" },
  { name: "SPRCHRGR", src: "/logos/sprchrgr.svg" },
  { name: "VAAS CPA", src: "/logos/vaas-cpa.png" },
];

export default function TrustBar() {
  const items = [...logos, ...logos];
  return (
    <section
      data-testid="trust-bar"
      className="border-y border-line bg-[#F5F0E8]"
      aria-label="Trusted by finance teams"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50 whitespace-nowrap">
          Trusted by finance teams at
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex items-center gap-14 animate-marquee whitespace-nowrap">
            {items.map((l, i) => (
              <div key={`${l.name}-${i}`} className="flex items-center shrink-0" title={l.name}>
                <LogoMark {...l} imgClass="h-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
