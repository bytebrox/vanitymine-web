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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/80"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-paper max-w-2xl w-full max-h-[80vh] overflow-y-auto border-2 border-ink">
        {/* Header */}
        <div className="sticky top-0 bg-ink text-paper p-grid flex items-center justify-between">
          <h2 className="text-title font-bold">How VanityMine Works</h2>
          <button
            onClick={onClose}
            className="text-2xl hover:opacity-70"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="p-grid space-y-6">
          {/* Security section */}
          <section>
            <h3 className="text-caption font-bold uppercase tracking-wider text-accent mb-3">
              Security First
            </h3>
            <ul className="space-y-2 text-body">
              <li className="flex gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>100% Client-Side:</strong> All key generation happens
                  in your browser using Web Workers. No data is ever sent to any server.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Open Source:</strong> The entire codebase is available
                  for inspection. Verify the code yourself.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>No Storage:</strong> Private keys are never stored.
                  They exist only in your browser's memory until you close the page.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">✓</span>
                <span>
                  <strong>Offline Capable:</strong> Once loaded, this app works
                  completely offline. Disconnect your internet to verify.
                </span>
              </li>
            </ul>
          </section>

          {/* How to verify */}
          <section>
            <h3 className="text-caption font-bold uppercase tracking-wider text-accent mb-3">
              How to Verify
            </h3>
            <ol className="space-y-2 text-body list-decimal list-inside">
              <li>Open your browser's Developer Tools (F12)</li>
              <li>Go to the Network tab</li>
              <li>Start generating an address</li>
              <li>Observe: No network requests are made during generation</li>
              <li>Optional: Disconnect from internet and try again</li>
            </ol>
          </section>

          {/* Technical details */}
          <section>
            <h3 className="text-caption font-bold uppercase tracking-wider text-accent mb-3">
              Technical Architecture
            </h3>
            <div className="space-y-3 text-body">
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
                <strong>WASM (WebAssembly):</strong> The cryptographic operations 
                use watsign – a high-performance WebAssembly port of TweetNaCl's 
                Ed25519 implementation. WASM runs at near-native speed inside your 
                browser, enabling ~22,000 keys/second on modern hardware.
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
            <h3 className="text-caption font-bold uppercase tracking-wider text-accent mb-3">
              Server vs Browser
            </h3>
            <div className="space-y-2 text-body">
              <div className="grid grid-cols-2 gap-4 text-caption">
                <div className="bg-ink/5 p-3">
                  <p className="font-bold mb-2">Server</p>
                  <ul className="space-y-1 text-muted">
                    <li>• Delivers static files</li>
                    <li>• No computation</li>
                    <li>• No key access</li>
                    <li>• No data storage</li>
                  </ul>
                </div>
                <div className="bg-accent/10 p-3">
                  <p className="font-bold mb-2">Your Browser</p>
                  <ul className="space-y-1">
                    <li>• Runs all JavaScript</li>
                    <li>• Executes Web Workers</li>
                    <li>• Generates keys locally</li>
                    <li>• Uses your CPU</li>
                  </ul>
                </div>
              </div>
              <p className="text-micro text-muted mt-2">
                This architecture is why the app works offline and why we can 
                never access your keys – they only exist in your browser's memory.
              </p>
            </div>
          </section>

          {/* CSP info */}
          <section>
            <h3 className="text-caption font-bold uppercase tracking-wider text-accent mb-3">
              Content Security Policy
            </h3>
            <p className="text-body mb-2">
              This site uses strict CSP headers that prevent:
            </p>
            <ul className="text-body space-y-1 ml-4">
              <li>• External script loading</li>
              <li>• Connections to external APIs</li>
              <li>• Data exfiltration via fetch/XHR</li>
              <li>• Embedding in iframes</li>
            </ul>
          </section>

          {/* Warning */}
          <section className="bg-yellow-50 border border-yellow-200 p-4">
            <h3 className="text-caption font-bold uppercase tracking-wider text-yellow-800 mb-2">
              Important Reminder
            </h3>
            <p className="text-body text-yellow-800">
              Always save your private key securely before closing this page.
              We cannot recover lost keys. Consider using a hardware wallet for
              storing significant amounts of SOL.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-ink p-grid">
          <button onClick={onClose} className="btn-primary w-full">
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
