import React from "react";
import Seo from "@/components/Seo";
import { FAQ_ITEMS } from "@/components/landing/FAQ";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyWeExist from "@/components/landing/WhyWeExist";
import Outcomes from "@/components/landing/Outcomes";
import TrustBar from "@/components/landing/TrustBar";
import UseCases from "@/components/landing/UseCases";
import Team from "@/components/landing/Team";
import FAQ from "@/components/landing/FAQ";
import CTABand from "@/components/landing/CTABand";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import IndustryCollage from "@/components/landing/IndustryCollage";

export default function Landing() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="landing-page">
      <Seo
        title="FinBoard | AI Native Finance for Multi-Entity Operators"
        description="Consolidation, month-end close, FP&A, reporting and spend across every entity, all in one governed AI-native workspace with a forward-deployed team."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }}
      />
      <Navbar onBookDemo={openDemo} />
      <main>
        <Hero onBookDemo={openDemo} />
        <TrustBar />
        <IndustryCollage />
        <WhyWeExist />
        <Outcomes />
        <UseCases />
        <Team />
        <FAQ />
        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
