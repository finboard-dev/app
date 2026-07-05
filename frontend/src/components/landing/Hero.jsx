import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle, Sparkles, Layers, LineChart, Users, ShieldCheck, Building2, Database, Receipt, CircleDollarSign } from "lucide-react";
import HeroCarousel from "@/components/landing/HeroCarousel";
import AiTrustRow from "@/components/landing/AiTrustRow";
import { INDUSTRY_NAV } from "@/data/industries";

// Capability line, kept in sync with the hero carousel view on the right.
const CAP_BY_VIEW = {
  warehouse: { icon: Database,          text: "Business Warehouse and Intelligence" },
  board:     { icon: LineChart,         text: "Business planning and scorecards" },
  recon:     { icon: Layers,            text: "Inter-company eliminations and consolidation" },
  people:    { icon: Users,             text: "Manager and individual scorecards" },
  p2p:       { icon: Receipt,           text: "Procure-to-pay operations" },
  o2c:       { icon: CircleDollarSign,  text: "Order-to-cash operations" },
};

export default function Hero({ onBookDemo }) {
  const [viewId, setViewId] = React.useState("warehouse");
  const cap = CAP_BY_VIEW[viewId] || CAP_BY_VIEW.warehouse;
  const CapIcon = cap.icon;

  // Rotating audience word — flips every SECOND sub-title (carousel) rotation.
  const AUDIENCES = React.useMemo(
    () => ["high-growth businesses", "multi-entity operators"],
    []
  );
  const [audIdx, setAudIdx] = React.useState(0);
  const rotationCountRef = React.useRef(0);
  const skipFirstRef = React.useRef(true);
  const handleViewChange = React.useCallback(
    (id) => {
      setViewId(id);
      // Ignore the initial mount call — count only real rotations.
      if (skipFirstRef.current) {
        skipFirstRef.current = false;
        return;
      }
      rotationCountRef.current += 1;
      // Flip audience on every 2nd sub-title rotation (rotations 2, 4, 6, ...).
      if (rotationCountRef.current % 2 === 0) {
        setAudIdx((i) => (i + 1) % AUDIENCES.length);
      }
    },
    [AUDIENCES.length]
  );
  const audience = AUDIENCES[audIdx];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="grain absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-6 lg:pt-8 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 animate-fade-up">
            <div className="flex flex-wrap items-center gap-2">
              <span className="kbd-chip" data-testid="hero-eyebrow">
                <Sparkles size={12} /> For the Office of the CFO
              </span>
              <span className="kbd-chip" data-testid="hero-eyebrow-multi-entity">
                <Building2 size={12} /> Multi-entity operators
              </span>
              <span className="kbd-chip" data-testid="hero-eyebrow-managed-services">
                <ShieldCheck size={12} /> Advisory firms
              </span>
            </div>

            <h1 className="mt-6 font-serif-display text-4xl sm:text-5xl lg:text-[2.35rem] xl:text-[2.6rem] leading-[1.02] tracking-tight text-[#0A0A0A]" data-testid="hero-heading">
              Performance Accounting for<br />
              <span
                key={audience}
                className="italic inline-block animate-fade-up"
                data-testid="hero-audience-rotator"
              >
                {audience}
              </span>
              .
            </h1>

            <div className="mt-6 flex items-start gap-2.5 min-h-[2.5rem]" data-testid="hero-capabilities">
              <span
                key={`cap-icon-${viewId}`}
                className="shrink-0 mt-0.5 text-[#0A0A0A] animate-fade-up"
              >
                <CapIcon size={18} />
              </span>
              <div className="text-[15px] sm:text-base leading-snug">
                <span key={`cap-text-${viewId}`} className="font-medium text-[#0A0A0A] inline animate-fade-up">
                  {cap.text}
                </span>
              </div>
            </div>

            <AiTrustRow className="mt-5" testid="hero-ai-native" />

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={onBookDemo}
                data-testid="hero-book-demo-button"
                className="btn-primary"
              >
                Book consultation <ArrowRight size={16} />
              </button>
              <a
                href="#tour"
                data-testid="hero-watch-tour-button"
                className="btn-secondary"
              >
                <PlayCircle size={16} /> Watch product tour
              </a>
            </div>

            <Link
              to="/advisory"
              data-testid="hero-advisory-shortcut"
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

            <div className="mt-8 max-w-md" data-testid="hero-industries">
              <div className="text-[11px] uppercase tracking-[0.16em] text-[#0A0A0A]/45">
                Tuned for your industry
              </div>
              <div className="mt-1.5 text-[12.5px] leading-relaxed">
                {INDUSTRY_NAV.map((ind, idx) => (
                  <React.Fragment key={ind.slug}>
                    <Link
                      to={`/industries/${ind.slug}`}
                      data-testid={`hero-industry-${ind.slug}`}
                      className="font-medium text-[#0A0A0A]/75 underline underline-offset-2 decoration-[#0A0A0A]/20 hover:text-[#0A0A0A] hover:decoration-[#0A0A0A] transition-colors"
                    >
                      {ind.nav}
                    </Link>
                    {idx < INDUSTRY_NAV.length - 1 && <span className="text-[#0A0A0A]/30">,{" "}</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <HeroCarousel onViewChange={handleViewChange} />
          </div>
        </div>
      </div>
    </section>
  );
}
