import React from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import Testimonials from "@/components/landing/Testimonials";

export default function TestimonialsPage() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="testimonials-page">
      <Seo
        title="FinBoard Testimonials | What Finance Leaders Say"
        description="CFOs, controllers and finance leaders on closing faster and trusting every number with FinBoard's AI-native, multi-entity finance platform."
        path="/testimonials"
      />
      <Navbar onBookDemo={openDemo} />
      <main className="pt-6">
        <Testimonials />
        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
