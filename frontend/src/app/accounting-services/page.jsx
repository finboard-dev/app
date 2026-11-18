import AccountingServices from "@/views/AccountingServices";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Startup Accounting Services | FinBoard",
  description:
    "Startup accounting, handled. Tax-ready books closed in 5 business days, live burn, runway, payables and receivables. AI agents do the work, accountants check every entry.",
  path: "/accounting-services",
});

export default function Page() {
  return <AccountingServices />;
}
