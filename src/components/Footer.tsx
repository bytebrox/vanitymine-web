'use client';

/**
 * Footer component
 * Full-width editorial style
 */

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-ink text-paper mt-section">
      <div className="px-6 md:px-12 lg:px-20 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent flex items-center justify-center p-1.5">
                <img src="/logo_w.png" alt="VanityMine" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-2xl tracking-tight">VanityMine</span>
            </div>
            <p className="text-paper/70 leading-relaxed max-w-sm">
              A free, open-source tool for generating custom Solana addresses.
              Built with security and transparency as the top priorities.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">
              Resources
            </h4>
            <ul className="space-y-3">
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
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">
              Security
            </h4>
            <ul className="space-y-3 text-paper/70">
              <li>✓ 100% Client-Side</li>
              <li>✓ No Server Storage</li>
              <li>✓ Open Source</li>
              <li>✓ Offline Capable</li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-6">
              Connect
            </h4>
            <ul className="space-y-3">
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

        {/* Divider */}
        <div className="border-t-2 border-accent mb-8" />

        {/* Bottom line */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm text-paper/50">
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
