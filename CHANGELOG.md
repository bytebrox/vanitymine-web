# Changelog

All notable changes to VanityMine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.5.0] - 2026-01-27

### Added
- **Native Web Crypto API** - Uses browser's native Ed25519 implementation (Chrome 137+, Firefox 129+)
- **Automatic Fallback** - Falls back to WASM (watsign) for older browsers

### Performance
- **~100,000 keys/second** on 16-core CPU (was ~22,000 with WASM)
- **125x faster** than pure JavaScript implementations
- **~5x faster** than previous WASM implementation
- 4 characters: ~15 seconds (was ~1 minute)
- 5 characters: ~12 minutes (was ~35 minutes)
- 6 characters: ~11 hours (was ~19 hours)

## [0.4.0] - 2026-01-27

### Added
- **Sound Notification** - Optional audio chime when address is found (Web Audio API)
- **FAQ Page** - Comprehensive FAQ with 24 questions in 5 categories (General, Security, Technical, Usage, Troubleshooting)
- **Home Navigation** - Added "Home" link in navigation bar
- **Social Icons** - GitHub and X.com icons with direct links in navigation
- **Clickable Logo** - Logo and brand name now link back to homepage

### Changed
- **Mobile Optimization** - Completely redesigned mobile layout for all components
  - Hamburger menu for navigation
  - Responsive hero section
  - Stacked layouts for small screens
  - Optimized font sizes and spacing
- **Navigation Structure** - Reorganized: Home → How it Works → FAQ → GitHub → X.com

### UI/UX
- Sound toggle switch in Generator Controls
- Sound preference saved to localStorage
- Three-tone success chime (C5-E5-G5 chord)
- FAQ with category filtering and accordion-style answers

## [0.3.0] - 2026-01-27

### Added
- **WASM-powered generation** - Switched to watsign (WASM-based Ed25519) for massive speedup
- **28x faster** - 4-character addresses now take ~1 minute instead of ~27 minutes

### Changed
- Replaced @noble/ed25519 with watsign for key generation
- Updated time estimates to reflect actual WASM performance (~22K keys/s)

### Performance
- 4 characters: ~1 minute (was ~27 minutes)
- 5 characters: ~35 minutes (was ~16 hours)
- 6 characters: ~19 hours (was ~22 days)

## [0.2.0] - 2026-01-27

### Added
- **@noble/ed25519 integration** - Switched to audited Ed25519 library for secure key generation
- **Separate worker build process** - Worker is now compiled with esbuild for better compatibility
- **TXT export format** - Download keypairs as human-readable text files
- **Fixed layout** - UI elements no longer shift when content changes
- **Live speed estimation** - Time estimates based on detected CPU cores

### Changed
- Upgraded to Next.js 16.1.5
- Upgraded to React 19
- Upgraded to ESLint 9 with flat config
- Default case-sensitivity is now OFF (easier pattern matching)
- Private key format now uses full 64-byte secret key (Phantom compatible)
- Improved difficulty time estimates based on actual hardware

### Fixed
- Worker import errors with Turbopack
- Base58 validation for lowercase 'l' in case-insensitive mode
- Start Mining button disabled when valid pattern entered
- Layout shifts when validation messages appear

### Technical
- Worker source: `src/workers/vanity.worker.source.ts`
- Worker output: `public/vanity-worker.js`
- Build command: `npm run build:worker`

## [0.1.0] - 2026-01-26

### Added
- Initial release
- Client-side vanity address generation
- Multi-threaded Web Worker support
- Prefix and suffix pattern matching
- Case-sensitive/insensitive options
- Base58 input validation
- Difficulty estimation
- Live statistics display
- JSON export (Solana CLI compatible)
- Security info modal
- Content Security Policy headers
- Swiss/Newspaper design theme

### Security
- No network requests during generation
- CSP blocks all external connections
- Private keys never leave browser
- Offline-capable after initial load
