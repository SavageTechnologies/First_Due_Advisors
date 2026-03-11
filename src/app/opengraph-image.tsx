import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from '@/lib/site';

export const runtime = 'edge';
export const alt = `${SITE_NAME} — ${SITE_TAGLINE}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage(): Promise<ImageResponse> {
  const [fontDisplay, fontSans] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/playfairdisplay/v37/nuFiD-vYSZviVYUb_rj3ij__anPXDTzYgEM86xRbHQ.woff2',
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
            gap: 24,
            flex: 1,
            maxWidth: 720,
          }}
        >
          {/* Site name */}
          <div
            style={{
              fontSize: 22,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            {SITE_NAME}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 68,
              fontFamily: 'Playfair Display',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {SITE_TAGLINE}
          </div>

          {/* Divider */}
          <div
            style={{
              width: 64,
              height: 4,
              background: '#B91C1C',
            }}
          />

          {/* Trust line */}
          <div
            style={{
              fontSize: 22,
              fontFamily: 'DM Sans',
              fontWeight: 400,
              color: 'rgba(255,255,255,0.65)',
              letterSpacing: '0.04em',
            }}
          >
            Licensed · Independent · First Responder Agents
          </div>
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
