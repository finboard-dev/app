import { Quote, Linkedin, Globe } from "lucide-react";
import { VIDEO_TESTIMONIALS } from "@/data/videoTestimonials";

function TestimonialVideoItem({ testimonial, index }) {
  const {
    id,
    blurb,
    name,
    linkedinUrl,
    role,
    company,
    companyUrl,
    videoPath,
    posterPath,
    videoLabel,
  } = testimonial;

  // Testimonials alternate sides so a run of them reads as a rhythm rather than
  // a stack: the first is quote-left, the next video-left, and so on. Below lg
  // everything collapses to one column, quote first.
  const mediaFirst = index % 2 === 1;

  // We link the person's LinkedIn when we have a verified profile; otherwise the
  // icon points at the company site so the attribution always resolves somewhere.
  const profileUrl = linkedinUrl || companyUrl;
  const ProfileIcon = linkedinUrl ? Linkedin : Globe;
  const profileLabel = linkedinUrl ? `${name} on LinkedIn` : `${company} website`;

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10 items-center"
      data-testid={`testimonial-video-item-${id}`}
    >
      {/* Quote — 30% */}
      <div className={`lg:col-span-3 ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}>
        <Quote size={22} className="text-[#0A0A0A]/20" />
        <blockquote
          className="mt-4 font-serif-display text-xl sm:text-2xl leading-snug tracking-tight text-[#0A0A0A]"
          data-testid="testimonial-video-quote"
        >
          {blurb}
        </blockquote>

        <div className="mt-6 pt-5 border-t border-line" data-testid="testimonial-video-attribution">
          <div className="flex items-center gap-1.5">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={profileLabel}
              className="text-[#0A76B4] hover:opacity-80 transition-opacity"
              data-testid="testimonial-video-profile-link"
            >
              <ProfileIcon size={16} />
            </a>
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#0A0A0A] hover:underline"
            >{name}</a>
          </div>
          <div className="mt-0.5 text-sm text-[#0A0A0A]/60">
            {role},{" "}
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0A0A0A]/80 hover:underline"
              data-testid="testimonial-video-company-link"
            >{company}</a>
          </div>
        </div>
      </div>

      {/* Video — 70% */}
      <div className={`lg:col-span-7 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}>
        <div className="overflow-hidden rounded-xl border border-line bg-[#0A0A0A] shadow-[0_20px_50px_-28px_rgba(10,10,10,0.45)]">
          <video
            controls
            preload="metadata"
            poster={posterPath}
            aria-label={videoLabel}
            data-testid="testimonial-video"
            className="block aspect-video w-full"
          >
            <source src={videoPath} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialVideo() {
  return (
    <section className="py-10 lg:py-12" data-testid="testimonial-video-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 space-y-14 lg:space-y-16">
        {VIDEO_TESTIMONIALS.map((testimonial, index) => (
          <TestimonialVideoItem
            key={testimonial.id}
            testimonial={testimonial}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
