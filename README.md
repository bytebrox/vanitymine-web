# VanityMine

**Generate custom Solana addresses – entirely in your browser.**

Create personalized Solana wallet addresses and token mint addresses that start or end with specific characters (like `SOL...` or `...MOON`). All cryptographic operations happen locally on your device – your private keys never leave your browser.

## Two Generators

| Generator | Use Case | URL |
|-----------|----------|-----|
| **Wallet Address** | Personal wallets, donations, branding | `/` |
| **Token Mint Address** | pump.fun token launches, custom token contracts | `/token` |

## What is a Vanity Address?

A vanity address is a cryptocurrency wallet address that contains a recognizable pattern. Instead of a random address like `7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`, you can generate one like:

- `SOL9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJo` (starts with "SOL")
- `7xKXtg2CW87d97TXJSDpbD5jBkheTqMOON` (ends with "MOON")

This makes addresses more memorable and personal – perfect for public wallets, donations, or branding.

## Features

- **100% Client-Side** – All computation happens in your browser
- **125x Faster** – Native Web Crypto API outperforms all JavaScript/WASM implementations
- **Multi-Core Processing** – Uses all available CPU cores (~100,000 keys/second)
- **Token Mint Generator** – Create vanity addresses for pump.fun token launches
- **Sound Notification** – Optional audio alert when address is found
- **Instant Export** – Download keys as TXT or JSON (Solana CLI compatible)
- **Works Offline** – No internet required after page loads
- **Mobile Optimized** – Fully responsive design with touch-friendly controls
- **Comprehensive FAQ** – Detailed answers to common questions

## Performance

| Pattern Length | Average Time |
|----------------|--------------|
| 3 characters   | < 1 second   |
| 4 characters   | ~15 seconds  |
| 5 characters   | ~12 minutes  |
| 6 characters   | ~11 hours    |

*Times for case-insensitive matching on a 16-core CPU with native Ed25519 support. Results vary by hardware.*

## Security

### Your Keys, Your Control

VanityMine is designed with a single principle: **your private keys should never leave your device**.

1. **No Server Communication** – The generation process makes zero network requests. Everything runs locally in Web Workers.

2. **Open Source** – The entire codebase is auditable. You can verify exactly what the code does.

3. **Content Security Policy** – Strict HTTP headers prevent any data from being sent to external servers.

4. **Offline Capable** – Works without internet after initial load, proving no server dependency.

### How to Verify Security

You don't have to trust us – you can verify it yourself:

#### Method 1: Network Monitor
1. Open Developer Tools (F12)
2. Go to the **Network** tab
3. Start generating an address
4. Watch: **No requests are made** during generation

#### Method 2: Offline Test
1. Load the page
2. Disconnect from the internet (airplane mode)
3. Generate an address – it still works
4. This proves keys are generated locally

#### Method 3: Source Code Review
1. Open Developer Tools (F12)
2. Go to **Sources** tab
3. Inspect `vanity-worker.js` – all crypto logic is visible
4. Or review the full source code in this repository

### Community Stats – What We Store

VanityMine displays live community statistics (total keys tested, addresses found). Here's exactly what happens:

**What IS stored (anonymously):**
- `totalAttempts` – A single number counting all attempts across all users
- `totalFound` – A single number counting all found addresses

**What is NOT stored:**
- ❌ No IP addresses
- ❌ No private keys
- ❌ No public keys
- ❌ No patterns searched
- ❌ No timestamps
- ❌ No user identifiers
- ❌ No cookies or tracking

**How to verify:**
1. Open Developer Tools (F12) → Network tab
2. Generate an address
3. When found, you'll see ONE request to `/api/stats`
4. Click it and inspect the payload: `{ "attempts": 12345 }` – just a number!

The API source code is fully visible at `src/app/api/stats/route.ts`. We physically cannot store what we don't receive.

## How It Works

1. **Input** – Enter your desired prefix and/or suffix pattern
2. **Generation** – Multiple Web Workers generate random Ed25519 keypairs in parallel
3. **Matching** – Each public key is Base58-encoded and checked against your pattern
4. **Result** – When a match is found, you receive the complete keypair
5. **Export** – Download your keys in your preferred format

## Architecture

### Where Does the Code Run?

**Important:** All computation happens in your browser, not on any server.

```
┌─────────────────────────────────────────────────────────────────┐
│                         YOUR BROWSER                            │
│  ┌───────────────┐    ┌──────────────────────────────────────┐  │
│  │   Main Thread │    │          Web Workers (WASM)          │  │
│  │   (UI/React)  │───▶│  Worker 1 │ Worker 2 │ ... │ Worker N│  │
│  └───────────────┘    │  (Ed25519)│ (Ed25519)│     │(Ed25519)│  │
│                       └──────────────────────────────────────┘  │
│                                 ▼                               │
│                         Keys generated locally                  │
│                         using YOUR CPU cores                    │
└─────────────────────────────────────────────────────────────────┘
                                 ▲
                                 │ Static files only (HTML/JS/CSS)
                                 │ No computation, no key access
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER / HOSTING                           │
│                    Just a static file server                    │
└─────────────────────────────────────────────────────────────────┘
```

The server only delivers static files. Once loaded:
- Your browser executes all JavaScript locally
- Web Workers run on your CPU cores, not on any server
- Performance depends on your hardware, not server capacity
- The app works completely offline

### Web Workers Explained

Web Workers are a **browser API** – they are JavaScript threads that run inside your browser, utilizing your local CPU. They are **not** server-side processes.

- Each worker runs independently in a separate thread
- Workers use your CPU cores for parallel computation
- Communication happens via message passing (postMessage)
- Zero network traffic during key generation

This is fundamentally different from server-based generation where keys would be computed remotely. With VanityMine, keys are born and stay local.

### Technical Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | Next.js 16 / React 19 | UI and state management |
| **Cryptography** | Native Web Crypto API | Ed25519 key generation (with WASM fallback) |
| **Parallelization** | Web Workers | Multi-core CPU utilization |
| **Randomness** | Web Crypto API | Cryptographically secure RNG |
| **Encoding** | Custom Base58 | Solana address format |
| **Bundling** | esbuild | Worker compilation |

### Native Web Crypto Performance

VanityMine uses the **Native Web Crypto API** for Ed25519 key generation (Chrome 137+, Firefox 129+):

- Direct browser/OS-level implementation – no JavaScript overhead
- ~6,000+ keys/second per CPU core
- ~100,000 keys/second on a 16-core machine
- Automatic fallback to WASM (watsign) for older browsers

The native implementation is **125x faster** than pure JavaScript and **~5x faster** than WASM, because it runs directly in the browser's cryptographic engine with OS-level optimizations.

## Wallet Compatibility

Generated keypairs work with all major Solana wallets:

| Wallet | Import Method |
|--------|---------------|
| **Phantom** | Import Private Key (Base58) |
| **Solflare** | Import Private Key or JSON |
| **Backpack** | Import Private Key |
| **Solana CLI** | Import JSON file directly |

## Token Mint Generator (pump.fun)

Create custom token contract addresses for your Solana token launches:

### How It Works

1. Go to `/token` and generate a vanity address
2. Copy the **Private Key** (Base58 format)
3. On pump.fun, paste the key in "Token Address" → "Use Custom"
4. Launch your token with your custom address!

### Important Notes

- The private key is only needed **once** during token creation
- After launch, the token address becomes public and permanent
- Your token's contract address will match your vanity pattern (e.g., `DOGE...`, `MOON...`)
- Works with pump.fun, Raydium, and other Solana token launchers

## FAQ

For detailed answers to common questions, visit our **[FAQ page](https://vanitymine.com/faq)** which covers:

- **General** – What are vanity addresses, how long does it take, valid characters
- **Security** – Is it safe, do you store keys, how to verify, offline usage
- **Technical** – How it works, WASM, Web Workers, cryptography details
- **Usage** – Wallet import, file formats, case sensitivity, patterns
- **Troubleshooting** – Common issues and solutions

### Quick Answers

**Is this safe to use for real funds?**
Yes, as long as you verify the security yourself (see above). The keys are generated using industry-standard cryptography and never leave your browser.

**Why does longer patterns take exponentially longer?**
Each additional character multiplies the search space by ~58x (Base58 alphabet size). A 4-character pattern requires checking ~1.3 million keys on average.

**Can I use both prefix and suffix?**
Yes! But combined length increases difficulty exponentially. A 2+2 pattern is as hard as a 4-character pattern.

**What characters are valid?**
Base58 alphabet: `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`
Note: `0`, `O`, `I`, and `l` are excluded to avoid confusion.

**Can I get notified when an address is found?**
Yes! Enable the "Sound Notification" toggle in the Generator Controls. A pleasant chime will play when your pattern is matched.

## Disclaimer

This tool is provided as-is. Always verify generated keys work correctly before using them for significant transactions. The authors are not responsible for any loss of funds.

*Not affiliated with the Solana Foundation.*

## License

MIT
