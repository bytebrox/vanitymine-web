import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security | VanityMine - How We Keep Your Keys Safe',
  description: 'Learn how VanityMine protects your private keys with 100% client-side generation, open source code, automated security checks, and zero data storage.',
  keywords: [
    'VanityMine security',
    'Solana vanity address security',
    'client-side key generation',
    'browser cryptography',
    'open source security',
    'private key safety',
    'Web Crypto API',
    'CSPRNG',
  ],
  openGraph: {
    title: 'Security | VanityMine',
    description: 'Your private keys never leave your browser. Learn how VanityMine ensures complete security with client-side generation and open source transparency.',
    url: 'https://www.vanitymine.com/security',
    siteName: 'VanityMine',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VanityMine Security',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Security | VanityMine',
    description: 'Your private keys never leave your browser. 100% client-side, open source, verifiable.',
    images: ['/og-image.png'],
  },
};

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
