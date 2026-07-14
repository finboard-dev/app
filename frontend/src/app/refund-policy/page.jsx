import RefundPage from "@/views/RefundPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Refund Policy | FinBoard",
  description:
    "FinBoard's refund policy for trials, monthly and annual subscriptions, add-ons, billing errors and cancellations.",
  path: "/refund-policy",
});

export default function Page() {
  return <RefundPage />;
}
