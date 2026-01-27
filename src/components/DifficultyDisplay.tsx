'use client';

/**
 * Difficulty estimation display
 * Shows expected difficulty and time estimate
 */

import { useMemo } from 'react';
import { estimateDifficulty, formatDifficulty, estimateTime } from '@/lib/validation';

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
    // watsign WASM: ~1500 keys/second per worker (measured ~22K/s with 15 workers)
    const cores = typeof navigator !== 'undefined' ? navigator.hardwareConcurrency || 4 : 4;
    const workers = Math.max(1, cores - 1);
    return workers * 1500; // ~1500 keys/s per worker with WASM Ed25519
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
  const showWarning = prefix.length + suffix.length > 5;

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
      {showWarning && (
        <div className="mt-6 pt-4 border-t border-ink/20">
          <p className="text-micro text-accent">
            Warning: Longer patterns take exponentially longer to find.
            Each additional character multiplies search time by ~58x.
          </p>
        </div>
      )}
    </div>
  );
}
