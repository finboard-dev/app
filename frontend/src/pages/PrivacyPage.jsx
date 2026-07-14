import React from "react";
import Seo from "@/components/Seo";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import BookDemoDialog from "@/components/landing/BookDemoDialog";

/**
 * Privacy Policy. Content provided by FinBoard - keep the wording verbatim;
 * only presentation lives here.
 */

const P = ({ children }) => (
  <p className="mt-4 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">{children}</p>
);

const H2 = ({ id, children }) => (
  <h2 id={id} className="mt-12 scroll-mt-24 font-serif-display text-xl sm:text-2xl tracking-tight text-[#0A0A0A]">
    {children}
  </h2>
);

const H3 = ({ children }) => (
  <h3 className="mt-6 text-[15px] font-semibold text-[#0A0A0A]">{children}</h3>
);

const InShort = ({ children }) => (
  <p className="mt-3 text-[14px] leading-relaxed text-[#0A0A0A]/60 italic">In Short: {children}</p>
);

const UL = ({ items }) => (
  <ul className="mt-3 list-disc pl-6 space-y-1.5 text-[14.5px] leading-relaxed text-[#0A0A0A]/75">
    {items.map((it, i) => (
      <li key={i}>{it}</li>
    ))}
  </ul>
);

const Support = () => (
  <a href="mailto:support@finboard.ai" className="underline underline-offset-2">support@finboard.ai</a>
);

const TOC = [
  { id: "infocollect", label: "1. What information do we collect?" },
  { id: "infouse", label: "2. How do we process your information?" },
  { id: "whoshare", label: "3. When and with whom do we share your personal information?" },
  { id: "cookies", label: "4. Do we use cookies and other tracking technologies?" },
  { id: "inforetain", label: "5. How long do we keep your information?" },
  { id: "infosafe", label: "6. How do we keep your information safe?" },
  { id: "minors", label: "7. Do we collect information from minors?" },
  { id: "privacyrights", label: "8. What are your privacy rights?" },
  { id: "updates", label: "9. Do we make updates to this notice?" },
  { id: "contact", label: "10. How can you contact us about this notice?" },
  { id: "review", label: "11. How can you review, update, or delete the data we collect from you?" },
  { id: "sheets", label: "12. Google Sheets integration" },
];

export default function PrivacyPage() {
  const [demoOpen, setDemoOpen] = React.useState(false);
  const openDemo = () => setDemoOpen(true);

  React.useEffect(() => { window.scrollTo({ top: 0 }); }, []);

  return (
    <div className="min-h-screen bg-sand text-[#0A0A0A]" data-testid="privacy-page">
      <Seo
        title="Privacy Policy | FinBoard"
        description="How FinBoard collects, uses, shares and protects your information, including details of our Google Sheets integration."
        path="/privacy"
      />
      <Navbar onBookDemo={openDemo} />

      <main>
        <section className="max-w-3xl mx-auto px-6 lg:px-10 py-12 lg:py-16">
          <h1 className="font-serif-display text-4xl sm:text-5xl leading-[1.03] tracking-tight" data-testid="privacy-heading">
            Privacy Policy
          </h1>
          <div className="mt-3 text-[13px] text-[#0A0A0A]/55">Last updated: 13th Mar 2026</div>

          <P>
            This privacy notice for finboard (doing business as FinBoard) (&quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;), describes how and why we might collect, store, use, and/or share
            (&quot;process&quot;) your information when you use our services (&quot;Services&quot;), such as when you:
          </P>
          <UL items={[
            "Visit our website at https://finboard.ai, or any website of ours that links to this privacy notice",
            "Engage with us in other related ways, including any sales, marketing, or events",
          ]} />
          <P>
            Questions or concerns? Reading this privacy notice will help you understand your privacy rights
            and choices. If you do not agree with our policies and practices, please do not use our Services.
            If you still have any questions or concerns, please contact us at <Support />.
          </P>

          <H2>Summary of Key Points</H2>
          <P>
            This summary provides key points from our privacy notice, but you can find out more details about
            any of these topics by using our table of contents below to find the section you are looking for.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">What personal information do we process?</span> When
            you visit, use, or navigate our Services, we may process personal information depending on how you
            interact with us and the Services, the choices you make, and the products and features you use.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">Do we process any sensitive personal information?</span>{" "}
            We do not process sensitive personal information.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">Do we collect any information from third parties?</span>{" "}
            We do not collect any information from third parties.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">How do we process your information?</span> We process
            your information to provide, improve, and administer our Services, communicate with you, for
            security and fraud prevention, and to comply with law. We may also process your information for
            other purposes with your consent. We process your information only when we have a valid legal
            reason to do so.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">In what situations and with which types of parties do
            we share personal information?</span> We may share information in specific situations and with
            specific categories of third parties.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">How do we keep your information safe?</span> We have
            organizational and technical processes and procedures in place to protect your personal
            information. However, no electronic transmission over the internet or information storage
            technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers,
            cybercriminals, or other unauthorized third parties will not be able to defeat our security and
            improperly collect, access, steal, or modify your information.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">How do you exercise your rights?</span> The easiest
            way to exercise your rights is by contacting us. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </P>

          <H2>Table of Contents</H2>
          <ul className="mt-3 space-y-1.5 text-[14.5px]">
            {TOC.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} className="text-[#0A0A0A]/75 underline underline-offset-2 hover:text-[#0A0A0A]">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>

          <H2 id="infocollect">1. What Information Do We Collect?</H2>
          <H3>Personal information you disclose to us</H3>
          <InShort>We collect personal information that you provide to us.</InShort>
          <P>
            We collect personal information that you voluntarily provide to us when you register on the
            Services, express an interest in obtaining information about us or our products and Services, when
            you participate in activities on the Services, or otherwise when you contact us.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">Personal Information Provided by You.</span> The
            personal information that we collect depends on the context of your interactions with us and the
            Services, the choices you make, and the products and features you use. The personal information we
            collect may include the following:
          </P>
          <UL items={["names", "email addresses"]} />
          <P>
            <span className="font-medium text-[#0A0A0A]">Sensitive Information.</span> We do not process
            sensitive information.
          </P>
          <P>
            All personal information that you provide to us must be true, complete, and accurate, and you must
            notify us of any changes to such personal information.
          </P>
          <H3>Information automatically collected</H3>
          <InShort>
            Some information, such as your Internet Protocol (IP) address and/or browser and device
            characteristics, is collected automatically when you visit our Services.
          </InShort>
          <P>
            We automatically collect certain information when you visit, use, or navigate the Services. This
            information does not reveal your specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address, browser and device characteristics,
            operating system, language preferences, referring URLs, device name, country, information about
            how and when you use our Services, and other technical information. This information is primarily
            needed to maintain the security and operation of our Services, and for our internal analytics and
            reporting purposes.
          </P>
          <P>The information we collect includes:</P>
          <UL items={[
            "Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called \"crash dumps\"), and hardware settings).",
            "Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.",
          ]} />

          <H2 id="infouse">2. How Do We Process Your Information?</H2>
          <InShort>
            We process your information to provide, improve, and administer our Services, communicate with
            you, for security and fraud prevention, and to comply with law. We may also process your
            information for other purposes with your consent.
          </InShort>
          <P>
            We process your personal information for a variety of reasons, depending on how you interact with
            our Services, including:
          </P>
          <UL items={[
            "To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.",
            "To deliver and facilitate delivery of services to the user. We may process your information to provide you with the requested service.",
            "To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.",
            "To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.",
            "To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.",
            "To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see \"What Are Your Privacy Rights?\" below.",
            "To showcase our users and build trust. We may display your company's logo on our website to showcase our users and build trust with potential customers. If you would like your logo removed, you can email us at support@finboard.ai.",
            "To protect our Services. We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.",
            "To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.",
            "To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.",
            "To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.",
            "To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.",
          ]} />

          <H2 id="whoshare">3. When and With Whom Do We Share Your Personal Information?</H2>
          <InShort>
            We may share information in specific situations described in this section and/or with the
            following categories of third parties.
          </InShort>
          <P>
            <span className="font-medium text-[#0A0A0A]">Vendors, Consultants, and Other Third-Party Service
            Providers.</span> We may share your data with third-party vendors, service providers, contractors,
            or agents (&quot;third parties&quot;) who perform services for us or on our behalf and require
            access to such information to do that work. We have contracts in place with our third parties,
            which are designed to help safeguard your personal information. This means that they cannot do
            anything with your personal information unless we have instructed them to do it. They will also
            not share your personal information with any organization apart from us. They also commit to
            protect the data they hold on our behalf and to retain it for the period we instruct.
          </P>
          <P>The categories of third parties we may share personal information with are as follows:</P>
          <UL items={[
            "Data Analytics Services",
            "Communication & Collaboration Tools",
            "Data Storage Service Providers",
            "Payment Processors",
            "Performance Monitoring Tools",
            "Sales & Marketing Tools",
            "User Account Registration & Authentication Services",
          ]} />
          <P>We also may need to share your personal information in the following situations:</P>
          <UL items={[
            "Business Transfers. We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.",
          ]} />

          <H2 id="cookies">4. Do We Use Cookies and Other Tracking Technologies?</H2>
          <InShort>We may use cookies and other tracking technologies to collect and store your information.</InShort>
          <P>
            We may use cookies and similar tracking technologies (like web beacons and pixels) to gather
            information when you interact with our Services. Some online tracking technologies help us
            maintain the security of our Services and your account, prevent crashes, fix bugs, save your
            preferences, and assist with basic site functions.
          </P>
          <P>
            We also permit third parties and service providers to use online tracking technologies on our
            Services for analytics.
          </P>

          <H2 id="inforetain">5. How Long Do We Keep Your Information?</H2>
          <InShort>
            We keep your information for as long as necessary to fulfill the purposes outlined in this privacy
            notice unless otherwise required by law.
          </InShort>
          <P>
            We will only keep your personal information for as long as it is necessary for the purposes set
            out in this privacy notice, unless a longer retention period is required or permitted by law (such
            as tax, accounting, or other legal requirements). No purpose in this notice will require us
            keeping your personal information for longer than three (3) months past the termination of the
            user's account.
          </P>

          <H2 id="infosafe">6. How Do We Keep Your Information Safe?</H2>
          <InShort>
            We aim to protect your personal information through a system of organizational and technical
            security measures.
          </InShort>
          <P>
            We have implemented appropriate and reasonable technical and organizational security measures
            designed to protect the security of any personal information we process. However, despite our
            safeguards and efforts to secure your information, no electronic transmission over the Internet or
            information storage technology can be guaranteed to be 100% secure, so we cannot promise or
            guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to
            defeat our security and improperly collect, access, steal, or modify your information. Although we
            will do our best to protect your personal information, transmission of personal information to and
            from our Services is at your own risk. You should only access the Services within a secure
            environment.
          </P>

          <H2 id="minors">7. Do We Collect Information From Minors?</H2>
          <InShort>We do not knowingly collect data from or market to minors.</InShort>
          <P>
            We do not knowingly collect, solicit data from, or market to children, and we do not knowingly
            sell such personal information. If you become aware of any data we may have collected from
            children, please contact us at <Support />.
          </P>

          <H2 id="privacyrights">8. What Are Your Privacy Rights?</H2>
          <InShort>
            You may review, change, or terminate your account at any time, depending on your country,
            province, or state of residence.
          </InShort>
          <P>
            <span className="font-medium text-[#0A0A0A]">Withdrawing your consent:</span> If we are relying on
            your consent to process your personal information, which may be express and/or implied consent
            depending on the applicable law, you have the right to withdraw your consent at any time. You can
            withdraw your consent at any time by contacting us by using the contact details provided in the
            section &quot;How Can You Contact Us About This Notice?&quot; below.
          </P>
          <P>
            However, please note that this will not affect the lawfulness of the processing before its
            withdrawal nor, when applicable law allows, will it affect the processing of your personal
            information conducted in reliance on lawful processing grounds other than consent.
          </P>
          <P>
            <span className="font-medium text-[#0A0A0A]">Opting out of marketing and promotional
            communications:</span> You can unsubscribe from our marketing and promotional communications at
            any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using
            the details provided in the section &quot;How Can You Contact Us About This Notice?&quot; below.
            You will then be removed from the marketing lists. However, we may still communicate with you, for
            example, to send you service-related messages that are necessary for the administration and use of
            your account, to respond to service requests, or for other non-marketing purposes.
          </P>
          <H3>Account Information</H3>
          <P>
            If you would at any time like to review or change the information in your account or terminate
            your account, you can:
          </P>
          <UL items={["Contact us using the contact information provided."]} />
          <P>
            Upon your request to terminate your account, we will deactivate or delete your account and
            information from our active databases.
          </P>
          <P>
            If you have questions or comments about your privacy rights, you may email us at <Support />.
          </P>

          <H2 id="updates">9. Do We Make Updates to This Notice?</H2>
          <InShort>Yes, we will update this notice as necessary to stay compliant with relevant laws.</InShort>
          <P>
            We may update this privacy notice from time to time. The updated version will be indicated by an
            updated &quot;Revised&quot; date at the top of this privacy notice. If we make material changes to
            this privacy notice, we may notify you either by prominently posting a notice of such changes or
            by directly sending you a notification. We encourage you to review this privacy notice frequently
            to be informed of how we are protecting your information.
          </P>

          <H2 id="contact">10. How Can You Contact Us About This Notice?</H2>
          <P>
            If you have questions or comments about this notice, you may email us at <Support />.
          </P>

          <H2 id="review">11. How Can You Review, Update, or Delete the Data We Collect From You?</H2>
          <P>
            Based on the applicable laws of your country or state of residence in the US, you may have the
            right to request access to the personal information we collect from you, details about how we have
            processed it, correct inaccuracies, or delete your personal information. You may also have the
            right to withdraw your consent to our processing of your personal information. These rights may be
            limited in some circumstances by applicable law. To request to review, update, or delete your
            personal information, please email us at <Support />.
          </P>

          <H2 id="sheets">12. Google Sheets Integration</H2>
          <P>
            Our Services include integration with Google Sheets. This section details the data we collect and
            the permissions we require for this integration.
          </P>
          <H3>Google User Data</H3>
          <P>FinBoard collects and stores:</P>
          <UL items={[
            "Your Google email address: To identify you as a user, provide support, and notify you about data import updates.",
            "Your full name: To personalize our communication with you.",
          ]} />
          <H3>Google Sheets Permissions</H3>
          <P>To automate your workflows in Google Sheets, FinBoard requires the following permissions:</P>
          <P>
            <span className="font-medium text-[#0A0A0A]">1. See, edit, create and delete all your Google
            Sheets spreadsheets</span>
          </P>
          <UL items={[
            "Purpose: To create and refresh reports in your spreadsheets.",
            "Usage: We only make changes in spreadsheets where you have explicitly activated FinBoard.",
            "Limitations: This permission only allows us to access spreadsheets whose IDs are known to us (i.e., spreadsheets you've explicitly connected to FinBoard).",
            "We cannot browse, discover, or read other files in your Google Drive - that would require separate Drive permissions, which we do not request.",
            "We only modify sheets and data created by FinBoard.",
            "We will never delete any of your spreadsheets, sheets, rows, or columns.",
          ]} />
          <P>
            <span className="font-medium text-[#0A0A0A]">2. Connect to an external service</span>
          </P>
          <UL items={["Purpose: To communicate with our backend APIs for authorization and integration coordination."]} />
          <P>
            <span className="font-medium text-[#0A0A0A]">3. Display and run third-party web content in prompts
            and sidebars inside Google applications</span>
          </P>
          <UL items={["Purpose: To show our user interface within Google Sheets."]} />
          <P>
            <span className="font-medium text-[#0A0A0A]">4. Allow this application to run when you are not
            present</span>
          </P>
          <UL items={["Purpose: To automatically refresh your reports, either when you open your spreadsheet or on an hourly basis."]} />
          <P>
            For more information on how we handle your data, please refer to the sections above on data
            collection, usage, and protection.
          </P>
        </section>
      </main>

      <Footer />
      <BookDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </div>
  );
}
