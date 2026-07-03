import React from "react";
import { Linkedin, UsersRound, Briefcase, Cpu, GraduationCap, Award, ArrowUpRight } from "lucide-react";

const team = [
  {
    name: "Vaishnav Gupta",
    role: "Co-founder · Finance",
    tag: { icon: Briefcase, label: "Finance leader" },
    photo: "/team/vaishnav.webp",
    story: "Led finance transformations for Fortune 500 groups at PwC. Then ran tax & payroll product at Rippling — shipping systems that moved billions.",
    highlights: [
      { icon: GraduationCap, text: "PwC · Finance Transformation" },
      { icon: Briefcase,     text: "Rippling · Tax & Payroll leader" },
      { icon: Award,         text: "10+ years advising CFOs" },
    ],
    brands: ["PwC", "Rippling"],
    linkedin: "#",
  },
  {
    name: "Ujjwal Singh",
    role: "Co-founder · Engineering",
    tag: { icon: Cpu, label: "Tech leader" },
    photo: "/team/ujjwal.webp",
    story: "Built distributed learning systems at MindTickle and shipped R&D at Samsung. Published peer-reviewed work on search & ranking algorithms.",
    highlights: [
      { icon: Cpu,           text: "MindTickle · Tech Lead" },
      { icon: Cpu,           text: "Samsung R&D · Systems" },
      { icon: Award,         text: "Published: search algorithms" },
    ],
    brands: ["MindTickle", "Samsung"],
    linkedin: "#",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="max-w-2xl">
          <div className="kbd-chip" data-testid="team-eyebrow">
            <UsersRound size={12} /> Team
          </div>
          <h2
            className="mt-4 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight"
            data-testid="team-heading"
          >
            The people building your <span className="italic">finance stack.</span>
          </h2>
          <p className="mt-4 text-[#0A0A0A]/70 leading-relaxed max-w-xl">
            One finance operator who&apos;s lived the multi-entity close. One systems engineer who ships production-grade software. Together, embedded with your team.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5 max-w-3xl">
          {team.map((p, i) => {
            const TagIcon = p.tag.icon;
            return (
              <article
                key={p.name}
                data-testid={`team-card-${i}`}
                className="group relative overflow-hidden rounded-2xl border border-line bg-[#F5F0E8] hover:-translate-y-1 transition-transform duration-300"
              >
                {/* Photo section */}
                <div className="relative">
                  <div className="aspect-[5/3] w-full overflow-hidden bg-[#EDE6DA]">
                    <img
                      src={p.photo}
                      alt={p.name}
                      data-testid={`team-card-${i}-photo`}
                      className="h-full w-full object-cover object-[center_18%] transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>

                  {/* Discipline tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur border border-line text-[11px] font-medium">
                    <TagIcon size={12} /> {p.tag.label}
                  </div>

                  {/* Brand pill row on image bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    {p.brands.map((b) => (
                      <span
                        key={b}
                        className="text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 rounded-full bg-[#0A0A0A]/85 text-white backdrop-blur"
                      >
                        ex-{b}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Info section */}
                <div className="p-4 lg:p-5">
                  <div className="text-[10px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">
                    {p.role}
                  </div>
                  <h3 className="mt-0.5 font-serif-display text-2xl leading-tight tracking-tight">
                    {p.name}
                  </h3>

                  <p className="mt-2.5 text-[13px] text-[#0A0A0A]/80 leading-relaxed">
                    {p.story}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-line pt-3">
                    {p.highlights.map((h) => {
                      const Icon = h.icon;
                      return (
                        <li key={h.text} className="flex items-center gap-2 text-[12px] text-[#0A0A0A]/75">
                          <span className="h-5 w-5 rounded-md border border-line bg-white grid place-items-center shrink-0">
                            <Icon size={11} />
                          </span>
                          {h.text}
                        </li>
                      );
                    })}
                  </ul>

                  <a
                    href={p.linkedin}
                    data-testid={`team-card-${i}-linkedin`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium border-b border-[#0A0A0A] pb-0.5 hover:opacity-70 transition-opacity"
                  >
                    <Linkedin size={12} /> Connect on LinkedIn <ArrowUpRight size={12} />
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {/* Signal footer */}
        <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-[#0A0A0A]/55 border-t border-line pt-6">
          <span className="uppercase tracking-[0.18em]">Combined experience</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> 20+ years finance transformation</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> Product & engineering at scale</span>
          <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> Peer-reviewed research</span>
        </div>
      </div>
    </section>
  );
}
