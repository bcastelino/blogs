import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getPostSlugs, getPostMeta } from '@/lib/posts';

export const dynamic = 'force-static';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const alt = 'The Brian Journal article';

export default async function OpengraphImage({ params }) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  const category = meta.tags[0] ?? 'Journal';

  const logo = readFileSync(join(process.cwd(), 'public', 'brand', 'tbj-white-logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  const titleSize = meta.title.length > 70 ? 60 : meta.title.length > 44 ? 72 : 88;

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
          <img src={logoSrc} width={110} height={110} alt="" />
          <div
            style={{
              fontSize: '28px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#a1a1a6',
            }}
          >
            The Brian Journal
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              fontSize: '26px',
              color: '#0a84ff',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            <div style={{ width: '34px', height: '4px', background: '#007aff' }} />
            {category}
          </div>
          <div
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              display: 'flex',
            }}
          >
            {meta.title}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '24px',
            color: '#6e6e73',
          }}
        >
          <span>By {meta.author}</span>
          <span>bcastelino.github.io/blogs</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
