import Engagement from "@/views/Engagement";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How FinBoard Works | Live in 30 Days",
  description:
    "A forward-deployed team builds your finance stack on your governed ledger and gets you live in 30 days. Pay on value, not a two-year migration.",
  path: "/engagement",
});

export default function Page() {
  return <Engagement />;
}
