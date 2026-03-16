import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE, SITE_URL, SITE_DESCRIPTION } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage(): Promise<ImageResponse> {
  const [fontDisplay, fontSans] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/librebaskerville/v14/kmKnZrc3Hgbbcjq75U4uslyuy4kn0pNeLSr4uO0.woff2',
    ).then((r) => r.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/dmsans/v15/rP2Hp2ywxg089UriCZa4ET-DNl0.woff2',
    ).then((r) => r.arrayBuffer()),
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

        {/* Large shield watermark (right side, low opacity) */}
        <div
          style={{
            position: 'absolute',
            right: -40,
            top: 20,
            width: 520,
            height: 560,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.06,
          }}
        >
          <svg viewBox="0 0 56 60" width="520" height="560">
            <path
              d="M28 2L4 11v18c0 16 10 27 24 29 14-2 24-13 24-29V11L28 2z"
              fill="#FFFFFF"
            />
          </svg>
        </div>

        {/* Small shield icon + site name (top left) */}
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 80,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <svg viewBox="0 0 56 60" width="48" height="52">
            <path d="M28 2L4 11v18c0 16 10 27 24 29 14-2 24-13 24-29V11L28 2z" fill="#1A3260"/>
            <rect x="22" y="24" width="12" height="12" fill="#B91C1C"/>
            <polygon points="24,10 32,10 31,24 25,24" fill="#B91C1C"/>
            <polygon points="25,36 31,36 32,50 24,50" fill="#B91C1C"/>
            <polygon points="8,25 8,31 22,30 22,26" fill="#B91C1C"/>
            <polygon points="34,26 34,30 48,31 48,25" fill="#B91C1C"/>
          </svg>
          <span
            style={{
              fontSize: 18,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            {SITE_NAME}
          </span>
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
