'use client';

/**
 * Navigation bar component
 * Fixed top navigation with logo and links
 */

interface NavbarProps {
  onHowItWorksClick?: () => void;
}

export function Navbar({ onHowItWorksClick }: NavbarProps) {
  return (
    <nav className="w-full border-b border-ink bg-paper">
      <div className="px-6 md:px-12 lg:px-20">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            {/* Logo - Simple geometric mark with accent */}
            <div className="w-8 h-8 bg-accent flex items-center justify-center">
              <span className="text-paper font-bold text-lg">V</span>
            </div>
            <span className="font-bold text-title tracking-tight">VanityMine</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-caption">
            <button
              onClick={onHowItWorksClick}
              className="text-muted hover:text-ink transition-colors"
            >
              How it Works
            </button>
            <a
              href="https://github.com/bytebrox/vanitymine-web"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              View Source
            </a>
            <a
              href="#docs"
              className="text-muted hover:text-ink transition-colors"
            >
              Docs
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-ink transition-colors"
            >
              X.com
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
