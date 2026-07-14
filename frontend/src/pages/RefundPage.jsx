import React from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

/**
 * Refund Policy. Content provided by FinBoard - keep the wording verbatim;
 * only presentation lives here.
 */

const P = ({ children }) => (
  <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">{children}</p>
);

const H2 = ({ n, children }) => (
  <h2 className="mt-10 font-serif-display text-xl sm:text-2xl tracking-tight text-[#0A0A0A]">
    {n}) {children}
  </h2>
);

const UL = ({ items }) => (
  <ul className="mt-3 list-disc pl-6 space-y-1.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

export default function RefundPage() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="refund-page">
      <Seo
        title="Refund Policy | FinBoard"
        description="FinBoard's refund policy for trials, monthly and annual subscriptions, add-ons, billing errors and cancellations."
        path="/refund-policy"
      />
      <Navbar onBookDemo={openDemo} />

      <main>
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <h1 className="font-serif-display text-4xl sm:text-5xl leading-[1.03] tracking-tight" data-testid="refund-heading">
            Refund Policy
          </h1>
          <div className="mt-3 text-[13px] text-[#0A0A0A]/55">Last updated: 26th Sep, 2025</div>

          <H2 n={1}>Free trial and onboarding</H2>
          <UL items={[
            "If your plan includes a free trial, you are not charged until the trial ends.",
            "You may cancel any time during the trial to avoid charges.",
            "Any add-ons or usage charges not covered by the trial are billed as incurred and are not refundable.",
          ]} />

          <H2 n={2}>Monthly subscriptions</H2>
          <UL items={[
            "Monthly plans are pay-as-you-go.",
            "You may cancel at any time; access continues until the end of the current billing period.",
            "We do not offer refunds for partial months, unused time, or downgrades that occur during a billing period.",
          ]} />

          <H2 n={3}>Annual subscriptions</H2>
          <UL items={[
            "If you cancel within 30 days of the initial annual charge, you may request a pro-rated refund for the unused remainder of the term, less any discounts or promotions previously applied.",
            "After 30 days, annual plans are non-refundable, and access remains active until the end of the term.",
            "All approved refunds are issued to the original payment method only.",
          ]} />

          <H2 n={4}>Add-ons, usage-based fees, and overages</H2>
          <P>
            Fees for add-ons, implementation, metered usage, and overages are non-refundable once incurred,
            unless caused by a verified billing error on our side.
          </P>

          <H2 n={5}>Billing errors and duplicate charges</H2>
          <UL items={[
            "If you believe you have been billed in error or charged twice, please contact us within 30 days of the charge.",
            "Verified billing errors will be refunded in full to the original payment method.",
          ]} />

          <H2 n={6}>How to request a refund</H2>
          <P>
            Email <a href="mailto:support@finboard.ai" className="underline underline-offset-2">support@finboard.ai</a>{" "}
            from your registered email with:
          </P>
          <UL items={[
            "Account name and billing email",
            "Invoice number(s) and date(s)",
            "Reason for the request and any relevant details or screenshots",
          ]} />
          <P>
            We review requests within 5 business days. Approved refunds are issued to the original payment
            method. Depending on your bank or card network, funds may take 5-10 business days to appear.
          </P>

          <H2 n={7}>Taxes, fees, and currency</H2>
          <UL items={[
            "Applicable taxes (for example, VAT/Sales Tax) and payment processing fees are non-refundable except where required by law.",
            "Refunds are processed in the original currency whenever possible; exchange-rate differences and bank fees are outside our control.",
          ]} />

          <H2 n={8}>Chargebacks</H2>
          <P>
            Please contact us first to resolve any billing concerns. Initiating a chargeback without giving us
            an opportunity to help may result in immediate account suspension and could delay resolution.
          </P>

          <H2 n={9}>Abuse, policy violation, or fraud</H2>
          <P>
            We may deny refunds and revoke access if we reasonably believe there is abuse, excessive
            chargebacks, policy violations, or fraud.
          </P>

          <H2 n={10}>Data retention on cancellation</H2>
          <P>
            Upon cancellation or non-renewal, your account moves to a limited state. You may export your data
            during the retention window of 90 days. After that period, we may delete data in accordance with
            our Privacy Policy and regulatory requirements.
          </P>

          <H2 n={11}>Legal rights</H2>
          <P>
            Nothing in this policy is intended to exclude or limit rights that you may have under applicable
            consumer laws. Where the law requires a refund, we will comply.
          </P>
        </section>
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
