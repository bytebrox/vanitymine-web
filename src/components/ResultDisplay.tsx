'use client';

/**
 * Result display component
 * Shows the generated keypair with copy functionality
 */

import { useState } from 'react';
import { GeneratedKeypair } from '@/types';
import { formatNumber, formatDuration } from '@/lib/format';
import { DomainSuggestions } from './DomainSuggestions';
import { EntropyInfo } from './EntropyInfo';

interface ResultDisplayProps {
  result: GeneratedKeypair;
  onReset: () => void;
}

export function ResultDisplay({ result, onReset }: ResultDisplayProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Download keypair as simple TXT file
   * Easy to read and use
   */
  const downloadTxt = () => {
    const content = `VANITYMINE - SOLANA KEYPAIR
============================
Generated: ${new Date().toISOString()}

PUBLIC KEY (Address):
${result.publicKey}

PRIVATE KEY (Keep secret!):
${result.privateKey}

============================
IMPORTANT:
- Never share your private key
- Store this file securely
- This keypair was generated locally in your browser
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solana-keypair-${result.publicKey.slice(0, 8)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Download keypair in Solana CLI compatible format (JSON)
   * For importing into wallets like Phantom, Solflare
   */
  const downloadJson = () => {
    // Solana CLI format: JSON array of the 64-byte secret key
    const secretKeyArray = Array.from(result.secretKey);
    
    const blob = new Blob([JSON.stringify(secretKeyArray)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solana-keypair-${result.publicKey.slice(0, 8)}.json`;
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
            <h2 className="text-title font-bold">Address Found!</h2>
            <p className="text-caption opacity-90">
              {formatNumber(result.attempts)} attempts in {formatDuration(result.duration)}
            </p>
          </div>
          <div className="text-4xl">✓</div>
        </div>
      </div>

      {/* Public key */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-caption font-medium uppercase tracking-wider">
            Public Address
          </label>
          <button
            onClick={() => copyToClipboard(result.publicKey, 'public')}
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
      </div>

      {/* Private key with reveal toggle */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-caption font-medium uppercase tracking-wider">
            Private Key
          </label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowPrivateKey(!showPrivateKey)}
              className="text-micro text-accent hover:underline"
            >
              {showPrivateKey ? 'Hide' : 'Reveal'}
            </button>
            {showPrivateKey && (
              <button
                onClick={() => copyToClipboard(result.privateKey, 'private')}
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

      {/* Security warning */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 mb-6">
        <h3 className="text-caption font-bold text-yellow-800 uppercase tracking-wider mb-2">
          ⚠ Security Notice
        </h3>
        <ul className="text-micro text-yellow-800 space-y-1">
          <li>• Save your private key securely before closing this page</li>
          <li>• Never share your private key with anyone</li>
          <li>• This key was generated locally and is not stored anywhere</li>
          <li>• We do not have access to your private key</li>
        </ul>
      </div>

      {/* Domain suggestions */}
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
          TXT for easy reading • JSON for Solana CLI / Phantom / Solflare import
        </p>
        <button onClick={onReset} className="btn-secondary w-full">
          Generate Another Address
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
  const [prefix, suffix] = pattern.split('...');
  const prefixLen = prefix?.length || 0;
  const suffixLen = suffix?.length || 0;

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
