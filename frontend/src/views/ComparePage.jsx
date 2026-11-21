import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CompareHero from "@/components/compare/CompareHero";
import CompareTable from "@/components/compare/CompareTables";
import CompareFaq from "@/components/compare/CompareFaq";
import { FitSection, SwitchSteps, PricingSection, FinalCta } from "@/components/compare/CompareSections";

/** /compare/[slug]: one FinBoard comparison page, driven by src/data/compare/pages.js. */
export default function ComparePage({ page }) {
  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid={`compare-page-${page.slug}`}>
      <Navbar />
      <main>
        <CompareHero page={page} />
        <CompareTable page={page} />
        <FitSection page={page} />
        <SwitchSteps page={page} />
        <PricingSection page={page} />
        <CompareFaq page={page} />
        <FinalCta page={page} />
      </main>
      <Footer />
    </div>
  );
}
