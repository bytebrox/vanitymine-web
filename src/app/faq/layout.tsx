import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ | VanityMine',
  description:
    'Frequently asked questions about VanityMine Solana vanity address generator. Learn about security, performance, token mints, and how it works.',
  keywords: [
    'vanity address faq',
    'solana address generator help',
    'how to create vanity address',
    'pump.fun token guide',
    'vanitymine help',
  ],
  openGraph: {
    title: 'FAQ | VanityMine',
    description:
      'Frequently asked questions about VanityMine. Learn about security, performance, and how to generate vanity addresses.',
    url: 'https://vanitymine.com/faq',
  },
  twitter: {
    title: 'FAQ | VanityMine',
    description:
      'Frequently asked questions about VanityMine Solana vanity address generator.',
  },
  alternates: {
    canonical: 'https://vanitymine.com/faq',
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
