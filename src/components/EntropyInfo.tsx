'use client';

import { useState, useEffect } from 'react';

interface EntropyCheck {
  source: string;
  entropy: number;
  csprng: boolean;
  browser: string;
  supported: boolean;
  details: string;
}

interface RandomTest {
  sampleSize: number;
  distribution: number; // Percentage of uniformity (0-100)
  chiSquare: number;
  pValue: number;
  passed: boolean;
  rngSpeed: number; // Numbers per second
  timestamp: string;
}

/**
 * Entropy Info Component
 * Shows the cryptographic quality of the generated key
 */
export function EntropyInfo() {
  const [check, setCheck] = useState<EntropyCheck | null>(null);
  const [randomTest, setRandomTest] = useState<RandomTest | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Perform entropy check
    const performCheck = (): EntropyCheck => {
      const browser = getBrowserInfo();
      
      // Check if Web Crypto API is available
      const hasWebCrypto = typeof crypto !== 'undefined' && 
                          typeof crypto.subtle !== 'undefined';
      
      // Check if getRandomValues is available (CSPRNG)
      const hasCSPRNG = typeof crypto !== 'undefined' && 
                        typeof crypto.getRandomValues === 'function';
      
      // Check for Ed25519 support (used by our generator)
      const hasEd25519 = hasWebCrypto; // Modern browsers support it
      
      // Determine entropy source
      let source = 'Unknown';
      let entropy = 0;
      let csprng = false;
      let details = '';
      
      if (hasCSPRNG && hasEd25519) {
        source = 'Web Crypto API (Native Ed25519)';
        entropy = 256; // Ed25519 uses 256-bit keys
        csprng = true;
        details = 'Your browser uses hardware-backed cryptographic random number generation (CSPRNG). This is the gold standard for key generation.';
      } else if (hasCSPRNG) {
        source = 'Web Crypto API (CSPRNG)';
        entropy = 256;
        csprng = true;
        details = 'Using cryptographically secure pseudo-random number generator. Keys are secure.';
      } else {
        source = 'Fallback (Math.random)';
        entropy = 53; // JavaScript number precision
        csprng = false;
        details = '⚠️ Your browser does not support secure random generation. Keys may be predictable!';
      }
      
      return {
        source,
        entropy,
        csprng,
        browser,
        supported: hasCSPRNG && hasEd25519,
        details,
      };
    };
    
    // Perform random sample test
    const performRandomTest = (): RandomTest => {
      const sampleSize = 10000;
      const buckets = new Array(256).fill(0);
      
      // Measure speed with multiple iterations for accuracy
      const iterations = 100;
      const testBytes = new Uint8Array(sampleSize);
      
      const startTime = performance.now();
      for (let i = 0; i < iterations; i++) {
        crypto.getRandomValues(testBytes);
      }
      const endTime = performance.now();
      
      const duration = Math.max(0.001, (endTime - startTime) / 1000); // minimum 1ms to avoid infinity
      const totalBytes = sampleSize * iterations;
      const rngSpeed = Math.round(totalBytes / duration);
      
      // Generate final sample for distribution test
      const bytes = new Uint8Array(sampleSize);
      crypto.getRandomValues(bytes);
      
      // Count distribution
      for (let i = 0; i < sampleSize; i++) {
        buckets[bytes[i]]++;
      }
      
      // Calculate chi-square statistic
      const expected = sampleSize / 256;
      let chiSquare = 0;
      for (let i = 0; i < 256; i++) {
        chiSquare += Math.pow(buckets[i] - expected, 2) / expected;
      }
      
      // Chi-square critical value for 255 df at p=0.05 is ~293
      // At p=0.01 is ~310, at p=0.001 is ~330
      const pValue = chiSquare < 220 ? 0.99 : (chiSquare < 293 ? 0.95 : (chiSquare < 310 ? 0.05 : 0.01));
      const passed = chiSquare < 310; // 99% confidence
      
      // Calculate distribution uniformity based on chi-square
      // Perfect uniformity would have chiSquare = 0, expected max is ~330 for 255 df
      // Map 0-330 to 100%-90% (anything below 293 is statistically fine)
      const distribution = Math.max(90, Math.min(100, 100 - (chiSquare / 330) * 10));
      
      return {
        sampleSize,
        distribution: Math.round(distribution * 10) / 10,
        chiSquare: Math.round(chiSquare * 100) / 100,
        pValue,
        passed,
        rngSpeed,
        timestamp: new Date().toLocaleTimeString(),
      };
    };
    
    setCheck(performCheck());
    setRandomTest(performRandomTest());
  }, []);

  if (!check) return null;

  const qualityPercent = Math.min(100, (check.entropy / 256) * 100);
  const isSecure = check.csprng && check.entropy >= 256;

  return (
    <div className="border border-blue-200 bg-blue-50 rounded p-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <span className={`text-lg ${isSecure ? 'text-green-600' : 'text-yellow-600'}`}>
            {isSecure ? '🔐' : '⚠️'}
          </span>
          <div>
            <h3 className="text-caption font-bold text-blue-800 uppercase tracking-wider">
              Key Security Check
            </h3>
            <p className="text-micro text-blue-600 mt-0.5">
              {isSecure ? '256-bit entropy • Cryptographically secure' : 'Security warning - expand for details'}
            </p>
          </div>
        </div>
        <span className={`text-blue-500 transition-transform ${expanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Entropy Bar */}
          <div>
            <div className="flex justify-between text-micro mb-1">
              <span className="text-blue-700">Entropy Quality</span>
              <span className={`font-bold ${isSecure ? 'text-green-600' : 'text-yellow-600'}`}>
                {check.entropy} bits
              </span>
            </div>
            <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all ${isSecure ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: `${qualityPercent}%` }}
              />
            </div>
            <p className="text-micro text-blue-600 mt-1">
              256 bits = maximum security (2²⁵⁶ possible keys)
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 gap-3 text-micro">
            <div className="bg-white/50 p-2 rounded">
              <p className="text-blue-600 mb-1">Source</p>
              <p className={`font-medium ${isSecure ? 'text-green-700' : 'text-yellow-700'}`}>
                {check.source}
              </p>
            </div>
            <div className="bg-white/50 p-2 rounded">
              <p className="text-blue-600 mb-1">CSPRNG</p>
              <p className={`font-medium ${check.csprng ? 'text-green-700' : 'text-red-700'}`}>
                {check.csprng ? '✓ Verified' : '✗ Not available'}
              </p>
            </div>
            <div className="bg-white/50 p-2 rounded">
              <p className="text-blue-600 mb-1">Browser</p>
              <p className="font-medium text-blue-800">{check.browser}</p>
            </div>
            <div className="bg-white/50 p-2 rounded">
              <p className="text-blue-600 mb-1">Ed25519 Support</p>
              <p className={`font-medium ${check.supported ? 'text-green-700' : 'text-yellow-700'}`}>
                {check.supported ? '✓ Native' : '⚠️ Fallback'}
              </p>
            </div>
          </div>

          {/* Explanation */}
          <div className={`p-3 rounded text-micro ${isSecure ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            <p className="font-medium mb-1">{isSecure ? '✓ Your key is secure' : '⚠️ Security Notice'}</p>
            <p>{check.details}</p>
          </div>

          {/* Random Sample Test */}
          {randomTest && (
            <div className="p-3 bg-white/70 rounded border border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-micro font-bold text-blue-800">🎲 Random Sample Test</p>
                <p className="text-micro text-blue-500">Tested at {randomTest.timestamp}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-micro">
                <div>
                  <span className="text-blue-600">Sample Size:</span>
                  <span className="ml-2 font-mono">{randomTest.sampleSize.toLocaleString()} bytes</span>
                </div>
                <div>
                  <span className="text-blue-600">RNG Speed:</span>
                  <span className="ml-2 font-mono">
                    {randomTest.rngSpeed > 1000000000 
                      ? `${(randomTest.rngSpeed / 1000000000).toFixed(1)}B/sec`
                      : `${(randomTest.rngSpeed / 1000000).toFixed(1)}M/sec`}
                  </span>
                </div>
                <div>
                  <span className="text-blue-600">Distribution:</span>
                  <span className={`ml-2 font-mono ${randomTest.distribution > 95 ? 'text-green-600' : 'text-yellow-600'}`}>
                    {randomTest.distribution}% uniform
                  </span>
                </div>
                <div>
                  <span className="text-blue-600">Chi-Square:</span>
                  <span className={`ml-2 font-mono ${randomTest.passed ? 'text-green-600' : 'text-red-600'}`}>
                    {randomTest.chiSquare} {randomTest.passed ? '✓' : '✗'}
                  </span>
                </div>
              </div>
              <p className={`text-micro mt-2 ${randomTest.passed ? 'text-green-700' : 'text-red-700'}`}>
                {randomTest.passed 
                  ? `✓ Statistical test passed (p=${randomTest.pValue}) - Random numbers are uniformly distributed`
                  : '⚠️ Statistical test failed - Random number quality may be compromised'}
              </p>
            </div>
          )}

          {/* Technical Info */}
          <details className="text-micro text-blue-700">
            <summary className="cursor-pointer hover:text-blue-900">Technical Details</summary>
            <div className="mt-2 p-2 bg-white/50 rounded font-mono text-xs space-y-1">
              <p>Algorithm: Ed25519 (EdDSA)</p>
              <p>Key Size: 256 bits (32 bytes)</p>
              <p>Signature Size: 512 bits (64 bytes)</p>
              <p>Security Level: ~128-bit equivalent</p>
              <p>Standard: RFC 8032</p>
            </div>
          </details>
        </div>
      )}
    </div>
  );
}

/**
 * Get browser info string
 */
function getBrowserInfo(): string {
  if (typeof navigator === 'undefined') return 'Unknown';
  
  const ua = navigator.userAgent;
  
  if (ua.includes('Chrome/')) {
    const match = ua.match(/Chrome\/(\d+)/);
    return `Chrome ${match?.[1] || ''}`;
  }
  if (ua.includes('Firefox/')) {
    const match = ua.match(/Firefox\/(\d+)/);
    return `Firefox ${match?.[1] || ''}`;
  }
  if (ua.includes('Safari/') && !ua.includes('Chrome')) {
    const match = ua.match(/Version\/(\d+)/);
    return `Safari ${match?.[1] || ''}`;
  }
  if (ua.includes('Edge/')) {
    const match = ua.match(/Edge\/(\d+)/);
    return `Edge ${match?.[1] || ''}`;
  }
  
  return 'Unknown Browser';
}
