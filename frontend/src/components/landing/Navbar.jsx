import React from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { href: "#team", label: "Team" },
  { href: "#manifesto", label: "Manifesto" },
  { href: "#case-studies", label: "Case studies" },
  { href: "#use-cases", label: "Use cases" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
];

const industries = [
  "Healthcare",
  "Restaurants",
  "Retail",
  "Financial Services",
  "Family Office",
  "Real Estate",
  "Manufacturing",
  "SaaS",
];

export default function Navbar({ onBookDemo }) {
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

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
        <a href="#top" data-testid="brand-logo" className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-md bg-[#0A0A0A] text-white grid place-items-center font-serif-display text-[13px] leading-none">Fb</span>
          <span className="font-serif-display text-[22px] tracking-tight">FinBoard</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-testid={`nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-[#0A0A0A]/80 hover:text-[#0A0A0A] transition-colors"
            >
              {l.label}
            </a>
          ))}

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
              className="min-w-[220px] bg-white border-line"
            >
              {industries.map((ind) => (
                <DropdownMenuItem
                  key={ind}
                  data-testid={`nav-industry-${ind.toLowerCase().replace(/\s+/g, "-")}`}
                  className="cursor-pointer text-sm"
                  onSelect={() => {
                    // scroll to use cases as a soft anchor
                    document.querySelector("#use-cases")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {ind}
                </DropdownMenuItem>
              ))}
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
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                data-testid={`mobile-nav-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-base"
              >
                {l.label}
              </a>
            ))}
            <div className="pt-2 border-t border-line/70">
              <div className="text-xs uppercase tracking-[0.18em] text-[#0A0A0A]/50 mb-2">Industries</div>
              <div className="flex flex-wrap gap-1.5">
                {industries.map((ind) => (
                  <a
                    key={ind}
                    href="#use-cases"
                    onClick={() => setOpen(false)}
                    data-testid={`mobile-nav-industry-${ind.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-xs rounded-full border border-line px-2.5 py-1"
                  >
                    {ind}
                  </a>
                ))}
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
