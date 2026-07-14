"use client";

import React from "react";
import Link from "next/link";
import { PRODUCT_NAV } from "@/data/products";

const CALENDLY_URL = "https://calendly.com/vaishnav-finboard/30min?month=2026-07";

export default function Footer() {
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

          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <div className="text-xs uppercase tracking-[0.22em] text-[#F5F0E8]/50">Platform</div>
              <ul className="mt-4 space-y-2.5">
                {PRODUCT_NAV.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/products/${p.slug}`}
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
              { l: "Use cases", href: "/#use-cases" },
              { l: "How it works", href: "/engagement#how-it-works" },
              { l: "Pricing", href: "/pricing" },
              { l: "FAQ", href: "/#faq" },
            ]} />
            <FooterCol title="Company" links={[
              { l: "About", href: "/manifesto" },
              { l: "Customers", href: "/testimonials" },
              { l: "Contact", href: CALENDLY_URL },
            ]} />
            <FooterCol title="Legal" links={[
              { l: "Privacy", href: "/privacy" },
              { l: "Terms", href: "/terms" },
              { l: "Refund Policy", href: "/refund-policy" },
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
              {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
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
