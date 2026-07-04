import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, Check, Handshake, ClipboardList, Layers,
  FileText, GitBranch, FlaskConical, Rocket, Target, Repeat,
  Phone, MessageSquare, Video, ShieldCheck, CalendarClock, Sparkles, Timer,
} from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

/**
 * Engagement page. Lays out exactly what working with FinBoard looks like,
 * from the first call to a live workflow, as a Gantt-style timeline plus
 * week-by-week detail.
 */

const PHASES = [
  {
    label: "Week 1",
    kicker: "Get started",
    steps: [
      {
        icon: Handshake,
        week: "Week 1",
        time: "30 min",
        title: "Introduction call",
        body: "A short call to get to know each other and find the fastest path to value.",
        points: [
          "Get to know your team and how you work",
          "Share your problem statement",
          "Identify the highest-ROI workflow to start with",
          "Map the systems and integrations involved",
        ],
      },
      {
        icon: ClipboardList,
        week: "Week 1",
        title: "Proposal call",
        body: "We come back with a concrete plan, scope and price, and put pen to paper.",
        points: [
          "We propose the solution and a timeline",
          "Sign an NDA with your team",
          "Share a clear estimate: fixed fee plus subscription",
          "Schedule a 30-min weekly check-in to track progress and gather feedback",
          "Spin up a shared Slack channel if you want one",
        ],
        highlight: "Nothing is paid until we deploy the solution.",
      },
    ],
  },
  {
    label: "Weeks 3 to 7",
    kicker: "Build and roll out",
    note: {
      title: "Weekly check-in on progress",
      body: "Every week we share where things stand, on a call, over Slack, or as a recorded Loom, whatever fits your team.",
    },
    steps: [
      {
        icon: Layers,
        week: "Week 3",
        title: "Consolidate your data",
        body: "FinBoard consolidates the data across all of your systems and files into one clean source.",
      },
      {
        icon: FileText,
        week: "Week 4",
        title: "First draft",
        body: "We share the first draft and exchange notes with your team.",
      },
      {
        icon: GitBranch,
        week: "Week 5",
        title: "Revised draft and rollout plan",
        body: "We share a revised draft and suggest a rollout plan.",
      },
      {
        icon: FlaskConical,
        week: "Week 6",
        title: "Pilot a live process",
        body: "A small process is routed through the new system. FinBoard accountants review the work end to end.",
      },
      {
        icon: Rocket,
        week: "Week 7",
        title: "Broad rollout and training",
        body: "We roll the workflow out broadly and train your team to run it.",
      },
    ],
  },
  {
    label: "Weeks 8 to 9",
    kicker: "Prove and expand",
    steps: [
      {
        icon: Target,
        week: "Week 8",
        title: "Track and improve",
        body: "We track metric goals, review output, gather feedback, and tune performance.",
      },
      {
        icon: Repeat,
        week: "Week 9",
        title: "Discuss the next workflow",
        body: "With the first workflow live and delivering, we plan the next one.",
      },
    ],
  },
];

const CHECKIN_CHANNELS = [
  { icon: Phone, label: "Call" },
  { icon: MessageSquare, label: "Slack" },
  { icon: Video, label: "Recorded Loom" },
];

const GLANCE = [
  { icon: Timer, value: "~8 weeks", label: "first call to live workflow" },
  { icon: CalendarClock, value: "30 min", label: "weekly progress check-in" },
  { icon: ShieldCheck, value: "$0 upfront", label: "pay once we deploy" },
];

/* ---------- Gantt chart model ---------- */
const SCALE = { min: 1, max: 11 };
const pct = (u) => ((u - SCALE.min) / (SCALE.max - SCALE.min)) * 100;

const GANTT_PHASES = [
  { label: "Get started", start: 1, end: 3 },
  { label: "Build & roll out", start: 3, end: 8 },
  { label: "Prove & expand", start: 8, end: 11 },
];
const GANTT_DOTS = [1, 3, 8, 11];
const GANTT_GRID = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const BARS = [
  { week: "W1", label: "Introduction call", full: "Introduction call · 30 min", start: 1.0, end: 3.1 },
  { week: "W1", label: "Proposal & NDA", full: "Proposal call", start: 2.0, end: 4.1 },
  { week: "W3", label: "Consolidate data", full: "Consolidate your data", start: 3.1, end: 5.3 },
  { week: "W4", label: "First draft", full: "First draft", start: 4.5, end: 6.4 },
  { week: "W5", label: "Revised draft", full: "Revised draft and rollout plan", start: 5.6, end: 7.6 },
  { week: "W6", label: "Pilot a process", full: "Pilot a live process", start: 6.7, end: 8.6 },
  { week: "W7", label: "Rollout & training", full: "Broad rollout and training", start: 7.7, end: 9.7 },
  { week: "W8", label: "Track & improve", full: "Track and improve", start: 8.5, end: 10.4 },
  { week: "W9", label: "Next workflow", full: "Discuss the next workflow", start: 9.3, end: 11.0 },
];

function GanttChart() {
  const rowH = 46;
  return (
    <div className="overflow-x-auto" data-testid="engagement-gantt">
      <div className="min-w-[900px] px-4">
        {/* Phase labels */}
        <div className="relative h-5 mb-2">
          {GANTT_PHASES.map((p) => (
            <span
              key={p.label}
              className="absolute -translate-x-1/2 text-[11px] uppercase tracking-[0.18em] font-medium text-[#0A0A0A]/55 whitespace-nowrap"
              style={{ left: `${pct((p.start + p.end) / 2)}%` }}
            >
              {p.label}
            </span>
          ))}
        </div>

        {/* Axis */}
        <div className="relative h-4 mb-4">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#0A0A0A]" />
          {GANTT_DOTS.map((u) => (
            <span
              key={u}
              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A] ring-4 ring-[#F5F0E8]"
              style={{ left: `${pct(u)}%` }}
            />
          ))}
        </div>

        {/* Bars */}
        <div className="relative" style={{ height: BARS.length * rowH }}>
          {/* Phase bands */}
          {GANTT_PHASES.map((p, i) => (
            <div
              key={p.label}
              className="absolute top-0 bottom-0 rounded-md"
              style={{
                left: `${pct(p.start)}%`,
                width: `${pct(p.end) - pct(p.start)}%`,
                background: i % 2 === 1 ? "rgba(10,10,10,0.015)" : "rgba(10,10,10,0.04)",
              }}
            />
          ))}
          {/* Gridlines */}
          {GANTT_GRID.map((u) => (
            <div
              key={u}
              className="absolute top-0 bottom-0 w-px bg-[#0A0A0A]/[0.06]"
              style={{ left: `${pct(u)}%` }}
            />
          ))}
          {/* Task bars */}
          {BARS.map((b, i) => (
            <div
              key={b.label}
              className="absolute animate-fade-up"
              style={{
                top: i * rowH,
                left: `${pct(b.start)}%`,
                width: `${pct(b.end) - pct(b.start)}%`,
                animationDelay: `${i * 55}ms`,
              }}
            >
              <div
                className="h-9 rounded-lg border border-line flex items-center gap-2 px-2.5 overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
                style={{ background: "linear-gradient(90deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.12) 100%)" }}
                title={b.full}
              >
                <span className="text-[10px] font-semibold text-[#0A0A0A]/45 shrink-0">{b.week}</span>
                <span className="text-[11.5px] font-medium text-[#0A0A0A]/85 truncate">{b.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Engagement() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="engagement-page">
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-14 pb-12 lg:pb-16">
            <div className="max-w-3xl animate-fade-up">
              <span className="kbd-chip" data-testid="engagement-eyebrow">
                <Sparkles size={12} /> The engagement
              </span>

              <h1 className="mt-5 font-serif-display text-4xl sm:text-5xl lg:text-[3.5rem] leading-[0.98] tracking-tight" data-testid="engagement-heading">
                What working with FinBoard <span className="italic">looks like</span>.
              </h1>

              <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-[#0A0A0A]/75" data-testid="engagement-subhead">
                A forward-deployed team that goes from the first call to a live, working workflow in about eight weeks. We build alongside you, check in every week, and you pay nothing until it is deployed.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button onClick={openDemo} data-testid="engagement-book-demo-button" className="btn-primary">
                  Book an intro call <ArrowRight size={16} />
                </button>
                <a href="#timeline" data-testid="engagement-timeline-link" className="btn-secondary">
                  See the timeline
                </a>
              </div>
            </div>

            {/* At a glance */}
            <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-3xl" data-testid="engagement-glance">
              {GLANCE.map(({ icon: GIcon, value, label }, i) => (
                <div
                  key={label}
                  className="card-white p-5 animate-fade-up"
                  style={{ animationDelay: `${120 + i * 80}ms` }}
                >
                  <span className="h-9 w-9 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center">
                    <GIcon size={16} />
                  </span>
                  <div className="mt-3 font-serif-display text-2xl tracking-tight">{value}</div>
                  <div className="mt-0.5 text-[12px] text-[#0A0A0A]/55">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section id="timeline" className="scroll-mt-20 border-t border-line bg-[#F5F0E8]">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">The timeline</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">
              From first call to <span className="italic">live workflow</span>.
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#0A0A0A]/60">
              The engagement runs in three parts. One workflow, scoped, built, and rolled out in roughly eight weeks.
            </p>

            {/* Gantt chart */}
            <div className="mt-10 card-white p-5 lg:p-8">
              <GanttChart />
            </div>

            {/* Week-by-week detail */}
            <div className="mt-14 space-y-12" data-testid="engagement-detail">
              {PHASES.map((phase) => (
                <div key={phase.label} data-testid={`engagement-phase-${phase.kicker.toLowerCase().replace(/\s+/g, "-")}`}>
                  {/* Phase header */}
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-[#0A0A0A] text-white text-[11px] uppercase tracking-[0.14em] px-3 py-1">
                      {phase.label}
                    </span>
                    <span className="text-[13px] font-medium text-[#0A0A0A]/60">{phase.kicker}</span>
                    <span className="flex-1 h-px bg-line" />
                  </div>

                  {/* Optional check-in note */}
                  {phase.note && (
                    <div className="mt-6 rounded-xl border border-line bg-white p-5" data-testid="engagement-checkin-note">
                      <div className="flex items-start gap-3">
                        <span className="h-9 w-9 shrink-0 rounded-lg bg-[#0A0A0A] text-white grid place-items-center">
                          <CalendarClock size={16} />
                        </span>
                        <div>
                          <div className="font-serif-display text-lg leading-tight">{phase.note.title}</div>
                          <p className="mt-1 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{phase.note.body}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {CHECKIN_CHANNELS.map(({ icon: CIcon, label }) => (
                              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-[#F9F6F0] px-2.5 py-1 text-[11.5px] text-[#0A0A0A]/70">
                                <CIcon size={12} /> {label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step cards */}
                  <div className="mt-5 grid gap-4 sm:grid-cols-2" data-testid="engagement-steps">
                    {phase.steps.map((step) => {
                      const SIcon = step.icon;
                      return (
                        <div
                          key={step.title}
                          className="card-white p-5 hover:-translate-y-0.5 transition-transform"
                          data-testid={`engagement-step-${step.week.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="h-8 w-8 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
                              <SIcon size={15} />
                            </span>
                            <span className="inline-flex items-center rounded-full bg-[#0A0A0A] text-white text-[10px] font-medium px-2 py-0.5">
                              {step.week}
                            </span>
                            {step.time && (
                              <span className="inline-flex items-center gap-1 text-[11px] text-[#0A0A0A]/50">
                                <Timer size={11} /> {step.time}
                              </span>
                            )}
                          </div>

                          <div className="mt-3 font-serif-display text-lg leading-tight">{step.title}</div>
                          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{step.body}</p>

                          {step.points && (
                            <ul className="mt-3 space-y-2">
                              {step.points.map((p) => (
                                <li key={p} className="flex items-start gap-2 text-[13px] text-[#0A0A0A]/80">
                                  <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          )}

                          {step.highlight && (
                            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#0A0A0A] text-white text-[13px] px-3 py-2" data-testid="engagement-pay-on-value">
                              <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
                              <span>{step.highlight}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Closing note */}
        <section className="max-w-4xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div className="rounded-3xl border border-line bg-white p-8 lg:p-12 text-center" data-testid="engagement-closing">
            <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Then we do it again</div>
            <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
              One workflow live. Then the next.
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-[15px] leading-relaxed text-[#0A0A0A]/70">
              Each engagement lands one workflow, proves it on your numbers, and sets up the next. Over time, your finance stack quietly becomes AI-native, one deployed workflow at a time.
            </p>
            <div className="mt-8">
              <button onClick={openDemo} data-testid="engagement-closing-cta" className="btn-primary">
                Start with an intro call <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <CTABand onBookDemo={openDemo} />
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
