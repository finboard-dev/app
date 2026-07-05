import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhyWeExist from "@/components/landing/WhyWeExist";
import Outcomes from "@/components/landing/Outcomes";
import AudienceFork from "@/components/landing/AudienceFork";
import TrustBar from "@/components/landing/TrustBar";
import UseCases from "@/components/landing/UseCases";
import CaseStudies from "@/components/landing/CaseStudies";
import Team from "@/components/landing/Team";
import Testimonials from "@/components/landing/Testimonials";
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
      <Navbar onBookDemo={openDemo} />
      <main>
        <Hero onBookDemo={openDemo} />
        <IndustryCollage />
        <WhyWeExist />
        <Outcomes />
        <TrustBar />
        <AudienceFork onBookDemo={openDemo} />
        <UseCases />
        <CaseStudies />
        <Testimonials />
        <Team />
        <FAQ />
        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
