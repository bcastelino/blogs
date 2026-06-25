import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';
export const alt = 'The Brian Journal — Notes on building & ideas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), 'public', 'tbj-white-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: 'linear-gradient(150deg, #161617 0%, #000000 70%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={120} height={120} alt="" />
          <div
            style={{
              fontSize: '30px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#a1a1a6',
            }}
          >
            The Brian Journal
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              fontSize: '88px',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 1.02,
            }}
          >
            Notes on building &amp; ideas
          </div>
          <div style={{ fontSize: '34px', color: '#a1a1a6', letterSpacing: '-0.01em' }}>
            Essays, experiments, and field notes on technology &amp; software.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '26px',
            color: '#6e6e73',
          }}
        >
          <div style={{ width: '40px', height: '4px', background: '#007aff' }} />
          bcastelino.github.io/blogs
        </div>
      </div>
    ),
    { ...size }
  );
}
