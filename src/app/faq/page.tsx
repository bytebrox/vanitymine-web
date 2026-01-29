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
  {
    category: 'General',
    question: 'What\'s the difference between Wallet and Token Mint generator?',
    answer: 'The Wallet generator creates vanity addresses for your personal wallet. The Token Mint generator creates vanity addresses for token contracts - useful when launching tokens on pump.fun or other platforms. Technically they\'re identical (both Ed25519 keypairs), but the usage is different.',
  },

  // Token Mint
  {
    category: 'Token Mint',
    question: 'What is a Token Mint address?',
    answer: 'A Token Mint address is the contract address of a token on Solana. When you launch a token, this address becomes permanent and public - it\'s what people see on DEXScreener, Birdeye, and other platforms.',
  },
  {
    category: 'Token Mint',
    question: 'How do I use the generated key with pump.fun?',
    answer: 'After generating a token address: 1) Copy the Private Key, 2) On pump.fun, find the "Token Address" section, 3) Paste the private key and click "Use Custom", 4) Complete your token launch. Your token will have your custom vanity address!',
  },
  {
    category: 'Token Mint',
    question: 'Does the token address need to end with "pump"?',
    answer: 'No! That\'s a common misconception. You can use any vanity pattern you like - DOGE, MOON, your project name, etc. The "pump" suffix some tokens have is just marketing, not a technical requirement.',
  },
  {
    category: 'Token Mint',
    question: 'Can someone steal my token address before I launch?',
    answer: 'No. Your token address is protected by the private key. Without the private key, nobody can deploy a token to that address. As long as you keep your private key secret until you use it, the address is yours.',
  },
  {
    category: 'Token Mint',
    question: 'Do I need to keep the private key after launching?',
    answer: 'No. The private key is only used once during token creation. After your token is deployed, the token address becomes public and permanent. You don\'t need to store the mint keypair - it served its purpose.',
  },
  {
    category: 'Token Mint',
    question: 'Does this work with other launchers besides pump.fun?',
    answer: 'Yes! The generated keypairs work with any Solana token launcher that supports custom mint addresses, including Raydium, Jupiter Launch, and others. The key format is standard Solana.',
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
    question: 'What about the Community Stats - what data do you collect?',
    answer: 'The Community Stats store exactly TWO numbers: total attempts and total found addresses. That\'s it. No IP addresses, no keys, no patterns, no timestamps, no user identifiers. When you find an address, we send ONE number (your attempt count) to increment the counter. You can verify this in the Network tab - the request is just { "attempts": 12345 }.',
  },
  {
    category: 'Security',
    question: 'How can I verify you\'re not secretly storing my data?',
    answer: 'Open Developer Tools (F12) → Network tab → Generate an address. You\'ll see: 1) NO requests during generation (keys are local), 2) ONE request to /api/stats when found (only contains attempt count). The API code is open source at src/app/api/stats/route.ts - we physically cannot store what we don\'t receive.',
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
  {
    category: 'Security',
    question: 'What is the Key Security Check?',
    answer: 'After generating a key, we perform a real-time security analysis: checking entropy level (256 bits), verifying CSPRNG support, running a random sample test with 10,000 bytes, and performing a Chi-Square statistical test. This proves your browser uses proper cryptographic random number generation.',
  },
  {
    category: 'Security',
    question: 'What does the Chi-Square test measure?',
    answer: 'The Chi-Square test verifies that random numbers are uniformly distributed. We generate 10,000 random bytes and check if all 256 possible values (0-255) appear with roughly equal frequency. A Chi-Square value below 293 means excellent randomness (p > 0.05).',
  },
  {
    category: 'Security',
    question: 'What is CSPRNG?',
    answer: 'CSPRNG stands for Cryptographically Secure Pseudo-Random Number Generator. It\'s a special type of random number generator designed for security applications. Your browser\'s Web Crypto API provides hardware-backed CSPRNG, which is the gold standard for key generation.',
  },
  {
    category: 'Security',
    question: 'What automated security measures are in place?',
    answer: 'We use multiple layers of automated security: Dependabot automatically updates dependencies with security patches, CodeQL performs static code analysis on every push, npm audit runs in our CI pipeline to check for known vulnerabilities, and Lighthouse CI monitors performance and best practices. All security checks are public and visible on our GitHub repository.',
  },
  {
    category: 'Security',
    question: 'What is CodeQL and why does it matter?',
    answer: 'CodeQL is GitHub\'s semantic code analysis engine. It scans our codebase for security vulnerabilities, bugs, and code quality issues on every push and pull request. This means potential security issues are caught before they ever reach production. Results are visible in our GitHub Security tab.',
  },
  {
    category: 'Security',
    question: 'How do you keep dependencies secure?',
    answer: 'We use Dependabot, which automatically monitors all our npm packages for known vulnerabilities. When a security update is available, Dependabot creates a pull request within hours. This ensures we\'re always running the most secure versions of our dependencies.',
  },
  {
    category: 'Security',
    question: 'Where can I see the security audit results?',
    answer: 'All our security checks are transparent and public: 1) CI build status shows in the README badges, 2) CodeQL results are in GitHub\'s Security tab, 3) Dependabot alerts are visible in the repository, 4) You can also check our SECURITY.md file for our complete security policy and how to report vulnerabilities.',
  },

  // Technical
  {
    category: 'Technical',
    question: 'How does the generation work?',
    answer: 'We use your browser\'s native Web Crypto API to generate random Ed25519 keypairs, then check if the resulting public key (Base58 encoded) matches your pattern. This is repeated until a match is found. Modern browsers can generate 100,000+ keys per second using all CPU cores.',
  },
  {
    category: 'Technical',
    question: 'Why is this so fast?',
    answer: 'We use the native Web Crypto API (SubtleCrypto.generateKey) which is implemented in browser\'s C++ code, not JavaScript. This is 125x faster than JavaScript implementations and even faster than WebAssembly. Chrome 137+, Firefox 129+, and Safari 17+ all support native Ed25519.',
  },
  {
    category: 'Technical',
    question: 'What are Web Workers?',
    answer: 'Web Workers are a browser feature that allows JavaScript to run in parallel background threads. This lets us use multiple CPU cores simultaneously without freezing your browser\'s interface.',
  },
  {
    category: 'Technical',
    question: 'Why does the speed vary?',
    answer: 'Generation speed depends on your device\'s CPU, how many cores it has, browser support for native Ed25519, and what else your computer is doing. Modern multi-core processors with native Ed25519 support (Chrome 137+) will be significantly faster.',
  },
  {
    category: 'Technical',
    question: 'What cryptographic algorithm is used?',
    answer: 'Ed25519, the same elliptic curve digital signature algorithm used by Solana. Keys are generated using your browser\'s native Web Crypto API (SubtleCrypto.generateKey for Ed25519), which uses hardware-backed CSPRNG for maximum security.',
  },
  {
    category: 'Technical',
    question: 'What if my browser doesn\'t support native Ed25519?',
    answer: 'For older browsers without native Ed25519 support, we fall back to watsign (WebAssembly implementation). This is still fast (~22,000 keys/sec) but about 5x slower than native. The Key Security Check will show which method your browser uses.',
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
