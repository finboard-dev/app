import React from "react";
import { Hexagon, Triangle, Circle, Square, Diamond, Aperture } from "lucide-react";

const logos = [
  { icon: Hexagon, name: "Hexon Group" },
  { icon: Triangle, name: "Northwind Holdings" },
  { icon: Circle, name: "Orbital Health" },
  { icon: Square, name: "Meridian Retail" },
  { icon: Diamond, name: "Sable Ventures" },
  { icon: Aperture, name: "Lumen Foods" },
];

export default function TrustBar() {
  const items = [...logos, ...logos];
  return (
    <section
      data-testid="trust-bar"
      className="border-y border-line bg-[#F5F0E8]"
      aria-label="Trusted by finance teams"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50 whitespace-nowrap">
          Trusted by finance teams at
        </div>
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {items.map((L, i) => {
              const Icon = L.icon;
              return (
                <div key={i} className="flex items-center gap-2 text-[#0A0A0A]/60">
                  <Icon size={16} strokeWidth={1.5} />
                  <span className="font-serif-display text-[17px] tracking-tight">{L.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
