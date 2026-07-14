import TestimonialsPage from "@/views/TestimonialsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard Testimonials | What Finance Leaders Say",
  description:
    "CFOs, controllers and finance leaders on closing faster and trusting every number with FinBoard's AI-native, multi-entity finance platform.",
  path: "/testimonials",
});

export default function Page() {
  return <TestimonialsPage />;
}
