'use client';

/**
 * Pattern input component
 * Handles prefix/suffix input with validation
 */

import { useState, useEffect } from 'react';
import { validatePrefix, validateSuffix } from '@/lib/validation';

interface PatternInputProps {
  prefix: string;
  suffix: string;
  caseSensitive: boolean;
  onPrefixChange: (value: string) => void;
  onSuffixChange: (value: string) => void;
  onCaseSensitiveChange: (value: boolean) => void;
  disabled?: boolean;
}

export function PatternInput({
  prefix,
  suffix,
  caseSensitive,
  onPrefixChange,
  onSuffixChange,
  onCaseSensitiveChange,
  disabled = false,
}: PatternInputProps) {
  const [prefixError, setPrefixError] = useState<string | null>(null);
  const [suffixError, setSuffixError] = useState<string | null>(null);

  // Validate prefix (consider case sensitivity)
  useEffect(() => {
    const result = validatePrefix(prefix, caseSensitive);
    setPrefixError(result.valid ? null : result.error || null);
  }, [prefix, caseSensitive]);

  // Validate suffix (consider case sensitivity)
  useEffect(() => {
    const result = validateSuffix(suffix, caseSensitive);
    setSuffixError(result.valid ? null : result.error || null);
  }, [suffix, caseSensitive]);

  return (
    <div className="space-y-6">
      {/* Inputs - stacked for sidebar layout */}
      <div className="space-y-6">
        {/* Prefix input */}
        <div>
          <label
            htmlFor="prefix"
            className="block text-caption font-medium uppercase tracking-wider mb-2"
          >
            Prefix
          </label>
          <input
            id="prefix"
            type="text"
            value={prefix}
            onChange={(e) => { onPrefixChange(e.target.value); }}
            placeholder="e.g., Sol"
            maxLength={8}
            disabled={disabled}
            className={`input ${prefixError ? 'border-accent' : ''} ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <p className="text-micro text-muted mt-2">
            Address will start with this pattern
          </p>
          <p className={`text-micro h-5 ${prefixError ? 'text-accent' : 'text-transparent'}`}>
            {prefixError || 'placeholder'}
          </p>
        </div>

        {/* Suffix input */}
        <div>
          <label
            htmlFor="suffix"
            className="block text-caption font-medium uppercase tracking-wider mb-2"
          >
            Suffix
          </label>
          <input
            id="suffix"
            type="text"
            value={suffix}
            onChange={(e) => { onSuffixChange(e.target.value); }}
            placeholder="e.g., xyz"
            maxLength={8}
            disabled={disabled}
            className={`input ${suffixError ? 'border-accent' : ''} ${
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />
          <p className="text-micro text-muted mt-2">
            Address will end with this pattern
          </p>
          <p className={`text-micro h-5 ${suffixError ? 'text-accent' : 'text-transparent'}`}>
            {suffixError || 'placeholder'}
          </p>
        </div>
      </div>

      {/* Case sensitivity toggle */}
      <div className="flex items-center gap-3 pt-2">
        <input
          id="caseSensitive"
          type="checkbox"
          checked={caseSensitive}
          onChange={(e) => { onCaseSensitiveChange(e.target.checked); }}
          disabled={disabled}
          className="w-5 h-5 border-2 border-ink rounded-none accent-ink cursor-pointer disabled:opacity-50"
        />
        <label
          htmlFor="caseSensitive"
          className={`text-body select-none ${
            disabled ? 'opacity-50' : 'cursor-pointer'
          }`}
        >
          Case sensitive matching
        </label>
      </div>

      {/* Base58 info */}
      <p className="text-micro text-muted border-l-2 border-muted pl-3">
        Valid characters: 1-9, A-H, J-N, P-Z, a-k, m-z
        <br />
        <span className="text-accent">
          Note: 0, O, I are never valid. Lowercase l is only valid with case-insensitive matching.
        </span>
      </p>
    </div>
  );
}
