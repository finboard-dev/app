import React from "react";
import { Linkedin, UsersRound, Briefcase, Cpu, GraduationCap, Award, ArrowUpRight } from "lucide-react";

const team = [
  {
    name: "Vaishnav Gupta",
    role: "Co-founder · Finance",
    tag: { icon: Briefcase, label: "Finance leader" },
    photo: "/team/vaishnav.webp",
    photoPos: "center 20%",
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
    photoPos: "center 22%",
    photoScale: 1.25,
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT — intro rail */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="kbd-chip" data-testid="team-eyebrow">
              <UsersRound size={12} /> Team
            </div>
            <h2
              className="mt-3 font-serif-display text-3xl sm:text-4xl leading-[1.05] tracking-tight"
              data-testid="team-heading"
            >
              The people building your <span className="italic">finance stack.</span>
            </h2>
            <p className="mt-4 text-[14px] text-[#0A0A0A]/70 leading-relaxed">
              One finance operator who&apos;s lived the multi-entity close. One systems engineer who ships production-grade software. Together, embedded with your team.
            </p>

            <div className="mt-6 border-t border-line pt-4 space-y-2 text-[12px] text-[#0A0A0A]/70">
              <div className="uppercase tracking-[0.18em] text-[#0A0A0A]/45 text-[10px]">Combined experience</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> 20+ years finance transformation</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> Product & engineering at scale</div>
              <div className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#0A0A0A]" /> Peer-reviewed research</div>
            </div>
          </aside>

          {/* RIGHT — team cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
            {team.map((p, i) => {
              const TagIcon = p.tag.icon;
              return (
                <article
                  key={p.name}
                  data-testid={`team-card-${i}`}
                  className="group relative overflow-hidden rounded-2xl border border-line bg-[#F5F0E8] hover:-translate-y-0.5 transition-transform duration-300"
                >
                  {/* Photo */}
                  <div className="relative">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDE6DA]">
                      <img
                        src={p.photo}
                        alt={p.name}
                        data-testid={`team-card-${i}-photo`}
                        className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                        style={{ objectPosition: p.photoPos, transform: p.photoScale ? `scale(${p.photoScale})` : undefined, transformOrigin: "center top" }}
                        loading="lazy"
                      />
                    </div>

                    <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 backdrop-blur border border-line text-[10px] font-medium">
                      <TagIcon size={11} /> {p.tag.label}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1">
                      {p.brands.map((b) => (
                        <span
                          key={b}
                          className="text-[9px] uppercase tracking-[0.14em] px-1.5 py-0.5 rounded-full bg-[#0A0A0A]/85 text-white backdrop-blur"
                        >
                          ex-{b}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="text-[9px] uppercase tracking-[0.14em] text-[#0A0A0A]/50">
                      {p.role}
                    </div>
                    <h3 className="mt-0.5 font-serif-display text-xl leading-tight tracking-tight">
                      {p.name}
                    </h3>

                    <p className="mt-2 text-[12.5px] text-[#0A0A0A]/78 leading-relaxed">
                      {p.story}
                    </p>

                    <ul className="mt-3 space-y-1.5 border-t border-line pt-3">
                      {p.highlights.map((h) => {
                        const Icon = h.icon;
                        return (
                          <li key={h.text} className="flex items-center gap-2 text-[11.5px] text-[#0A0A0A]/75">
                            <span className="h-4 w-4 rounded-md border border-line bg-white grid place-items-center shrink-0">
                              <Icon size={10} />
                            </span>
                            {h.text}
                          </li>
                        );
                      })}
                    </ul>

                    <a
                      href={p.linkedin}
                      data-testid={`team-card-${i}-linkedin`}
                      className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-medium border-b border-[#0A0A0A] pb-0.5 hover:opacity-70 transition-opacity"
                    >
                      <Linkedin size={11} /> Connect on LinkedIn <ArrowUpRight size={11} />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
