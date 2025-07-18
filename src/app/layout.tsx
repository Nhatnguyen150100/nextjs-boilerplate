import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NetworkGuard } from '@/guards/NetworkGuard';
import { AppProviders } from '@/providers/AppProvider';
import { Toaster } from 'sonner';

const interSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
  preload: true,
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: {
    template: '%s',
    default: 'HVL',
  },
  description: 'Next.js Boilerplate with Shadcn',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://your-site.com',
    siteName: 'My app',
  },
  robots: {
    index: true,
    follow: true,
  },
  keywords: ['HVL'],
  authors: [
    {
      name: 'My app',
      url: 'https://myapp.com',
    },
  ],
  creator: 'My app',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} antialiased bg-background-primary`}
      >
        <AppProviders>
          <NetworkGuard>{children}</NetworkGuard>
        </AppProviders>
        <Toaster position="top-center" closeButton richColors />
      </body>
    </html>
  );
}
