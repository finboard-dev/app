import TestimonialsPage from "@/views/TestimonialsPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import { VIDEO_TESTIMONIALS } from "@/data/videoTestimonials";

// Both customer testimonial videos are embedded on this page, so both are
// declared for Open Graph. Derived from the same list the page renders.
const OG_VIDEOS = VIDEO_TESTIMONIALS.map((testimonial) => {
  const url = `${SITE_URL}${testimonial.videoPath}`;
  return { url, secureUrl: url, type: "video/mp4", width: 1920, height: 1080 };
});

const baseMetadata = buildMetadata({
  title: "FinBoard Testimonials | What Finance Leaders Say",
  description:
    "CFOs, controllers and finance leaders on closing faster and trusting every number with FinBoard's AI-native, multi-entity finance platform.",
  path: "/testimonials",
});

export const metadata = {
  ...baseMetadata,
  openGraph: {
    ...baseMetadata.openGraph,
    videos: OG_VIDEOS,
  },
};

// Note: the VideoObject structured data lives on the homepage (/), which
// embeds this same testimonial and carries the most SEO authority. Keeping it
// on a single page avoids Google seeing the video declared with two embedUrls.

export default function Page() {
  return <TestimonialsPage />;
}
