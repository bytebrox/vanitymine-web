'use client';

/**
 * Live statistics display
 * Shows generation progress in real-time
 */

import { GeneratorStats, GeneratorStatus } from '@/types';
import { formatNumber, formatRate, formatDuration } from '@/lib/format';

interface StatsDisplayProps {
  stats: GeneratorStats;
  status: GeneratorStatus;
}

export function StatsDisplay({ stats, status }: StatsDisplayProps) {
  const { totalAttempts, attemptsPerSecond, elapsedTime, activeWorkers } = stats;
  const isActive = status !== 'idle';

  return (
    <div className={`bg-ink text-paper p-6 transition-opacity ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      <div className="border-b-2 border-accent pb-3 mb-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Live Statistics
          </h3>
          <StatusBadge status={status} />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Attempts */}
        <div className="stat">
          <p className="stat-label text-paper/60">Total Attempts</p>
          <p className="stat-value text-headline tabular">
            {isActive ? formatNumber(totalAttempts) : '—'}
          </p>
        </div>

        {/* Rate */}
        <div className="stat">
          <p className="stat-label text-paper/60">Speed</p>
          <p className="stat-value text-headline">
            {isActive ? formatRate(attemptsPerSecond) : '—'}
          </p>
        </div>

        {/* Time */}
        <div className="stat">
          <p className="stat-label text-paper/60">Elapsed</p>
          <p className="stat-value text-headline">
            {isActive ? formatDuration(elapsedTime) : '—'}
          </p>
        </div>

        {/* Workers */}
        <div className="stat">
          <p className="stat-label text-paper/60">Workers</p>
          <p className="stat-value text-headline">
            {isActive ? activeWorkers : '—'}
          </p>
        </div>
      </div>

      {/* Fixed height progress indicator area */}
      <div className="h-10 mt-4 pt-4 border-t border-paper/20">
        {status === 'running' && (
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-micro text-paper/60">
              Mining in progress... Keys are generated locally in your browser.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: GeneratorStatus }) {
  const config: Record<GeneratorStatus, { label: string; className: string }> = {
    idle: { label: 'Ready', className: 'bg-paper/20 text-paper' },
    running: { label: 'Mining', className: 'bg-green-500 text-white' },
    found: { label: 'Found!', className: 'bg-accent text-white' },
    stopped: { label: 'Stopped', className: 'bg-yellow-500 text-ink' },
    error: { label: 'Error', className: 'bg-red-500 text-white' },
  };

  const { label, className } = config[status];

  return (
    <span className={`badge ${className}`}>
      {status === 'running' && (
        <span className="w-2 h-2 bg-current rounded-full animate-pulse mr-2" />
      )}
      {label}
    </span>
  );
}
