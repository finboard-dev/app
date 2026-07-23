import TestimonialsPage from "@/views/TestimonialsPage";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const VIDEO_URL = `${SITE_URL}/videos/finboard-testimonial.mp4`;

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
    videos: [
      {
        url: VIDEO_URL,
        secureUrl: VIDEO_URL,
        type: "video/mp4",
        width: 1920,
        height: 1080,
      },
    ],
  },
};

// Note: the VideoObject structured data lives on the homepage (/), which
// embeds this same testimonial and carries the most SEO authority. Keeping it
// on a single page avoids Google seeing the video declared with two embedUrls.

export default function Page() {
  return <TestimonialsPage />;
}
