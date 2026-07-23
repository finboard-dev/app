import { Quote, Linkedin } from "lucide-react";

export default function TestimonialVideo() {
  return (
    <section className="pb-10 lg:pb-12" data-testid="testimonial-video-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 items-center">
          {/* Quote — 30% */}
          <div className="lg:col-span-3">
            <Quote size={22} className="text-[#0A0A0A]/20" />
            <blockquote
              className="mt-4 font-serif-display text-xl sm:text-2xl leading-snug tracking-tight text-[#0A0A0A]"
              data-testid="testimonial-video-quote"
            >
              Olga runs a 20-person accounting practice, and we power their complex
              franchise consolidations across multiple restaurant chains. Hear what
              they have to say about us.
            </blockquote>

            <div className="mt-6 pt-5 border-t border-line" data-testid="testimonial-video-attribution">
              <div className="flex items-center gap-1.5">
                <a
                  href="https://www.linkedin.com/in/olga-hurtado-ea-mba-0759294b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Olga Hurtado on LinkedIn"
                  className="text-[#0A76B4] hover:opacity-80 transition-opacity"
                  data-testid="testimonial-video-linkedin"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/olga-hurtado-ea-mba-0759294b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#0A0A0A] hover:underline"
                >
                  Olga Hurtado
                </a>
              </div>
              <div className="mt-0.5 text-sm text-[#0A0A0A]/60">
                Founder &amp; CEO,{" "}
                <a
                  href="https://neatbooksllc.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0A0A0A]/80 hover:underline"
                >
                  NeatBooks LLC
                </a>
              </div>
            </div>
          </div>

          {/* Video — 70% */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-line bg-[#0A0A0A] shadow-[0_20px_50px_-28px_rgba(10,10,10,0.45)]">
              <video controls preload="metadata" aria-label="FinBoard customer testimonial video" data-testid="testimonial-video" className="block aspect-video w-full">
                <source src="/videos/finboard-testimonial.mp4" type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
