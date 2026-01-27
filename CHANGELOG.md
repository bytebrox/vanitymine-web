# Changelog

All notable changes to VanityMine will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

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
