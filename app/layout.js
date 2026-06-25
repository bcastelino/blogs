import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

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
    'Personal blog by Brian Castelino — writing about technology, building things, and various topics.',
  openGraph: {
    type: 'website',
    title: 'The Brian Journal',
    description:
      'Personal blog by Brian Castelino — writing about technology, building things, and various topics.',
    url: 'https://bcastelino.github.io/blogs',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Brian Journal',
    description:
      'Personal blog by Brian Castelino — writing about technology, building things, and various topics.',
  },
};

// Avoid theme flash before hydration.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
