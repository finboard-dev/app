import React from "react";

/**
 * Bespoke, industry-specific app mockups for the industry hero.
 * Each scene shows the numbers a finance lead in that trade lives in,  * so it reads as "built for me" at a glance. Same monochrome + subtle
 * semantic-colour language as the rest of the site.
 */

function Frame({ slug, title, right, children }) {
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-4 text-[11px] text-[#0A0A0A]/50">finboard.app / {slug}</div>
        <div className="ml-auto text-[10px] px-2 py-1 rounded-full bg-white border border-line">Live</div>
      </div>
      <div className="bg-white">
        <div className="flex items-center justify-between px-4 pt-3">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">{title}</div>
          {right && <div className="text-[10px] text-[#0A0A0A]/50">{right}</div>}
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Restaurants: prime cost by location ---------- */
function RestaurantsScene() {
  const rows = [
    { loc: "Manhattan",   sales: "184.2k", food: 29, labor: 31, prime: 60 },
    { loc: "Brooklyn",    sales: "142.6k", food: 31, labor: 30, prime: 61 },
    { loc: "Queens",      sales: "118.1k", food: 28, labor: 29, prime: 57 },
    { loc: "Long Island", sales: "96.4k",  food: 30, labor: 31, prime: 61 },
    { loc: "Newark",      sales: "72.3k",  food: 33, labor: 32, prime: 65 },
  ];
  const primeColor = (v) => (v <= 60 ? "text-emerald-700" : v <= 63 ? "text-amber-700" : "text-rose-700");
  const cols = "grid-cols-[1.4fr_0.9fr_0.55fr_0.55fr_0.65fr]";
  return (
    <Frame slug="restaurants" title="Locations · March MTD" right="Prime cost focus">
      <div className="px-4 pb-4 pt-2">
        <div className={`grid ${cols} px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line`}>
          <div>Location</div><div className="text-right">Net sales</div><div className="text-right">Food</div><div className="text-right">Labor</div><div className="text-right">Prime</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.loc} className={`grid ${cols} items-center px-2 py-2 border-b border-line last:border-0 text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-medium truncate">{r.loc}</div>
            <div className="text-right tabular-nums">${r.sales}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.food}%</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.labor}%</div>
            <div className={`text-right tabular-nums font-medium ${primeColor(r.prime)}`}>{r.prime}%</div>
          </div>
        ))}
        <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5">
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-[#0A0A0A]/60">Group prime cost</span>
            <span className="font-medium">60.8% <span className="text-[#0A0A0A]/40">· target 60%</span></span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-[#EFE9DE] overflow-hidden relative">
            <div className="absolute inset-y-0 left-0 bg-amber-500 rounded-full" style={{ width: "60.8%" }} />
            <div className="absolute inset-y-0 w-px bg-[#0A0A0A]/70" style={{ left: "60%" }} />
          </div>
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Construction: WIP schedule ---------- */
function ConstructionScene() {
  const rows = [
    { job: "Riverside Plaza",  comp: 72, billed: "3.10M", earned: "3.02M", ou: "+80k",  over: true },
    { job: "Metro Transit Hub",comp: 45, billed: "2.90M", earned: "3.06M", ou: "−160k", over: false },
    { job: "Oakwood Medical",  comp: 88, billed: "1.90M", earned: "1.85M", ou: "+50k",  over: true },
    { job: "Harbor Logistics", comp: 30, billed: "0.95M", earned: "1.02M", ou: "−70k",  over: false },
  ];
  const cols = "grid-cols-[1.5fr_1fr_0.8fr_0.8fr_0.8fr]";
  return (
    <Frame slug="construction" title="WIP schedule · Q1" right="Reconciled to GL">
      <div className="px-4 pb-4 pt-2">
        <div className={`grid ${cols} px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line`}>
          <div>Job</div><div>% complete</div><div className="text-right">Billed</div><div className="text-right">Earned</div><div className="text-right">Over/Under</div>
        </div>
        {rows.map((r, i) => (
          <div key={r.job} className={`grid ${cols} items-center px-2 py-2 border-b border-line last:border-0 text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-medium truncate">{r.job}</div>
            <div className="flex items-center gap-1.5 pr-2">
              <div className="flex-1 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden"><div className="h-full bg-[#0A0A0A]" style={{ width: `${r.comp}%` }} /></div>
              <span className="text-[10px] tabular-nums text-[#0A0A0A]/60 w-6 text-right">{r.comp}%</span>
            </div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">${r.billed}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">${r.earned}</div>
            <div className={`text-right tabular-nums font-medium ${r.over ? "text-amber-700" : "text-[#2563EB]"}`}>{r.ou}</div>
          </div>
        ))}
        <div className="mt-3 flex items-center gap-2 text-[10px] text-[#0A0A0A]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Net under-billed $100k · WIP ties to the GL
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Retail: store comps + category margin ---------- */
function RetailScene() {
  const stores = [
    { s: "Flagship · SoHo", comp: "+6.2%", up: true,  gm: 52, turns: "5.4×" },
    { s: "Westfield",       comp: "+2.1%", up: true,  gm: 48, turns: "4.8×" },
    { s: "Riverside Mall",  comp: "−1.4%", up: false, gm: 44, turns: "3.9×" },
    { s: "Airport",         comp: "+9.8%", up: true,  gm: 57, turns: "6.1×" },
  ];
  const cats = [{ l: "Accessories", v: 61 }, { l: "Apparel", v: 54 }, { l: "Footwear", v: 49 }, { l: "Home", v: 42 }];
  const cols = "grid-cols-[1.4fr_0.8fr_0.7fr_0.6fr]";
  return (
    <Frame slug="retail" title="Stores · comp sales" right="MTD">
      <div className="px-4 pb-4 pt-2">
        <div className={`grid ${cols} px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line`}>
          <div>Store</div><div className="text-right">Comp</div><div className="text-right">Margin</div><div className="text-right">Turns</div>
        </div>
        {stores.map((r, i) => (
          <div key={r.s} className={`grid ${cols} items-center px-2 py-2 border-b border-line text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-medium truncate">{r.s}</div>
            <div className={`text-right tabular-nums font-medium ${r.up ? "text-emerald-700" : "text-rose-700"}`}>{r.comp}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.gm}%</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.turns}</div>
          </div>
        ))}
        <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5">
          <div className="text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 mb-1.5">Margin by category</div>
          {cats.map((c) => (
            <div key={c.l} className="flex items-center gap-2 text-[10px] mb-1 last:mb-0">
              <div className="w-16 shrink-0 text-[#0A0A0A]/70 truncate">{c.l}</div>
              <div className="flex-1 h-2 rounded-sm bg-[#EFE9DE] overflow-hidden"><div className="h-full bg-[#0A0A0A]" style={{ width: `${c.v}%` }} /></div>
              <div className="w-8 text-right tabular-nums text-[#0A0A0A]/60">{c.v}%</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ---------- E-commerce: channel contribution + gross→contribution ---------- */
function EcommerceScene() {
  const channels = [
    { ch: "Shopify",   rev: "312k", contrib: 38 },
    { ch: "Amazon",    rev: "248k", contrib: 24 },
    { ch: "Wholesale", rev: "96k",  contrib: 44 },
  ];
  const flow = [
    { l: "Gross revenue", v: "656k", w: 100, tone: "ink" },
    { l: "− Fees",        v: "62k",  w: 42,  tone: "minus" },
    { l: "− Shipping",    v: "48k",  w: 34,  tone: "minus" },
    { l: "− COGS",        v: "262k", w: 68,  tone: "minus" },
    { l: "Contribution",  v: "284k", w: 43,  tone: "good" },
  ];
  const cols = "grid-cols-[1fr_0.8fr_1.2fr]";
  return (
    <Frame slug="ecommerce" title="Contribution margin · by channel" right="Net of all fees">
      <div className="px-4 pb-4 pt-2">
        {channels.map((c, i) => (
          <div key={c.ch} className={`grid ${cols} items-center px-2 py-2 border-b border-line text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-medium">{c.ch}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">${c.rev}</div>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-20 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden"><div className="h-full bg-emerald-600" style={{ width: `${c.contrib * 2}%` }} /></div>
              <span className="tabular-nums text-[10px] w-8 text-right">{c.contrib}%</span>
            </div>
          </div>
        ))}
        <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5">
          <div className="text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50 mb-1.5">Gross → contribution</div>
          {flow.map((f) => (
            <div key={f.l} className="flex items-center gap-2 text-[10px] mb-1 last:mb-0">
              <div className="w-24 shrink-0 text-[#0A0A0A]/70 truncate">{f.l}</div>
              <div className="flex-1 h-2 rounded-sm bg-[#EFE9DE] overflow-hidden">
                <div className={`h-full ${f.tone === "good" ? "bg-emerald-600" : f.tone === "minus" ? "bg-rose-400" : "bg-[#0A0A0A]"}`} style={{ width: `${f.w}%` }} />
              </div>
              <div className="w-10 text-right tabular-nums text-[#0A0A0A]/60">${f.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#0A0A0A]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Blended CAC $28 · payback 2.1 mo
        </div>
      </div>
    </Frame>
  );
}

/* ---------- Healthcare: clinic P&L + payer mix ---------- */
function Donut({ data }) {
  const R = 30, C = 2 * Math.PI * R;
  let off = 0;
  return (
    <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90 shrink-0">
      <circle cx="50" cy="50" r={R} fill="none" stroke="#EFE9DE" strokeWidth="14" />
      {data.map((d) => {
        const len = (d.v / 100) * C;
        const el = <circle key={d.l} cx="50" cy="50" r={R} fill="none" stroke={d.c} strokeWidth="14" strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-off} />;
        off += len;
        return el;
      })}
    </svg>
  );
}
function HealthcareScene() {
  const clinics = [
    { c: "North Clinic", rev: "1.82M", cpv: "$142", m: 22 },
    { c: "South Clinic", rev: "1.24M", cpv: "$158", m: 18 },
    { c: "Downtown",     rev: "0.96M", cpv: "$135", m: 24 },
  ];
  const payers = [
    { l: "Commercial", v: 46, c: "#0A0A0A" },
    { l: "Medicare",   v: 28, c: "#2563EB" },
    { l: "Medicaid",   v: 18, c: "#059669" },
    { l: "Self-pay",   v: 8,  c: "#9CA3AF" },
  ];
  const cols = "grid-cols-[1.3fr_0.8fr_0.7fr_0.55fr]";
  return (
    <Frame slug="healthcare" title="Clinics · payer mix" right="Q2 · 2026">
      <div className="px-4 pb-4 pt-2">
        <div className={`grid ${cols} px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line`}>
          <div>Clinic</div><div className="text-right">Net rev</div><div className="text-right">Cost/visit</div><div className="text-right">Margin</div>
        </div>
        {clinics.map((r, i) => (
          <div key={r.c} className={`grid ${cols} items-center px-2 py-2 border-b border-line text-[12px] animate-fade-up`} style={{ animationDelay: `${i * 80}ms` }}>
            <div className="font-medium truncate">{r.c}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">${r.rev}</div>
            <div className="text-right tabular-nums text-[#0A0A0A]/60">{r.cpv}</div>
            <div className="text-right tabular-nums font-medium">{r.m}%</div>
          </div>
        ))}
        <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5 flex items-center gap-3">
          <Donut data={payers} />
          <div className="flex-1 space-y-1">
            <div className="text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">Payer mix</div>
            {payers.map((p) => (
              <div key={p.l} className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-sm" style={{ background: p.c }} />{p.l}</span>
                <span className="tabular-nums text-[#0A0A0A]/60">{p.v}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2 text-[10px] text-[#0A0A0A]/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" /> Days in AR 38 · denial rate 4.2%
        </div>
      </div>
    </Frame>
  );
}

const SCENES = {
  restaurants: RestaurantsScene,
  construction: ConstructionScene,
  retail: RetailScene,
  ecommerce: EcommerceScene,
  healthcare: HealthcareScene,
};

export function hasIndustryScene(slug) {
  return Boolean(SCENES[slug]);
}

export default function IndustryScene({ slug }) {
  const Scene = SCENES[slug];
  return Scene ? <Scene /> : null;
}
