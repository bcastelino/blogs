import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import CookieConsent from '@/components/CookieConsent';
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, AUTHOR, LOGO_URL } from '@/lib/site';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://bcastelino.github.io'),
  title: {
    default: 'The Brian Journal',
    template: '%s · The Brian Journal',
  },
  description:
    'Personal blog by Brian Castelino, writing about technology, building things, and various topics.',
  alternates: {
    types: {
      'application/rss+xml': [{ url: `${SITE_URL}/feed.xml`, title: SITE_NAME }],
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'The Brian Journal',
    locale: 'en_US',
    title: 'The Brian Journal',
    description:
      'Personal blog by Brian Castelino, writing about technology, building things, and various topics.',
    url: 'https://bcastelino.github.io/blogs/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Brian Journal',
    description:
      'Personal blog by Brian Castelino, writing about technology, building things, and various topics.',
  },
};

// Avoid theme flash before hydration.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

// Site-wide structured data: identifies the site, its author, and publisher
// so AI engines and search can build an entity graph for the blog.
const siteJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: 'en-US',
      publisher: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: AUTHOR.name,
      url: AUTHOR.url,
      sameAs: AUTHOR.sameAs,
      image: LOGO_URL,
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }} />
        <GoogleAnalytics />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Nav />
        <main id="main-content" style={{ flex: 1 }}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
