import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { LegalPage } from '@/components/legal/LegalPage';
import { SITE_NAME, SUPPORT_EMAIL, LICENSED_STATES } from '@/lib/site';

export const metadata: Metadata = buildPageMetadata({
  title: `Terms of Service | ${SITE_NAME}`,
  description: `Terms of service for ${SITE_NAME}.`,
  canonical: '/terms-of-service',
  noIndex: true,
});

export default function TermsOfServicePage(): React.ReactElement {
  return (
    <LegalPage title="Terms of Service" lastUpdated="March 10, 2026">
      <h2>Agreement to Terms</h2>
      <p>
        By accessing or using firstdueadvisors.com, you agree to be bound by these
        Terms of Service. If you do not agree to these terms, please do not use
        this website.
      </p>

      <h2>Informational Purpose Only</h2>
      <p>
        The content on this website is provided for informational and educational
        purposes only. Nothing on this site constitutes financial, tax, legal, or
        insurance advice. Insurance products and coverage options vary significantly
        based on individual circumstances, state of residence, age, health status,
        and other factors.
      </p>
      <p>
        Any information presented about insurance products, coverage types, or
        general costs should not be relied upon as a substitute for a personalized
        consultation with a licensed insurance professional.
      </p>

      <h2>No Insurance Contract</h2>
      <p>
        Visiting this website or submitting a contact form does not create an
        insurance contract, a binding agreement, or a guarantee of coverage or
        pricing. All insurance products are subject to underwriting approval and
        the terms of the applicable policy.
      </p>

      <h2>Licensing Disclosure</h2>
      <p>
        {SITE_NAME} is a licensed insurance brokerage. We are licensed to offer
        insurance products in: {LICENSED_STATES}. We are not licensed in all
        states. Availability of products and services may vary by state.
      </p>
      <p>
        We are an independent brokerage and work with multiple insurance carriers.
        We are not employees or agents of any single insurance company. Products
        offered are issued by third-party insurers and are not guaranteed by {SITE_NAME}.
      </p>

      <h2>No Guarantee of Outcomes</h2>
      <p>
        We make no representation or warranty that any particular insurance product
        will meet your needs or that any quoted premium or benefit will remain
        unchanged over the life of a policy. Insurance products are subject to
        their own terms, conditions, exclusions, and carrier-specific guidelines.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        This website may contain links to third-party websites or resources. We
        do not control and are not responsible for the content, privacy practices,
        or accuracy of any third-party sites. Links do not constitute endorsement.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE_NAME} and its personnel
        will not be liable for any indirect, incidental, special, or consequential
        damages arising from your use of this website or reliance on information
        presented here. Our total liability for any claim arising from use of this
        site shall not exceed one hundred dollars.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including text, layout, and branding, is the
        property of {SITE_NAME} and may not be reproduced without written permission.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We reserve the right to update these Terms of Service at any time. Changes
        will be reflected by the updated date at the top of this page. Continued use
        of the site after changes constitutes acceptance of the revised terms.
      </p>

      <h2>Governing Law</h2>
      <p>
        These terms are governed by the laws of the state in which {SITE_NAME}
        is licensed and operating, without regard to conflict of law provisions.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms of Service may be directed to {SUPPORT_EMAIL}.
      </p>
    </LegalPage>
  );
}
