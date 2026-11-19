import React from "react";

// Sample company: month-end cash ($M) from May to Oct 2026, burning $158K a month.
const ACTUAL = [3.68, 3.51, 3.34, 3.16, 3.0, 2.84];
const BURN = 0.158;
const MONTHS_LEFT = 18;

const W = 600;
const H = 170;
const TOP = 14;
const BOTTOM = 26;
const MAX = 4;

const x = (i) => (i / (ACTUAL.length - 1 + MONTHS_LEFT)) * (W - 8) + 4;
const y = (v) => TOP + (1 - v / MAX) * (H - TOP - BOTTOM);
const toPath = (pts) => pts.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)},${py.toFixed(1)}`).join(" ");

/** Cash balance with the projected cash-out date at the current burn (sample data). */
export default function RunwayChart() {
  const gradientId = React.useId();
  const last = ACTUAL.length - 1;
  const end = last + MONTHS_LEFT;
  const actual = ACTUAL.map((v, i) => [x(i), y(v)]);
  const projected = Array.from({ length: MONTHS_LEFT + 1 }, (_, k) => [x(last + k), y(Math.max(0, ACTUAL[last] - BURN * k))]);
  const area = `${toPath(actual)} L${x(last)},${y(0)} L${x(0)},${y(0)} Z`;
  const label = { fontSize: 11, fill: "rgba(10,10,10,.45)" };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="Sample cash balance, projected to run out in April 2028 at the current burn">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2563EB" stopOpacity=".2" />
          <stop offset="1" stopColor="#2563EB" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[1, 2, 3].map((v) => (
        <line key={v} x1="0" x2={W} y1={y(v)} y2={y(v)} stroke="#E5E0D8" strokeDasharray="3 5" />
      ))}
      <line x1="0" x2={W} y1={y(0)} y2={y(0)} stroke="#D8D2C4" />
      <path d={area} fill={`url(#${gradientId})`} />
      <path d={toPath(projected)} fill="none" stroke="#2563EB" strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 6" />
      <path d={toPath(actual)} fill="none" stroke="#2563EB" strokeWidth="2.75" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={x(last)} cy={y(ACTUAL[last])} r="5" fill="#fff" stroke="#2563EB" strokeWidth="2.75" />
      <circle cx={x(end)} cy={y(0)} r="5" fill="#E11D48" />
      <text x={x(0)} y={H - 6} style={label}>May &apos;26</text>
      <text x={x(last)} y={H - 6} textAnchor="middle" style={label}>Oct &apos;26</text>
      <text x={x(end)} y={H - 6} textAnchor="end" style={label}>Apr &apos;28</text>
    </svg>
  );
}
