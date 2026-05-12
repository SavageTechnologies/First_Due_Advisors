import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from '@/lib/site';
import { loadGoogleFont } from '@/lib/seo/og-fonts';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage(): Promise<ImageResponse> {
  const [fontDisplay, fontSans] = await Promise.all([
    loadGoogleFont('Libre Baskerville', 700),
    loadGoogleFont('DM Sans', 400),
  ]);

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
        {/* Top accent bar */}
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

        {/* Large logo watermark (right side, low opacity) */}
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 20,
            width: 606,
            height: 560,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.08,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE_URL}/images/logo.png`}
            alt=""
            width={606}
            height={560}
          />
        </div>

        {/* Small logo badge (top left) — wordmark baked in, no separate text */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE_URL}/images/logo.png`}
            alt={SITE_NAME}
            width={52}
            height={48}
          />
        </div>

        {/* Main content block */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 80px',
            gap: 20,
            flex: 1,
            maxWidth: 740,
          }}
        >
          {/* Tagline / hero text */}
          <div
            style={{
              fontSize: 72,
              fontFamily: 'Libre Baskerville',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE_TAGLINE}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 72,
              height: 4,
              background: '#B91C1C',
              borderRadius: 2,
            }}
          />

          {/* Description */}
          <div
            style={{
              fontSize: 22,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.01em',
              lineHeight: 1.5,
              maxWidth: 600,
            }}
          >
            {SITE_DESCRIPTION}
          </div>
        </div>

        {/* Bottom: trust badge row */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            left: 80,
            display: 'flex',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {['Licensed', 'Independent', 'First Responder Agents'].map((label) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 16,
                fontFamily: 'DM Sans',
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#B91C1C',
                  opacity: 0.8,
                }}
              />
              {label}
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: 48,
            right: 80,
            fontSize: 16,
            fontFamily: 'DM Sans',
            color: 'rgba(255,255,255,0.25)',
            letterSpacing: '0.08em',
          }}
        >
          {SITE_URL.replace('https://', '')}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Libre Baskerville', data: fontDisplay, weight: 700 },
        { name: 'DM Sans', data: fontSans, weight: 400 },
      ],
    },
  );
}
