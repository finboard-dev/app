import React from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

/**
 * Terms and Conditions. Content provided by FinBoard legal - keep the wording
 * verbatim; only presentation lives here.
 */

const P = ({ children }) => (
  <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">{children}</p>
);

const H2 = ({ n, children }) => (
  <h2 className="mt-10 font-serif-display text-xl sm:text-2xl tracking-tight text-[#0A0A0A]">
    {n}. {children}
  </h2>
);

const Term = ({ t, children }) => (
  <li className="mt-2.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
    <span className="font-medium text-[#0A0A0A]">&quot;{t}&quot;</span> {children}
  </li>
);

const Sub = ({ t, children }) => (
  <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
    <span className="font-medium text-[#0A0A0A]">{t}:</span> {children}
  </p>
);

export default function TermsPage() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="terms-page">
      <Seo
        title="Terms and Conditions | FinBoard"
        description="The terms of use that govern the FinBoard website and services, including licensing, customer data, confidentiality and privacy."
        path="/terms"
      />
      <Navbar onBookDemo={openDemo} />

      <main>
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <h1 className="font-serif-display text-4xl sm:text-5xl leading-[1.03] tracking-tight" data-testid="terms-heading">
            Terms and Conditions
          </h1>
          <div className="mt-3 text-[13px] text-[#0A0A0A]/55">Last updated: 13th Mar 2026</div>

          <P>
            Welcome to Finboard.ai! These Terms of Use (&quot;Terms&quot;) govern your use of our website and
            services. By accessing or using our website and services, you agree to be bound by these Terms.
            If you have any questions or concerns about these Terms, please contact us at{" "}
            <a href="mailto:support@finboard.ai" className="underline underline-offset-2">support@finboard.ai</a>.
          </P>

          <H2 n={1}>Definitions</H2>
          <ul className="mt-2 list-none">
            <Term t="Accounting Software">refers to any accounting software, whether cloud-based or desktop, such as QuickBooks or Xero.</Term>
            <Term t="Agreement">means these Terms of Use.</Term>
            <Term t="Confidential Information">includes all information shared between the parties in connection with these Terms, excluding information that is public or becomes public through no fault of the receiving party.</Term>
            <Term t="Data">refers to any data that is input into the Software.</Term>
            <Term t="FinBoard AI Agent Product">means FinBoard's optional artificial intelligence-enabled features and functionality made available under the &quot;AI Agent&quot; name or designation, including any related interfaces, tools, automations, or services that use machine learning or generative AI to process Customer Data in order to generate, summarize, analyze, recommend, or automate outputs for the Customer.</Term>
            <Term t="Intellectual Property Rights">include all patents, trademarks, service marks, copyrights, moral rights, design rights, know-how, and any other proprietary rights worldwide, whether registered or unregistered.</Term>
            <Term t="Software">means the software available through our website.</Term>
            <Term t="Subscriber">means the person or entity who registers to use the Software.</Term>
            <Term t="You">and &quot;Your&quot; refer to the Subscriber.</Term>
            <Term t="Website">refers to our internet site at https://finboard.ai or any other site operated by us.</Term>
          </ul>

          <H2 n={2}>Use of the Software</H2>
          <P>
            We grant you a non-exclusive, non-transferable license to access and use the Software through our
            website, subject to these Terms. Your access to the financial data of any company through the
            Software is determined by the respective Accounting Software settings.
          </P>

          <H2 n={3}>User Responsibilities</H2>
          <Sub t="Lawful Use">
            You must use the Software and website for lawful business purposes only. You can use our services
            on behalf of others, but you must ensure you have the necessary authorization and that those you
            provide services to comply with these Terms.
          </Sub>
          <Sub t="Security">
            Keep your login credentials secure. Notify us immediately if you become aware of any unauthorised
            use of your account. You can reset your password yourself unless a situation requires our intervention.
          </Sub>
          <Sub t="Prohibited Actions">You must not:</Sub>
          <ul className="mt-2 list-disc pl-6 space-y-1.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
            <li>Compromise the security or integrity of our systems or the systems of third-party hosts.</li>
            <li>Misuse the Software in a way that affects its functionality or that of the website.</li>
            <li>Attempt to access materials you do not have permission to access.</li>
            <li>Upload harmful files or content, or any material that violates any laws or rights of others.</li>
            <li>Modify, copy, adapt, decompile, or reverse engineer the Software or the website except as necessary for their normal operation.</li>
          </ul>
          <Sub t="Software Resell and Redistribution">
            You may not reproduce, duplicate, copy, sell, resell, or otherwise exploit any portion of our
            website or services without our explicit written consent, either directly from us or through an
            authorised reseller program.
          </Sub>
          <Sub t="Third-Party Terms">
            If you use third-party functionality within the Software, you confirm that you accept the terms
            and conditions of those third parties.
          </Sub>

          <H2 n={4}>Confidentiality and Privacy</H2>
          <Sub t="Confidentiality">
            Both parties agree to keep each other's Confidential Information secure and not disclose it to any
            third party without consent, except as required by law.
          </Sub>
          <Sub t="Privacy Policy">
            Our privacy policy governs how we collect, use, and protect your personal data. By using our
            services, you agree to our privacy policy.
          </Sub>

          <H2 n={5}>Intellectual Property</H2>
          <Sub t="Ownership">
            All Intellectual Property Rights in the Software, website, and related documentation are owned by
            us or our licensors. Your Data remains your property, and you grant us a license to use it to
            provide our services.
          </Sub>
          <Sub t="Content Use Rights">
            We hold and reserve all intellectual property rights for any content available on this website.
            You may not use such content in any way that is not necessary or implicit in the proper use of the
            service. Specifically, but without limitation, you may not copy, download, share (beyond the limits
            set forth below), modify, translate, transform, publish, transmit, sell, sublicense, edit,
            transfer/assign to third parties, or create derivative works from the content available on this
            website, nor allow any third party to do so through you or your device, even without your
            knowledge. Where explicitly stated on this website, you may download, copy, and/or share some
            content available through this website for your sole personal and non-commercial use, provided
            that the copyright attributions and all other attributions requested by us are correctly
            implemented. Any applicable statutory limitation or exception to copyright shall remain unaffected.
          </Sub>

          <H2 n={6}>Warranties and Disclaimers</H2>
          <Sub t="Authorization">
            You warrant that you have the authority to use the Software and the website and to access the
            information you do, whether it's your own or someone else's.
          </Sub>
          <Sub t="Service Performance">
            We aim to ensure the Software performs as described, but it is provided on an &quot;as is&quot; and
            &quot;as available&quot; basis. While we strive for high reliability, we cannot guarantee that the
            service will be uninterrupted or error-free.
          </Sub>

          <H2 n={7}>Generated Insights</H2>
          <P>
            You may use the Service to create dashboards, forecasts, narratives, visualizations, analysis or
            other machine-generated outcomes based on data or prompts you supply (collectively,
            &quot;Generated Insights&quot;).
          </P>

          <H2 n={8}>Customer Data</H2>
          <Sub t="Definition">
            &quot;Customer Data&quot; means any data connections, files, spreadsheets, text, or other content
            that you upload, transmit, integrate, or otherwise make available to the Service.
          </Sub>
          <Sub t="Use of Customer Data">
            FinBoard processes Customer Data solely as necessary to provide, maintain, secure, support, and
            improve the Service, including to generate reports, mappings, dashboards, analyses, and other
            outputs requested or enabled by the Customer through the Service.
          </Sub>
          <Sub t="Ownership and License">
            As between the parties, Customer retains all right, title, and interest in and to Customer Data.
            Customer grants FinBoard a limited, non-exclusive, non-transferable license during the term of the
            agreement to host, copy, process, transmit, display, and otherwise use Customer Data solely for
            the purposes described in these Terms.
          </Sub>
          <Sub t="Model Improvement; Default Off">
            This section applies only to customers that use the AI Agent functionality. For the avoidance of
            doubt, FinBoard will not use Customer Data for model training or generalised model improvement for
            customers that do not subscribe to the FinBoard AI Agent product. For customers that use the
            FinBoard AI Agent product, FinBoard will not use Customer Data for model training or generalised
            model improvement unless the customer provides an explicit, voluntary opt-in through the AI Agent
            settings. This setting is disabled by default. The customer may withdraw that opt-in at any time
            through the AI Agent settings, and such withdrawal will apply on a going-forward basis. If the
            customer does not opt in, FinBoard may still process Customer Data as necessary to provide the AI
            Agent functionality requested by the customer, but will not use that Customer Data for model
            training or generalized model improvement. Declining to opt in will not disable core AI Agent
            functionality, but may limit personalization, feedback-based refinement, or certain future
            improvements.
          </Sub>

          <H2 n={9}>Limitation of Liability</H2>
          <P>
            We are not liable for any indirect, incidental, or consequential damages arising from your use of
            the Software. Our maximum liability to you for any claims arising out of or related to these Terms
            is limited to the fees you have paid us, unless there is gross negligence or intentional misconduct.
          </P>

          <H2 n={10}>Indemnification</H2>
          <P>
            You agree to indemnify and hold us harmless from any claims, damages, losses, liabilities, and
            expenses arising out of your use of the Software, your violation of these Terms, or any
            third-party rights.
          </P>

          <H2 n={11}>Termination</H2>
          <P>
            You may terminate your use of our services at any time by cancelling your account. Upon
            termination, your right to use the Software will immediately cease from the effective date. We
            reserve the right to terminate or suspend your access to the Software at our discretion if you
            violate these Terms or engage in any conduct that we deem harmful or inappropriate.
          </P>

          <H2 n={12}>General</H2>
          <Sub t="Modification">
            We may modify these Terms from time to time. We will notify you of any changes, and your continued
            use of the Software after such changes constitutes your acceptance of the new Terms.
          </Sub>
          <Sub t="Governing Law and Jurisdiction">
            These Terms, along with any additional notices or instructions given to you under these Terms,
            supersede all previous agreements and understandings between you and Finboard.ai regarding the
            Software and related matters. A waiver of any breach of these Terms will not constitute a waiver
            of any other breach. No waiver will be effective unless in writing. Neither party will be liable
            for delays or failures in performance due to causes beyond their reasonable control. You may not
            assign or transfer any rights without Finboard.ai's written consent. This Agreement and any
            disputes arising from it shall be governed by the laws of the United States, without regard to
            conflict of laws principles. Any disputes will be resolved through arbitration by the American
            Arbitration Association under its commercial arbitration rules, in English, with a single
            arbitrator. The arbitrator's decision will be final and binding, and judgement on the award may be
            entered in any court with jurisdiction. If the arbitration clause is invalid or you opt out of
            arbitration, disputes will be resolved exclusively by courts under United States law. The Parties
            agree to resolve disputes individually and waive any right to a jury trial.
          </Sub>
          <Sub t="Severability">
            If any part of these Terms is found to be invalid or unenforceable, the remaining provisions will
            continue in full force and effect.
          </Sub>
          <Sub t="Notices">
            Notices under these Terms will be sent by email to the addresses provided by you or by us. If you
            have any questions or concerns about these Terms, or if you do not agree to them, please contact
            us at <a href="mailto:support@finboard.ai" className="underline underline-offset-2">support@finboard.ai</a>.
          </Sub>

          <P>
            Thank you for choosing Finboard.ai! If you have any questions or need further assistance, please
            contact us at <a href="mailto:support@finboard.ai" className="underline underline-offset-2">support@finboard.ai</a>.
          </P>
          <P>FinBoard: Simplify Your QuickBooks Reporting Process</P>
        </section>
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
