import React from "react";
import {
  ArrowRight, Check, Handshake, ClipboardList, Layers,
  FileText, GitBranch, FlaskConical, Rocket, Target, Repeat,
  Phone, MessageSquare, Video, ShieldCheck, CalendarClock, Sparkles, Timer,
  ChevronDown,
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
  const rowH = 28;
  return (
    <div className="overflow-x-auto" data-testid="engagement-gantt">
      <div className="min-w-[820px] px-2">
        {/* Phase headers */}
        <div className="relative h-6 mb-2">
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
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9.5px] font-medium uppercase tracking-[0.14em] ${meta.chip}`}>
                    <span className={`h-1 w-1 rounded-full ${meta.dot}`} />
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Axis */}
        <div className="relative h-3 mb-3">
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
        <div className="relative mt-3" style={{ height: BARS.length * rowH }}>
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
                  className={`h-6 rounded-full flex items-center gap-1.5 px-2 overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.06)] ring-1 ${meta.ring}`}
                  style={{ background: meta.bar }}
                  title={b.label}
                >
                  <span className="text-[9.5px] font-semibold text-white/85 shrink-0 tracking-wide">{b.week}</span>
                  <span className="text-[10.5px] font-medium text-white truncate">{b.label}</span>
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
/* Spreadsheet-style plan table                                     */
/* -------------------------------------------------------------- */

/**
 * Grid layout (desktop):
 *   [ #row ][ WEEK ][ PHASE ][ MILESTONE ][ WHAT HAPPENS ][ DETAILS ]
 *   40px    88px     150px     220px         1fr             90px
 */
const CELL_BASE =
  "px-3 py-2.5 text-[12.5px] leading-snug border-r border-line last:border-r-0";
const HEADER_CELL_BASE =
  "px-3 py-2 text-[10px] uppercase tracking-[0.16em] font-semibold text-[#0A0A0A]/55 bg-[#EFEAE0] border-r border-line last:border-r-0 select-none";
const ROW_GRID =
  "grid grid-cols-[40px_88px_150px_220px_1fr_90px] min-w-[820px]";

function SheetToolbar({ onExpandAll, allExpanded }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 border-b border-line bg-white">
      {/* Traffic light dots */}
      <span className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#E8A94B]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#4C63C7]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#2E9668]" />
      </span>

      {/* File name */}
      <div className="flex items-center gap-2 text-[12px] text-[#0A0A0A]/70">
        <span className="font-mono text-[#0A0A0A]/90">engagement_plan.xlsx</span>
        <span className="text-[#0A0A0A]/35">·</span>
        <span className="text-[11.5px] text-[#0A0A0A]/50">9 rows · 6 cols</span>
      </div>

      {/* Right side actions */}
      <div className="ml-auto flex items-center gap-2">
        <button
          type="button"
          onClick={onExpandAll}
          className="text-[11.5px] px-2 py-1 rounded border border-line bg-white hover:bg-[#F9F6F0] transition-colors text-[#0A0A0A]/70"
        >
          {allExpanded ? "Collapse all" : "Expand all"}
        </button>
      </div>
    </div>
  );
}

function ColumnHeader() {
  return (
    <div className={`${ROW_GRID} border-b border-line`}>
      <div className={`${HEADER_CELL_BASE} text-center bg-[#EFEAE0]`}>#</div>
      <div className={HEADER_CELL_BASE}>Week</div>
      <div className={HEADER_CELL_BASE}>Phase</div>
      <div className={HEADER_CELL_BASE}>Milestone</div>
      <div className={HEADER_CELL_BASE}>What happens</div>
      <div className={`${HEADER_CELL_BASE} text-center`}>Details</div>
    </div>
  );
}

function AnnotationRow({ children, tone = "get-started" }) {
  const meta = PHASE_META[tone];
  return (
    <div className="border-b border-line grid grid-cols-[40px_1fr] min-w-[820px]">
      <div
        className="border-r border-line bg-[#EFEAE0] flex items-center justify-center"
        aria-hidden
      >
        <span className={`h-2 w-2 rounded-full ${meta.dot}`} />
      </div>
      <div className="px-3 py-2 flex items-center gap-3">{children}</div>
    </div>
  );
}

function PhaseBandRow({ phaseKey }) {
  const meta = PHASE_META[phaseKey];
  return (
    <AnnotationRow tone={phaseKey}>
      <span
        className={`inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[10.5px] font-medium uppercase tracking-[0.16em] ${meta.chip}`}
      >
        {meta.label}
      </span>
      <span className="text-[11.5px] text-[#0A0A0A]/55 font-mono">{meta.weeks}</span>
    </AnnotationRow>
  );
}

function CheckinRow() {
  return (
    <div
      className="border-b border-line grid grid-cols-[40px_1fr] min-w-[820px] bg-[#FBF7EF]"
      data-testid="engagement-checkin-note"
    >
      <div className="border-r border-line bg-[#EFEAE0] flex items-center justify-center" aria-hidden>
        <CalendarClock size={12} className="text-[#0A0A0A]/60" />
      </div>
      <div className="px-3 py-2 flex flex-wrap items-center gap-x-3 gap-y-1">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0A0A0A]/80">
          Note
        </span>
        <span className="text-[12.5px] text-[#0A0A0A]/80">
          <span className="font-semibold">Weekly check-in</span>{" "}
          <span className="text-[#0A0A0A]/60">
            — every week, whichever fits your team.
          </span>
        </span>
        <span className="ml-auto flex flex-wrap gap-1.5">
          {CHECKIN_CHANNELS.map(({ icon: CIcon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1 rounded border border-line bg-white px-1.5 py-0.5 text-[10.5px] text-[#0A0A0A]/70"
            >
              <CIcon size={10} /> {label}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}

function SpreadsheetRow({ step, expanded, onToggle, rowIndex }) {
  const meta = PHASE_META[step.phase];
  const SIcon = step.icon;
  const isExpandable = Boolean(step.points || step.highlight);
  const detailCount = (step.points ? step.points.length : 0) + (step.highlight ? 1 : 0);

  return (
    <div
      className="border-b border-line last:border-b-0"
      data-testid={`engagement-step-${step.week.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div
        className={`${ROW_GRID} group ${isExpandable ? "cursor-pointer hover:bg-[#FBF7EF]" : ""} ${expanded ? "bg-[#FBF7EF]" : "bg-white"} transition-colors`}
        onClick={isExpandable ? onToggle : undefined}
        role={isExpandable ? "button" : undefined}
        aria-expanded={isExpandable ? expanded : undefined}
      >
        {/* Row number gutter */}
        <div className="px-2 py-2.5 bg-[#EFEAE0] border-r border-line text-center text-[11px] font-mono text-[#0A0A0A]/55 select-none group-hover:bg-[#E5E0D2]">
          {rowIndex}
        </div>

        {/* Week */}
        <div className={CELL_BASE}>
          <div className="font-mono font-medium text-[#0A0A0A]">{step.week}</div>
          {step.time && (
            <div className="mt-0.5 inline-flex items-center gap-1 text-[10.5px] text-[#0A0A0A]/50">
              <Timer size={10} /> {step.time}
            </div>
          )}
        </div>

        {/* Phase */}
        <div className={CELL_BASE}>
          <span
            className={`inline-flex items-center gap-1.5 rounded-sm border px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] ${meta.chip}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>

        {/* Milestone */}
        <div className={`${CELL_BASE} flex items-center gap-2`}>
          <span className="h-6 w-6 shrink-0 rounded-sm border border-line bg-[#F5F0E8] grid place-items-center">
            <SIcon size={12} />
          </span>
          <span className="font-semibold text-[#0A0A0A] truncate">{step.title}</span>
        </div>

        {/* What happens */}
        <div className={`${CELL_BASE} text-[#0A0A0A]/75`}>
          <span className="line-clamp-2">{step.body}</span>
        </div>

        {/* Details */}
        <div className={`${CELL_BASE} text-center`}>
          {isExpandable ? (
            <span
              className={`inline-flex items-center gap-1 rounded-sm border px-1.5 py-1 text-[10.5px] font-mono transition-colors ${expanded ? "bg-[#0A0A0A] text-white border-[#0A0A0A]" : "bg-white text-[#0A0A0A]/70 border-line"}`}
            >
              <ChevronDown
                size={11}
                className={`transition-transform ${expanded ? "rotate-180" : ""}`}
              />
              {detailCount}
            </span>
          ) : (
            <span className="text-[#0A0A0A]/30 font-mono text-[11px]">—</span>
          )}
        </div>
      </div>

      {/* Expanded detail row */}
      {isExpandable && expanded && (
        <div
          className="grid grid-cols-[40px_1fr] min-w-[820px] border-t border-line bg-[#FBF7EF] animate-fade-up"
        >
          <div className="bg-[#EFEAE0] border-r border-line" aria-hidden />
          <div className="px-4 py-4">
            {step.points && (
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-[#0A0A0A]/55 mb-2">
                  Agenda / deliverables
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2 text-[12.5px] text-[#0A0A0A]/80"
                    >
                      <Check size={12} className="mt-0.5 shrink-0 text-emerald-600" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {step.highlight && (
              <div
                className="mt-3 inline-flex items-center gap-2 rounded bg-[#0A0A0A] text-white text-[12px] px-2.5 py-1.5"
                data-testid="engagement-pay-on-value"
              >
                <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
                <span>{step.highlight}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SheetTabs() {
  return (
    <div className="flex items-center gap-1 px-3 py-1.5 border-t border-line bg-[#EFEAE0]">
      {Object.entries(PHASE_META).map(([k, meta], i) => (
        <span
          key={k}
          className={`inline-flex items-center gap-1.5 rounded-t-sm px-2 py-1 text-[10.5px] font-mono ${
            i === 0
              ? "bg-white text-[#0A0A0A] border-t border-x border-line -mb-px"
              : "text-[#0A0A0A]/55 hover:bg-white/60"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
          {meta.label}
        </span>
      ))}
      <span className="ml-auto text-[10.5px] font-mono text-[#0A0A0A]/40">
        Sheet 1 of 1
      </span>
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

  // Ordered phase keys for compact timeline
  const PHASE_ORDER = ["get-started", "build-roll-out", "prove-expand"];

  // Track expanded rows (default: expand rows with rich content, i.e. Week 1 items)
  const [expandedRows, setExpandedRows] = React.useState(() => {
    const s = new Set();
    STEPS.forEach((step) => {
      if (step.points || step.highlight) s.add(step.n);
    });
    return s;
  });
  const toggleRow = (n) =>
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="engagement-page">
      <Navbar onBookDemo={openDemo} />

      <main>
        {/* ============================================================
            HERO — stacked: copy on top, Gantt below, all in one view
        ============================================================ */}
        <section className="relative overflow-hidden">
          <div className="grain absolute inset-0" />
          <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-4 lg:pt-6 pb-4 lg:pb-6">
            {/* Copy row */}
            <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-center">
              <div className="lg:col-span-7 animate-fade-up">
                <span className="kbd-chip" data-testid="engagement-eyebrow">
                  <Sparkles size={11} /> The engagement
                </span>

                <h1
                  className="mt-2 font-serif-display text-2xl sm:text-[1.6rem] leading-[1.1] tracking-tight"
                  data-testid="engagement-heading"
                >
                  What working with FinBoard <span className="italic">looks like</span>.
                </h1>

                <p
                  className="mt-2 max-w-[62ch] text-[12.5px] leading-[1.55] text-[#0A0A0A]/75"
                  data-testid="engagement-subhead"
                >
                  A forward-deployed team that goes from the first call to a live workflow in about eight weeks. Weekly check-ins, and you pay nothing until it is deployed.
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={openDemo}
                    data-testid="engagement-book-demo-button"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#0A0A0A] text-white px-3.5 py-2 text-[12.5px] font-medium hover:bg-[#1A1A1A] transition-colors"
                  >
                    Book an intro call <ArrowRight size={13} />
                  </button>
                  <a
                    href="#plan"
                    data-testid="engagement-timeline-link"
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[12.5px] font-medium hover:bg-[#F5F0E8] transition-colors"
                  >
                    See the plan
                  </a>
                </div>
              </div>

              {/* Right: compact 3-metric row */}
              <div
                className="lg:col-span-5 animate-fade-up"
                style={{ animationDelay: "120ms" }}
                data-testid="engagement-glance"
              >
                <div className="grid grid-cols-3 gap-0 rounded-lg border border-line bg-white overflow-hidden divide-x divide-line">
                  {GLANCE.map(({ icon: GIcon, value, label }) => (
                    <div key={label} className="p-2.5 flex items-start gap-2">
                      <span className="mt-0.5 text-[#0A0A0A]/55 shrink-0">
                        <GIcon size={12} />
                      </span>
                      <div className="min-w-0">
                        <div className="font-serif-display text-[0.95rem] leading-none tracking-tight">
                          {value}
                        </div>
                        <div className="mt-1 text-[10px] text-[#0A0A0A]/55 leading-snug">
                          {label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Gantt — visual hero, full width */}
            <div
              id="timeline"
              className="scroll-mt-20 mt-3 lg:mt-4 animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <div className="rounded-xl border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04)]">
                {/* Card header with title + legend */}
                <div className="flex flex-wrap items-center justify-between gap-2 px-3 lg:px-4 py-2 border-b border-line bg-[#F9F6F0]">
                  <div className="flex items-baseline gap-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#0A0A0A]/60">
                      The timeline
                    </div>
                    <div className="text-[11px] text-[#0A0A0A]/55">
                      First call to live workflow · ~8 weeks
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex flex-wrap items-center gap-1">
                    {Object.entries(PHASE_META).map(([k, meta]) => (
                      <span
                        key={k}
                        className={`inline-flex items-center gap-1 rounded-full border px-1.5 py-0.5 text-[9.5px] font-medium ${meta.chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${meta.dot}`} />
                        {meta.label}
                        <span className="opacity-60 font-normal">· {meta.weeks}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gantt body */}
                <div className="p-3 lg:p-4">
                  <GanttChart />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            JOURNEY — spreadsheet-style plan
        ============================================================ */}
        <section id="plan" className="scroll-mt-20 relative border-t border-line">
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

            {/* Spreadsheet-style plan table */}
            <div
              className="mt-10 rounded-lg border border-line bg-white overflow-hidden shadow-[0_1px_2px_rgba(10,10,10,0.04)]"
              data-testid="engagement-detail"
            >
              <SheetToolbar
                allExpanded={STEPS.filter((s) => s.points || s.highlight).every((s) => expandedRows.has(s.n))}
                onExpandAll={() => {
                  const rich = STEPS.filter((s) => s.points || s.highlight).map((s) => s.n);
                  const allExpanded = rich.every((n) => expandedRows.has(n));
                  if (allExpanded) setExpandedRows(new Set());
                  else setExpandedRows(new Set(rich));
                }}
              />

              <div className="overflow-x-auto">
                <ColumnHeader />
                {PHASE_ORDER.map((phaseKey) => {
                  const phaseSteps = STEPS.filter((s) => s.phase === phaseKey);
                  return (
                    <div key={phaseKey} data-testid={`engagement-phase-${phaseKey}`}>
                      <PhaseBandRow phaseKey={phaseKey} />
                      {phaseKey === "build-roll-out" && <CheckinRow />}
                      {phaseSteps.map((step, idx) => (
                        <SpreadsheetRow
                          key={step.n}
                          step={step}
                          rowIndex={step.n}
                          expanded={expandedRows.has(step.n)}
                          onToggle={() => toggleRow(step.n)}
                        />
                      ))}
                    </div>
                  );
                })}
              </div>

              <SheetTabs />
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11.5px] text-[#0A0A0A]/50 font-mono">
              <span>▲</span>
              <span>Click any row with a details chip to open its cells.</span>
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
