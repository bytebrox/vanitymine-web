# VanityMine

**Generate custom Solana wallet addresses – entirely in your browser.**

Create personalized Solana addresses that start or end with specific characters (like `SOL...` or `...MOON`). All cryptographic operations happen locally on your device – your private keys never leave your browser.

## What is a Vanity Address?

A vanity address is a cryptocurrency wallet address that contains a recognizable pattern. Instead of a random address like `7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU`, you can generate one like:

- `SOL9xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJo` (starts with "SOL")
- `7xKXtg2CW87d97TXJSDpbD5jBkheTqMOON` (ends with "MOON")

This makes addresses more memorable and personal – perfect for public wallets, donations, or branding.

## Features

- **100% Client-Side** – All computation happens in your browser
- **Multi-Core Processing** – Uses all available CPU cores for fast generation
- **WASM-Powered** – High-performance WebAssembly cryptography (~22,000 keys/second)
- **Instant Export** – Download keys as TXT or JSON (Solana CLI compatible)
- **Works Offline** – No internet required after page loads
- **Modern UI** – Clean, responsive design

## Performance

| Pattern Length | Average Time |
|----------------|--------------|
| 3 characters   | ~2 seconds   |
| 4 characters   | ~1 minute    |
| 5 characters   | ~35 minutes  |
| 6 characters   | ~19 hours    |

*Times for case-insensitive matching on a 16-core CPU. Results vary by hardware.*

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
| **Cryptography** | watsign (WASM) | Ed25519 key generation |
| **Parallelization** | Web Workers | Multi-core CPU utilization |
| **Randomness** | Web Crypto API | Cryptographically secure RNG |
| **Encoding** | Custom Base58 | Solana address format |
| **Bundling** | esbuild | Worker compilation |

### WASM Performance

The cryptographic operations use **watsign** – a WebAssembly port of TweetNaCl's Ed25519 implementation:

- Runs at near-native speed inside the browser
- ~1,500 keys/second per CPU core
- ~22,000 keys/second on a 16-core machine
- Same algorithm used by @solana/web3.js

WebAssembly is a binary instruction format that browsers execute at near-native speed. It's sandboxed and secure – it can't access your filesystem or network directly.

## Wallet Compatibility

Generated keypairs work with all major Solana wallets:

| Wallet | Import Method |
|--------|---------------|
| **Phantom** | Import Private Key (Base58) |
| **Solflare** | Import Private Key or JSON |
| **Backpack** | Import Private Key |
| **Solana CLI** | Import JSON file directly |

## FAQ

**Is this safe to use for real funds?**
Yes, as long as you verify the security yourself (see above). The keys are generated using industry-standard cryptography and never leave your browser.

**Why does longer patterns take exponentially longer?**
Each additional character multiplies the search space by ~58x (Base58 alphabet size). A 4-character pattern requires checking ~1.3 million keys on average.

**Can I use both prefix and suffix?**
Yes! But combined length increases difficulty exponentially. A 2+2 pattern is as hard as a 4-character pattern.

**What characters are valid?**
Base58 alphabet: `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`
Note: `0`, `O`, `I`, and `l` are excluded to avoid confusion.

## Disclaimer

This tool is provided as-is. Always verify generated keys work correctly before using them for significant transactions. The authors are not responsible for any loss of funds.

*Not affiliated with the Solana Foundation.*

## License

MIT
