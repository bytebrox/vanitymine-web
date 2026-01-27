'use client';

/**
 * Hero section component
 * Swiss/Editorial style - Full width
 */

export function Header() {
  return (
    <header className="border-b-2 border-ink">
      <div className="px-6 md:px-12 lg:px-20">
        {/* Top rule */}
        <div className="border-b border-ink py-3 flex justify-between items-center text-micro uppercase tracking-widest text-muted">
          <span>Est. 2026</span>
          <span>Client-Side Cryptography</span>
          <span>Open Source</span>
        </div>

        {/* Main content */}
        <div className="py-12 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 items-end">
            {/* Left: Main headline */}
            <div className="md:col-span-6 lg:col-span-5">
              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85]">
                <span className="text-accent">Custom</span><br />
                Solana<br />
                Addresses
              </h1>
            </div>

            {/* Right: Description */}
            <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 border-l-2 border-ink pl-6">
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                Generate wallet addresses with your chosen prefix or suffix. 
                All computation runs locally in your browser—your private keys 
                never touch a server.
              </p>
              <p className="text-caption text-muted font-mono">
                ~22K keys/sec • WASM-powered • Offline capable
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="flex border-t-2 border-accent">
          <div className="flex-1 py-3 border-r border-ink text-center text-micro uppercase tracking-wider">
            Prefix Matching
          </div>
          <div className="flex-1 py-3 border-r border-ink text-center text-micro uppercase tracking-wider">
            Suffix Matching
          </div>
          <div className="flex-1 py-3 text-center text-micro uppercase tracking-wider">
            Multi-Core Processing
          </div>
        </div>
      </div>
    </header>
  );
}
