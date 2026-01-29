import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Token Mint Generator | VanityMine',
  description:
    'Generate custom Solana token mint addresses for pump.fun and other launchers. Create vanity token addresses that start or end with your desired pattern. 100% client-side.',
  keywords: [
    'pump.fun',
    'token mint',
    'solana token',
    'vanity token address',
    'custom token address',
    'token launcher',
    'solana meme coin',
    'create token',
  ],
  openGraph: {
    title: 'Token Mint Generator | VanityMine',
    description:
      'Generate custom Solana token addresses for pump.fun launches. Create memorable token mints.',
    url: 'https://vanitymine.com/token',
  },
  twitter: {
    title: 'Token Mint Generator | VanityMine',
    description:
      'Generate custom Solana token addresses for pump.fun launches.',
  },
  alternates: {
    canonical: 'https://vanitymine.com/token',
  },
};

export default function TokenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
