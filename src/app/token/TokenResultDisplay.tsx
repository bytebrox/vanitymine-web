'use client';

/**
 * Token Result display component
 * Shows the generated keypair with copy functionality
 * Optimized for pump.fun usage
 */

import { useState } from 'react';
import { GeneratedKeypair } from '@/types';
import { formatNumber, formatDuration } from '@/lib/format';
import { DomainSuggestions, EntropyInfo } from '@/components';

interface TokenResultDisplayProps {
  result: GeneratedKeypair;
  onReset: () => void;
}

export function TokenResultDisplay({ result, onReset }: TokenResultDisplayProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => { setCopiedField(null); }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Download keypair as simple TXT file
   * Easy to read and use
   */
  const downloadTxt = () => {
    const content = `VANITYMINE - TOKEN MINT KEYPAIR
================================
Generated: ${new Date().toISOString()}

TOKEN ADDRESS (Mint):
${result.publicKey}

PRIVATE KEY (For pump.fun):
${result.privateKey}

================================
HOW TO USE WITH PUMP.FUN:
1. Go to pump.fun and start creating your token
2. In the "Token Address" section, paste the Private Key above
3. Click "Use Custom"
4. Your token will launch with the custom address!

IMPORTANT:
- The Private Key is only needed during token creation
- After launch, the token address is public and permanent
- This keypair was generated locally in your browser
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `token-mint-${result.publicKey.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Download keypair in Solana CLI compatible format (JSON)
   */
  const downloadJson = () => {
    const secretKeyArray = Array.from(result.secretKey);
    
    const blob = new Blob([JSON.stringify(secretKeyArray)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `token-mint-${result.publicKey.slice(0, 8)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card border-2 border-accent">
      {/* Success header */}
      <div className="bg-accent text-white -m-grid mb-4 p-grid">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-title font-bold">Token Address Found!</h2>
            <p className="text-caption opacity-90">
              {formatNumber(result.attempts)} attempts in {formatDuration(result.duration)}
            </p>
          </div>
          <div className="text-4xl">✓</div>
        </div>
      </div>

      {/* Token Address (Public key) */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-caption font-medium uppercase tracking-wider">
            Token Address (Mint)
          </label>
          <button
            onClick={() => { void copyToClipboard(result.publicKey, 'public'); }}
            className="text-micro text-accent hover:underline"
          >
            {copiedField === 'public' ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="key-box">
          <HighlightedKey
            pubkey={result.publicKey}
            pattern={result.matchedPattern}
          />
        </div>
        <p className="text-micro text-muted mt-2">
          This will be your token's contract address on Solana
        </p>
      </div>

      {/* Private key with reveal toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-caption font-medium uppercase tracking-wider">
            Private Key (for pump.fun)
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { setShowPrivateKey(!showPrivateKey); }}
              className="text-micro text-accent hover:underline"
            >
              {showPrivateKey ? 'Hide' : 'Reveal'}
            </button>
            {showPrivateKey && (
              <button
                onClick={() => { void copyToClipboard(result.privateKey, 'private'); }}
                className="text-micro text-accent hover:underline"
              >
                {copiedField === 'private' ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
        </div>
        <div className="key-box relative">
          {showPrivateKey ? (
            <span className="text-accent">{result.privateKey}</span>
          ) : (
            <span className="text-muted select-none">
              ••••••••••••••••••••••••••••••••••••••••••••
            </span>
          )}
        </div>
      </div>

      {/* pump.fun Instructions */}
      <div className="bg-purple-50 border border-purple-200 p-4 mb-6 rounded">
        <h3 className="text-caption font-bold text-purple-800 uppercase tracking-wider mb-3">
          How to use with pump.fun
        </h3>
        <ol className="text-sm text-purple-800 space-y-2 list-decimal list-inside">
          <li>Go to <strong>pump.fun</strong> and start creating your token</li>
          <li>Find the <strong>"Token Address"</strong> section</li>
          <li>Click <strong>"Reveal"</strong> above and copy the Private Key</li>
          <li>Paste it in the input field on pump.fun</li>
          <li>Click <strong>"Use Custom"</strong></li>
          <li>Complete your token launch!</li>
        </ol>
        <p className="text-micro text-purple-600 mt-3">
          Your token will be deployed at: <strong>{result.publicKey.slice(0, 8)}...{result.publicKey.slice(-4)}</strong>
        </p>
      </div>

      {/* Security notice */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6 rounded">
        <h3 className="text-caption font-bold text-yellow-800 uppercase tracking-wider mb-2">
          Important Notes
        </h3>
        <ul className="text-micro text-yellow-800 space-y-1">
          <li>• The private key is only used once during token creation</li>
          <li>• After launch, you don't need to store this key</li>
          <li>• The token address becomes public and permanent</li>
          <li>• This keypair was generated locally in your browser</li>
        </ul>
      </div>

      {/* Domain suggestions for token */}
      <div className="mb-6">
        <DomainSuggestions pattern={result.matchedPattern} />
      </div>

      {/* Entropy/Security Info */}
      <div className="mb-6">
        <EntropyInfo />
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <button onClick={downloadTxt} className="btn-primary flex-1">
            Download TXT
          </button>
          <button onClick={downloadJson} className="btn-secondary">
            Download JSON
          </button>
        </div>
        <p className="text-micro text-muted text-center">
          TXT includes pump.fun instructions • JSON for Solana CLI
        </p>
        <button onClick={onReset} className="btn-secondary w-full">
          Generate Another Token Address
        </button>
      </div>
    </div>
  );
}

/**
 * Highlight the matched prefix/suffix in the public key
 */
function HighlightedKey({
  pubkey,
  pattern,
}: {
  pubkey: string;
  pattern: string;
}) {
  const parts = pattern.split('...');
  const prefix = parts[0] || '';
  const suffix = parts[1] || '';
  const prefixLen = prefix.length;
  const suffixLen = suffix.length;

  if (prefixLen === 0 && suffixLen === 0) {
    return <span>{pubkey}</span>;
  }

  return (
    <>
      {prefixLen > 0 && (
        <span className="text-accent font-bold">{pubkey.slice(0, prefixLen)}</span>
      )}
      <span>
        {pubkey.slice(prefixLen, suffixLen > 0 ? -suffixLen : undefined)}
      </span>
      {suffixLen > 0 && (
        <span className="text-accent font-bold">{pubkey.slice(-suffixLen)}</span>
      )}
    </>
  );
}
