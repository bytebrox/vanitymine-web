/**
 * VanityMine Web Worker - WASM High Performance Edition
 * 
 * This file is compiled with esbuild to public/vanity-worker.js
 * 
 * SECURITY: This worker runs entirely in the browser.
 * - No network requests are made
 * - All cryptographic operations happen locally
 * - Private keys never leave this worker except through postMessage
 * 
 * PERFORMANCE: Uses watsign (WASM-based Ed25519) for ~5x speedup over JS
 */

import { keyPairFromSeed } from 'watsign';

// Type definitions
interface GeneratorConfig {
  prefix: string;
  suffix: string;
  caseSensitive: boolean;
  threads: number;
}

interface GeneratedKeypair {
  publicKey: string;
  privateKey: string;
  secretKey: Uint8Array;
  attempts: number;
  duration: number;
  matchedPattern: string;
}

interface WorkerInboundMessage {
  type: 'start' | 'stop';
  config?: GeneratorConfig;
  workerId?: number;
}

interface WorkerOutboundMessage {
  type: 'found' | 'progress' | 'error' | 'stopped' | 'ready';
  workerId: number;
  result?: GeneratedKeypair;
  attempts?: number;
  rate?: number;
  error?: string;
}

// Base58 alphabet used by Solana
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

/**
 * Encode bytes to Base58 string
 */
function base58Encode(bytes: Uint8Array): string {
  if (bytes.length === 0) return '';
  
  let zeros = 0;
  while (zeros < bytes.length && bytes[zeros] === 0) zeros++;
  
  const size = Math.ceil(bytes.length * 138 / 100) + 1;
  const b58 = new Uint8Array(size);
  
  let length = 0;
  for (let i = zeros; i < bytes.length; i++) {
    let carry = bytes[i];
    let j = 0;
    for (let k = size - 1; (carry !== 0 || j < length) && k >= 0; k--, j++) {
      carry += 256 * b58[k];
      b58[k] = carry % 58;
      carry = Math.floor(carry / 58);
    }
    length = j;
  }
  
  let i = size - length;
  while (i < size && b58[i] === 0) i++;
  
  let result = '1'.repeat(zeros);
  for (; i < size; i++) result += BASE58_ALPHABET[b58[i]];
  
  return result;
}

/**
 * Check if public key matches the pattern
 */
function matchesPattern(
  publicKey: string,
  prefix: string,
  suffix: string,
  caseSensitive: boolean
): boolean {
  if (!prefix && !suffix) return true;
  
  const keyToCheck = caseSensitive ? publicKey : publicKey.toLowerCase();
  const prefixToCheck = caseSensitive ? prefix : prefix.toLowerCase();
  const suffixToCheck = caseSensitive ? suffix : suffix.toLowerCase();
  
  return (!prefix || keyToCheck.startsWith(prefixToCheck)) && 
         (!suffix || keyToCheck.endsWith(suffixToCheck));
}

// Worker state
let isRunning = false;
let workerId = 0;

/**
 * Main generation loop using watsign WASM
 */
async function generateVanityAddress(config: GeneratorConfig): Promise<void> {
  const { prefix, suffix, caseSensitive } = config;
  const startTime = performance.now();
  let attempts = 0;
  let lastProgressUpdate = startTime;
  const progressInterval = 500;
  
  isRunning = true;
  
  // Process in batches for better performance
  const batchSize = 100;
  
  while (isRunning) {
    // Process a batch of keys
    for (let i = 0; i < batchSize && isRunning; i++) {
      // Generate random 32-byte seed using Web Crypto
      const seed = crypto.getRandomValues(new Uint8Array(32));
      
      // Derive keypair using WASM (fast!)
      const { publicKey, secretKey } = await keyPairFromSeed(seed);
      
      const publicKeyBase58 = base58Encode(publicKey);
      attempts++;
      
      if (matchesPattern(publicKeyBase58, prefix, suffix, caseSensitive)) {
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const privateKeyBase58 = base58Encode(secretKey);
        
        const result: GeneratedKeypair = {
          publicKey: publicKeyBase58,
          privateKey: privateKeyBase58,
          secretKey: new Uint8Array(secretKey),
          attempts,
          duration,
          matchedPattern: `${prefix}...${suffix}`,
        };
        
        const message: WorkerOutboundMessage = {
          type: 'found',
          workerId,
          result,
          attempts,
          rate: attempts / (duration / 1000),
        };
        
        self.postMessage(message);
        isRunning = false;
        return;
      }
    }
    
    // Send progress update if needed
    const now = performance.now();
    if (now - lastProgressUpdate >= progressInterval) {
      const elapsed = now - startTime;
      const rate = attempts / (elapsed / 1000);
      
      const message: WorkerOutboundMessage = {
        type: 'progress',
        workerId,
        attempts,
        rate,
      };
      
      self.postMessage(message);
      lastProgressUpdate = now;
    }
    
    // Yield to allow message processing
    await new Promise(resolve => setTimeout(resolve, 0));
  }
  
  const message: WorkerOutboundMessage = {
    type: 'stopped',
    workerId,
    attempts,
  };
  
  self.postMessage(message);
}

/**
 * Handle messages from main thread
 */
self.onmessage = async (event: MessageEvent<WorkerInboundMessage>) => {
  const { type, config, workerId: id } = event.data;
  
  switch (type) {
    case 'start':
      if (config && id !== undefined) {
        workerId = id;
        await generateVanityAddress(config);
      }
      break;
    case 'stop':
      isRunning = false;
      break;
    default:
      console.error('Unknown message type:', type);
  }
};

// Signal that worker is ready
self.postMessage({ type: 'ready', workerId: 0 });
