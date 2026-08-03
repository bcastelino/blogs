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

  const titleSize = meta.title.length > 70 ? 56 : meta.title.length > 44 ? 68 : 86;

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
          <img src={logoSrc} width={110} height={110} alt="" />
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '24px',
              color: '#0a84ff',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontWeight: 700,
            }}
          >
            <div style={{ width: '36px', height: '5px', background: '#0a84ff' }} />
            {category}
          </div>
          <div
            style={{
              fontSize: `${titleSize}px`,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.08,
              color: '#ffffff',
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
            fontSize: '28px',
            fontWeight: 600,
            color: '#ffffff',
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
