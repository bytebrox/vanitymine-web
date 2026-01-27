'use client';

/**
 * FAQ Page
 * Comprehensive answers to common questions about VanityMine
 */

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SecurityInfo } from '@/components/SecurityInfo';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
  category: string;
}

const faqs: FAQItem[] = [
  // General
  {
    category: 'General',
    question: 'What is a vanity address?',
    answer: 'A vanity address is a cryptocurrency wallet address that contains a specific pattern you choose. For example, an address starting with "SOL" or ending with "DAO". It\'s purely cosmetic but can help with brand recognition or personalization.',
  },
  {
    category: 'General',
    question: 'Why would I want a vanity address?',
    answer: 'Common reasons include: brand recognition for businesses and DAOs, personal customization, easier identification of your own addresses, and professional appearance for public-facing wallets.',
  },
  {
    category: 'General',
    question: 'Is the address generated here a real Solana address?',
    answer: 'Yes, absolutely. The addresses generated are standard Solana Ed25519 keypairs, fully compatible with all Solana wallets (Phantom, Solflare, etc.), exchanges, and dApps.',
  },
  {
    category: 'General',
    question: 'How long does it take to find an address?',
    answer: 'It depends on the pattern length. Each additional character multiplies the search time by approximately 58x. A 3-character pattern takes seconds, 4 characters about 1 minute, 5 characters can take 30-60 minutes, and 6+ characters can take hours or days.',
  },
  {
    category: 'General',
    question: 'Why can\'t I use certain characters like 0, O, I, or l?',
    answer: 'Solana addresses use Base58 encoding, which deliberately excludes characters that look similar to avoid confusion. This means 0 (zero), O (capital o), I (capital i), and l (lowercase L) are not valid.',
  },

  // Security
  {
    category: 'Security',
    question: 'Is this safe to use?',
    answer: 'Yes. All key generation happens entirely in your browser. Your private keys are never sent to any server. You can verify this by checking the Network tab in your browser\'s developer tools while generating.',
  },
  {
    category: 'Security',
    question: 'Do you store my private keys?',
    answer: 'No. We have no database, no backend processing, and no way to access your keys. The entire application runs client-side in your browser. Once you close the page, the keys exist only where you saved them.',
  },
  {
    category: 'Security',
    question: 'How can I verify the keys aren\'t being sent somewhere?',
    answer: 'Open your browser\'s Developer Tools (F12), go to the Network tab, then generate an address. You\'ll see no outgoing requests during generation. You can also disconnect from the internet and the tool will still work.',
  },
  {
    category: 'Security',
    question: 'Is the code open source?',
    answer: 'Yes. The complete source code is available on GitHub at github.com/bytebrox/vanitymine-web. You can audit the code yourself or have someone you trust review it.',
  },
  {
    category: 'Security',
    question: 'Can I use this offline?',
    answer: 'Yes. Once the page is loaded, you can disconnect from the internet and continue generating addresses. This is another way to ensure your keys never leave your device.',
  },
  {
    category: 'Security',
    question: 'Are vanity addresses less secure than random addresses?',
    answer: 'No. The cryptographic security is identical. The private key is still generated randomly using secure methods (Web Crypto API). Only the public key is filtered for your pattern.',
  },

  // Technical
  {
    category: 'Technical',
    question: 'How does the generation work?',
    answer: 'We generate random Ed25519 keypairs and check if the resulting public key (Base58 encoded) matches your pattern. This is repeated until a match is found. Our WASM engine can check 22,000+ keys per second.',
  },
  {
    category: 'Technical',
    question: 'What is WASM and why does it make this faster?',
    answer: 'WebAssembly (WASM) is a binary format that runs at near-native speed in browsers. We use watsign, a WASM port of the Ed25519 algorithm, which is about 28x faster than pure JavaScript implementations.',
  },
  {
    category: 'Technical',
    question: 'What are Web Workers?',
    answer: 'Web Workers are a browser feature that allows JavaScript to run in parallel background threads. This lets us use multiple CPU cores simultaneously without freezing your browser\'s interface.',
  },
  {
    category: 'Technical',
    question: 'Why does the speed vary?',
    answer: 'Generation speed depends on your device\'s CPU, how many cores it has, and what else your computer is doing. Modern multi-core processors will be significantly faster.',
  },
  {
    category: 'Technical',
    question: 'What cryptographic algorithm is used?',
    answer: 'Ed25519, the same elliptic curve digital signature algorithm used by Solana. Random numbers are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure.',
  },

  // Usage
  {
    category: 'Usage',
    question: 'How do I import the generated key into Phantom?',
    answer: 'Download the JSON file, then in Phantom: Settings → Manage Accounts → Add/Connect Wallet → Import Private Key → select your JSON file. Alternatively, you can copy the private key directly.',
  },
  {
    category: 'Usage',
    question: 'What\'s the difference between TXT and JSON download?',
    answer: 'TXT is human-readable and good for secure storage. JSON is in Solana CLI format and can be directly imported into wallets like Phantom, Solflare, and the Solana CLI tools.',
  },
  {
    category: 'Usage',
    question: 'Can I search for both prefix and suffix at the same time?',
    answer: 'Yes! Enter your desired prefix and suffix, and the tool will find an address matching both. Note that this exponentially increases the difficulty.',
  },
  {
    category: 'Usage',
    question: 'What does "case sensitive" mean?',
    answer: 'When enabled, the pattern must match exactly (e.g., "Sol" won\'t match "SOL" or "sol"). When disabled, any capitalization will match, making it faster to find addresses.',
  },
  {
    category: 'Usage',
    question: 'Can I pause and resume generation?',
    answer: 'You can stop generation at any time, but you cannot resume from where you left off. Each start begins a fresh search.',
  },

  // Troubleshooting
  {
    category: 'Troubleshooting',
    question: 'Why is the "Start Mining" button disabled?',
    answer: 'The button is disabled if: no pattern is entered, the pattern contains invalid Base58 characters, or the pattern is too long. Check for characters like 0, O, I, or l which aren\'t allowed.',
  },
  {
    category: 'Troubleshooting',
    question: 'My browser is freezing during generation',
    answer: 'Try reducing the number of threads/workers. Using too many on an older device can cause slowdowns. The tool should remain responsive, but reducing threads helps on lower-end hardware.',
  },
  {
    category: 'Troubleshooting',
    question: 'The generated key doesn\'t work in my wallet',
    answer: 'Make sure you\'re downloading the JSON format for wallet imports. The TXT file is for human reading. If issues persist, try copying the private key directly from the reveal option.',
  },
  {
    category: 'Troubleshooting',
    question: 'Sound notification isn\'t playing',
    answer: 'Ensure sound is enabled (toggle in the controls section). Your browser may also be blocking audio—try clicking anywhere on the page first, as browsers require user interaction before playing sounds.',
  },
];

// Group FAQs by category
const categories = [...new Set(faqs.map((faq) => faq.category))];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFaqs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onHowItWorksClick={() => setShowSecurityInfo(true)} />

      {/* Header */}
      <header className="border-b-2 border-ink bg-paper">
        <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 md:py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4">
            Frequently Asked<br />
            <span className="text-accent">Questions</span>
          </h1>
          <p className="text-lg text-muted max-w-2xl">
            Everything you need to know about VanityMine, vanity addresses, 
            security, and how to use the tool effectively.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-ink/20">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-ink text-paper'
                : 'bg-ink/5 text-ink hover:bg-ink/10'
            }`}
          >
            All ({faqs.length})
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-ink text-paper'
                  : 'bg-ink/5 text-ink hover:bg-ink/10'
              }`}
            >
              {category} ({faqs.filter((f) => f.category === category).length})
            </button>
          ))}
        </div>

        {/* FAQ list */}
        <div className="max-w-4xl">
          {filteredFaqs.map((faq, index) => {
            const globalIndex = faqs.indexOf(faq);
            const isOpen = openIndex === globalIndex;

            return (
              <div key={globalIndex} className="border-b border-ink/20">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                  className="w-full py-5 flex items-start justify-between text-left gap-4"
                >
                  <div>
                    <span className="text-micro text-accent font-medium uppercase tracking-wider">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-medium mt-1">{faq.question}</h3>
                  </div>
                  <span className={`text-2xl text-accent transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <div className="pb-5 pr-12">
                    <p className="text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 p-6 sm:p-8 bg-ink/5 border border-ink/20 max-w-4xl">
          <h2 className="text-xl font-bold mb-2">Still have questions?</h2>
          <p className="text-muted mb-4">
            Check out our detailed technical documentation or view the source code directly.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowSecurityInfo(true)}
              className="btn-primary"
            >
              How it Works
            </button>
            <a
              href="https://github.com/bytebrox/vanitymine-web"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Source Code
            </a>
          </div>
        </div>
      </main>

      <Footer />
      
      <SecurityInfo
        isOpen={showSecurityInfo}
        onClose={() => setShowSecurityInfo(false)}
      />
    </div>
  );
}
