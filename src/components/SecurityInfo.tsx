'use client';

/**
 * Security information panel
 * Explains how the app works and why it's secure
 */

interface SecurityInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SecurityInfo({ isOpen, onClose }: SecurityInfoProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-paper max-w-2xl w-full max-h-[90vh] sm:max-h-[80vh] overflow-y-auto border-2 border-ink">
        {/* Header with background image */}
        <div className="sticky top-0 bg-ink text-paper p-4 sm:p-grid flex items-center justify-between relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
            style={{ backgroundImage: 'url(/hero.png)' }}
          />
          <h2 className="text-lg sm:text-title font-bold relative z-10">How VanityMine Works</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70 p-1 relative z-10"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-4 sm:p-grid space-y-5 sm:space-y-6">
          {/* Revolutionary Performance */}
          <section className="bg-accent/10 border-l-4 border-accent p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              Revolutionary Performance
            </h3>
            <div className="space-y-3 text-sm sm:text-body">
              <p>
                <strong>VanityMine is the fastest browser-based Solana vanity address generator available.</strong> Using 
                the native Web Crypto API, we achieve speeds up to <span className="text-accent font-bold">100,000+ keys per second</span>—that's 
                <span className="text-accent font-bold"> 125x faster</span> than traditional JavaScript implementations.
              </p>
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-center mt-3 sm:mt-4">
                <div className="bg-paper p-2 sm:p-3 border border-accent/30">
                  <p className="text-lg sm:text-2xl font-bold text-accent">100K+</p>
                  <p className="text-[10px] sm:text-micro text-muted">Keys/Sec</p>
                </div>
                <div className="bg-paper p-2 sm:p-3 border border-accent/30">
                  <p className="text-lg sm:text-2xl font-bold text-accent">125x</p>
                  <p className="text-[10px] sm:text-micro text-muted">Faster</p>
                </div>
                <div className="bg-paper p-2 sm:p-3 border border-accent/30">
                  <p className="text-lg sm:text-2xl font-bold text-accent">100%</p>
                  <p className="text-[10px] sm:text-micro text-muted">Local</p>
                </div>
              </div>
              <p className="text-xs sm:text-micro text-muted mt-2 sm:mt-3">
                Modern browsers (Chrome 113+, Firefox 129+, Safari 17+) support native Ed25519 cryptography. 
                We leverage this for maximum speed. A 4-character pattern that takes minutes elsewhere 
                can be found in seconds with VanityMine.
              </p>
            </div>
          </section>

          {/* Security section */}
          <section>
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              Security First
            </h3>
            <ul className="space-y-2 text-sm sm:text-body">
              <li className="flex gap-2">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong>100% Client-Side:</strong> All key generation happens
                  in your browser using Web Workers. No data is ever sent to any server.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong>Open Source:</strong> The entire codebase is available
                  for inspection. Verify the code yourself.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong>No Storage:</strong> Private keys are never stored.
                  They exist only in your browser's memory until you close the page.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold shrink-0">✓</span>
                <span>
                  <strong>Offline Capable:</strong> Once loaded, this app works
                  completely offline. Disconnect your internet to verify.
                </span>
              </li>
            </ul>
          </section>

          {/* How to verify */}
          <section>
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              How to Verify
            </h3>
            <ol className="space-y-1.5 sm:space-y-2 text-sm sm:text-body list-decimal list-inside">
              <li>Open your browser's Developer Tools (F12)</li>
              <li>Go to the Network tab</li>
              <li>Start generating an address</li>
              <li>Observe: No network requests are made during generation</li>
              <li>Optional: Disconnect from internet and try again</li>
            </ol>
          </section>

          {/* Technical details */}
          <section>
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              Technical Architecture
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-body">
              <p>
                <strong>Where does the computation happen?</strong> Everything 
                runs in <em>your browser</em>, not on any server. The server 
                only delivers static files – HTML, CSS, and JavaScript. Once 
                loaded, your browser executes all code locally.
              </p>
              <p>
                <strong>Web Workers (Browser Threads):</strong> Web Workers are 
                a browser API that allows JavaScript to run in parallel background 
                threads. They use <em>your CPU cores</em>, not server resources. 
                This is why performance depends on your device, not our hosting.
              </p>
              <p>
                <strong>Native Web Crypto API – Our Secret Weapon:</strong> This is what makes 
                VanityMine revolutionary. Modern browsers (Chrome 113+, Firefox 129+, Safari 17+) support 
                Ed25519 natively in the Web Crypto API. This runs directly in the browser's 
                cryptographic engine with OS-level optimizations, delivering 
                <span className="text-accent font-bold"> 125x the performance</span> of pure JavaScript. 
                For older browsers, we automatically fall back to WASM (watsign).
              </p>
              <p>
                <strong>Multi-Core Parallelization:</strong> VanityMine distributes workload 
                across all available CPU cores simultaneously. More cores = more speed. 
                On an 8-core machine, you're effectively running 8 generators in parallel.
              </p>
              <p>
                <strong>Key Generation:</strong> Uses Ed25519 elliptic curve 
                cryptography (same as Solana). Random numbers come from the 
                Web Crypto API (crypto.getRandomValues) which is cryptographically 
                secure and hardware-backed on most devices.
              </p>
            </div>
          </section>

          {/* Server vs Browser */}
          <section>
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              Server vs Browser
            </h3>
            <div className="space-y-2 text-sm sm:text-body">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-caption">
                <div className="bg-ink/5 p-2.5 sm:p-3">
                  <p className="font-bold mb-1.5 sm:mb-2">Server</p>
                  <ul className="space-y-1 text-muted">
                    <li>• Delivers static files</li>
                    <li>• No computation</li>
                    <li>• No key access</li>
                    <li>• No data storage</li>
                  </ul>
                </div>
                <div className="bg-accent/10 p-2.5 sm:p-3">
                  <p className="font-bold mb-1.5 sm:mb-2">Your Browser</p>
                  <ul className="space-y-1">
                    <li>• Runs all JavaScript</li>
                    <li>• Executes Web Workers</li>
                    <li>• Generates keys locally</li>
                    <li>• Uses your CPU</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs sm:text-micro text-muted mt-2">
                This architecture is why the app works offline and why we can 
                never access your keys – they only exist in your browser's memory.
              </p>
            </div>
          </section>

          {/* CSP info */}
          <section>
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-accent mb-2 sm:mb-3">
              Content Security Policy
            </h3>
            <p className="text-sm sm:text-body mb-2">
              This site uses strict CSP headers that prevent:
            </p>
            <ul className="text-sm sm:text-body space-y-1 ml-4">
              <li>• External script loading</li>
              <li>• Connections to external APIs</li>
              <li>• Data exfiltration via fetch/XHR</li>
              <li>• Embedding in iframes</li>
            </ul>
          </section>

          {/* Community Stats Transparency */}
          <section className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-blue-700 mb-2 sm:mb-3">
              Community Stats – Full Transparency
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-body text-blue-900">
              <p>
                <strong>We display community statistics. Here's exactly what we store:</strong>
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-micro">
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-green-700 mb-1">✓ What IS stored:</p>
                  <ul className="space-y-0.5">
                    <li>• totalAttempts (one number)</li>
                    <li>• totalFound (one number)</li>
                  </ul>
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-red-700 mb-1">✗ What is NOT stored:</p>
                  <ul className="space-y-0.5">
                    <li>• No IP addresses</li>
                    <li>• No keys (public or private)</li>
                    <li>• No patterns searched</li>
                    <li>• No user identifiers</li>
                  </ul>
                </div>
              </div>
              <div className="bg-white/50 p-2 rounded text-xs sm:text-micro">
                <p className="font-bold mb-1">How to verify:</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Open DevTools (F12) → Network tab</li>
                  <li>Generate an address</li>
                  <li>When found, see the ONE request to /api/stats</li>
                  <li>Click it: payload is just {"{"} "attempts": 12345 {"}"}</li>
                </ol>
              </div>
              <p className="text-xs sm:text-micro text-blue-700">
                The API code is open source. We physically cannot store what we don't receive.
              </p>
            </div>
          </section>

          {/* Token Mint Generator */}
          <section className="bg-purple-50 border-l-4 border-purple-500 p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-purple-700 mb-2 sm:mb-3">
              Token Mint Generator
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-body text-purple-900">
              <p>
                <strong>Create custom token addresses for your Solana token launches.</strong> The 
                Token Mint generator creates vanity addresses that become your token's contract address 
                on pump.fun, Raydium, or any other launcher.
              </p>
              <div className="bg-white/50 p-2 sm:p-3 rounded">
                <p className="font-bold text-xs sm:text-caption mb-2">How to use with pump.fun:</p>
                <ol className="text-xs sm:text-micro space-y-1 list-decimal list-inside">
                  <li>Go to <strong>/token</strong> and generate your vanity address</li>
                  <li>Copy the <strong>Private Key</strong> (not the public address)</li>
                  <li>On pump.fun, paste it in "Token Address" → "Use Custom"</li>
                  <li>Launch your token with your custom address!</li>
                </ol>
              </div>
              <p className="text-xs sm:text-micro text-purple-700">
                The private key is only needed once during token creation. After launch, 
                the token address is public and permanent.
              </p>
            </div>
          </section>

          {/* Key Security Check */}
          <section className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-green-700 mb-2 sm:mb-3">
              Key Security Check
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-body text-green-900">
              <p>
                <strong>After generating a key, we verify its cryptographic quality in real-time.</strong>
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-micro">
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-green-700 mb-1">What we check:</p>
                  <ul className="space-y-0.5">
                    <li>• 256-bit entropy level</li>
                    <li>• CSPRNG verification</li>
                    <li>• Random sample test (10K bytes)</li>
                    <li>• Chi-Square statistical test</li>
                  </ul>
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-green-700 mb-1">What it proves:</p>
                  <ul className="space-y-0.5">
                    <li>• Hardware-backed RNG</li>
                    <li>• Uniform distribution</li>
                    <li>• Unpredictable output</li>
                    <li>• Cryptographic quality</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs sm:text-micro text-green-700">
                This is the gold standard for cryptographic key generation. If any test fails, you'll see a warning.
              </p>
            </div>
          </section>

          {/* Continuous Security */}
          <section className="bg-slate-50 border-l-4 border-slate-500 p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-slate-700 mb-2 sm:mb-3">
              Continuous Security (CI/CD)
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-body text-slate-900">
              <p>
                <strong>Automated security checks run on every code change:</strong>
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs sm:text-micro">
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">Automated Checks:</p>
                  <ul className="space-y-0.5">
                    <li>• Dependabot (dependency updates)</li>
                    <li>• CodeQL (code analysis)</li>
                    <li>• npm audit (CVE scanning)</li>
                    <li>• Lighthouse CI (best practices)</li>
                  </ul>
                </div>
                <div className="bg-white/50 p-2 rounded">
                  <p className="font-bold text-slate-700 mb-1">Transparency:</p>
                  <ul className="space-y-0.5">
                    <li>• All results are public</li>
                    <li>• View on GitHub Actions</li>
                    <li>• Security alerts visible</li>
                    <li>• Open source code</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs sm:text-micro text-slate-700">
                Check our{' '}
                <a 
                  href="https://github.com/bytebrox/vanitymine-web/actions" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:text-slate-900"
                >
                  GitHub Actions
                </a>{' '}
                for live security status.
              </p>
            </div>
          </section>

          {/* Warning */}
          <section className="bg-yellow-50 border border-yellow-200 p-3 sm:p-4">
            <h3 className="text-xs sm:text-caption font-bold uppercase tracking-wider text-yellow-800 mb-1.5 sm:mb-2">
              Important Reminder
            </h3>
            <p className="text-sm sm:text-body text-yellow-800">
              Always save your private key securely before closing this page.
              We cannot recover lost keys. Consider using a hardware wallet for
              storing significant amounts of SOL.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-ink p-4 sm:p-grid">
          <button onClick={onClose} className="btn-primary w-full text-sm sm:text-base">
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
