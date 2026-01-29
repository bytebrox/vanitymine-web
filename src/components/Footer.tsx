'use client';

/**
 * Footer component
 * Full-width editorial style
 * Mobile-optimized layout
 */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-paper mt-section">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-10 sm:py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a href="/" className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 hover:opacity-80 transition-opacity w-fit">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent flex items-center justify-center rounded overflow-hidden p-1.5 sm:p-2">
                <img src="/logo_w.png" alt="VanityMine" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-xl sm:text-2xl tracking-tight">VanityMine</span>
            </a>
            <p className="text-paper/70 leading-relaxed text-sm sm:text-base max-w-sm">
              A free, open-source tool for generating custom Solana addresses.
              Built with security and transparency as the top priorities.
            </p>
          </div>

          {/* Generators */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
              Generators
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="/"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Wallet Address
                </a>
              </li>
              <li>
                <a
                  href="/token"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Token Mint Address
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://solana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Solana Official
                </a>
              </li>
              <li>
                <a
                  href="https://docs.solana.com/wallet-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Wallet Guide
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/bytebrox/vanitymine-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* Security */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
              Security
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="/security"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  🔒 Security Overview
                </a>
              </li>
              <li className="text-paper/70">✓ 100% Client-Side</li>
              <li className="text-paper/70">✓ No Server Storage</li>
              <li className="text-paper/70">✓ Open Source</li>
              <li className="text-paper/70">✓ Offline Capable</li>
              <li>
                <a
                  href="https://github.com/bytebrox/vanitymine-web/security/policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  Security Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-4 sm:mb-6">
              Connect
            </h4>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <li>
                <a
                  href="https://github.com/bytebrox/vanitymine-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/70 hover:text-paper transition-colors"
                >
                  X.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs text-paper/50 uppercase tracking-wider mb-3">Security Status</p>
          <div className="flex flex-wrap gap-2">
            <a href="https://github.com/bytebrox/vanitymine-web/actions/workflows/ci.yml" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/bytebrox/vanitymine-web/actions/workflows/ci.yml/badge.svg" alt="CI" className="h-5" />
            </a>
            <a href="https://github.com/bytebrox/vanitymine-web/actions/workflows/codeql.yml" target="_blank" rel="noopener noreferrer">
              <img src="https://github.com/bytebrox/vanitymine-web/actions/workflows/codeql.yml/badge.svg" alt="CodeQL" className="h-5" />
            </a>
            <a href="https://snyk.io/test/github/bytebrox/vanitymine-web" target="_blank" rel="noopener noreferrer">
              <img src="https://snyk.io/test/github/bytebrox/vanitymine-web/badge.svg" alt="Snyk" className="h-5" />
            </a>
            <a href="https://app.codacy.com/gh/bytebrox/vanitymine-web/dashboard" target="_blank" rel="noopener noreferrer">
              <img src="https://app.codacy.com/project/badge/Grade/87604c4f215b425290fdc373a1c69b00" alt="Codacy" className="h-5" />
            </a>
            <a href="https://socket.dev" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/Socket.dev-Protected-blue.svg" alt="Socket.dev" className="h-5" />
            </a>
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" className="h-5" />
            </a>
            <a href="https://github.com/bytebrox/vanitymine-web/security/policy" target="_blank" rel="noopener noreferrer">
              <img src="https://img.shields.io/badge/Security-Policy-blue.svg" alt="Security Policy" className="h-5" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-accent mb-6 sm:mb-8" />

        {/* Bottom line */}
        <div className="flex flex-col gap-2 sm:gap-4 text-xs sm:text-sm text-paper/50">
          <p>
            © {year} VanityMine — Not affiliated with Solana Foundation
          </p>
          <p>
            Use at your own risk • Always verify generated keys
          </p>
        </div>
      </div>
    </footer>
  );
}
