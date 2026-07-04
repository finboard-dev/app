import React from "react";
import { Quote } from "lucide-react";

const items = [
  {
    quote:
      "We closed our 9-entity month-end in a single afternoon. What used to be spreadsheet archaeology is now a review, not a reconstruction.",
    name: "Elena Marsh",
    role: "CFO · Meridian Retail Group",
    img: "https://images.pexels.com/photos/27086761/pexels-photo-27086761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    quote:
      "The inter-company eliminations are the moment of truth. FinBoard is the first tool that handled ours automatically, and we trusted the numbers.",
    name: "Rohan Patel",
    role: "Group Controller · Sable Ventures",
    img: "https://images.pexels.com/photos/30133734/pexels-photo-30133734.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
  {
    quote:
      "Board reporting is now a Tuesday, not a fire drill. Variance commentary writes itself and every roll-up ties.",
    name: "Sara Lindgren",
    role: "VP Finance · Orbital Health",
    img: "https://images.pexels.com/photos/27086761/pexels-photo-27086761.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-12">
        <div className="max-w-2xl">
          <div className="kbd-chip" data-testid="testimonials-eyebrow"><Quote size={12} /> Loved by finance leaders</div>
          <h2 className="mt-4 font-serif-display text-4xl sm:text-5xl leading-[1.02] tracking-tight" data-testid="testimonials-heading">
            What CFOs and controllers say.
          </h2>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <figure
              key={i}
              data-testid={`testimonial-${i}`}
              className="card-white p-7 flex flex-col justify-between"
            >
              <blockquote className="font-serif-display text-[22px] leading-[1.25] tracking-tight text-[#0A0A0A]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  className="h-10 w-10 rounded-full object-cover border border-line"
                />
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
