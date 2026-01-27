'use client';

/**
 * Generator control buttons
 * Start, Stop, and thread configuration
 */

import { GeneratorStatus } from '@/types';

interface GeneratorControlsProps {
  status: GeneratorStatus;
  threads: number;
  maxThreads: number;
  onStart: () => void;
  onStop: () => void;
  onThreadsChange: (threads: number) => void;
  disabled?: boolean;
}

export function GeneratorControls({
  status,
  threads,
  maxThreads,
  onStart,
  onStop,
  onThreadsChange,
  disabled = false,
}: GeneratorControlsProps) {
  const isRunning = status === 'running';
  const canStart = !disabled && (status === 'idle' || status === 'stopped' || status === 'found');

  return (
    <div className="border-2 border-ink p-6">
      <div className="border-b-2 border-accent pb-3 mb-6">
        <h3 className="text-sm font-bold uppercase tracking-wider">
          Generator Controls
        </h3>
      </div>

      {/* Thread selector */}
      <div className="flex items-center justify-between mb-4">
        <label
          htmlFor="threads"
          className="text-caption font-medium uppercase tracking-wider"
        >
          Worker Threads
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onThreadsChange(Math.max(1, threads - 1))}
            disabled={isRunning || threads <= 1}
            className="w-8 h-8 border-2 border-ink flex items-center justify-center
                       hover:bg-ink hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed"
          >
            −
          </button>
          <span className="w-12 text-center font-mono text-title">{threads}</span>
          <button
            onClick={() => onThreadsChange(Math.min(maxThreads, threads + 1))}
            disabled={isRunning || threads >= maxThreads}
            className="w-8 h-8 border-2 border-ink flex items-center justify-center
                       hover:bg-ink hover:text-paper disabled:opacity-30 disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>

      <p className="text-micro text-muted mb-6">
        {maxThreads} CPU cores detected. Using {threads} worker{threads !== 1 ? 's' : ''} 
        {threads < maxThreads && ' (1 core reserved for UI)'}
      </p>

      {/* Main action buttons */}
      <div className="flex gap-3">
        {isRunning ? (
          <button onClick={onStop} className="btn-danger flex-1">
            <span className="mr-2">■</span>
            Stop Mining
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={!canStart}
            className={`btn-primary flex-1 ${
              !canStart ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span className="mr-2">▶</span>
            Start Mining
          </button>
        )}
      </div>
    </div>
  );
}
