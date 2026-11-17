import StartTrial from "@/views/StartTrial";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Start Your 14-Day Free Trial | FinBoard",
  description:
    "Install the FinBoard add-on for Google Sheets, connect your QuickBooks Online companies and see consolidated numbers for the whole group. Free for 14 days.",
  path: "/start",
});

export default function Page() {
  return <StartTrial />;
}
