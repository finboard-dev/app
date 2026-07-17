"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, Route, Compass, MessageSquareQuote, Sparkles, Newspaper, LayoutGrid, CalendarDays } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_NAV } from "@/data/products";
import { INDUSTRY_NAV } from "@/data/industries";

// Distinct icon color per module (matches the "Your full finance stack" tiles).
const MODULE_ACCENT = {
  "Month-end close": "#7C3AED",
  "Consolidation":   "#2563EB",
  "Analytics":       "#0891B2",
  "FP&A":            "#059669",
  "Procure-to-Pay":  "#D97706",
  "Order-to-Cash":   "#E11D48",
};

const resourceLinks = [
  { href: "/engagement#how-it-works", label: "How it works", desc: "The 30-day engagement model", icon: Route, accent: "#2563EB" },
  { href: "/#use-cases", label: "Use cases", desc: "Explore the product studio", icon: Compass, accent: "#0891B2" },
  { href: "/testimonials", label: "Testimonials", route: true, desc: "What finance leaders say", icon: MessageSquareQuote, accent: "#059669" },
  { href: "/about", label: "About", route: true, desc: "Our manifesto & team", icon: Sparkles, accent: "#D97706" },
  { href: "/blog", label: "Blog", route: true, desc: "Guides, playbooks & benchmarks", icon: Newspaper, accent: "#7C3AED" },
  { href: "/templates", label: "Templates", route: true, desc: "Free QuickBooks-ready spreadsheets", icon: LayoutGrid, accent: "#E11D48" },
  { href: "/conferences", label: "Conferences", route: true, desc: "The accounting events calendar", icon: CalendarDays, accent: "#0EA5E9" },
];

// Full-screen-width mega-menu panel wrapper (edge-to-edge, content aligned to page gutters).
const MEGA_CONTENT = "nav-mega max-w-none rounded-none border-x-0 border-t-0 bg-[#F5F0E8] border-line p-0 shadow-[0_24px_50px_-24px_rgba(10,10,10,0.25)]";

// One colorful tile, matching the "Your full finance stack" cards.
function MegaTile({ testid, icon: Icon, color, title, desc, onSelect }) {
  return (
    <DropdownMenuItem
      data-testid={testid}
      onSelect={onSelect}
      className="cursor-pointer flex-col items-center text-center gap-3 p-4 rounded-xl bg-white border border-line hover:border-line-strong hover:-translate-y-0.5 focus:bg-white focus:text-[#0A0A0A] transition-all"
    >
      <span
        className="h-10 w-10 shrink-0 rounded-sm border grid place-items-center"
        style={{ backgroundColor: `${color}e6`, borderColor: `${color}3d`, color: "#fff" }}
      >
        <Icon size={17} strokeWidth={1.75} />
      </span>
      <span className="w-full">
        <span className="block font-medium text-[13px] leading-tight text-[#0A0A0A]">{title}</span>
        <span className="block text-[11px] text-[#0A0A0A]/50 mt-1 leading-tight">{desc}</span>
      </span>
    </DropdownMenuItem>
  );
}

// Left-hand heading column for a mega-menu: vertically centered, editorial.
function MegaHeading({ eyebrow, title, desc, accent, count }) {
  return (
    <div className="w-56 shrink-0 self-center pr-9 border-r border-line">
      <div className="text-[10px] uppercase tracking-[0.28em] font-semibold mb-3" style={{ color: accent }}>
        {eyebrow}
      </div>
      <div className="font-serif-display text-[2rem] leading-[1.02] tracking-tight text-[#0A0A0A]">
        {title}<span style={{ color: accent }}>.</span>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-[#0A0A0A]/55">{desc}</p>
      {count && (
        <div className="mt-5 inline-flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-[#0A0A0A]/45">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {count}
        </div>
      )}
    </div>
  );
}

export default function Navbar({ onBookDemo }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`sticky top-0 z-40 transition-all ${
        scrolled
          ? "bg-[#F5F0E8]/80 backdrop-blur-xl border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <Link href="/" data-testid="brand-logo" className="flex items-center gap-2">
          <img
            src="/brand/finboard-mark-dark.png"
            alt=""
            className="h-8 w-8 rounded-md select-none"
            draggable="false"
          />
          <span className="font-serif-display text-[22px] tracking-tight">FinBoard</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="nav-products-trigger"
              className="inline-flex items-center gap-1 text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors focus:outline-none"
            >
              Products <ChevronDown size={14} className="opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              data-testid="nav-products-menu"
              className={MEGA_CONTENT}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex gap-10">
                <MegaHeading
                  eyebrow="The stack"
                  title="Products"
                  desc="The full finance stack, one governed workspace."
                  accent="#7C3AED"
                  count={`${PRODUCT_NAV.length} modules`}
                />
                <div className="flex-1 grid grid-cols-3 gap-2">
                  {PRODUCT_NAV.map((p) => (
                    <MegaTile
                      key={p.slug}
                      testid={`nav-product-${p.slug}`}
                      icon={p.icon}
                      color={MODULE_ACCENT[p.nav] || p.accent}
                      title={p.nav}
                      desc={p.eyebrow}
                      onSelect={() => router.push(`/products/${p.slug}`)}
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/operators"
            data-testid="nav-link-for-operators"
            className="text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors"
          >
            For Operators
          </Link>

          <Link
            href="/advisory"
            data-testid="nav-link-for-firms"
            className="text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors"
          >
            For Firms
          </Link>

          <Link
            href="/engagement"
            data-testid="nav-link-engagement"
            className="text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors"
          >
            Engagement
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="nav-resources-trigger"
              className="inline-flex items-center gap-1 text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors focus:outline-none"
            >
              Resources <ChevronDown size={14} className="opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              data-testid="nav-resources-menu"
              className={MEGA_CONTENT}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex gap-10">
                <MegaHeading
                  eyebrow="Learn"
                  title="Resources"
                  desc="Guides, stories and the FinBoard playbook."
                  accent="#2563EB"
                  count={`${resourceLinks.length} resources`}
                />
                <div className="flex-1 grid grid-cols-4 gap-2">
                  {resourceLinks.map((l) => (
                    <MegaTile
                      key={l.href}
                      testid={`nav-resource-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                      icon={l.icon}
                      color={l.accent}
                      title={l.label}
                      desc={l.desc}
                      onSelect={() => {
                        if (l.route) router.push(l.href);
                        else window.location.href = l.href;
                      }}
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/pricing"
            data-testid="nav-link-pricing"
            className="text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors"
          >
            Pricing
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger
              data-testid="nav-industries-trigger"
              className="inline-flex items-center gap-1 text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors focus:outline-none"
            >
              Industries <ChevronDown size={14} className="opacity-70" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              data-testid="nav-industries-menu"
              className={MEGA_CONTENT}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 flex gap-10">
                <MegaHeading
                  eyebrow="By sector"
                  title="Industries"
                  desc="Finance tuned to how your sector runs."
                  accent="#C2410C"
                  count={`${INDUSTRY_NAV.length} industries`}
                />
                <div className="flex-1 grid grid-cols-3 gap-2">
                  {INDUSTRY_NAV.map((ind) => (
                    <MegaTile
                      key={ind.slug}
                      testid={`nav-industry-${ind.slug}`}
                      icon={ind.icon}
                      color={ind.accent}
                      title={ind.nav}
                      desc={ind.eyebrow}
                      onSelect={() => router.push(`/industries/${ind.slug}`)}
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            data-testid="nav-book-demo-button"
            onClick={onBookDemo}
            className="btn-primary text-sm py-2.5"
          >
            Book consultation
          </button>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-black/5"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-line bg-[#F5F0E8]" data-testid="nav-mobile-panel">
          <div className="px-6 py-4 flex flex-col gap-4">
            <div className="pb-2 border-b border-line/70">
              <div className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/50 mb-2">Products</div>
              <div className="flex flex-col gap-1">
                {PRODUCT_NAV.map((p) => {
                  const PIcon = p.icon;
                  return (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-product-${p.slug}`}
                      className="flex items-center gap-2.5 py-1.5 text-base"
                    >
                      <span className="h-6 w-6 rounded border border-line bg-white grid place-items-center shrink-0 text-[#0A0A0A]">
                        <PIcon size={13} strokeWidth={1.75} />
                      </span>
                      {p.nav}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link
              href="/operators"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-link-for-operators"
              className="text-base"
            >
              For Operators
            </Link>
            <Link
              href="/advisory"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-link-for-firms"
              className="text-base"
            >
              For Firms
            </Link>
            <Link
              href="/engagement"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-link-engagement"
              className="text-base"
            >
              Engagement
            </Link>
            <div className="pt-2 border-t border-line/70">
              <div className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/50 mb-2">Resources</div>
              <div className="flex flex-col gap-1">
                {resourceLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-base py-0.5"
                  >
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
            <Link
              href="/pricing"
              onClick={() => setOpen(false)}
              data-testid="mobile-nav-link-pricing"
              className="text-base"
            >
              Pricing
            </Link>
            <div className="pt-2 border-t border-line/70">
              <div className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/50 mb-2">Industries</div>
              <div className="flex flex-col gap-1">
                {INDUSTRY_NAV.map((ind) => {
                  const IIcon = ind.icon;
                  return (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      onClick={() => setOpen(false)}
                      data-testid={`mobile-nav-industry-${ind.slug}`}
                      className="flex items-center gap-2.5 py-1.5 text-base"
                    >
                      <span className="h-6 w-6 rounded border border-line bg-white grid place-items-center shrink-0 text-[#0A0A0A]">
                        <IIcon size={13} strokeWidth={1.75} />
                      </span>
                      {ind.nav}
                    </Link>
                  );
                })}
              </div>
            </div>
            <button
              data-testid="mobile-nav-book-demo"
              onClick={() => { setOpen(false); onBookDemo(); }}
              className="btn-primary w-full"
            >
              Book consultation
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
