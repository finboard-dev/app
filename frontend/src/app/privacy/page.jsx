import PrivacyPage from "@/views/PrivacyPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | FinBoard",
  description:
    "How FinBoard collects, uses, shares and protects your information, including details of our Google Sheets integration.",
  path: "/privacy",
});

export default function Page() {
  return <PrivacyPage />;
}
