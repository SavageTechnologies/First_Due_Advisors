import { ImageResponse } from 'next/og';
import { getServiceBySlug } from '@/lib/data/services';
import { SITE_NAME, SITE_URL, CTA_PRIMARY } from '@/lib/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: { slug: string };
}

export async function generateImageMetadata({ params }: Props) {
  const service = await getServiceBySlug(params.slug);
  return [
    {
      id: params.slug,
      alt: service ? `${service.title} | ${SITE_NAME}` : SITE_NAME,
    },
  ];
}

export default async function ServiceOgImage({
  params,
}: Props): Promise<ImageResponse> {
  const service = await getServiceBySlug(params.slug);

  const [fontDisplay, fontSans] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xRbHQ.woff2',
    ).then((r) => r.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZa4ET-DNl0.woff2',
    ).then((r) => r.arrayBuffer()),
  ]);

  const title = service?.title ?? SITE_NAME;
  const tagline =
    service?.tagline ?? 'Licensed · Independent · First Responder Agents';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#0F2044',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent border */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: '#B91C1C',
          }}
        />

        {/* Faint FDA monogram watermark */}
        <div
          style={{
            position: 'absolute',
            right: -20,
            top: 40,
            fontSize: 320,
            fontFamily: 'Playfair Display',
            fontWeight: 700,
            color: '#1A3260',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
          }}
        >
          FDA
        </div>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 80px 80px 80px',
            gap: 20,
            flex: 1,
            maxWidth: 760,
          }}
        >
          {/* Site name */}
          <div
            style={{
              fontSize: 20,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.55)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {SITE_NAME}
          </div>

          {/* Service title */}
          <div
            style={{
              fontSize: 72,
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 64,
              height: 4,
              background: '#B91C1C',
            }}
          />

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.4,
              maxWidth: 600,
            }}
          >
            {tagline}
          </div>
        </div>

        {/* CTA badge bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 80,
            background: '#B91C1C',
            padding: '14px 28px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            {CTA_PRIMARY}
          </span>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 36,
            left: 80,
            fontSize: 18,
            fontFamily: 'DM Sans',
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.06em',
          }}
        >
          {SITE_URL.replace('https://', '')}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Playfair Display', data: fontDisplay, weight: 700 },
        { name: 'DM Sans', data: fontSans, weight: 400 },
      ],
    },
  );
}
