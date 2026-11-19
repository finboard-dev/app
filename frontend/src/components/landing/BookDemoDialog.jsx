"use client";

import React from "react";
import { createPortal, preconnect } from "react-dom";
import { ArrowUpRight, X } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/vaishnav-finboard/30min";

// Calendly needs the embed params when it runs inside an iframe.
function embedUrl() {
  const params = new URLSearchParams({
    embed_type: "Inline",
    embed_domain: window.location.hostname,
    hide_gdpr_banner: "1",
    // Our header already names the meeting, so drop Calendly's duplicate details panel.
    hide_event_type_details: "1",
    hide_landing_page_details: "1",
  });
  return `${CALENDLY_URL}?${params}`;
}

// Start loading the calendar once the page is idle, so "Book Demo" opens instantly.
function useIdlePreload() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (ready) return undefined;
    preconnect("https://calendly.com");
    preconnect("https://assets.calendly.com");
    const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 1500));
    const cancel = window.cancelIdleCallback || window.clearTimeout;
    let handle;
    const schedule = () => { handle = idle(() => setReady(true), { timeout: 3000 }); };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (handle) cancel(handle);
    };
  }, [ready]);
  return [ready, setReady];
}

// Height Calendly needs to show the month grid and time zone without scrolling.
const CALENDAR_HEIGHT = 680;

// Shrink the iframe uniformly when its box is shorter than the calendar.
function useFitScale(ref, active) {
  const [scale, setScale] = React.useState(1);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !active) return undefined;
    const update = () => setScale(Math.min(1, el.clientHeight / CALENDAR_HEIGHT));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref, active]);
  return scale;
}

/**
 * Book-a-demo popup. The Calendly iframe is mounted once in the background and
 * kept alive while hidden, so opening the popup is instant instead of waiting
 * for Calendly to load on click.
 */
export default function BookDemoDialog({
  open,
  onOpenChange,
  title = "Book a demo",
  subtitle = "30 minutes with the FinBoard founders.",
}) {
  const [ready, setReady] = useIdlePreload();
  const [loaded, setLoaded] = React.useState(false);
  const [src, setSrc] = React.useState(null);
  const closeRef = React.useRef(null);
  const boxRef = React.useRef(null);
  const scale = useFitScale(boxRef, Boolean(src));
  const close = React.useCallback(() => onOpenChange(false), [onOpenChange]);

  // Opened before the idle preload kicked in: load right away.
  React.useEffect(() => { if (open && !ready) setReady(true); }, [open, ready, setReady]);
  React.useEffect(() => { if (ready && !src) setSrc(embedUrl()); }, [ready, src]);

  React.useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    const prevOverflow = document.body.style.overflow;
    const prevFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      if (prevFocus && prevFocus.focus) prevFocus.focus();
    };
  }, [open, close, src]);

  if (!src) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-50 grid place-items-center p-2 sm:p-4 transition-opacity duration-150 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
      inert={!open}
    >
      <div className="absolute inset-0 bg-black/80" onClick={close} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="book-demo-title"
        aria-describedby="book-demo-desc"
        data-testid="book-demo-dialog"
        className="relative flex flex-col w-[96vw] sm:max-w-[1100px] h-[calc(100dvh-1rem)] sm:h-[min(calc(100dvh-2rem),800px)] rounded-lg border border-line bg-[#F5F0E8] shadow-lg overflow-hidden"
      >
        <div className="shrink-0 flex items-center justify-between gap-4 px-5 py-2.5">
          <div className="min-w-0">
            <h2 id="book-demo-title" className="font-serif-display text-base tracking-tight leading-tight">{title}</h2>
            <p id="book-demo-desc" className="text-[#0A0A0A]/60 text-[12px] truncate">{subtitle}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="book-demo-calendly-link"
              className="hidden sm:inline-flex items-center gap-1 text-[11.5px] font-medium text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
            >
              Open in Calendly <ArrowUpRight size={11} />
            </a>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="rounded-sm p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-h-0 px-2.5 pb-2.5">
          <div ref={boxRef} className="relative h-full rounded-xl border border-line bg-white overflow-hidden">
            {!loaded && (
              <div className="absolute inset-0 grid place-items-center text-[13px] text-[#0A0A0A]/50">
                Loading calendar…
              </div>
            )}
            <iframe
              src={src}
              title={`${title} with FinBoard`}
              data-testid="book-demo-calendly"
              onLoad={() => setLoaded(true)}
              className={`absolute left-0 top-0 transition-opacity ${loaded ? "opacity-100" : "opacity-0"}`}
              style={{
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
