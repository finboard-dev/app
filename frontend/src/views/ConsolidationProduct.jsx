"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import ProductCrossLinks from "@/components/products/ProductCrossLinks";
import Hero from "@/components/consolidation/Hero";
import { Features, Modeling } from "@/components/consolidation/FeaturesAndModeling";
import { HowItWorks, Workspace, Audiences } from "@/components/consolidation/HowItWorks";
import { PricingPlan, ConsolidationFaq, ClosingBand } from "@/components/consolidation/PricingFaqCta";
import { PRODUCTS_BY_SLUG } from "@/data/products";

/**
 * /products/consolidation: QuickBooks multi-entity consolidation in Google
 * Sheets. Its own layout (self-serve add-on, per-entity pricing); the other
 * product pages keep the shared Product view.
 */
export default function ConsolidationProduct() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="product-page-consolidation">
      <Navbar onBookDemo={openDemo} />
      <main>
        <Hero onBookDemo={openDemo} />
        <Workspace />
        <Features />
        <Modeling />
        <HowItWorks />
        <Audiences />
        <PricingPlan onBookDemo={openDemo} />
        <ProductCrossLinks slug="consolidation" accent={PRODUCTS_BY_SLUG.consolidation.accent} />
        <ConsolidationFaq />
        <ClosingBand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
