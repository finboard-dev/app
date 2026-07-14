import Operators from "@/views/Operators";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard for Operators | Real-Time Multi-Entity Finance",
  description:
    "Close, consolidate, plan and control spend across your whole group in one AI-native workspace, with numbers that stay current. Real-time group visibility in 30 days.",
  path: "/operators",
});

export default function Page() {
  return <Operators />;
}
