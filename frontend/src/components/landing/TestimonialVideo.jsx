export default function TestimonialVideo() {
  return (
    <section className="pb-10 lg:pb-12" data-testid="testimonial-video-section">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="overflow-hidden rounded-xl border border-line bg-[#0A0A0A] shadow-[0_20px_50px_-28px_rgba(10,10,10,0.45)]">
          <video controls preload="metadata" aria-label="FinBoard customer testimonial video" data-testid="testimonial-video" className="block aspect-video w-full">
            <source src="/videos/finboard-testimonial.mp4" type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>
      </div>
    </section>
  );
}
