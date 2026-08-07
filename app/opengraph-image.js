import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const dynamic = 'force-static';
export const alt = 'The Brian Journal: Brian Castelino on Databricks, data and AI engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  const logo = readFileSync(join(process.cwd(), 'public', 'brand', 'tbj-white-logo.png'));
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
          padding: '70px',
          background: '#0a0a0a',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={120} height={120} alt="" />
          <div
            style={{
              fontSize: '28px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}
          >
            The Brian Journal
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '76px',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1.04,
              color: '#ffffff',
            }}
          >
            Databricks, data &amp; AI engineering
          </div>
          <div style={{ fontSize: '34px', color: '#d1d1d6', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
            Long-form, sourced, and honest about what broke.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            fontSize: '28px',
            fontWeight: 600,
            color: '#ffffff',
          }}
        >
          <div style={{ width: '48px', height: '5px', background: '#0a84ff' }} />
          bcastelino.com/blogs
        </div>
      </div>
    ),
    { ...size }
  );
}
