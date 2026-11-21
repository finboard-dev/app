import React from "react";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/data/compare/finboard";

/** "Start free trial" (our /start page) and the Marketplace install link, side by side. */
export default function CtaButtons({ className = "", testidPrefix, dark = false }) {
  const secondary = dark
    ? "inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
    : "btn-secondary";
  const primary = dark
    ? "inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-[#0A0A0A] hover:bg-[#F5F0E8] transition-colors"
    : "btn-primary";
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link href={PRIMARY_CTA.href} className={primary} data-testid={`${testidPrefix}-start-trial`}>
        {PRIMARY_CTA.label} <ArrowRight size={16} aria-hidden />
      </Link>
      <a
        href={SECONDARY_CTA.href}
        target="_blank"
        rel="noopener noreferrer"
        className={secondary}
        data-testid={`${testidPrefix}-install`}
      >
        <Download size={16} aria-hidden /> {SECONDARY_CTA.label}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  );
}
