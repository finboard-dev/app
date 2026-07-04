import React from "react";
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
 * Engagement — redesigned.
 * Content preserved; layout rethought:
 *  - Asymmetric hero with a "schedule preview" card and inline stats strip
 *  - Phase-coded Gantt with lanes and a legend
 *  - Vertical zig-zag timeline of the 9 weeks with a numbered spine
 *  - Weekly check-in as a themed inline banner
 *  - New closing block on ink
 */

/* -------------------------------------------------------------- */
/* Data                                                            */
/* -------------------------------------------------------------- */

const PHASE_META = {
  "get-started": {
    label: "Get started",
    weeks: "Week 1",
    tone: "amber",
    // Tailwind-friendly colors (kept subtle to match sand theme)
    bar: "linear-gradient(90deg, #F5C77E 0%, #E8A94B 100%)",
    chip: "bg-[#F7E5C1] text-[#7A4E10] border-[#E8CE93]",
    dot: "bg-[#E8A94B]",
    ring: "ring-[#E8A94B]/25",
  },
  "build-roll-out": {
    label: "Build & roll out",
    weeks: "Weeks 3–7",
    tone: "indigo",
    bar: "linear-gradient(90deg, #8CA0EA 0%, #4C63C7 100%)",
    chip: "bg-[#DDE3F7] text-[#243377] border-[#B9C2E9]",
    dot: "bg-[#4C63C7]",
    ring: "ring-[#4C63C7]/25",
  },
  "prove-expand": {
    label: "Prove & expand",
    weeks: "Weeks 8–9",
    tone: "emerald",
    bar: "linear-gradient(90deg, #79C7A6 0%, #2E9668 100%)",
    chip: "bg-[#D1E9DE] text-[#124E33] border-[#A8D3C0]",
    dot: "bg-[#2E9668]",
    ring: "ring-[#2E9668]/25",
  },
};

const STEPS = [
  {
    phase: "get-started",
    icon: Handshake,
    week: "Week 1",
    n: 1,
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
    phase: "get-started",
    icon: ClipboardList,
    week: "Week 1",
    n: 2,
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
  {
    phase: "build-roll-out",
    icon: Layers,
    week: "Week 3",
    n: 3,
    title: "Consolidate your data",
    body: "FinBoard consolidates the data across all of your systems and files into one clean source.",
  },
  {
    phase: "build-roll-out",
    icon: FileText,
    week: "Week 4",
    n: 4,
    title: "First draft",
    body: "We share the first draft and exchange notes with your team.",
  },
  {
    phase: "build-roll-out",
    icon: GitBranch,
    week: "Week 5",
    n: 5,
    title: "Revised draft and rollout plan",
    body: "We share a revised draft and suggest a rollout plan.",
  },
  {
    phase: "build-roll-out",
    icon: FlaskConical,
    week: "Week 6",
    n: 6,
    title: "Pilot a live process",
    body: "A small process is routed through the new system. FinBoard accountants review the work end to end.",
  },
  {
    phase: "build-roll-out",
    icon: Rocket,
    week: "Week 7",
    n: 7,
    title: "Broad rollout and training",
    body: "We roll the workflow out broadly and train your team to run it.",
  },
  {
    phase: "prove-expand",
    icon: Target,
    week: "Week 8",
    n: 8,
    title: "Track and improve",
    body: "We track metric goals, review output, gather feedback, and tune performance.",
  },
  {
    phase: "prove-expand",
    icon: Repeat,
    week: "Week 9",
    n: 9,
    title: "Discuss the next workflow",
    body: "With the first workflow live and delivering, we plan the next one.",
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

/* -------------------------------------------------------------- */
/* Gantt (rebuilt with phase-coded lanes + legend)                */
/* -------------------------------------------------------------- */

const SCALE = { min: 1, max: 11 };
const pct = (u) => ((u - SCALE.min) / (SCALE.max - SCALE.min)) * 100;

const GANTT_PHASES = [
  { key: "get-started", start: 1, end: 3 },
  { key: "build-roll-out", start: 3, end: 8 },
  { key: "prove-expand", start: 8, end: 11 },
];
const GANTT_DOTS = [1, 3, 8, 11];
const GANTT_GRID = [2, 3, 4, 5, 6, 7, 8, 9, 10];

const BARS = [
  { week: "W1", label: "Introduction call", start: 1.0, end: 3.1, phase: "get-started" },
  { week: "W1", label: "Proposal & NDA", start: 2.0, end: 4.1, phase: "get-started" },
  { week: "W3", label: "Consolidate data", start: 3.1, end: 5.3, phase: "build-roll-out" },
  { week: "W4", label: "First draft", start: 4.5, end: 6.4, phase: "build-roll-out" },
  { week: "W5", label: "Revised draft", start: 5.6, end: 7.6, phase: "build-roll-out" },
  { week: "W6", label: "Pilot a process", start: 6.7, end: 8.6, phase: "build-roll-out" },
  { week: "W7", label: "Rollout & training", start: 7.7, end: 9.7, phase: "build-roll-out" },
  { week: "W8", label: "Track & improve", start: 8.5, end: 10.4, phase: "prove-expand" },
  { week: "W9", label: "Next workflow", start: 9.3, end: 11.0, phase: "prove-expand" },
];

function GanttChart() {
  const rowH = 44;
  return (
    <div className="overflow-x-auto" data-testid="engagement-gantt">
      <div className="min-w-[900px] px-4">
        {/* Phase headers */}
        <div className="relative h-8 mb-3">
          {GANTT_PHASES.map((p) => {
            const meta = PHASE_META[p.key];
            const left = pct(p.start);
            const width = pct(p.end) - pct(p.start);
            return (
              <div
                key={p.key}
                className="absolute top-0"
                style={{ left: `${left}%`, width: `${width}%` }}
              >
                <div className="flex items-center justify-center">
                  <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] ${meta.chip}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Axis */}
        <div className="relative h-4 mb-4">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-[#0A0A0A]" />
          {GANTT_DOTS.map((u) => (
            <span
              key={u}
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A0A0A] ring-4 ring-[#F5F0E8]"
              style={{ left: `${pct(u)}%` }}
            />
          ))}
          {/* Week numbers */}
          {GANTT_GRID.map((u) => (
            <span
              key={u}
              className="absolute top-full mt-1 -translate-x-1/2 text-[10px] text-[#0A0A0A]/45"
              style={{ left: `${pct(u)}%` }}
            >
              W{u - 1}
            </span>
          ))}
        </div>

        {/* Bars area */}
        <div className="relative mt-5" style={{ height: BARS.length * rowH }}>
          {/* Phase bands */}
          {GANTT_PHASES.map((p) => {
            const meta = PHASE_META[p.key];
            const bgTint = {
              "get-started": "rgba(232, 169, 75, 0.06)",
              "build-roll-out": "rgba(76, 99, 199, 0.06)",
              "prove-expand": "rgba(46, 150, 104, 0.06)",
            }[p.key];
            return (
              <div
                key={p.key}
                className="absolute top-0 bottom-0 rounded-md"
                style={{
                  left: `${pct(p.start)}%`,
                  width: `${pct(p.end) - pct(p.start)}%`,
                  background: bgTint,
                }}
              />
            );
          })}
          {/* Gridlines */}
          {GANTT_GRID.map((u) => (
            <div
              key={u}
              className="absolute top-0 bottom-0 w-px bg-[#0A0A0A]/[0.05]"
              style={{ left: `${pct(u)}%` }}
            />
          ))}
          {/* Task bars */}
          {BARS.map((b, i) => {
            const meta = PHASE_META[b.phase];
            return (
              <div
                key={b.label}
                className="absolute animate-fade-up"
                style={{
                  top: i * rowH + 4,
                  left: `${pct(b.start)}%`,
                  width: `${pct(b.end) - pct(b.start)}%`,
                  animationDelay: `${i * 55}ms`,
                }}
              >
                <div
                  className={`h-9 rounded-full flex items-center gap-2 px-3 overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.06)] ring-1 ${meta.ring}`}
                  style={{ background: meta.bar }}
                  title={b.label}
                >
                  <span className="text-[10px] font-semibold text-white/85 shrink-0 tracking-wide">{b.week}</span>
                  <span className="text-[11.5px] font-medium text-white truncate">{b.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- */
/* Small pieces                                                    */
/* -------------------------------------------------------------- */

function SchedulePreview() {
  return (
    <div
      className="relative rounded-2xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
      data-testid="engagement-hero-schedule"
    >
      {/* Header bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-[#F9F6F0]">
        <span className="flex gap-1">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E8A94B]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#4C63C7]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#2E9668]" />
        </span>
        <span className="text-[11px] font-medium tracking-wide text-[#0A0A0A]/55">
          engagement.schedule
        </span>
        <span className="ml-auto text-[10.5px] uppercase tracking-[0.14em] text-[#0A0A0A]/40">
          ~8 weeks
        </span>
      </div>

      {/* Rows */}
      <ul className="divide-y divide-line">
        {STEPS.map((s, i) => {
          const meta = PHASE_META[s.phase];
          return (
            <li
              key={s.title}
              className="flex items-center gap-3 px-4 py-2.5 animate-fade-up"
              style={{ animationDelay: `${120 + i * 45}ms` }}
            >
              <span className={`h-6 w-9 rounded-md grid place-items-center text-[10.5px] font-semibold text-white shrink-0`} style={{ background: meta.bar }}>
                W{s.n <= 2 ? 1 : s.n}
              </span>
              <span className="text-[13px] text-[#0A0A0A]/85 truncate flex-1">
                {s.title}
              </span>
              <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            </li>
          );
        })}
      </ul>

      {/* Footer */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-line bg-[#F9F6F0] text-[11.5px] text-[#0A0A0A]/60">
        <ShieldCheck size={13} className="text-emerald-600" />
        Pay nothing until it is deployed.
      </div>
    </div>
  );
}

function PhaseTag({ phase, className = "" }) {
  const meta = PHASE_META[phase];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] ${meta.chip} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
      {meta.label}
    </span>
  );
}

/* -------------------------------------------------------------- */
/* Vertical zig-zag timeline                                        */
/* -------------------------------------------------------------- */

function StepCard({ step, side }) {
  const meta = PHASE_META[step.phase];
  const SIcon = step.icon;
  return (
    <div
      className={`card-white p-6 hover:-translate-y-0.5 transition-transform relative ${side === "left" ? "lg:mr-8" : "lg:ml-8"}`}
      data-testid={`engagement-step-${step.week.toLowerCase().replace(/\s+/g, "-")}`}
    >
      {/* Connector arrow to spine (desktop) */}
      <span
        aria-hidden
        className={`hidden lg:block absolute top-8 h-px w-8 bg-line ${side === "left" ? "-right-8" : "-left-8"}`}
      />

      <div className="flex items-center gap-2.5 flex-wrap">
        <span className="h-9 w-9 rounded-lg border border-line bg-[#F5F0E8] grid place-items-center shrink-0">
          <SIcon size={16} />
        </span>
        <span className="inline-flex items-center rounded-full bg-[#0A0A0A] text-white text-[10.5px] font-medium px-2 py-0.5">
          {step.week}
        </span>
        {step.time && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#0A0A0A]/50">
            <Timer size={11} /> {step.time}
          </span>
        )}
        <PhaseTag phase={step.phase} className="ml-auto" />
      </div>

      <div className="mt-4 font-serif-display text-xl leading-tight">{step.title}</div>
      <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0A0A0A]/70">{step.body}</p>

      {step.points && (
        <ul className="mt-4 space-y-2">
          {step.points.map((p) => (
            <li key={p} className="flex items-start gap-2 text-[13px] text-[#0A0A0A]/80">
              <Check size={14} className="mt-0.5 shrink-0 text-emerald-600" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}

      {step.highlight && (
        <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0A0A0A] text-white text-[13px] px-3 py-2" data-testid="engagement-pay-on-value">
          <ShieldCheck size={15} className="text-emerald-400 shrink-0" />
          <span>{step.highlight}</span>
        </div>
      )}
    </div>
  );
}

function CheckinBanner() {
  return (
    <div
      className="relative rounded-2xl border border-line bg-white p-6 lg:p-7 overflow-hidden"
      data-testid="engagement-checkin-note"
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-[#0A0A0A]/[0.04] blur-2xl" aria-hidden />
      <div className="flex flex-col md:flex-row md:items-center gap-5">
        <span className="h-11 w-11 shrink-0 rounded-xl bg-[#0A0A0A] text-white grid place-items-center">
          <CalendarClock size={18} />
        </span>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] uppercase tracking-[0.18em] text-[#0A0A0A]/50">Every week, without fail</div>
          <div className="mt-1 font-serif-display text-xl leading-tight">Weekly check-in on progress</div>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-[#0A0A0A]/70 max-w-2xl">
            Every week we share where things stand, on a call, over Slack, or as a recorded Loom, whatever fits your team.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:justify-end">
          {CHECKIN_CHANNELS.map(({ icon: CIcon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-[#F9F6F0] px-3 py-1.5 text-[12px] text-[#0A0A0A]/75">
              <CIcon size={13} /> {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- */
/* Page                                                            */
/* -------------------------------------------------------------- */

export default function Engagement() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  // Group steps by phase for the zig-zag timeline, but keep global n for spine dots
  const grouped = React.useMemo(() => {
    const map = { "get-started": [], "build-roll-out": [], "prove-expand": [] };
    STEPS.forEach((s) => map[s.phase].push(s));
    return map;
  }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="engagement-page">
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO — asymmetric split with schedule preview
        ============================================================ */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-16 pb-10 lg:pb-14">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left: copy */}
              <div className="lg:col-span-7 animate-fade-up">
                <span className="kbd-chip" data-testid="engagement-eyebrow">
                  <Sparkles size={12} /> The engagement
                </span>

                <h1
                  className="mt-5 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight"
                  data-testid="engagement-heading"
                >
                  What working with FinBoard <span className="italic">looks like</span>.
                </h1>

                <p
                  className="mt-6 max-w-xl text-[15px] leading-relaxed text-[#0A0A0A]/75"
                  data-testid="engagement-subhead"
                >
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

                {/* Inline stat strip */}
                <div
                  className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 divide-x divide-line"
                  data-testid="engagement-glance"
                >
                  {GLANCE.map(({ icon: GIcon, value, label }, i) => (
                    <div key={label} className={`flex items-center gap-3 ${i > 0 ? "pl-8" : ""}`}>
                      <span className="h-9 w-9 rounded-lg border border-line bg-white grid place-items-center shrink-0">
                        <GIcon size={15} />
                      </span>
                      <div className="min-w-0">
                        <div className="font-serif-display text-lg leading-none tracking-tight">{value}</div>
                        <div className="mt-1 text-[11.5px] text-[#0A0A0A]/55 whitespace-nowrap">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: schedule preview */}
              <div className="lg:col-span-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
                <SchedulePreview />
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            TIMELINE — Gantt with phase-coded lanes
        ============================================================ */}
        <section id="timeline" className="scroll-mt-20 border-t border-line bg-[#F5F0E8]">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">The timeline</div>
                <h2 className="mt-3 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight">
                  From first call to <span className="italic">live workflow</span>.
                </h2>
                <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-[#0A0A0A]/60">
                  The engagement runs in three parts. One workflow, scoped, built, and rolled out in roughly eight weeks.
                </p>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(PHASE_META).map(([k, meta]) => (
                  <span key={k} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${meta.chip}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                    {meta.label} <span className="opacity-60 font-normal">· {meta.weeks}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Gantt chart */}
            <div className="mt-10 card-white p-5 lg:p-8">
              <GanttChart />
            </div>
          </div>
        </section>

        {/* ============================================================
            JOURNEY — vertical zig-zag timeline
        ============================================================ */}
        <section className="relative border-t border-line">
          <div className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
            <div className="max-w-2xl">
              <div className="text-xs uppercase tracking-[0.22em] text-[#0A0A0A]/50">Week by week</div>
              <h2 className="mt-3 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                Nine weeks, <span className="italic">one workflow</span> live.
              </h2>
              <p className="mt-4 text-[14px] leading-relaxed text-[#0A0A0A]/60">
                Every step below is a real meeting or deliverable. No surprises, no theatre — you always know what happens next.
              </p>
            </div>

            {/* Journey rail */}
            <div className="mt-14 relative" data-testid="engagement-detail">
              {/* Central spine (desktop only) */}
              <div aria-hidden className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-line" />

              {["get-started", "build-roll-out", "prove-expand"].map((phaseKey, phaseIdx) => {
                const meta = PHASE_META[phaseKey];
                return (
                  <div key={phaseKey} className="relative" data-testid={`engagement-phase-${phaseKey}`}>
                    {/* Phase divider */}
                    <div className={`relative flex items-center gap-4 ${phaseIdx === 0 ? "mb-8" : "my-14"}`}>
                      <div className="hidden lg:block flex-1 h-px bg-line" />
                      <div className="mx-auto flex items-center gap-3 rounded-full border border-line bg-white px-4 py-2 shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
                        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
                        <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-[#0A0A0A]/80">
                          {meta.label}
                        </span>
                        <span className="text-[11px] text-[#0A0A0A]/45">· {meta.weeks}</span>
                      </div>
                      <div className="hidden lg:block flex-1 h-px bg-line" />
                    </div>

                    {/* Check-in banner (only before build-roll-out) */}
                    {phaseKey === "build-roll-out" && (
                      <div className="mb-10">
                        <CheckinBanner />
                      </div>
                    )}

                    {/* Steps */}
                    <div className="space-y-10">
                      {grouped[phaseKey].map((step, i) => {
                        const side = i % 2 === 0 ? "left" : "right";
                        return (
                          <div
                            key={step.title}
                            className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch"
                          >
                            {/* Spine node (desktop) */}
                            <span
                              aria-hidden
                              className={`hidden lg:grid place-items-center absolute top-6 left-1/2 -translate-x-1/2 h-10 w-10 rounded-full border border-line bg-white shadow-[0_1px_2px_rgba(10,10,10,0.06)] ring-4 ring-[#F5F0E8]`}
                            >
                              <span className="font-serif-display text-sm font-semibold text-[#0A0A0A]/80">
                                {step.n}
                              </span>
                            </span>

                            {side === "left" ? (
                              <>
                                <StepCard step={step} side="left" />
                                <div className="hidden lg:block" />
                              </>
                            ) : (
                              <>
                                <div className="hidden lg:block" />
                                <StepCard step={step} side="right" />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============================================================
            CLOSING — dark card
        ============================================================ */}
        <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <div
            className="relative overflow-hidden rounded-3xl bg-[#0A0A0A] text-white p-10 lg:p-14"
            data-testid="engagement-closing"
          >
            {/* Decorative dots */}
            <div className="absolute inset-0 opacity-[0.06]" style={{
              backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} aria-hidden />
            <div className="relative grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">
                  Then we do it again
                </div>
                <h2 className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight">
                  One workflow live. <span className="italic text-white/80">Then the next.</span>
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
                  Each engagement lands one workflow, proves it on your numbers, and sets up the next. Over time, your finance stack quietly becomes AI-native, one deployed workflow at a time.
                </p>
              </div>
              <div className="lg:col-span-4 lg:justify-self-end">
                <button
                  onClick={openDemo}
                  data-testid="engagement-closing-cta"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[#0A0A0A] px-5 py-3 font-medium text-[15px] hover:bg-[#F5F0E8] transition-colors"
                >
                  Start with an intro call <ArrowRight size={16} />
                </button>
                <div className="mt-3 flex items-center gap-2 text-[12px] text-white/55">
                  <ShieldCheck size={13} className="text-emerald-400" />
                  Pay nothing until it is deployed
                </div>
              </div>
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
