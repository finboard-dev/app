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
import { Specifics, SegmentLinks } from "@/components/accounting/Specifics";
import { Faq, FinalCta } from "@/components/accounting/Closing";
import { MotionStyles } from "@/components/accounting/motion";
import { displayFont } from "@/components/accounting/fonts";
import { AccountingCopyProvider, useCopy } from "@/components/accounting/copy";

/**
 * /accounting-services and its segment pages: done-for-you accounting, sold
 * through a discovery call. `segment` picks the copy; the layout is shared.
 */
export default function AccountingServices({ segment = null }) {
  return (
    <AccountingCopyProvider segment={segment}>
      <Page segment={segment} />
    </AccountingCopyProvider>
  );
}

function Page({ segment }) {
  const { DISCOVERY_LABEL, CALL_SUBTITLE, SECTIONS, SHOW_STORIES } = useCopy();
  const [callOpen, setCallOpen] = React.useState(false);
  const openCall = () => setCallOpen(true);

  return (
    <div
      className={`acct-page ${displayFont.variable} min-h-screen bg-sand text-[#0A0A0A]`}
      data-testid="accounting-services-page"
      data-segment={segment ?? "general"}
    >
      <MotionStyles />
      <Navbar onBookDemo={openCall} />
      <main>
        <Hero onDiscovery={openCall} />
        <Founder onDiscovery={openCall} />
        <Proof />
        <Specifics />
        <Flow />
        {SECTIONS.ask && <AskPanel />}
        {!segment && SHOW_STORIES && <Story />}
        <Compare />
        {SECTIONS.segments && <SegmentLinks current={segment} />}
        <Faq onDiscovery={openCall} />
        <FinalCta onDiscovery={openCall} />
      </main>
      <Footer />
      <BookDemoDialog open={callOpen} onOpenChange={setCallOpen} title={DISCOVERY_LABEL} subtitle={CALL_SUBTITLE} />
    </div>
  );
}
