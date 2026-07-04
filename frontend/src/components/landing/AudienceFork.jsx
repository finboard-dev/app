import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Landmark, Rocket } from "lucide-react";

/**
 * Audience fork, lets visitors self-segment into the CFO story (this page),
 * the founder story (book a call), or the advisory-firm story (/advisory).
 * Slight lean to the CFO path, which stays the homepage default.
 */
export default function AudienceFork({ onBookDemo }) {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12" data-testid="audience-fork">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Which are you?</div>
        <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl tracking-tight">
          One platform, three ways in.
        </h2>
        <p className="mt-3 text-[14px] text-[#0A0A0A]/70">
          Whether you run a multi-entity group, you're a founder wearing the finance hat, or you advise a book of clients, FinBoard runs the consolidation, close and reporting underneath.
        </p>
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {/* CFO path, primary */}
        <div
          data-testid="fork-cfo"
          className="rounded-2xl bg-[#0A0A0A] text-white p-7 flex flex-col"
        >
          <span className="h-11 w-11 rounded-xl bg-white/10 border border-white/15 grid place-items-center">
            <Landmark size={20} />
          </span>
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-white/55">Multi-entity operators</div>
          <div className="mt-2 font-serif-display text-2xl">I run finance for a group.</div>
          <p className="mt-3 text-[14px] leading-relaxed text-white/70 flex-1">
            You own the numbers for a company with many entities. Consolidate, close and plan in one intelligent workspace, built for the Office of the CFO.
          </p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-white/75">
            {["50+ entity consolidation", "Month-end close", "Board-ready analytics"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-white/60 shrink-0" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={onBookDemo}
              data-testid="fork-cfo-cta"
              className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-[#F5F0E8] transition-colors"
            >
              Book consultation <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Founder path */}
        <div
          data-testid="fork-founder"
          className="rounded-2xl card-white p-7 flex flex-col"
        >
          <span className="h-11 w-11 rounded-xl border border-line bg-[#F5F0E8] grid place-items-center">
            <Rocket size={20} />
          </span>
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/50">Founders & operators</div>
          <div className="mt-2 font-serif-display text-2xl">I'm a founder.</div>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 flex-1">
            You're wearing the finance hat yourself. Get investor-ready reporting, runway and burn, long before you hire a finance team.
          </p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-[#0A0A0A]/75">
            {["Runway & burn", "Investor-ready board packs", "No finance team needed"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]/40 shrink-0" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <button
              onClick={onBookDemo}
              data-testid="fork-founder-cta"
              className="inline-flex items-center gap-2 border border-line-strong rounded-full px-5 py-3 text-sm font-medium hover:bg-black/5 transition-colors"
            >
              Book a founder call <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Advisory path */}
        <Link
          to="/advisory"
          data-testid="fork-advisory"
          aria-label="I advise multiple clients, open the advisory workspace"
          className="group rounded-2xl card-white p-7 flex flex-col hover:-translate-y-0.5 hover:border-line-strong transition-all cursor-pointer"
        >
          <span className="h-11 w-11 rounded-xl border border-line bg-[#F5F0E8] grid place-items-center">
            <Building2 size={20} />
          </span>
          <div className="mt-5 text-xs uppercase tracking-[0.2em] text-[#0A0A0A]/50">Advisory firms & CAS</div>
          <div className="mt-2 font-serif-display text-2xl group-hover:underline underline-offset-4 decoration-[#0A0A0A]/30">I advise multiple clients.</div>
          <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/70 flex-1">
            You run finance for a book of clients. Manage every engagement from one workspace with standardized templates and white-label deliverables.
          </p>
          <ul className="mt-4 space-y-1.5 text-[13px] text-[#0A0A0A]/75">
            {["One workspace, all clients", "White-label board packs", "Partner pricing"].map((x) => (
              <li key={x} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]/40 shrink-0" /> {x}
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <span
              data-testid="fork-advisory-cta"
              className="inline-flex items-center gap-2 border border-line-strong rounded-full px-5 py-3 text-sm font-medium group-hover:bg-black/5 transition-colors"
            >
              See the firm workspace <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
