import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowLeft, Check, Sparkles, Timer, ShieldCheck,
  Users, LayoutGrid, Repeat, Gauge, Building2, Briefcase,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { PRODUCT_NAV } from "@/data/products";

const CAPABILITIES = [
  { icon: LayoutGrid,  label: "One workspace, every client" },
  { icon: Repeat,      label: "Standardized close templates" },
  { icon: Gauge,       label: "Practice & staff economics" },
];

const FEATURES = [
  { icon: LayoutGrid,  title: "Multi-client workspace", body: "Manage every client's entities from one place. Switch clients in a click; each one stays cleanly separated and governed." },
  { icon: Repeat,      title: "Standardized templates", body: "Build a close, consolidation or FP&A template once, then deploy it across clients. Onboard new engagements in days, not weeks." },
  { icon: Gauge,       title: "Practice economics", body: "See utilization, realization and margin across engagements, run your firm on the same live data you give clients." },
];

const STEPS = [
  { title: "Onboard clients", body: "Connect each client's QuickBooks, NetSuite or ERP. We do the forward-deployed build once; you reuse it everywhere." },
  { title: "Standardize delivery", body: "Roll your templates for close, consolidation and reporting across the whole client book for consistent output." },
  { title: "Deliver & scale", body: "Ship board packs and advisory insight, add clients without adding headcount." },
];

const METRICS = [
  { value: "1", label: "workspace, all clients" },
  { value: "30 days", label: "to onboard a client" },
];

export default function Advisory() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="advisory-page">
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-14 lg:pb-24">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 animate-fade-up">
                <div className="font-serif-display italic text-xl sm:text-2xl text-[#0A0A0A]/60" data-testid="advisory-kicker">
                  Fractional CFO, CAS or fund admin?
                </div>

                <h1 className="mt-2 font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight text-[#0A0A0A]" data-testid="advisory-heading">
                  Run every client&apos;s finance from <span className="italic">one workspace</span>.
                </h1>

                <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75" data-testid="advisory-subhead">
                  Consolidation, close, FP&amp;A and reporting for your entire client book, standardized templates and a portfolio view of your whole practice. Add clients without adding headcount.
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 max-w-xl" data-testid="advisory-capabilities">
                  {CAPABILITIES.map(({ icon: CapIcon, label }) => (
                    <li key={label} className="flex items-center gap-2.5 text-[13px] text-[#0A0A0A]/80">
                      <span className="h-7 w-7 shrink-0 rounded-md border border-line bg-[#F5F0E8] grid place-items-center">
                        <CapIcon size={13} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <AiTrustRow className="mt-5" />

                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <button onClick={openDemo} data-testid="advisory-book-demo-button" className="btn-primary">
                    Book a partner call <ArrowRight size={16} />
                  </button>
                  <a href="#how" data-testid="advisory-how-link" className="btn-secondary">
                    See how firms roll it out
                  </a>
                </div>
              </div>

              <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <div
                  className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
                  data-testid="advisory-hero-video"
                  style={{ aspectRatio: "16 / 10" }}
                >
                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    controls={false}
                    onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
                    onCanPlay={(e) => e.currentTarget.play().catch(() => {})}
                    aria-label="For firms preview"
                  >
                    <source src="/videos/for-firms.mp4" type="video/mp4" />
                  </video>
                  <div
                    className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0))" }}
                    aria-hidden
                  />
                  <div className="absolute bottom-4 left-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 backdrop-blur px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white">
                      <Building2 size={11} /> For firms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature grid */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 border-t border-line">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Built for firms that serve many clients</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight max-w-2xl">
            The leverage layer for your practice.
          </h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-4" data-testid="advisory-features">
            {FEATURES.map(({ icon: FIcon, title, body }) => (
              <div key={title} className="card-white p-6 hover:-translate-y-0.5 transition-transform">
                <div className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                  <FIcon size={18} />
                </div>
                <div className="mt-4 font-serif-display text-2xl leading-tight">{title}</div>
                <p className="mt-2 text-[14px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Modules across every client */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Every module, across every client</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">The same stack your clients need, at scale.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-5 gap-3" data-testid="advisory-modules">
            {PRODUCT_NAV.map((p) => {
              const PIcon = p.icon;
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  data-testid={`advisory-module-${p.slug}`}
                  className="card-white p-5 hover:-translate-y-0.5 transition-transform group"
                >
                  <span className="h-10 w-10 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                    <PIcon size={18} />
                  </span>
                  <div className="mt-3 font-medium text-[14px]">{p.nav}</div>
                  <div className="text-[12px] text-[#0A0A0A]/55">{p.eyebrow}</div>
                  <div className="mt-3 inline-flex items-center gap-1 text-[12px] text-[#0A0A0A]/40 group-hover:text-[#0A0A0A] transition-colors">
                    Explore <ArrowRight size={13} />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* How firms roll it out */}
        <section id="how" className="bg-[#F5F0E8] border-y border-line scroll-mt-20 mt-16 lg:mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">How firms roll it out</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Build once. Deploy across the book.</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-4" data-testid="advisory-steps">
              {STEPS.map((s, i) => (
                <div key={s.title} className="card-white p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Step {i + 1}</div>
                  <div className="mt-3 font-serif-display text-2xl leading-tight">{s.title}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4" data-testid="advisory-metrics">
              {METRICS.map((m) => (
                <div key={m.label} className="card-white p-6 text-center">
                  <div className="font-serif-display text-4xl sm:text-5xl tracking-tight">{m.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner / pricing angle */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="rounded-3xl border border-line bg-white p-8 lg:p-14 grid md:grid-cols-12 gap-8 items-center" data-testid="advisory-partner">
            <div className="md:col-span-8">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Partner program</div>
              <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">Firm-friendly economics.</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/70">
                Per-client and per-seat pricing built for resale margin, and a dedicated forward-deployed team for your practice. Land one firm, serve a whole portfolio.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#0A0A0A]/75">
                {["Per-client pricing", "Reseller margin", "Dedicated onboarding"].map((x) => (
                  <li key={x} className="inline-flex items-center gap-2">
                    <Check size={14} className="text-emerald-600" /> {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 flex md:justify-end">
              <button onClick={openDemo} data-testid="advisory-partner-cta" className="btn-primary">
                Talk partnerships <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}

/* ---------- Advisory hero visual: multi-client workspace ---------- */
const CLIENTS = [
  { n: "Meridian Retail",   e: 6,  c: "#0A0A0A", s: "Close · day 4" },
  { n: "Harborview Health", e: 12, c: "#059669", s: "Consolidating" },
  { n: "Feature Holdings",  e: 4,  c: "#D97706", s: "Board pack sent" },
  { n: "Northwind Group",   e: 9,  c: "#2563EB", s: "FP&A review" },
];

function AdvisoryVisual() {
  return (
    <div className="card-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-line bg-[#F5F0E8]">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#E5E0D8]" />
        <div className="ml-4 text-[11px] text-[#0A0A0A]/50">yourfirm.finboard.app / clients</div>
      </div>

      <div className="grid grid-cols-12 bg-white min-h-[360px]">
        {/* Client list */}
        <aside className="col-span-5 border-r border-line p-3 bg-[#F9F6F0]">
          <div className="flex items-center justify-between px-1 pb-2">
            <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">Clients</div>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white border border-line">31</span>
          </div>
          <div className="space-y-1.5">
            {CLIENTS.map((cl, i) => (
              <div
                key={cl.n}
                className={`rounded-md border px-2 py-1.5 flex items-center gap-2 animate-fade-up ${i === 0 ? "border-line-strong bg-white ring-1 ring-[#0A0A0A]/10" : "border-line bg-white"}`}
                style={{ animationDelay: `${i * 90}ms` }}
              >
                <span className="h-6 w-6 rounded grid place-items-center text-white text-[9px] font-semibold shrink-0" style={{ background: cl.c }}>
                  {cl.n.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                </span>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[11px] font-medium truncate">{cl.n}</div>
                  <div className="text-[9px] text-[#0A0A0A]/50 truncate">{cl.e} entities · {cl.s}</div>
                </div>
              </div>
            ))}
            <div className="rounded-md border border-dashed border-[#0A0A0A]/20 bg-[#F5F0E8]/40 px-2 py-1.5 text-[10px] text-[#0A0A0A]/50 text-center">
              + 27 more clients
            </div>
          </div>
        </aside>

        {/* Portfolio panel */}
        <div className="col-span-7 p-4">
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-lg grid place-items-center text-white shrink-0 bg-[#0A0A0A]">
              <Briefcase size={15} />
            </span>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">Practice portfolio</div>
              <div className="font-serif-display text-base">Across all clients</div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2" data-testid="advisory-visual-kpis">
            {[
              { l: "Clients", v: "31" },
              { l: "Entities", v: "214" },
              { l: "On-time close", v: "96%" },
            ].map((k) => (
              <div key={k.l} className="rounded-md border border-line bg-white px-2 py-2 text-center">
                <div className="font-serif-display text-lg tracking-tight">{k.v}</div>
                <div className="text-[9px] uppercase tracking-[0.1em] text-[#0A0A0A]/50 truncate">{k.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 rounded-md border border-line bg-[#F9F6F0] p-3">
            <div className="text-[9px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">Standardized templates</div>
            <div className="mt-2 space-y-1.5">
              {["Group close", "Consolidation", "Board pack", "FP&A model"].map((t, i) => (
                <div key={t} className="flex items-center gap-2 rounded-md border border-line bg-white px-2 py-1.5 animate-fade-up" style={{ animationDelay: `${300 + i * 80}ms` }}>
                  <Repeat size={12} />
                  <span className="text-[11px] font-medium flex-1">{t}</span>
                  <span className="text-[9px] text-[#0A0A0A]/50">deployed ×31</span>
                  <Check size={13} className="text-emerald-600" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 py-2.5 border-t border-line bg-[#F9F6F0] text-[11px]">
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5">
          <Users size={11} /> Multi-client
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5">
          <Timer size={11} /> Onboard in 30 days
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-white border border-line px-2 py-0.5">
          <Sparkles size={11} /> Your brand
        </span>
      </div>
    </div>
  );
}
