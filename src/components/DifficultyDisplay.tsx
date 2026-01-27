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

  // Difficulty level indicator
  const getDifficultyLevel = (): { label: string; color: string } => {
    const totalChars = prefix.length + suffix.length;
    if (totalChars === 0) return { label: 'Instant', color: 'text-green-600' };
    if (totalChars <= 2) return { label: 'Easy', color: 'text-green-600' };
    if (totalChars <= 4) return { label: 'Moderate', color: 'text-yellow-600' };
    if (totalChars <= 6) return { label: 'Hard', color: 'text-orange-600' };
    return { label: 'Very Hard', color: 'text-accent' };
  };

  const level = getDifficultyLevel();
  const hasPattern = prefix.length > 0 || suffix.length > 0;
  const showLengthWarning = prefix.length + suffix.length > 5;
  
  // Check for rare first character warning
  const firstCharWarning = useMemo(
    () => getFirstCharWarning(prefix, caseSensitive),
    [prefix, caseSensitive]
  );
  
  const firstCharRarity = useMemo(
    () => getFirstCharRarity(prefix),
    [prefix]
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
      {(showLengthWarning || firstCharWarning) && (
        <div className="mt-6 pt-4 border-t border-ink/20 space-y-2">
          {/* Rare first character warning - HIGH PRIORITY */}
          {firstCharWarning && (
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
          
          {/* Length warning */}
          {showLengthWarning && (
            <p className="text-micro text-accent">
              Note: Longer patterns take exponentially longer to find.
              Each additional character multiplies search time by ~58x.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
