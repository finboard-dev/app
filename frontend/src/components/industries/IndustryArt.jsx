import React from "react";

/**
 * Bespoke, recognisable illustration per industry, the "instant connection"
 * visual. Flat, iconographic SVG themed with the industry accent, sitting on a
 * tinted banner. Paired with the data dashboard (IndustryScene) below it.
 */

const INK = "#0A0A0A";
const SAND = "#F5F0E8";
const LINE = "#E5E0D8";

/* ---------- Restaurants: covered dish + cutlery ---------- */
function RestaurantArt({ accent }) {
  return (
    <svg viewBox="0 0 340 190" className="w-[86%] max-w-[320px]">
      {/* steam */}
      <path d="M158 46 q-9 -13 0 -26" stroke={accent} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M182 46 q9 -13 0 -26" stroke={accent} strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* fork */}
      <g stroke={INK} strokeWidth="4" strokeLinecap="round">
        <line x1="60" y1="70" x2="60" y2="150" />
        <line x1="52" y1="70" x2="52" y2="96" />
        <line x1="68" y1="70" x2="68" y2="96" />
      </g>
      <rect x="50" y="92" width="20" height="8" rx="4" fill={INK} />
      {/* knife */}
      <line x1="284" y1="70" x2="284" y2="150" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      <path d="M284 70 q14 6 0 40 z" fill={INK} />
      {/* cloche knob */}
      <circle cx="170" cy="52" r="6" fill={accent} />
      <rect x="167" y="56" width="6" height="10" fill={accent} />
      {/* dome */}
      <path d="M118 108 a52 52 0 0 1 104 0 Z" fill={accent} />
      <path d="M118 108 a52 52 0 0 1 104 0" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="6" />
      {/* dome base */}
      <rect x="110" y="106" width="120" height="9" rx="4.5" fill={INK} />
      {/* plate */}
      <ellipse cx="170" cy="150" rx="92" ry="20" fill={INK} opacity="0.06" />
      <ellipse cx="170" cy="142" rx="80" ry="17" fill="#fff" stroke={LINE} strokeWidth="2" />
      <ellipse cx="170" cy="142" rx="52" ry="10" fill="none" stroke={accent} strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

/* ---------- Construction: tower crane + building + hard hat ---------- */
function ConstructionArt({ accent }) {
  return (
    <svg viewBox="0 0 340 190" className="w-[90%] max-w-[330px]">
      {/* ground */}
      <rect x="24" y="160" width="292" height="4" rx="2" fill={LINE} />
      {/* building under construction */}
      <rect x="40" y="96" width="86" height="64" rx="3" fill={SAND} stroke={LINE} strokeWidth="2" />
      <line x1="40" y1="118" x2="126" y2="118" stroke={LINE} strokeWidth="2" />
      <line x1="40" y1="140" x2="126" y2="140" stroke={LINE} strokeWidth="2" />
      <rect x="52" y="104" width="16" height="10" fill={accent} opacity="0.9" />
      <rect x="98" y="126" width="16" height="10" fill={accent} opacity="0.5" />
      {/* crane mast */}
      <rect x="176" y="46" width="8" height="114" fill={INK} />
      <path d="M176 60 l8 8 M184 60 l-8 8 M176 90 l8 8 M184 90 l-8 8 M176 120 l8 8 M184 120 l-8 8" stroke="#fff" strokeOpacity="0.4" strokeWidth="1.5" />
      {/* jib + counter-jib */}
      <rect x="184" y="46" width="120" height="8" fill={accent} />
      <rect x="140" y="46" width="44" height="8" fill={accent} />
      <rect x="150" y="40" width="6" height="14" fill={INK} />
      {/* cab */}
      <rect x="172" y="54" width="16" height="14" rx="2" fill={INK} />
      {/* cable + hook + load */}
      <line x1="272" y1="54" x2="272" y2="96" stroke={INK} strokeWidth="2" />
      <rect x="260" y="96" width="24" height="16" rx="2" fill={accent} />
      {/* hard hat */}
      <path d="M232 150 a26 22 0 0 1 52 0 Z" fill={accent} />
      <rect x="228" y="148" width="60" height="8" rx="4" fill={INK} />
      <rect x="252" y="132" width="12" height="10" rx="2" fill={accent} />
    </svg>
  );
}

/* ---------- Retail: storefront with awning + shopping bag ---------- */
function RetailArt({ accent }) {
  const stripes = [0, 1, 2, 3, 4, 5, 6];
  return (
    <svg viewBox="0 0 340 190" className="w-[88%] max-w-[320px]">
      {/* building */}
      <rect x="66" y="74" width="208" height="90" rx="4" fill={SAND} stroke={LINE} strokeWidth="2" />
      {/* sign board */}
      <rect x="66" y="62" width="208" height="14" rx="3" fill={INK} />
      {/* awning */}
      {stripes.map((i) => (
        <path
          key={i}
          d={`M${66 + i * 29.7} 76 h29.7 l-6 20 h-29.7 z`}
          fill={i % 2 === 0 ? accent : "#fff"}
          stroke={LINE}
          strokeWidth="1"
        />
      ))}
      <rect x="60" y="94" width="222" height="6" rx="3" fill={accent} opacity="0.35" />
      {/* windows */}
      <rect x="82" y="112" width="52" height="40" rx="2" fill="#fff" stroke={LINE} strokeWidth="2" />
      <rect x="146" y="112" width="46" height="52" rx="2" fill="#fff" stroke={LINE} strokeWidth="2" />
      <line x1="169" y1="112" x2="169" y2="164" stroke={LINE} strokeWidth="2" />
      <rect x="204" y="112" width="52" height="40" rx="2" fill="#fff" stroke={LINE} strokeWidth="2" />
      {/* shopping bag */}
      <rect x="238" y="120" width="46" height="48" rx="4" fill={accent} />
      <path d="M250 120 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="#fff" strokeWidth="3" />
      <rect x="238" y="120" width="46" height="48" rx="4" fill="#fff" opacity="0.08" />
    </svg>
  );
}

/* ---------- E-commerce: shipping box + cart + motion ---------- */
function EcommerceArt({ accent }) {
  return (
    <svg viewBox="0 0 340 190" className="w-[86%] max-w-[320px]">
      {/* motion lines */}
      <g stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.4">
        <line x1="26" y1="96" x2="58" y2="96" />
        <line x1="20" y1="116" x2="52" y2="116" />
        <line x1="30" y1="136" x2="58" y2="136" />
      </g>
      {/* box */}
      <path d="M96 92 l64 -22 64 22 v56 l-64 22 -64 -22 z" fill={SAND} stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M96 92 l64 22 64 -22" fill="none" stroke={LINE} strokeWidth="2" strokeLinejoin="round" />
      <line x1="160" y1="114" x2="160" y2="192" stroke={LINE} strokeWidth="2" />
      {/* tape */}
      <path d="M128 81 l64 22" stroke={accent} strokeWidth="10" opacity="0.85" />
      <rect x="150" y="70" width="20" height="18" rx="2" fill={accent} opacity="0.85" />
      {/* cart */}
      <g stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M250 96 h10 l10 44 h34 l12 -32 h-52" />
      </g>
      <circle cx="274" cy="150" r="6" fill={INK} />
      <circle cx="300" cy="150" r="6" fill={INK} />
      <path d="M272 108 h34" stroke={accent} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Healthcare: cross badge + heartbeat ---------- */
function HealthcareArt({ accent }) {
  return (
    <svg viewBox="0 0 340 190" className="w-[88%] max-w-[320px]">
      {/* clinic building hint */}
      <rect x="44" y="86" width="60" height="74" rx="4" fill={SAND} stroke={LINE} strokeWidth="2" />
      <rect x="56" y="98" width="14" height="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <rect x="78" y="98" width="14" height="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <rect x="56" y="120" width="14" height="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      <rect x="78" y="120" width="14" height="12" fill="#fff" stroke={LINE} strokeWidth="1.5" />
      {/* cross badge */}
      <rect x="170" y="44" width="92" height="92" rx="20" fill={accent} />
      <rect x="170" y="44" width="92" height="92" rx="20" fill="#fff" opacity="0.08" />
      <path d="M208 66 h16 v18 h18 v16 h-18 v18 h-16 v-18 h-18 v-16 h18 z" fill="#fff" />
      {/* heartbeat baseline */}
      <path
        d="M28 158 H150 l12 -26 l16 46 l14 -66 l16 46 H320"
        fill="none"
        stroke={accent}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const ARTS = {
  restaurants: RestaurantArt,
  construction: ConstructionArt,
  retail: RetailArt,
  ecommerce: EcommerceArt,
  healthcare: HealthcareArt,
};

export default function IndustryArt({ slug, accent, tint, label }) {
  const Art = ARTS[slug];
  if (!Art) return null;
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div
        className="relative flex items-center justify-center h-56"
        style={{ background: `radial-gradient(120% 120% at 50% 0%, ${tint} 0%, #FFFFFF 78%)` }}
      >
        <div className="grain absolute inset-0" />
        {label && (
          <span
            className="absolute top-3 left-4 text-[10px] uppercase tracking-[0.18em] font-medium"
            style={{ color: accent }}
          >
            {label}
          </span>
        )}
        <span
          className="absolute top-3 right-4 inline-flex items-center gap-1.5 text-[10px] text-[#0A0A0A]/50 bg-white/70 border border-line rounded-full px-2 py-0.5"
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> FinBoard
        </span>
        <Art accent={accent} />
      </div>
    </div>
  );
}
