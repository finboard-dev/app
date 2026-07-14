import ManifestoPage from "@/views/ManifestoPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "The FinBoard Manifesto | Why We Exist",
  description:
    "Finance teams deserve real-time, governed numbers instead of stitched-together spreadsheets. This is why we built FinBoard.",
  path: "/manifesto",
});

export default function Page() {
  return <ManifestoPage />;
}
