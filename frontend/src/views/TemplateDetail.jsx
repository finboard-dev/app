"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Download, ExternalLink, Sheet } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import { validateWorkEmail } from "@/lib/workEmail.mjs";

const GENERIC_QUESTIONS = [
  { id: "role", label: "Your role", type: "text", placeholder: "Controller, owner, CPA..." },
];

// Gate the template link behind a short form; the lead is forwarded to Slack
// by /api/template-lead, which responds with the link so the download/open
// proceeds immediately after submit.
function LeadGate({ template }) {
  const isDownload = template.link.startsWith("/");
  const questions = template.leadQuestions?.length ? template.leadQuestions : GENERIC_QUESTIONS;
  const [open, setOpen] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [emailError, setEmailError] = React.useState(null);
  const [done, setDone] = React.useState(false);

  async function submit(e) {
    e.preventDefault();
    setError(null);
    const form = new FormData(e.target);
    const email = String(form.get("email") || "");
    const emailValidation = validateWorkEmail(email);
    if (!emailValidation.isValid) {
      setEmailError(emailValidation.message);
      return;
    }

    setEmailError(null);
    setBusy(true);
    const answers = {};
    for (const q of questions) answers[q.label] = form.get(`q_${q.id}`) || "";
    try {
      const res = await fetch("/api/template-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: template.slug,
          name: form.get("name"),
          email: email.trim(),
          company: form.get("company"),
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setDone(true);
      if (isDownload) window.location.assign(data.url);
      else window.open(data.url, "_blank", "noopener");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  const inputCls =
    "w-full rounded-lg border border-line-strong bg-white px-3.5 py-2.5 text-sm placeholder:text-[#0A0A0A]/35 focus:outline-none focus:border-[#2563EB]";

  if (done) {
    return (
      <div className="mt-6 rounded-xl border border-line bg-white p-5 text-sm" data-testid="template-lead-done">
        <p className="font-semibold">
          {isDownload ? "Your download has started." : "Opening your template."}
        </p>
        <p className="mt-1 text-[#0A0A0A]/60">
          If nothing happened,{" "}
          <a href={template.link} className="text-[#2563EB] underline" target="_blank" rel="noopener noreferrer">
            use this direct link
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {!open ? (
        <div className="flex flex-wrap items-center gap-3">
          <button onClick={() => setOpen(true)} className="btn-primary text-sm" data-testid="template-open-link">
            {isDownload ? (
              <>
                <Download size={16} /> Download the template
              </>
            ) : (
              <>
                <Sheet size={16} /> Open in Google Sheets
                <ExternalLink size={14} className="opacity-70" />
              </>
            )}
          </button>
        </div>
      ) : (
        <form
          onSubmit={submit}
          noValidate
          className="rounded-xl border border-line bg-white p-5 max-w-md"
          data-testid="template-lead-form"
        >
          <p className="text-sm font-semibold">
            {isDownload ? "Get the free template" : "Open the free template"}
          </p>
          <p className="mt-1 text-xs text-[#0A0A0A]/55">
            Tell us where to send updates and improvements to this template.
          </p>
          <div className="mt-4 grid gap-2.5">
            <input name="name" required placeholder="Your name" className={inputCls} />
            <input
              name="email"
              type="email"
              required
              placeholder="Work email"
              className={inputCls}
              aria-invalid={Boolean(emailError)}
              aria-describedby={emailError ? "template-email-error" : undefined}
              onChange={() => setEmailError(null)}
            />
            {emailError ? (
              <p id="template-email-error" className="text-xs text-red-600">
                {emailError}
              </p>
            ) : null}
            <input name="company" placeholder="Company (optional)" className={inputCls} />
            {questions.map((q) =>
              q.type === "select" ? (
                <select key={q.id} name={`q_${q.id}`} className={inputCls} defaultValue="">
                  <option value="" disabled>
                    {q.label}
                  </option>
                  {(q.options ?? []).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input key={q.id} name={`q_${q.id}`} placeholder={q.placeholder || q.label} className={inputCls} />
              )
            )}
          </div>
          {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
          <div className="mt-4 flex items-center gap-3">
            <button type="submit" disabled={busy} className="btn-primary text-sm disabled:opacity-60">
              {busy ? "Sending..." : isDownload ? "Download now" : "Open template"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="text-sm text-[#0A0A0A]/55 hover:text-[#0A0A0A]">
              Cancel
            </button>
          </div>
          <p className="mt-3 text-[11px] text-[#0A0A0A]/45">
            We may email you practical finance guides. Unsubscribe anytime.
          </p>
        </form>
      )}
    </div>
  );
}

function AboutBody({ about }) {
  if (!about) return null;
  if (about.includes("<")) {
    return <div className="blog-prose" dangerouslySetInnerHTML={{ __html: about }} />;
  }
  const paragraphs = about.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  return (
    <div className="blog-prose">
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}

export default function TemplateDetail({ template }) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="template-detail-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <article className="max-w-5xl mx-auto px-6 lg:px-8 pt-10 lg:pt-14 pb-16">
          <Link
            href="/templates"
            data-testid="template-back-link"
            className="inline-flex items-center gap-1.5 text-sm text-[#0A0A0A]/55 hover:text-[#0A0A0A] transition-colors"
          >
            <ArrowLeft size={14} /> All templates
          </Link>

          <div className="mt-6 grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#2563EB]">
                {template.category}
              </span>
              <h1 className="mt-3 font-serif-display text-3xl sm:text-4xl leading-[1.06] tracking-tight text-[#0A0A0A]">
                {template.title}
              </h1>
              {template.shortDescription ? (
                <p className="mt-4 text-[15px] leading-relaxed text-[#0A0A0A]/70">
                  {template.shortDescription}
                </p>
              ) : null}
              {template.link ? (
                <>
                  <LeadGate template={template} />
                  <div className="mt-3">
                    <button onClick={openDemo} className="btn-secondary text-sm">
                      Book a consultation
                    </button>
                  </div>
                </>
              ) : null}
            </div>

            {template.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={template.image}
                alt={template.imageAlt}
                className="w-full rounded-2xl border border-line object-cover bg-white"
                data-testid="template-image"
              />
            ) : null}
          </div>

          {template.about ? (
            <div className="mt-12 max-w-3xl" data-testid="template-about">
              <h2 className="font-serif-display text-xl tracking-tight text-[#0A0A0A] mb-4">
                About this template
              </h2>
              <AboutBody about={template.about} />
            </div>
          ) : null}
        </article>

        <CTABand onBookDemo={openDemo} />
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
