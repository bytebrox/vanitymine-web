# Changelog

All notable changes to VanityMine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [0.9.0] - 2026-01-29

### Added
- **Key Security Check (Entropy Info)** - Shows cryptographic quality of generated keys
- **OG Images** - Social media preview images for link sharing on X/Telegram

### Key Security Check
- Displays entropy level (256 bits for Ed25519)
- Verifies CSPRNG (Cryptographically Secure Pseudo-Random Number Generator)
- **Random Sample Test** - Tests 10,000 bytes for uniform distribution
- **Chi-Square Test** - Statistical verification of randomness quality
- **RNG Speed Measurement** - Shows actual random number generation performance
- Shows browser and Web Crypto API support status
- Technical details: Algorithm, key size, security level, RFC standard
- Expandable UI - collapsed by default, expand for full details

### Documentation Updates
- Added Key Security Check section to README
- Added 3 new FAQ entries about entropy, Chi-Square, and CSPRNG
- Added Key Security Check section to "How it Works" modal

---

## [0.8.0] - 2026-01-29

### Added
- **Domain Suggestions** - After finding an address, get matching domain name suggestions
- **Improved Difficulty Calculator** - Labels now based on actual difficulty, not just character count

### Domain Suggestions
- Shows domain suggestions based on your vanity pattern (.sol, .solana, .bonk, .poor)
- Direct links to registration pages (sns.id for .sol, alldomains.id for others)
- Works for both Wallet and Token Mint generators
- Lightweight: no blockchain SDK needed, just links to official registration sites

### Difficulty Improvements
- Difficulty labels (Easy, Moderate, Hard, etc.) now consider first-character rarity
- Time estimates consistent with warnings
- Case-sensitive/insensitive modes properly affect difficulty calculation
- Example: "Sol" with case-sensitive shows "Hard" instead of misleading "Quick"

---

## [0.7.0] - 2026-01-29

### Added
- **Community Stats** - Live global statistics showing total keys tested and addresses found
- **Upstash Redis Integration** - Serverless database for anonymous community statistics
- **FAQ Updates** - Added Token Mint category with 6 new questions
- **How it Works Updates** - Added Token Mint Generator section with pump.fun instructions
- **Improved Pattern Validator** - Clear warnings for difficult patterns

### Features
- Real-time community stats displayed in navbar
- Stats update automatically when addresses are found
- Numbers formatted with K/M/B/T suffixes for readability
- Stats refresh every 30 seconds

### Pattern Difficulty Warnings
- **Reference table** showing estimated times for 3-6+ character patterns
- **Graduated warnings:** Orange for 5 chars, Red for 6 chars, Extreme alert for 7+ chars
- **Clear time estimates:** "~30 min", "several hours", "days to weeks"
- **New difficulty labels:** Easy, Quick, Moderate, Hard, Very Hard, Extreme, Nearly Impossible
- **Actionable tips:** Suggests splitting pattern or reducing length for extreme cases

### Privacy & Transparency
- **Only two numbers are stored:** `totalAttempts` and `totalFound` - nothing else
- **No IP addresses, no keys, no patterns, no personal data**
- **Fully verifiable:** Check the Network tab - only `/api/stats` is called with `{ attempts: number }`
- **Open source:** The API route code is visible at `src/app/api/stats/route.ts`
- Your private keys never leave your browser - the stats API only receives a count

## [0.6.0] - 2026-01-28

### Added
- **Token Mint Generator** - New `/token` page for generating vanity token contract addresses
- **pump.fun Integration** - Step-by-step instructions for using generated keys with pump.fun
- **Token-specific Result Display** - Customized output with token deployment instructions
- **Navigation Updates** - Added "Wallet" and "Token Mint" links to navbar and footer

### Features
- Generate custom token addresses for Solana token launches
- Compatible with pump.fun, Raydium, and other launchers
- Dedicated header and UI optimized for token creation workflow
- Download includes pump.fun usage instructions

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
