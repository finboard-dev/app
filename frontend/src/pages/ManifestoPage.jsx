import React from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import Manifesto from "@/components/landing/Manifesto";

export default function ManifestoPage() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="manifesto-page">
      <Seo
        title="The FinBoard Manifesto | Why We Exist"
        description="Finance teams deserve real-time, governed numbers instead of stitched-together spreadsheets. This is why we built FinBoard."
        path="/manifesto"
      />
      <Navbar onBookDemo={openDemo} />
      <main>
        <Manifesto />
        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
