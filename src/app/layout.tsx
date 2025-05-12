import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/global.css';
import '@/styles/reset.css';
import { ShaCnProvider } from '@/providers/ShacnProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'Next.js Boilerplate with MUI',
  openGraph: {
    type: 'website',
    locale: 'en',
    url: 'https://your-site.com',
    siteName: 'My App',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ShaCnProvider
          attribute={'class'}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ShaCnProvider>
      </body>
    </html>
  );
}
