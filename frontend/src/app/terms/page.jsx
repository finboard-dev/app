import TermsPage from "@/views/TermsPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions | FinBoard",
  description:
    "The terms of use that govern the FinBoard website and services, including licensing, customer data, confidentiality and privacy.",
  path: "/terms",
});

export default function Page() {
  return <TermsPage />;
}
