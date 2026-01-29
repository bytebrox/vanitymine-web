'use client';

/**
 * Difficulty estimation display
 * Shows expected difficulty and time estimate
 */

import { useMemo } from 'react';
import { estimateDifficulty, formatDifficulty, estimateTime, getFirstCharWarning, getFirstCharRarity } from '@/lib/validation';

interface DifficultyDisplayProps {
  prefix: string;
  suffix: string;
  caseSensitive: boolean;
  currentRate: number;
}

export function DifficultyDisplay({
  prefix,
  suffix,
  caseSensitive,
  currentRate,
}: DifficultyDisplayProps) {
  // Estimate rate based on CPU cores if no current rate
  const estimatedRate = useMemo(() => {
    if (currentRate > 0) return currentRate;
    // Native Web Crypto: ~6000+ keys/second per worker (measured ~100K/s with 16 workers)
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    const workers = Math.max(1, cores - 1);
    return workers * 6000; // ~6000 keys/s per worker with Native Web Crypto
  }, [currentRate]);

  const difficulty = useMemo(
    () => estimateDifficulty(prefix, suffix, caseSensitive),
    [prefix, suffix, caseSensitive]
  );

  const difficultyLabel = useMemo(
    () => formatDifficulty(difficulty),
    [difficulty]
  );

  const timeEstimate = useMemo(
    () => estimateTime(difficulty, estimatedRate),
    [difficulty, estimatedRate]
  );

  // Difficulty level indicator based on actual difficulty (including first char rarity)
  const getDifficultyLevel = (): { label: string; color: string; warning?: string } => {
    // Use actual difficulty number which includes first char multiplier
    if (difficulty <= 1) return { label: 'Instant', color: 'text-green-600' };
    if (difficulty < 50_000) return { label: 'Easy', color: 'text-green-600' };
    if (difficulty < 500_000) return { label: 'Quick', color: 'text-green-600' };
    if (difficulty < 5_000_000) return { label: 'Moderate', color: 'text-yellow-600' };
    if (difficulty < 50_000_000) return { label: 'Hard', color: 'text-orange-600', warning: 'This may take 10-60 minutes' };
    if (difficulty < 500_000_000) return { label: 'Very Hard', color: 'text-red-600', warning: 'This may take several hours' };
    if (difficulty < 5_000_000_000) return { label: 'Extreme', color: 'text-red-700', warning: 'This may take days to weeks' };
    return { label: 'Nearly Impossible', color: 'text-red-800', warning: 'This could take weeks to months - are you sure?' };
  };

  const level = getDifficultyLevel();
  const hasPattern = prefix.length > 0 || suffix.length > 0;
  const totalChars = prefix.length + suffix.length;
  const showLengthWarning = totalChars > 5;
  const isExtreme = totalChars >= 7;
  const isDangerous = totalChars >= 6;
  
  // Check for rare first character warning
  const firstCharWarning = useMemo(
    () => getFirstCharWarning(prefix, caseSensitive),
    [prefix, caseSensitive]
  );
  
  const firstCharRarity = useMemo(
    () => getFirstCharRarity(prefix, caseSensitive),
    [prefix, caseSensitive]
  );
  
  // Show extreme warning for very rare patterns
  const isExtremelyRare = firstCharRarity.rarity === 'extreme' || firstCharRarity.rarity === 'very_rare';

  return (
    <div className="border-2 border-ink p-6">
      <div className="border-b-2 border-accent pb-3 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Difficulty Estimate
        </h3>
      </div>

      <div className="grid grid-cols-3 gap-6 text-center">
        {/* Pattern preview */}
        <div className="stat">
          <p className="stat-label">Pattern</p>
          <p className="font-mono text-title mt-1">
            <span className={hasPattern && prefix ? 'text-accent' : 'text-muted'}>{prefix || '...'}</span>
            <span className="text-muted">····</span>
            <span className={hasPattern && suffix ? 'text-accent' : 'text-muted'}>{suffix || '...'}</span>
          </p>
        </div>

        {/* Difficulty */}
        <div className="stat">
          <p className="stat-label">Expected Attempts</p>
          <p className={`stat-value text-title mt-1 ${!hasPattern ? 'text-muted' : ''}`}>
            {hasPattern ? difficultyLabel : '—'}
          </p>
          <p className={`text-micro font-medium ${hasPattern ? level.color : 'text-muted'}`}>
            {hasPattern ? level.label : 'Enter pattern'}
          </p>
        </div>

        {/* Time estimate */}
        <div className="stat">
          <p className="stat-label">Est. Time</p>
          <p className={`stat-value text-title mt-1 ${!hasPattern ? 'text-muted' : ''}`}>
            {hasPattern ? timeEstimate : '—'}
          </p>
          <p className="text-micro text-muted">
            at ~{Math.floor(estimatedRate / 1000)}K/s
          </p>
        </div>
      </div>

      {/* Warning area */}
      {(showLengthWarning || firstCharWarning || level.warning) && (
        <div className="mt-6 pt-4 border-t border-ink/20 space-y-3">
          {/* Extreme pattern warning - HIGHEST PRIORITY */}
          {isExtreme && (
            <div className="p-4 bg-red-100 border-2 border-red-500 rounded">
              <p className="text-sm font-bold text-red-800 flex items-center gap-2">
                🚨 Extreme Pattern Detected
              </p>
              <p className="text-sm mt-2 text-red-700">
                <strong>{totalChars} characters</strong> will take an extremely long time to find.
                This could run for <strong>days, weeks, or even months</strong>.
              </p>
              <p className="text-micro mt-2 text-red-600">
                Consider: Use 4-5 characters max, or split between prefix and suffix.
              </p>
            </div>
          )}
          
          {/* Dangerous pattern warning */}
          {isDangerous && !isExtreme && (
            <div className="p-3 bg-orange-50 border-l-4 border-orange-500">
              <p className="text-sm font-medium text-orange-800">
                ⚠️ Long Pattern Warning
              </p>
              <p className="text-micro mt-1 text-orange-700">
                {level.warning || `${totalChars} characters may take several hours to find.`}
              </p>
            </div>
          )}
          
          {/* Rare first character warning */}
          {firstCharWarning && !isExtreme && (
            <div className={`p-3 border-l-4 ${isExtremelyRare ? 'bg-red-50 border-red-500' : 'bg-yellow-50 border-yellow-500'}`}>
              <p className={`text-sm font-medium ${isExtremelyRare ? 'text-red-800' : 'text-yellow-800'}`}>
                {isExtremelyRare ? '⚠️ Extreme Difficulty' : '⚠️ Increased Difficulty'}
              </p>
              <p className={`text-micro mt-1 ${isExtremelyRare ? 'text-red-700' : 'text-yellow-700'}`}>
                {firstCharWarning}
              </p>
              {isExtremelyRare && (
                <p className="text-micro mt-2 text-red-600 font-medium">
                  Tip: Move your pattern to the SUFFIX field instead, or disable case-sensitive matching.
                </p>
              )}
            </div>
          )}
          
          {/* General length info */}
          {showLengthWarning && !isExtreme && !isDangerous && (
            <p className="text-micro text-accent">
              Note: Each additional character multiplies search time by ~58x.
            </p>
          )}
        </div>
      )}

      {/* Reference table for pattern length - shown when no pattern */}
      {!hasPattern && (
        <div className="mt-6 pt-4 border-t border-ink/20">
          <p className="text-micro text-muted mb-3">Estimated times at ~50K keys/sec:</p>
          <div className="grid grid-cols-4 gap-2 text-micro">
            <div className="text-center p-2 bg-green-50 rounded">
              <p className="font-bold text-green-700">3 chars</p>
              <p className="text-green-600">&lt; 5 sec</p>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded">
              <p className="font-bold text-yellow-700">4 chars</p>
              <p className="text-yellow-600">~1 min</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <p className="font-bold text-orange-700">5 chars</p>
              <p className="text-orange-600">~30 min</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded">
              <p className="font-bold text-red-700">6+ chars</p>
              <p className="text-red-600">hours+</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
