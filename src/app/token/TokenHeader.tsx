'use client';

/**
 * Token Generator Hero section component
 * Swiss/Editorial style - Full width with background image
 * Mobile-optimized layout
 */

export function TokenHeader() {
  return (
    <header className="border-b-2 border-ink relative">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: 'url(/hero.png)' }}
      />
      
      {/* Content */}
      <div className="relative px-4 sm:px-6 md:px-12 lg:px-20">
        {/* Top rule - hidden on mobile, visible on tablet+ */}
        <div className="hidden sm:flex border-b border-ink py-3 justify-between items-center text-micro uppercase tracking-widest text-muted">
          <span>Token Mint Generator</span>
          <span>pump.fun Compatible</span>
          <span>100% Local</span>
        </div>

        {/* Main content */}
        <div className="py-8 sm:py-12 md:py-20">
          <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
            {/* Left: Main headline */}
            <div className="md:col-span-6 lg:col-span-5">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.85]">
                <span className="text-accent">Custom</span><br />
                Token<br />
                Addresses
              </h1>
            </div>

            {/* Right: Description */}
            <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 border-l-2 border-ink pl-4 sm:pl-6 mt-4 md:mt-0">
              <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4">
                Generate <strong className="text-accent">vanity token mint addresses</strong> for your 
                Solana token launches. Perfect for pump.fun and other token launchers.
              </p>
              <p className="text-xs sm:text-caption font-mono mb-2 sm:mb-3">
                <span className="text-accent font-bold">pump.fun</span> • Raydium • Jupiter
              </p>
              <p className="text-micro text-muted">
                Create memorable token addresses like DOGE..., MOON..., or any custom pattern.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom decoration - simplified on mobile */}
        <div className="flex flex-col sm:flex-row border-t-2 border-accent">
          <div className="flex-1 py-2 sm:py-3 sm:border-r border-b sm:border-b-0 border-ink/30 text-center text-micro uppercase tracking-wider">
            <span className="text-accent font-bold">Token Mint</span> Address
          </div>
          <div className="flex-1 py-2 sm:py-3 sm:border-r border-b sm:border-b-0 border-ink/30 text-center text-micro uppercase tracking-wider">
            pump.fun Ready
          </div>
          <div className="flex-1 py-2 sm:py-3 text-center text-micro uppercase tracking-wider">
            No Signup Required
          </div>
        </div>
      </div>
    </header>
  );
}
