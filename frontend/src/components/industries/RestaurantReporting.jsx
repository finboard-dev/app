import React from "react";
import { ArrowRight, Check, Layers, Bike, Coins, Utensils, Gift, BarChart3 } from "lucide-react";

/**
 * Restaurants-only section, placed directly below the hero video.
 * Same monochrome + subtle semantic-accent language as IndustryScene:
 * card-white surfaces, 0.5px hairline borders, the Frame-style title bar,
 * tabular figures. No new colors, gradients, or shadows.
 */

const PAINS = [
  { icon: Layers,    t: "Payouts reconcile per store, not per group", k: "payouts" },
  { icon: Bike,      t: "Delivery apps pay you net, not gross",       k: "delivery" },
  { icon: Coins,     t: "Tips vs service charge, across every site",  k: "tips" },
  { icon: Utensils,  t: "Food cost you can't compare across sites",   k: "foodcost" },
  { icon: Gift,      t: "Gift cards sold here, redeemed there",       k: "giftcards" },
  { icon: BarChart3, t: "Group P&L by location, on close day",        k: "grouppl" },
];

const PL = [
  { l: "Net sales",               v: "$2.48M", p: "100%" },
  { l: "Cost of sales",           v: "$806K",  p: "32.5%" },
  { l: "Labor",                   v: "$744K",  p: "30.0%" },
  { l: "Prime cost",              v: "$1.55M", p: "62.5%", hi: true },
  { l: "Other controllable",      v: "$322K",  p: "13.0%" },
  { l: "Controllable income",     v: "$608K",  p: "24.5%", hi: true },
  { l: "Occupancy",               v: "$198K",  p: "8.0%" },
  { l: "Restaurant-level profit", v: "$410K",  p: "16.5%", total: true },
];

// By-location prime cost - compact table shown beside the group P&L.
const LOCS = [
  { loc: "Manhattan",   sales: "184.2k", prime: 60 },
  { loc: "Brooklyn",    sales: "142.6k", prime: 61 },
  { loc: "Queens",      sales: "118.1k", prime: 57 },
  { loc: "Long Island", sales: "96.4k",  prime: 61 },
  { loc: "Newark",      sales: "72.3k",  prime: 65 },
];
const primeColor = (v) => (v <= 60 ? "text-emerald-700" : v <= 63 ? "text-amber-700" : "text-rose-700");

function Panel({ title, right, children }) {
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-3 text-[11px] text-[#0A0A0A]/55 truncate">{title}</div>
        {right && (
          <div className="ml-auto pl-2 text-[10px] text-[#0A0A0A]/45 truncate">{right}</div>
        )}
      </div>
      <div className="bg-white">{children}</div>
    </div>
  );
}

export default function RestaurantReporting({ accent = "#C2410C", tint = "#FFF7ED" }) {
  const plCols = "grid-cols-[1.6fr_0.85fr_0.6fr]";

  // Per-card micro-visualizations - the graphic carries the meaning, so the text stays short.
  const renderGraphic = (k) => {
    switch (k) {
      case "payouts":
        return (
          <div className="space-y-1">
            {["POS batch", "Card settlement", "Delivery payout"].map((s) => (
              <div key={s} className="flex items-center justify-between rounded-md border border-line bg-white px-2 py-1 text-[10.5px]">
                <span className="text-[#0A0A0A]/65">{s}</span>
                <Check size={11} strokeWidth={2.5} className="text-emerald-700" />
              </div>
            ))}
            <div className="flex items-center justify-between rounded-md border border-dashed border-[#0A0A0A]/25 bg-[#F9F6F0] px-2 py-1 text-[10.5px]">
              <span className="text-[#0A0A0A]/65">Group roll-up · ×10</span>
              <span className="text-amber-700">by hand</span>
            </div>
          </div>
        );

      case "delivery":
        return (
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[9.5px]" style={{ color: "rgba(10,10,10,0.6)" }}>
              <span className="h-2 w-px" style={{ background: "rgba(10,10,10,0.35)" }} />
              <span className="flex-1 h-px" style={{ background: "rgba(10,10,10,0.18)" }} />
              <span className="whitespace-nowrap tabular-nums">Gross sales · $12,900</span>
              <span className="flex-1 h-px" style={{ background: "rgba(10,10,10,0.18)" }} />
              <span className="h-2 w-px" style={{ background: "rgba(10,10,10,0.35)" }} />
            </div>
            <div className="flex h-6 rounded-md overflow-hidden border border-line">
              <div style={{ width: "24%", background: "rgba(10,10,10,0.55)" }} />
              <div style={{ width: "9%", background: "rgba(10,10,10,0.35)" }} />
              <div style={{ width: "6%", background: "rgba(10,10,10,0.18)" }} />
              <div className="grid place-items-center" style={{ width: "61%", background: accent }}>
                <span className="text-[9px] text-white tabular-nums">Net $7.9k</span>
              </div>
            </div>
          </div>
        );

      case "tips":
        return (
          <div>
            <div className="flex h-6 rounded-md overflow-hidden border border-line">
              <div className="grid place-items-center bg-[#0A0A0A]/35" style={{ width: "62%" }}>
                <span className="text-[9px] text-[#0A0A0A]/75">Tips · pass-through</span>
              </div>
              <div className="grid place-items-center" style={{ width: "38%", background: accent }}>
                <span className="text-[9px] text-white">Service charge</span>
              </div>
            </div>
          </div>
        );

      case "foodcost": {
        const bars = [
          { l: "01", v: 29 },
          { l: "02", v: 34 },
          { l: "03", v: 31 },
          { l: "04", v: 38, over: true },
          { l: "05", v: 27 },
          { l: "06", v: 33 },
        ];
        return (
          <div>
            <div className="flex items-end gap-2 h-[64px] border-b border-line-strong">
              {bars.map((b) => (
                <div key={b.l} className="flex-1 flex flex-col items-center justify-end gap-1">
                  <span className={`text-[9px] tabular-nums ${b.over ? "text-rose-700" : "text-[#0A0A0A]/50"}`}>
                    {b.v}%
                  </span>
                  <div
                    className={`w-full rounded-t-sm ${b.over ? "bg-rose-500" : "bg-[#0A0A0A]/70"}`}
                    style={{ height: `${(b.v / 40) * 44}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="mt-1 flex gap-2 text-[8px] tabular-nums text-[#0A0A0A]/40">
              {bars.map((b) => (
                <div key={b.l} className="flex-1 text-center">{b.l}</div>
              ))}
            </div>
          </div>
        );
      }

      case "giftcards":
        return (
          <div>
            <div className="flex items-center gap-1.5 text-[10px]">
              <span className="rounded-md border border-line bg-white px-2 py-1 text-[#0A0A0A]/65">Sold · loc 03</span>
              <ArrowRight size={13} style={{ color: accent }} />
              <span className="rounded-md border border-line bg-white px-2 py-1 text-[#0A0A0A]/65">Redeemed · loc 07</span>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden">
              <div className="h-full bg-[#0A0A0A]/50" style={{ width: "70%" }} />
            </div>
          </div>
        );

      case "grouppl": {
        const rows = [
          { l: "Manhattan", v: 18, top: true },
          { l: "Brooklyn", v: 16 },
          { l: "Queens", v: 14 },
          { l: "Newark", v: 11 },
        ];
        return (
          <div className="space-y-1.5">
            {rows.map((r) => (
              <div key={r.l} className="flex items-center gap-2 text-[10px]">
                <span className="w-14 shrink-0 truncate text-[#0A0A0A]/65">{r.l}</span>
                <div className="flex-1 h-2 rounded-full bg-[#EFE9DE] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${r.top ? "" : "bg-[#0A0A0A]/55"}`}
                    style={{ width: `${(r.v / 18) * 100}%`, ...(r.top ? { background: accent } : {}) }}
                  />
                </div>
                <span className="w-8 text-right tabular-nums text-[#0A0A0A]/55">{r.v}%</span>
              </div>
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  // Legends sit at the bottom-right of the card, separate from the centered graphic.
  const renderLegend = (k) => {
    switch (k) {
      case "delivery":
        return (
          <div className="flex flex-wrap justify-end gap-x-2.5 gap-y-0.5 text-[9.5px] text-[#0A0A0A]/55">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: "rgba(10,10,10,0.55)" }} /> Commission
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: "rgba(10,10,10,0.35)" }} /> Promos
            </span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: "rgba(10,10,10,0.18)" }} /> Refunds
            </span>
            <span className="flex items-center gap-1" style={{ color: accent }}>
              <span className="h-1.5 w-1.5 rounded-sm" style={{ background: accent }} /> Net deposit
            </span>
          </div>
        );
      case "tips":
        return (
          <div className="flex justify-end">
            <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2 py-0.5 text-[9.5px] text-[#0A0A0A]/60">
              + FICA tip credit · per state
            </span>
          </div>
        );
      case "giftcards":
        return (
          <div className="flex justify-end text-[10px] text-[#0A0A0A]/55">
            <span>
              Deferred liability · <span className="tabular-nums">$142,000</span>
            </span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section
      id="reporting"
      className="scroll-mt-20 border-t border-line"
      data-testid="restaurant-reporting"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20">
        {/* ---------- Block 1 - the problems that show up at scale ---------- */}
        <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>
          One restaurant becomes ten
        </div>
        <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
          Finance problems when one restaurant becomes ten
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">
          Per-location books close fine. The group is where it breaks.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-3" data-testid="restaurant-pains">
          {PAINS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.k}
                className="card-white p-4 h-full flex flex-col gap-3 animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="h-8 w-8 shrink-0 rounded-md border grid place-items-center"
                    style={{ backgroundColor: tint, borderColor: `${accent}33`, color: accent }}
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </span>
                  <div className="text-[13px] font-medium leading-snug">{p.t}</div>
                </div>
                <div className="flex-1 flex flex-col justify-center">{renderGraphic(p.k)}</div>
                {renderLegend(p.k)}
              </div>
            );
          })}
        </div>

        {/* ---------- Block 2 - reporting standards ---------- */}
        <div className="mt-16 lg:mt-20">
          <div className="text-[11px] tracking-[0.01em]" style={{ color: accent }}>
            Books that match the standard
          </div>
          <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight max-w-3xl">
            Reporting standards every restaurant runs on, built into FinBoard
          </h2>
          <p className="mt-3 text-[13.5px] sm:text-[14px] leading-relaxed text-[#0A0A0A]/70">
            Every location books to the same standards, so group statements are right at close - not stitched together by hand at month-end.
          </p>

          {/* Group P&L (USAR) + by-location prime cost - side by side */}
          <div className="mt-8 grid lg:grid-cols-2 gap-3 items-start">
            <div data-testid="restaurant-usar-pl">
            <Panel title="Group P&L · period 6" right="10 locations · to GL">
              <div className="px-4 sm:px-5 pb-4 pt-3">
                <div className={`grid ${plCols} px-2 pb-1.5 text-[11px] text-[#0A0A0A]/45`}>
                  <div>USAR format</div>
                  <div className="text-right">Amount</div>
                  <div className="text-right">% sales</div>
                </div>
                {PL.map((r, i) => (
                  <div
                    key={r.l}
                    className={`grid ${plCols} items-center px-2 py-2 text-[13px] animate-fade-up ${
                      r.total
                        ? "border-t border-line-strong mt-1"
                        : "border-b border-line last:border-0"
                    }`}
                    style={{
                      animationDelay: `${i * 45}ms`,
                      ...(r.hi ? { backgroundColor: tint } : {}),
                    }}
                  >
                    <div
                      className={r.total || r.hi ? "font-medium" : ""}
                      style={r.hi ? { color: accent } : undefined}
                    >
                      {r.l}
                    </div>
                    <div
                      className={`text-right tabular-nums ${
                        r.total || r.hi ? "font-medium" : "text-[#0A0A0A]/70"
                      }`}
                    >
                      {r.v}
                    </div>
                    <div
                      className={`text-right tabular-nums ${
                        r.total || r.hi ? "font-medium" : "text-[#0A0A0A]/55"
                      }`}
                      style={r.hi ? { color: accent } : undefined}
                    >
                      {r.p}
                    </div>
                  </div>
                ))}
                <div className="mt-3 flex items-center gap-2 text-[11px] text-[#0A0A0A]/55">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                  Prime cost and controllable income are the two rows operators manage to.
                </div>
              </div>
            </Panel>
            </div>

            {/* By-location prime cost - compact table */}
            <div data-testid="restaurant-locations">
              <Panel title="Locations · March MTD" right="Prime cost focus">
                <div className="px-4 pb-4 pt-2">
                  <div className="grid grid-cols-[1.4fr_0.9fr_0.6fr] px-2 py-1.5 text-[9px] uppercase tracking-[0.12em] text-[#0A0A0A]/45 border-b border-line">
                    <div>Location</div>
                    <div className="text-right">Net sales</div>
                    <div className="text-right">Prime</div>
                  </div>
                  {LOCS.map((r, i) => (
                    <div
                      key={r.loc}
                      className="grid grid-cols-[1.4fr_0.9fr_0.6fr] items-center px-2 py-2 border-b border-line last:border-0 text-[12px] animate-fade-up"
                      style={{ animationDelay: `${i * 60}ms` }}
                    >
                      <div className="font-medium truncate">{r.loc}</div>
                      <div className="text-right tabular-nums text-[#0A0A0A]/70">${r.sales}</div>
                      <div className={`text-right tabular-nums font-medium ${primeColor(r.prime)}`}>{r.prime}%</div>
                    </div>
                  ))}
                  <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-2.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#0A0A0A]/60">Group prime cost</span>
                      <span className="font-medium">
                        60.8% <span className="text-[#0A0A0A]/40">· target 60%</span>
                      </span>
                    </div>
                    <div className="mt-1.5 h-2 rounded-full bg-[#EFE9DE] overflow-hidden relative">
                      <div className="absolute inset-y-0 left-0 bg-amber-500 rounded-full" style={{ width: "60.8%" }} />
                      <div className="absolute inset-y-0 w-px bg-[#0A0A0A]/70" style={{ left: "60%" }} />
                    </div>
                  </div>
                </div>
              </Panel>
            </div>
          </div>

          {/* Cards 2-4 */}
          <div className="mt-3 grid md:grid-cols-3 gap-3">
            {/* Card 2 - 13-period fiscal calendar */}
            <Panel title="13-period fiscal calendar" right="4-4-5">
              <div className="px-4 pb-4 pt-4">
                <div className="flex gap-1" data-testid="restaurant-calendar">
                  {Array.from({ length: 13 }).map((_, i) => {
                    const current = i === 5;
                    return (
                      <div
                        key={i}
                        className="flex-1 h-9 rounded-[3px] border grid place-items-center text-[9px] tabular-nums"
                        style={
                          current
                            ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                            : {
                                backgroundColor: "#F5F0E8",
                                borderColor: "var(--line)",
                                color: "rgba(10,10,10,0.45)",
                              }
                        }
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#0A0A0A]/60">
                  13 equal 4-week periods - every close compares like for like.
                </p>
              </div>
            </Panel>

            {/* Card 3 - Lease subledger · ASC 842 */}
            <Panel title="Lease subledger · ASC 842" right="Per entity">
              <div className="px-4 pb-4 pt-4">
                <div className="space-y-3" data-testid="restaurant-lease">
                  {[
                    { l: "ROU asset", v: "$948,000", w: "74%", tone: "#0A0A0A" },
                    { l: "Lease liability", v: "$961,000", w: "76%", tone: "rgba(10,10,10,0.4)" },
                  ].map((r) => (
                    <div key={r.l}>
                      <div className="flex items-center justify-between text-[12px]">
                        <span className="text-[#0A0A0A]/70">{r.l}</span>
                        <span className="tabular-nums font-medium">{r.v}</span>
                      </div>
                      <div className="mt-1.5 h-1.5 rounded-full bg-[#EFE9DE] overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: r.w, background: r.tone }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#0A0A0A]/60">
                  Amortizes down per location, rolls into group occupancy.
                </p>
              </div>
            </Panel>

            {/* Card 4 - Gift cards · ASC 606 */}
            <Panel title="Gift cards · ASC 606" right="Deferred revenue">
              <div className="px-4 pb-4 pt-4">
                <div data-testid="restaurant-giftcards">
                  <div className="flex items-center justify-between text-[12px]">
                    <span className="text-[#0A0A0A]/70">Outstanding liability</span>
                    <span className="tabular-nums font-medium">$142,000</span>
                  </div>
                  <div className="mt-1.5 flex h-2 rounded-full overflow-hidden bg-[#EFE9DE]">
                    <div className="h-full" style={{ width: "94%", background: "rgba(10,10,10,0.55)" }} />
                    <div className="h-full" style={{ width: "6%", background: accent }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-[#0A0A0A]/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-sm" style={{ background: "rgba(10,10,10,0.55)" }} />
                      Deferred
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-sm" style={{ background: accent }} />
                      Breakage $9,000
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-[12px] leading-relaxed text-[#0A0A0A]/60">
                  Deferred until redeemed; breakage recognized ratably.
                </p>
              </div>
            </Panel>
          </div>

          {/* Footnote - franchise reporting */}
          <p className="mt-6 text-[12px] leading-relaxed text-[#0A0A0A]/50 max-w-3xl">
            Franchisors file audited financial statements (Item 21) with the annual Franchise
            Disclosure Document under the FTC Franchise Rule. FinBoard keeps your books clean and
            audit-ready.
          </p>
        </div>
      </div>
    </section>
  );
}
