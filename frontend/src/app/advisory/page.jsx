import Advisory from "@/views/Advisory";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard for Advisory Firms | One Workspace, Every Client",
  description:
    "Run close, consolidation and reporting for every client from one governed workspace. Standardized templates, 30-day onboarding, resale-friendly pricing.",
  path: "/advisory",
});

export default function Page() {
  return <Advisory />;
}
