"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import { Hero, Proof } from "@/components/accounting/Hero";
import Founder from "@/components/accounting/Founder";
import Flow from "@/components/accounting/Flow";
import AskPanel from "@/components/accounting/AskPanel";
import Story from "@/components/accounting/Story";
import Compare from "@/components/accounting/Compare";
import { Faq, FinalCta } from "@/components/accounting/Closing";
import { MotionStyles } from "@/components/accounting/motion";
import { displayFont } from "@/components/accounting/fonts";
import { DISCOVERY_LABEL, SHOW_STORIES } from "@/data/accountingServices";

/** /accounting-services: done-for-you startup accounting, sold through a discovery call. */
export default function AccountingServices() {
  const [callOpen, setCallOpen] = React.useState(false);
  const openCall = () => setCallOpen(true);

  return (
    <div className={`acct-page ${displayFont.variable} min-h-screen bg-sand text-[#0A0A0A]`} data-testid="accounting-services-page">
      <MotionStyles />
      <Navbar onBookDemo={openCall} />
      <main>
        <Hero onDiscovery={openCall} />
        <Founder onDiscovery={openCall} />
        <Proof />
        <Flow />
        <AskPanel />
        {SHOW_STORIES && <Story />}
        <Compare />
        <Faq onDiscovery={openCall} />
        <FinalCta onDiscovery={openCall} />
      </main>
      <Footer />
      <BookDemoDialog
        open={callOpen}
        onOpenChange={setCallOpen}
        title={DISCOVERY_LABEL}
        subtitle="30 minutes with our finance co-founder."
      />
    </div>
  );
}
