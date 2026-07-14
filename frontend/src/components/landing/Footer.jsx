import React from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { PRODUCT_NAV } from "@/data/products";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Footer() {
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contacts`, { email, source: "footer" });
      toast.success("You're on the list. We'll be in touch.");
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] text-[#F5F0E8]" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-20 pb-10">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <div className="font-serif-display text-6xl sm:text-7xl lg:text-8xl leading-none tracking-tight">
              FinBoard.
            </div>
            <p className="mt-6 max-w-md text-[#F5F0E8]/70 leading-relaxed">
              The AI-native business operations platform for multi-entity groups. Consolidate, report, plan and review, in one place.
            </p>

            <form onSubmit={submit} className="mt-8 flex gap-2 max-w-md" data-testid="footer-newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                data-testid="footer-newsletter-input"
                className="flex-1 bg-transparent border border-[#F5F0E8]/25 rounded-full px-4 py-3 text-sm placeholder-[#F5F0E8]/40 focus:outline-none focus:border-[#F5F0E8]/60"
              />
              <button
                type="submit"
                disabled={loading}
                data-testid="footer-newsletter-submit"
                className="bg-[#F5F0E8] text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-white transition-colors disabled:opacity-60"
              >
                {loading ? "…" : "Notify me"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/50">Platform</div>
              <ul className="mt-4 space-y-2.5">
                {PRODUCT_NAV.map((p) => (
                  <li key={p.slug}>
                    <Link
                      to={`/products/${p.slug}`}
                      data-testid={`footer-product-${p.slug}`}
                      className="text-sm text-[#F5F0E8]/80 hover:text-white transition-colors"
                    >
                      {p.nav}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <FooterCol title="Product" links={[
              { l: "Use cases", href: "#use-cases" },
              { l: "How it works", href: "#how-it-works" },
              { l: "Pricing", href: "/pricing" },
              { l: "FAQ", href: "#faq" },
            ]} />
            <FooterCol title="Company" links={[
              { l: "About", href: "#" },
              { l: "Customers", href: "#testimonials" },
              { l: "Careers", href: "#" },
              { l: "Contact", href: "#book-demo" },
            ]} />
            <FooterCol title="Legal" links={[
              { l: "Privacy", href: "#" },
              { l: "Terms", href: "/terms" },
              { l: "Security", href: "#" },
            ]} />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#F5F0E8]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F5F0E8]/50">
          <div>© {new Date().getFullYear()} FinBoard, Inc. All rights reserved.</div>
          <div>Built for multi-entity groups.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/50">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.l}>
            <a
              href={l.href}
              data-testid={`footer-link-${title.toLowerCase()}-${l.l.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm text-[#F5F0E8]/80 hover:text-white transition-colors"
            >
              {l.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
