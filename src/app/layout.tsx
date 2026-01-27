import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VanityMine | Solana Vanity Address Generator',
  description:
    'Generate custom Solana addresses with your desired prefix or suffix. 100% client-side, open source, and secure.',
  keywords: [
    'solana',
    'vanity address',
    'crypto',
    'wallet',
    'address generator',
    'blockchain',
  ],
  authors: [{ name: 'VanityMine' }],
  openGraph: {
    title: 'VanityMine | Solana Vanity Address Generator',
    description:
      'Generate custom Solana addresses with your desired prefix or suffix. 100% client-side and secure.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VanityMine | Solana Vanity Address Generator',
    description:
      'Generate custom Solana addresses with your desired prefix or suffix.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <meta name="theme-color" content="#F7F5F0" />
      </head>
      <body className="min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
