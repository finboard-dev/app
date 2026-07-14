import React from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { ArrowUpRight } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/vaishnav-finboard/30min?month=2026-07";
// Inline-embed variant of the same event (Calendly requires the embed params inside an iframe).
const CALENDLY_EMBED_URL = `${CALENDLY_URL}&embed_type=Inline&embed_domain=${
  typeof window !== "undefined" ? window.location.hostname : "finboard.ai"
}&hide_gdpr_banner=1`;

export default function BookDemoDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="book-demo-dialog"
        className="w-[96vw] sm:max-w-[1100px] bg-[#F5F0E8] border-line p-0 overflow-hidden"
      >
        <DialogHeader className="px-5 pt-4 pb-0 space-y-0">
          <DialogTitle className="font-serif-display text-lg tracking-tight leading-tight">Book a consultation</DialogTitle>
          <DialogDescription className="text-[#0A0A0A]/60 text-[12px]">
            Pick a time that works for you. 30 minutes with the FinBoard founders.
          </DialogDescription>
        </DialogHeader>

        <div className="px-3 pb-2 pt-1.5">
          <iframe
            src={CALENDLY_EMBED_URL}
            title="Book a consultation with FinBoard"
            data-testid="book-demo-calendly"
            className="w-full rounded-xl border border-line bg-white"
            style={{ height: "min(76vh, 700px)" }}
          />
          <div className="mt-1.5 text-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="book-demo-calendly-link"
              className="inline-flex items-center gap-1.5 text-[11.5px] font-medium text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
            >
              Calendar not loading? Open Calendly in a new tab <ArrowUpRight size={11} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
