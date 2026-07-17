"use client";

import React from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTABand from "@/components/landing/CTABand";
import BookDemoDialog from "@/components/landing/BookDemoDialog";
import {
  AUDIENCES,
  FORMATS,
  groupByMonth,
  monthAbbr,
  dayRange,
} from "@/lib/conferences-meta";

const ALL = "all";

function formatUpdated(value) {
  if (!value) return null;
  const dt = new Date(value);
  if (Number.isNaN(dt.getTime())) return value;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

// Small filter chip shared by the audience and format rows.
function Chip({ active, onClick, children, count, testid }) {
  return (
    <button
      type="button"
      data-testid={testid}
      onClick={onClick}
      className={`text-[12.5px] px-3.5 py-1.5 rounded-full border transition-colors ${
        active
          ? "bg-[#0A0A0A] text-white border-[#0A0A0A]"
          : "bg-white text-[#0A0A0A]/70 border-line-strong hover:border-[#0A0A0A]/40"
      }`}
    >
      {children}
      {count != null ? (
        <span className={active ? "ml-1.5 text-white/60" : "ml-1.5 text-[#0A0A0A]/40"}>{count}</span>
      ) : null}
    </button>
  );
}

function AudienceTag({ audience }) {
  const meta = AUDIENCES[audience];
  if (!meta) return null;
  return (
    <span
      className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border"
      style={{ color: meta.accent, borderColor: `${meta.accent}33`, backgroundColor: `${meta.accent}0d` }}
    >
      {meta.label}
    </span>
  );
}

function TopicTag({ children }) {
  return (
    <span className="text-[10.5px] font-semibold px-2.5 py-0.5 rounded-full border text-[#0891B2] border-[#0891B233] bg-[#0891B20d]">
      {children}
    </span>
  );
}

function EventCard({ ev }) {
  return (
    <a
      href={ev.url}
      target="_blank"
      rel="noopener"
      data-testid={`conference-${ev.id}`}
      className="group grid grid-cols-[76px_1fr] sm:grid-cols-[88px_1fr_auto] gap-4 sm:gap-5 items-center bg-white border border-line rounded-2xl px-5 py-4 mb-3 transition-all hover:border-line-strong hover:-translate-y-px hover:shadow-[0_14px_30px_-18px_rgba(10,10,10,0.25)]"
    >
      <span className="border border-line rounded-xl overflow-hidden text-center bg-white shadow-[0_6px_16px_-10px_rgba(10,10,10,0.25)]">
        <span className="block bg-[#2563EB] text-white text-[9.5px] font-bold tracking-[0.18em] py-1">
          {monthAbbr(ev.startDate)}
        </span>
        <span className="block text-[18px] font-bold tracking-tight tabular-nums pt-2 px-1">
          {dayRange(ev.startDate, ev.endDate)}
        </span>
        <span className="block text-[10px] font-medium text-[#0A0A0A]/40 pb-2">
          {ev.startDate.slice(0, 4)}
        </span>
      </span>

      <span className="min-w-0">
        <span className="block text-[16px] font-semibold tracking-tight leading-snug">
          {ev.name}
        </span>
        <span className="mt-1 flex items-center gap-1.5 text-[13px] text-[#0A0A0A]/55">
          <MapPin size={13} className="shrink-0 text-[#0A0A0A]/40" />
          {[ev.venue, ev.city, ev.country].filter(Boolean).join(", ")}
        </span>
        <span className="mt-2.5 flex flex-wrap gap-1.5">
          {ev.audiences.map((a) => (
            <AudienceTag key={a} audience={a} />
          ))}
          {(ev.topics ?? []).map((t) => (
            <TopicTag key={t}>{t}</TopicTag>
          ))}
        </span>
      </span>

      <span className="hidden sm:flex flex-col items-end gap-2">
        <span className="inline-flex items-center gap-1 text-[12.5px] font-semibold border border-line-strong rounded-lg px-3.5 py-2 whitespace-nowrap transition-colors group-hover:bg-[#0A0A0A] group-hover:text-white group-hover:border-[#0A0A0A]">
          Register <ArrowUpRight size={13} />
        </span>
        <span className="text-[11px] text-[#0A0A0A]/45">{FORMATS[ev.format]?.label}</span>
      </span>
    </a>
  );
}

export default function ConferencesCalendar({ events = [], updated }) {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const [audience, setAudience] = React.useState(ALL);
  const [format, setFormat] = React.useState(ALL);
  const openDemo = () => setDemoOpen(true);

  const audienceCounts = React.useMemo(() => {
    const counts = {};
    for (const key of Object.keys(AUDIENCES)) {
      counts[key] = events.filter((e) => e.audiences.includes(key)).length;
    }
    return counts;
  }, [events]);

  const visible = events.filter(
    (e) =>
      (audience === ALL || e.audiences.includes(audience)) &&
      (format === ALL || e.format === format)
  );
  const months = groupByMonth(visible);

  // Month rail entries grouped by year, from the filtered set so counts match.
  const years = React.useMemo(() => {
    const byYear = new Map();
    for (const m of months) {
      if (!byYear.has(m.year)) byYear.set(m.year, []);
      byYear.get(m.year).push(m);
    }
    return Array.from(byYear, ([year, list]) => ({ year, months: list }));
  }, [months]);

  const updatedLabel = formatUpdated(updated);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A] scroll-smooth" data-testid="conferences-page">
      <Navbar onBookDemo={openDemo} />
      <main>
        <section className="max-w-6xl mx-auto px-6 lg:px-8 pt-9 pb-16">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] font-semibold text-[#2563EB] mb-2.5">
                Resources · Community
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl tracking-tight leading-none">
                Conferences<span className="text-[#2563EB]">.</span>
              </h1>
            </div>
            {updatedLabel ? (
              <span className="inline-flex items-center gap-2 text-[11.5px] font-medium text-[#0A0A0A]/60 bg-white border border-line rounded-full px-3.5 py-1.5 mb-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
                Updated {updatedLabel}
              </span>
            ) : null}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2" data-testid="conference-filters">
            <Chip
              testid="conf-filter-all"
              active={audience === ALL}
              onClick={() => setAudience(ALL)}
              count={events.length}
            >
              All
            </Chip>
            {Object.entries(AUDIENCES).map(([key, meta]) => (
              <Chip
                key={key}
                testid={`conf-filter-${key}`}
                active={audience === key}
                onClick={() => setAudience(audience === key ? ALL : key)}
                count={audienceCounts[key]}
              >
                {meta.label}
              </Chip>
            ))}
            <span className="w-px self-stretch my-1 mx-1.5 hidden sm:block" style={{ backgroundColor: "var(--line-strong)" }} />
            {Object.entries(FORMATS).map(([key, meta]) => (
              <Chip
                key={key}
                testid={`conf-format-${key}`}
                active={format === key}
                onClick={() => setFormat(format === key ? ALL : key)}
              >
                {meta.label}
              </Chip>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-[150px_1fr] gap-9">
            <nav
              className="hidden md:block sticky top-24 self-start bg-white/60 border border-line rounded-2xl px-3 py-4"
              data-testid="conference-month-rail"
            >
              {years.map(({ year, months: list }) => (
                <div key={year}>
                  <div className="text-[10px] font-bold tracking-[0.18em] text-[#0A0A0A]/40 mt-4 mb-1.5 px-2 first:mt-0">
                    {year}
                  </div>
                  {list.map((m) => (
                    <a
                      key={m.key}
                      href={`#m-${m.key}`}
                      className="flex items-center justify-between text-[13px] text-[#0A0A0A]/65 px-2.5 py-1.5 rounded-lg hover:bg-sand hover:text-[#0A0A0A] transition-colors"
                    >
                      <span>{m.month}</span>
                      <span className="text-[10.5px] tabular-nums bg-sand border border-line rounded-full px-1.5 min-w-[20px] text-center text-[#0A0A0A]/55">
                        {m.events.length}
                      </span>
                    </a>
                  ))}
                </div>
              ))}
            </nav>

            <div>
              {months.length === 0 ? (
                <p className="text-[14px] text-[#0A0A0A]/55 py-10">
                  No events match those filters yet. New dates are added as they are announced.
                </p>
              ) : (
                months.map((m) => (
                  <section key={m.key} id={`m-${m.key}`} className="mb-10 scroll-mt-24">
                    <div className="flex items-baseline gap-2.5 mb-4">
                      <h2 className="font-serif-display text-[21px] tracking-tight">{m.month}</h2>
                      <span className="text-[13px] font-semibold text-[#0A0A0A]/35">{m.year}</span>
                      <span className="flex-1 self-center h-px" style={{ backgroundColor: "var(--line-strong)" }} />
                      <span className="text-[11px] font-medium text-[#0A0A0A]/40">
                        {m.events.length} {m.events.length === 1 ? "event" : "events"}
                      </span>
                    </div>
                    {m.events.map((ev) => (
                      <EventCard key={ev.id} ev={ev} />
                    ))}
                  </section>
                ))
              )}
              <p className="text-[12px] leading-relaxed text-[#0A0A0A]/45 max-w-2xl">
                Dates and venues come from each event's official site and can change.
                Confirm on the organizer's site before booking travel. This calendar is
                curated by the FinBoard team and updated as new dates are announced.
              </p>
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
