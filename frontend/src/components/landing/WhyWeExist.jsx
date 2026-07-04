import React from "react";
import { Compass, ArrowRight, Hammer, Landmark, Puzzle } from "lucide-react";

const problems = [
  {
    icon: Hammer,
    t: "Every close is a reconstruction.",
    b: "You rebuild the same numbers from scratch, month after month.",
  },
  {
    icon: Landmark,
    t: "Every board deck is a museum.",
    b: "The data is historical, often stale, and sometimes incorrect.",
  },
  {
    icon: Puzzle,
    t: "Every dashboard is a Frankenstein of exports.",
    b: "Stitched together by hand from CSVs that never quite reconcile.",
  },
];

export default function WhyWeExist() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  const reveal = () =>
    `transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  return (
    <section id="why-we-exist" ref={ref} className="border-y border-line bg-[#F5F0E8]" data-testid="why-we-exist">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div
          className={`inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50 ${reveal()}`}
        >
          <Compass size={12} /> Why we exist
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left, the why */}
          <div className={`lg:col-span-5 ${reveal()}`} style={{ transitionDelay: "80ms" }}>
            <h2 className="font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight text-[#0A0A0A]">
              Finance deserves better than{" "}
              <span className="italic">
                <span className={`stitch-word ${inView ? "is-stitching" : ""}`}>
                  stitched-together
                  <span className="stitch-line" aria-hidden="true">
                    <span className="stitch-thread" />
                    <span className="stitch-needle" />
                  </span>
                </span>{" "}
                spreadsheets.
              </span>
            </h2>
            <p className="mt-6 text-[14px] leading-relaxed text-[#0A0A0A]/70 max-w-md">
              The office of the CFO in a multi-entity group runs on the wrong shape of tools. We started FinBoard to change that.
            </p>
            <a
              href="#manifesto"
              data-testid="why-we-exist-cta"
              className="mt-6 group inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A]"
            >
              <span className="underline underline-offset-4 decoration-[#0A0A0A]/25 group-hover:decoration-[#0A0A0A]">
                Read the full manifesto
              </span>
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Right, problems as an illustrated timeline, pushed right for breathing room */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div className="relative space-y-8" data-testid="why-we-exist-problems">
              {/* connecting line through the icons */}
              <span
                className={`absolute left-[21px] top-7 bottom-7 w-px bg-[#0A0A0A]/12 origin-top transition-transform duration-1000 ease-out ${inView ? "scale-y-100" : "scale-y-0"}`}
                aria-hidden="true"
              />
              {problems.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div
                    key={p.t}
                    className={`group relative flex items-start gap-4 ${reveal()}`}
                    style={{ transitionDelay: `${220 + i * 150}ms` }}
                  >
                    <span className="relative z-10 h-11 w-11 shrink-0 rounded-xl border border-line bg-white text-[#0A0A0A] grid place-items-center transition-all duration-300 group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:scale-105 group-hover:shadow-[0_8px_18px_-8px_rgba(10,10,10,0.5)]">
                      <Icon size={18} className="transition-transform duration-300 group-hover:-rotate-6" />
                    </span>
                    <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                      <div className="font-serif-display text-xl leading-snug tracking-tight text-[#0A0A0A]">{p.t}</div>
                      <div className="mt-1.5 text-[15px] leading-relaxed text-[#0A0A0A]/60">{p.b}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
