import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRICE_PER_ENTITY } from "@/data/consolidationPage";

/**
 * Thin bar above the homepage navbar that sends visitors (often from ads)
 * straight back to the consolidation product page.
 */
export default function AnnouncementBar() {
  return (
    <Link
      href="/products/consolidation"
      data-testid="announcement-bar"
      className="group block bg-[#0A0A0A] text-white"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2.5 flex items-center justify-center gap-2 text-[12.5px] sm:text-[13px] text-center">
        <span className="hidden sm:inline-flex items-center rounded-full bg-white/15 px-2 py-0.5 text-[10.5px] uppercase tracking-[0.14em] font-semibold">
          New
        </span>
        <span className="text-white/85">
          QuickBooks consolidation in Google Sheets, from {PRICE_PER_ENTITY} per entity.
        </span>
        <span className="inline-flex items-center gap-1 font-semibold underline underline-offset-4 decoration-white/40 group-hover:decoration-white whitespace-nowrap">
          See consolidation <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
