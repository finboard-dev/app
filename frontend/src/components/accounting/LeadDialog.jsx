"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Mail } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useCopy } from "./copy";

const INPUT =
  "w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-[14px] placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#2563EB]";
const LABEL = "mb-1.5 block text-[12.5px] font-medium text-[#0A0A0A]/75";

/** "Prefer email?" line, shown under the form and on the thank-you screen. */
function EmailLine() {
  const { CONTACT_EMAIL, EMAIL_CTA } = useCopy();
  return (
    <p className="text-[12.5px] text-[#0A0A0A]/60">
      <Mail size={12} className="mr-1.5 inline -mt-0.5" />
      Prefer email? Write to{" "}
      <a href={EMAIL_CTA.href} data-testid="lead-form-email" className="font-medium text-[#0A0A0A] underline decoration-[#0A0A0A]/25 underline-offset-4 hover:decoration-[#0A0A0A]">
        {CONTACT_EMAIL}
      </a>
    </p>
  );
}

function ThankYou({ onBookCall }) {
  const { LEAD_FORM: f } = useCopy();
  return (
    <div className="px-6 pb-7 pt-2 sm:px-8" data-testid="lead-form-success">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-emerald-600 text-white"><Check size={18} strokeWidth={3} /></span>
      <p className="mt-4 text-[15px] leading-relaxed text-[#0A0A0A]/80">{f.success}</p>
      <button type="button" onClick={onBookCall} className="btn-secondary mt-5">
        Want to talk sooner? Book a call <ArrowRight size={15} />
      </button>
      <div className="mt-5"><EmailLine /></div>
    </div>
  );
}

/** The navbar "Get started" form: a few details, emailed to the team. */
export default function LeadDialog({ open, onOpenChange, segment, onBookCall }) {
  const { LEAD_FORM: f } = useCopy();
  const id = React.useId();
  const [status, setStatus] = React.useState({ state: "idle", error: null }); // idle | sending | done | error

  const changeOpen = (next) => {
    onOpenChange(next);
    if (!next && status.state !== "sending") setStatus({ state: "idle", error: null });
  };

  async function submit(event) {
    event.preventDefault();
    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setStatus({ state: "sending", error: null });
    try {
      const res = await fetch("/api/accounting-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, segment: segment ?? "general" }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus({ state: "done", error: null });
    } catch (err) {
      setStatus({ state: "error", error: err.message });
    }
  }

  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogContent className="max-h-[calc(100dvh-1rem)] max-w-[480px] gap-0 overflow-y-auto border-line bg-[#F5F0E8] p-0" data-testid="lead-form-dialog">
        <div className="px-6 pb-4 pt-7 sm:px-8">
          <DialogTitle className="font-serif-display text-[1.6rem] leading-tight tracking-[-0.02em]">{f.title}</DialogTitle>
          <DialogDescription className="mt-1.5 text-[13.5px] leading-relaxed text-[#0A0A0A]/60">{f.subtitle}</DialogDescription>
        </div>

        {status.state === "done" ? (
          <ThankYou onBookCall={onBookCall} />
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-3.5 px-6 pb-7 sm:px-8" data-testid="lead-form">
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              <div>
                <label htmlFor={`${id}-name`} className={LABEL}>Name</label>
                <input id={`${id}-name`} name="name" required autoComplete="name" className={INPUT} />
              </div>
              <div>
                <label htmlFor={`${id}-email`} className={LABEL}>Email</label>
                <input id={`${id}-email`} name="email" type="email" required autoComplete="email" className={INPUT} />
              </div>
            </div>
            <div>
              <label htmlFor={`${id}-company`} className={LABEL}>{f.companyLabel}</label>
              <input id={`${id}-company`} name="company" required autoComplete="organization" className={INPUT} />
            </div>
            <div>
              <label htmlFor={`${id}-qualifier`} className={LABEL}>{f.qualifier.label}</label>
              <select id={`${id}-qualifier`} name="qualifier" required defaultValue="" className={INPUT}>
                <option value="" disabled>Choose one</option>
                {f.qualifier.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-message`} className={LABEL}>
                What do you need help with? <span className="font-normal text-[#0A0A0A]/45">(optional)</span>
              </label>
              <textarea id={`${id}-message`} name="message" rows={3} placeholder={f.messagePlaceholder} className={`${INPUT} resize-none`} />
            </div>
            {/* Spam trap: hidden from people, filled in by bots. */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            {status.state === "error" && (
              <p role="alert" className="rounded-lg bg-[#FEE2E2] px-3.5 py-2.5 text-[13px] text-[#991B1B]" data-testid="lead-form-error">{status.error}</p>
            )}
            <button type="submit" disabled={status.state === "sending"} className="btn-primary mt-1 w-full justify-center disabled:opacity-60" data-testid="lead-form-submit">
              {status.state === "sending" ? "Sending..." : "Send"} {status.state !== "sending" && <ArrowRight size={16} />}
            </button>

            <div className="mt-1 flex flex-col gap-2 border-t border-line pt-4">
              <p className="text-[12.5px] text-[#0A0A0A]/60">
                Prefer to talk?{" "}
                <button type="button" onClick={onBookCall} className="font-medium text-[#0A0A0A] underline decoration-[#0A0A0A]/25 underline-offset-4 hover:decoration-[#0A0A0A]">
                  Book a 30-minute call
                </button>
              </p>
              <EmailLine />
              <p className="text-[11.5px] text-[#0A0A0A]/45">
                See our <Link href="/privacy" className="underline underline-offset-2">privacy policy</Link>.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
