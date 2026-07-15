"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Sheet } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

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
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a
                    href={template.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="template-open-link"
                    className="btn-primary text-sm"
                  >
                    <Sheet size={16} /> Open in Google Sheets
                    <ExternalLink size={14} className="opacity-70" />
                  </a>
                  <button onClick={openDemo} className="btn-secondary text-sm">
                    Book a consultation
                  </button>
                </div>
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
