import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, ShieldCheck, LayoutGrid, Repeat, Gauge,
  Building2, Eye, Layers, LineChart, TrendingUp, Plug, Users,
} from "lucide-react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import AiTrustRow from "@/components/landing/AiTrustRow";
import ClientLogos from "@/components/landing/ClientLogos";
import { PRODUCT_NAV } from "@/data/products";

const CAPABILITIES = [
  { icon: LayoutGrid, label: "One workspace, every entity" },
  { icon: Repeat,     label: "Continuous close & consolidation" },
  { icon: Gauge,      label: "Live group P&L, cash & KPIs" },
  { icon: ShieldCheck, label: "Governed, audit-ready data" },
];

// The "why we exist" persona lines - each role gets the live truth it deserves.
const PERSONAS = [
  { icon: Eye,        role: "Operators",   c: "#2563EB",
    line: "deserve real-time visibility into their business - not a month-old snapshot." },
  { icon: Layers,     role: "Controllers", c: "#059669",
    line: "deserve one governed source of truth - not spreadsheets stitched together at 11pm." },
  { icon: LineChart,  role: "CFOs",        c: "#7C3AED",
    line: "deserve to walk into the board with numbers they trust - closed, reconciled and current." },
  { icon: TrendingUp, role: "FP&A teams",  c: "#D97706",
    line: "deserve to plan on live actuals - not last quarter's stale export." },
];

const STEPS = [
  { title: "Connect your systems", body: "Plug in every entity's ERP, bank, POS and HRIS. We map your chart of accounts once." },
  { title: "Forward-deployed build", body: "A senior pod configures close, consolidation and reporting to how you actually operate." },
  { title: "Live in 30 days", body: "Go live with a real-time group P&L, cash and KPIs, then add workflows from there." },
];

const METRICS = [
  { value: "Real-time", label: "group visibility" },
  { value: "30 days", label: "to go live" },
];

// Distinct icon color per module (matches the finance-stack treatment site-wide).
const MODULE_ACCENT = {
  "Month-end close": "#7C3AED",
  "Consolidation":   "#2563EB",
  "Analytics":       "#0891B2",
  "FP&A":            "#059669",
  "Procure-to-Pay":  "#D97706",
  "Order-to-Cash":   "#E11D48",
};

export default function Operators() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="operators-page">
      <Seo
        title="FinBoard for Operators | Real-Time Multi-Entity Finance"
        description="Close, consolidate, plan and control spend across your whole group in one AI-native workspace, with numbers that stay current. Real-time group visibility in 30 days."
        path="/operators"
      />
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-14 lg:pb-24">
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 animate-fade-up">
                <h1 className="font-serif-display text-xl sm:text-2xl leading-[1.02] tracking-tight text-[#0A0A0A]" data-testid="operators-heading">
                  Real-time visibility into <span className="italic">every aspect of the business you run</span>.
                </h1>

                <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-[#0A0A0A]/75" data-testid="operators-subhead">
                  Close, consolidate, plan and control spend across your whole group, in one AI-native workspace, with numbers that stay current.
                </p>

                <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 max-w-xl" data-testid="operators-capabilities">
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
                  <button onClick={openDemo} data-testid="operators-book-demo-button" className="btn-primary">
                    Book consultation <ArrowRight size={16} />
                  </button>
                  <a href="#why" data-testid="operators-why-link" className="btn-secondary">
                    Why we exist
                  </a>
                </div>

                <Link
                  to="/advisory"
                  data-testid="operators-advisory-shortcut"
                  className="mt-6 group inline-flex items-center gap-2 text-[13px] text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
                >
                  <Building2 size={13} className="shrink-0" />
                  <span>
                    Advising multiple clients?{" "}
                    <span className="font-medium text-[#0A0A0A] underline underline-offset-4 decoration-[#0A0A0A]/25 group-hover:decoration-[#0A0A0A]">
                      See FinBoard for firms
                    </span>
                  </span>
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <div
                  className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] shadow-[0_1px_2px_rgba(10,10,10,0.04),0_20px_40px_-24px_rgba(10,10,10,0.15)]"
                  data-testid="operators-hero-video"
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
                    aria-label="For operators preview"
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
                      <Users size={11} /> For operators
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ClientLogos variant="operators" testid="operators-client-logos" />

        {/* Why we exist - personas */}
        <section id="why" className="bg-[#F5F0E8] border-y border-line scroll-mt-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Why we exist</div>
            <h2 className="mt-4 font-serif-display text-2xl sm:text-3xl leading-[1.05] tracking-tight max-w-2xl">
              Finance the way your team deserves.
            </h2>
            <p className="mt-3 max-w-2xl text-[14.5px] leading-relaxed text-[#0A0A0A]/70">
              Every seat in the finance function is fighting stale data and midnight spreadsheets. FinBoard hands each of them the live truth instead.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="operators-personas">
              {PERSONAS.map(({ icon: Icon, role, line, c }) => (
                <div key={role} className="card-white p-6 flex flex-col gap-4 animate-fade-up">
                  <span className="h-10 w-10 rounded-lg grid place-items-center" style={{ backgroundColor: c, color: "#fff" }}>
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <p className="text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
                    <span className="font-serif-display text-[17px] text-[#0A0A0A]">{role}</span> {line}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modules - one workspace */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-16 lg:pt-24">
          <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Every module, one workspace</div>
          <h2 className="mt-4 font-serif-display text-2xl sm:text-3xl leading-[1.02] tracking-tight">The full finance stack, run in-house.</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3" data-testid="operators-modules">
            {PRODUCT_NAV.map((p) => {
              const PIcon = p.icon;
              const c = MODULE_ACCENT[p.nav] || p.accent;
              return (
                <Link
                  key={p.slug}
                  to={`/products/${p.slug}`}
                  data-testid={`operators-module-${p.slug}`}
                  className="card-white p-5 hover:-translate-y-0.5 transition-transform group"
                >
                  <span className="h-10 w-10 rounded-lg border grid place-items-center" style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}>
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

        {/* How it works */}
        <section id="how" className="bg-[#F5F0E8] border-y border-line scroll-mt-20 mt-16 lg:mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">How you go live</div>
            <h2 className="mt-4 font-serif-display text-2xl sm:text-3xl leading-[1.02] tracking-tight">Real-time in 30 days, not a six-month migration.</h2>
            <div className="mt-10 grid md:grid-cols-3 gap-4" data-testid="operators-steps">
              {STEPS.map((s, i) => (
                <div key={s.title} className="card-white p-6">
                  <div className="text-[10px] uppercase tracking-[0.22em] text-[#0A0A0A]/50">Step {i + 1}</div>
                  <div className="mt-3 font-serif-display text-xl leading-tight">{s.title}</div>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70">{s.body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4" data-testid="operators-metrics">
              {METRICS.map((m) => (
                <div key={m.label} className="card-white p-6 text-center">
                  <div className="font-serif-display text-3xl sm:text-4xl tracking-tight">{m.value}</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{m.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#0A0A0A]/75">
              {["No rip-and-replace", "Sits on your ERPs", "Pay on value"].map((x) => (
                <span key={x} className="inline-flex items-center gap-2">
                  <Check size={14} className="text-emerald-600" /> {x}
                </span>
              ))}
              <span className="inline-flex items-center gap-2 text-[#0A0A0A]/55">
                <Plug size={13} /> 100+ connectors
              </span>
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
