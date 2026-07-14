import Pricing from "@/views/Pricing";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FinBoard Pricing | Priced Around Your Group",
  description:
    "Custom-quoted pricing for your full finance stack, with a forward-deployed build in your first 30 days and support whenever your close is running.",
  path: "/pricing",
});

export default function Page() {
  return <Pricing />;
}
