"use client";

import React from "react";

/** True when the visitor asked the OS for reduced motion. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setShown(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Steps 0..count-1 every `ms` until paused. */
export function useCycle(count, ms, paused = false) {
  const [index, setIndex] = React.useState(0);
  React.useEffect(() => {
    if (paused) return undefined;
    const t = window.setTimeout(() => setIndex((i) => (i + 1) % count), ms);
    return () => window.clearTimeout(t);
  }, [index, count, ms, paused]);
  return [index, setIndex];
}

/** Page-scoped keyframes; every animation is skipped under reduced motion. */
export function MotionStyles() {
  return (
    <style>{`
      @media (prefers-reduced-motion: no-preference) {
        .acct-float { animation: acct-float 7s ease-in-out infinite; }
        .acct-float-slow { animation: acct-float 9s ease-in-out infinite reverse; }
        .acct-progress { animation: acct-progress var(--acct-ms, 6000ms) linear forwards; }
        .acct-pop { animation: acct-pop .5s cubic-bezier(.2,.7,.2,1) both; }
        .acct-beam { animation: acct-beam 8s ease-in-out infinite; }
      }
      @keyframes acct-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
      @keyframes acct-progress { from { width: 0% } to { width: 100% } }
      @keyframes acct-pop { from { opacity: .35; transform: translateY(6px) } to { opacity: 1; transform: none } }
      @keyframes acct-beam { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
      .acct-page main .font-serif-display {
        font-family: var(--font-acct-display), "Inter", ui-sans-serif, system-ui, sans-serif;
        font-synthesis: none;
        letter-spacing: -0.012em;
      }
      .acct-page main h1.font-serif-display { letter-spacing: -0.022em; }
      .acct-gradient-text {
        background: linear-gradient(92deg, #93C5FD 0%, #C4B5FD 45%, #6EE7B7 100%);
        -webkit-background-clip: text; background-clip: text; color: transparent;
      }
    `}</style>
  );
}
