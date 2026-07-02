import React from "react";
import { Linkedin, UsersRound } from "lucide-react";

const team = [
  {
    name: "Vaishnav Gupta",
    role: "Co-founder",
    bio: "Former consultant at PwC — led finance transformations for Fortune 500 companies. Former tax and payroll leader at Rippling.",
    photo: "/team/vaishnav.webp",
    accent: "#0A0A0A",
  },
  {
    name: "Ujjwal Singh",
    role: "Co-founder",
    bio: "Former Tech Leader at MindTickle and Samsung R&D. Published scientific journals on search algorithms.",
    photo: "/team/ujjwal.webp",
    accent: "#2563EB",
  },
];

export default function Team() {
  return (
    <section id="team" className="relative bg-white border-y border-line">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="kbd-chip" data-testid="team-eyebrow"><UsersRound size={12} /> Team</div>
            <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="team-heading">
              Built by finance and engineering veterans.
            </h2>
            <p className="mt-5 text-[#0A0A0A]/70 leading-relaxed">
              Ex-PwC, Rippling, MindTickle and Samsung. We&apos;ve run the finance transformations, shipped the software, and lived the pain of multi-entity operations. Now we&apos;re embedded with your team.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {team.map((p, i) => (
              <div
                key={p.name}
                data-testid={`team-card-${i}`}
                className="rounded-xl border border-line bg-[#F5F0E8] p-6 flex gap-4 hover:-translate-y-0.5 transition-transform"
              >
                <img
                  src={p.photo}
                  alt={p.name}
                  data-testid={`team-card-${i}-photo`}
                  className="h-20 w-20 rounded-full border border-line shrink-0 object-cover"
                  style={{ objectPosition: "center 20%" }}
                  loading="lazy"
                />
                <div className="min-w-0">
                  <div className="font-serif-display text-2xl leading-tight tracking-tight">{p.name}</div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#0A0A0A]/50">{p.role}</div>
                  <div className="mt-2 text-sm text-[#0A0A0A]/75 leading-relaxed">{p.bio}</div>
                  <a
                    href="#"
                    data-testid={`team-card-${i}-linkedin`}
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-[#0A0A0A]/60 hover:text-[#0A0A0A] transition-colors"
                  >
                    <Linkedin size={12} /> LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
