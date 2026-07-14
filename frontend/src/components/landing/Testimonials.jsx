import React from "react";
import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "I love this app. My business has a lot of customized reporting needs based upon classes, and I used to spend 40+ hours a month just on getting the reporting right - pulling reports, uploading that data and combining it with budget numbers, reviewing those with department managers, going back into QBO with changes, redownloading reports, reuploading that data, etc. FinBoard has shaved that time down to a fraction. What used to take me 5-10 hours just in set up time alone now takes me less than 1. Changes I make in QBO can be immediately updated in real time with a click of a button in the report in GDrive, making full reviews efficient. The customized consolidated reporting is fantastic for owners who don't need to see the nitty-gritty detail on a regular basis and want a more sweeping view of our financial performance. The team is incredibly responsive; if there's a report you need, all you have to do is ask, and they are on top of it. Given how well the app works and how much time it has saved me, it's well worth the fairly nominal monthly cost.",
    name: "Amanda",
    role: "Three Wide Brewing Co",
  },
  {
    quote:
      "This app made our team 10x efficient. We have a client owning multiple businesses with separate Charts of Accounts and requires a combined financial statement at the end of each month. Their consolidation feature is incredible, simplifying this complexity in just a few clicks. We've also set up base templates in their software for recurring reports, allowing us to generate monthly reports effortlessly.",
    name: "CPA Corner Group",
    role: "Accounting firm",
  },
  {
    quote:
      "I've used a lot of financial dashboards and reporting tools over the years and FinBoard is easily one of the best I've come across. What makes it stand out is how practical it is. It integrates cleanly with QuickBooks Online, but more importantly, it connects seamlessly with Google Sheets. That means I can layer in my own formulas, build custom logic, and still have everything automatically update as our QBO data changes. Most tools either lock you into their way of thinking or turn customization into a nightmare. FinBoard hits the sweet spot: structured enough to be reliable, flexible enough to actually be useful in the real world. This is exactly what I was looking for, a live financial reporting system that works with how I think and build, not against it. Highly recommended if you want clarity without sacrificing control.",
    name: "Damon",
    role: "Eyes 360",
  },
  {
    quote:
      "We run client reporting in Google Sheets and FinBoard saves us at least 4 hours per entity. It automates the same template across multiple companies without redoing the setup, and month-to-month roll forwards are smooth - updated data, no broken formulas, no formatting mess-up. It allows us to regroup and rename our chart of accounts without changing anything in QuickBooks. We tested a few alternatives, but FinBoard is the most intuitive and the most reliable by far. Support is founder-led and excellent. And the visualisation piece is just awesome - great graphs and scorecards for storytelling.",
    name: "Advisory firm",
    role: "Client reporting team",
  },
  {
    quote:
      "FinBoard is easy to use and helps me to bring my QuickBooks data into the sheets I use for monthly reporting.",
    name: "Tim",
    role: "Heirloom Builders",
  },
  {
    quote:
      "Very useful and the support from the developers are a huge bonus. Highly recommended.",
    name: "Randall Green",
    role: "FinBoard customer",
  },
];

function initials(name) {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const AVATAR_TINTS = ["#7C3AED", "#2563EB", "#0891B2", "#059669", "#D97706", "#E11D48"];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="max-w-2xl">
          <div className="kbd-chip" data-testid="testimonials-eyebrow"><Quote size={12} /> Loved by finance teams</div>
          <h1 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="testimonials-heading">
            What our customers say.
          </h1>
        </div>

        <div className="mt-12 columns-1 md:columns-2 lg:columns-3 gap-6 [&>figure]:mb-6">
          {items.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="card-white p-7 break-inside-avoid"
            >
              <Quote size={18} className="text-[#0A0A0A]/20" />
              <blockquote className="mt-3 text-[14.5px] leading-relaxed text-[#0A0A0A]/85">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-line flex items-center gap-3">
                <span
                  className="h-10 w-10 shrink-0 rounded-full grid place-items-center text-white text-[13px] font-semibold"
                  style={{ background: AVATAR_TINTS[i % AVATAR_TINTS.length] }}
                >
                  {initials(t.name)}
                </span>
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-[#0A0A0A]/60">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
