import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LegalPage } from '@/components/legal/LegalPage';
import { SITE_NAME, SUPPORT_EMAIL, SUPPORT_PHONE } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `Privacy Policy | ${SITE_NAME}`,
  description: `Privacy policy for ${SITE_NAME}. How we collect, use, and protect your information.`,
  canonical: '/privacy-policy',
  noIndex: true,
});

export default function PrivacyPolicyPage(): React.ReactElement {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="March 10, 2026">
      <h2>Overview</h2>
      <p>
        First Due Advisors ("we," "us," or "our") is committed to protecting your
        personal information. This Privacy Policy explains what information we collect
        when you visit firstdueadvisors.com, how we use it, and your rights regarding
        that information.
      </p>

      <h2>Information We Collect</h2>
      <p>
        When you submit our contact form, we collect your name, email address,
        phone number (if provided), the service you are inquiring about, and your
        message. We also collect the URL of the page from which you submitted the
        form and a timestamp of your submission.
      </p>
      <p>
        We do not collect payment information, government ID numbers, or sensitive
        health records through this website.
      </p>

      <h2>How We Use Your Information</h2>
      <p>
        We use the information you provide solely to respond to your inquiry and to
        follow up about insurance products or services you have expressed interest in.
        We do not use your information for automated marketing or profiling.
      </p>

      <h2>Email Communications</h2>
      <p>
        When you submit a contact form, you will receive a confirmation email sent
        through Resend, our email delivery provider. Resend processes your email
        address in order to deliver this confirmation. Resend's privacy policy is
        available at resend.com. We do not share your email address with any other
        third parties for marketing purposes.
      </p>

      <h2>Data Storage</h2>
      <p>
        Form submissions are stored securely in Supabase, a database service. Your
        data is accessible only to authorized personnel at First Due Advisors.
        We retain lead data for a period consistent with legal and business requirements.
      </p>

      <h2>We Do Not Sell Your Data</h2>
      <p>
        We do not sell, rent, or trade your personal information to third parties.
        We do not share your information with insurance carriers for their own
        marketing purposes without your explicit consent.
      </p>

      <h2>TCPA Consent</h2>
      <p>
        By submitting our contact form, you consent to be contacted by a licensed
        insurance professional at the phone number or email address you provide,
        including by telephone or text message. This consent is not required to
        purchase any product or service. Message and data rates may apply. You may
        withdraw consent at any time by contacting us at {SUPPORT_EMAIL}.
      </p>

      <h2>Cookies and Analytics</h2>
      <p>
        This website uses Google Analytics (GA4) to collect anonymized data about
        how visitors use the site. This data includes pages visited, time on page,
        and general geographic region. It does not include personally identifiable
        information. You may opt out of Google Analytics by using the Google
        Analytics Opt-out Browser Add-on.
      </p>

      <h2>Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and physical safeguards
        to protect your information. However, no method of transmission over the
        internet is completely secure. We cannot guarantee absolute security but
        take reasonable steps to protect your data.
      </p>

      <h2>Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information by contacting us at {SUPPORT_EMAIL} or {SUPPORT_PHONE}.
        We will respond to requests within a reasonable timeframe.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        reflected by the updated date at the top of this page. Continued use of
        the site after changes constitutes acceptance of the revised policy.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this Privacy Policy or how your information
        is handled, please contact {SITE_NAME} at {SUPPORT_EMAIL}.
      </p>
    </LegalPage>
  );
}
