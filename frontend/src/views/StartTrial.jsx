"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Download, PlugZap, Sheet as SheetIcon, Layers, AppWindow, Bot } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import { LogoMark, CLIENT_LOGOS } from "@/components/landing/ClientLogos";
import { WRAP, Section, SectionHead, CheckItem } from "@/components/consolidation/primitives";
import TrustBadges from "@/components/consolidation/TrustBadges";
import { SHEETS_ADDON_URL, TRIAL_DAYS, INSTALL_LABEL } from "@/data/trial";
import { PRICE_PER_ENTITY } from "@/data/consolidationPage";

const STEPS = [
  { icon: Download, c: "#2563EB", title: "Install the add-on", body: "Add FinBoard to Google Sheets from the Google Workspace Marketplace. It opens in the sidebar." },
  { icon: PlugZap, c: "#7C3AED", title: "Connect QuickBooks", body: "Pick your QuickBooks Online companies and the reports you need, by month or by class." },
  { icon: Layers, c: "#059669", title: "See the whole group", body: "Roll every company into one statement with intercompany eliminated, refreshed every hour." },
];

const INCLUDED = [
  "Free for 14 days",
  "Unlimited QuickBooks entities",
  "Consolidation with intercompany eliminations",
  "Budgets vs actuals and entity benchmarking",
  "Expert help setting up your templates",
];

const NEEDS = [
  { icon: SheetIcon, text: "A Google account with Google Sheets" },
  { icon: PlugZap, text: "Access to your QuickBooks Online companies" },
];

const SURFACES = [
  { icon: SheetIcon, c: "#059669", title: "Google Sheets add-on", body: "Consolidated reports, budgets and benchmarks inside the sheets you already use. Your trial starts here." },
  { icon: AppWindow, c: "#2563EB", title: "FinBoard web app", body: "Map accounts once for the whole group and share live dashboards, from the same QuickBooks data." },
  { icon: Bot, c: "#7C3AED", title: "FinBoard AI Agent", body: "AI that works through finance tasks with your team, with every step auditable and approved by a person." },
];

const ALL_LOGOS = [...CLIENT_LOGOS.operators.logos, ...CLIENT_LOGOS.firms.logos];

function InstallButton({ className = "" }) {
  return (
    <a href={SHEETS_ADDON_URL} target="_blank" rel="noopener noreferrer" data-testid="start-install" className={`btn-primary ${className}`}>
      <Download size={16} /> {INSTALL_LABEL}
    </a>
  );
}

export default function StartTrial() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="start-trial-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className={`relative ${WRAP} pt-8 lg:pt-14 pb-14 lg:pb-20`}>
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              <div className="lg:col-span-6 flex flex-col gap-6 animate-fade-up">
                <div className="font-serif-display italic text-lg sm:text-xl text-[#0A0A0A]/55">Free for {TRIAL_DAYS} days.</div>
                <h1 className="-mt-3 font-serif-display text-3xl sm:text-4xl lg:text-[2.6rem] leading-[1.02] tracking-tight [text-wrap:balance]">
                  Start your <span className="italic">{TRIAL_DAYS}-day free trial</span>.
                </h1>
                <p className="text-[14.5px] leading-relaxed text-[#0A0A0A]/75 max-w-xl">
                  FinBoard works in Google Sheets, in the FinBoard web app and through the FinBoard AI Agent, all on the same
                  QuickBooks data. Your free trial starts in Google Sheets: install the add-on, connect your QuickBooks Online
                  companies and see consolidated numbers for the whole group.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <InstallButton />
                  <button type="button" onClick={openDemo} className="btn-secondary">Book Demo</button>
                </div>
                <p className="-mt-2 text-[13px] text-[#0A0A0A]/55">
                  From {PRICE_PER_ENTITY} per entity per month after your trial. Already a customer?{" "}
                  <a href="https://app.finboard.ai" className="font-medium text-[#0A0A0A] underline underline-offset-2">Log in</a>
                </p>
                <TrustBadges />
              </div>

              <div className="lg:col-span-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <div className="card-white p-7 lg:p-9 flex flex-col gap-6 shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">Your trial includes</span>
                    <span className="rounded-full bg-[#2563EB]/10 text-[#2563EB] px-3 py-1 text-[12px] font-semibold">{TRIAL_DAYS} days free</span>
                  </div>
                  <ul className="flex flex-col gap-2.5 text-[13.5px] text-[#0A0A0A]/85">
                    {INCLUDED.map((t) => <CheckItem key={t}>{t}</CheckItem>)}
                  </ul>
                  <div className="pt-5 border-t border-line">
                    <div className="text-[10.5px] uppercase tracking-[0.18em] text-[#0A0A0A]/55">What you need</div>
                    <ul className="mt-3 flex flex-col gap-2.5 text-[13.5px] text-[#0A0A0A]/80">
                      {NEEDS.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-2.5">
                          <span className="h-7 w-7 shrink-0 rounded-md border border-line bg-[#F9F6F0] grid place-items-center">
                            <Icon size={14} strokeWidth={1.75} />
                          </span>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <InstallButton className="w-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Section testid="start-surfaces">
          <SectionHead eyebrow="One platform" color="#7C3AED" title={<>Three ways to work, <span className="italic">one set of numbers</span>.</>} />
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {SURFACES.map(({ icon: Icon, c, title, body }) => (
              <div key={title} className="card-white p-6 flex flex-col gap-3">
                <span className="h-11 w-11 rounded-xl border grid place-items-center" style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}>
                  <Icon size={19} strokeWidth={1.75} />
                </span>
                <h3 className="mt-2 font-serif-display text-lg leading-tight">{title}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section alt testid="start-steps">
          <SectionHead eyebrow="Start your trial" title={<>From install to consolidated numbers <span className="italic">in three steps</span>.</>} />
          <ol className="mt-10 grid md:grid-cols-3 gap-4">
            {STEPS.map(({ icon: Icon, c, title, body }, i) => (
              <li key={title} className="card-white p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <span className="h-11 w-11 rounded-xl border grid place-items-center" style={{ backgroundColor: `${c}e6`, borderColor: `${c}3d`, color: "#fff" }}>
                    <Icon size={19} strokeWidth={1.75} />
                  </span>
                  <span className="text-[10.5px] uppercase tracking-[0.16em] font-semibold text-[#0A0A0A]/45">Step {i + 1}</span>
                </div>
                <h3 className="mt-2 font-serif-display text-lg leading-tight">{title}</h3>
                <p className="text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{body}</p>
              </li>
            ))}
          </ol>
          <figure className="mt-8 m-0 rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,.06),0_18px_40px_rgba(10,10,10,.10)]">
            <img
              src="/products/consolidation/sheets-addon.webp"
              width={1600}
              height={878}
              loading="lazy"
              alt="The FinBoard add-on open in the Google Sheets sidebar, next to a monthly profit and loss report pulled from QuickBooks"
              className="w-full h-auto"
            />
          </figure>
        </Section>

        <section aria-label="Customers" className={`${WRAP} py-14 lg:py-16`}>
          <div className="rounded-2xl border border-line bg-white px-6 lg:px-8 py-6 flex flex-wrap items-center gap-x-10 gap-y-5">
            <p className="text-[10.5px] uppercase tracking-[0.22em] text-[#0A0A0A]/55">Trusted by finance teams at</p>
            <div className="flex flex-wrap items-center gap-x-9 gap-y-5">
              {ALL_LOGOS.map((l) => <LogoMark key={l.name} {...l} imgClass="h-6" />)}
            </div>
          </div>
        </section>

        <section className="relative">
          <div className={`${WRAP} pb-12 lg:pb-16`}>
            <div className="rounded-3xl bg-[#0A0A0A] text-white px-8 py-12 lg:p-16 grid md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7">
                <div className="text-xs uppercase tracking-[0.22em] text-white/60">Prefer a guided start?</div>
                <h2 className="mt-3 font-serif-display text-2xl sm:text-3xl leading-[1.1] tracking-tight">
                  Get set up <span className="italic">with our team</span>.
                </h2>
                <p className="mt-3 text-white/70 max-w-lg">
                  Book a demo and our experts will help automate your financial templates and dashboards with your QuickBooks data.
                </p>
              </div>
              <div className="md:col-span-5 flex flex-wrap gap-3 md:justify-end">
                <button
                  type="button"
                  onClick={openDemo}
                  className="inline-flex items-center gap-2 bg-white text-[#0A0A0A] rounded-full px-5 py-3 text-sm font-medium hover:bg-[#F5F0E8] transition-colors"
                >
                  Book Demo <ArrowRight size={16} />
                </button>
                <Link
                  href="/products/consolidation"
                  className="inline-flex items-center gap-2 border border-white/30 rounded-full px-5 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  See the product
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
