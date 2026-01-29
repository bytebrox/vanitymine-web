'use client';

import { useState, useEffect } from 'react';

interface Stats {
  totalAttempts: number;
  totalFound: number;
  configured: boolean;
}

/**
 * Format large numbers for display
 * e.g., 1234567890 -> "1.23B"
 */
function formatLargeNumber(num: number): string {
  if (num >= 1_000_000_000_000) {
    return (num / 1_000_000_000_000).toFixed(2) + 'T';
  }
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(2) + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(2) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toLocaleString();
}

/**
 * Community Stats component
 * Displays global statistics in a compact format for the navbar
 */
export function CommunityStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchStats();

    // Refresh stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => { clearInterval(interval); };
  }, []);

  // Don't show anything while loading or if not configured
  if (loading) {
    return (
      <div className="hidden lg:flex items-center gap-4 text-micro text-muted animate-pulse">
        <span>Loading stats...</span>
      </div>
    );
  }

  if (!stats || !stats.configured) {
    return null;
  }

  return (
    <div className="hidden lg:flex items-center gap-1 text-micro border border-ink/20 rounded px-2 py-1 bg-paper/50">
      <span className="text-muted">Community:</span>
      <span className="font-mono font-bold text-accent">
        {formatLargeNumber(stats.totalAttempts)}
      </span>
      <span className="text-muted">keys tested</span>
      <span className="text-ink/30 mx-1">•</span>
      <span className="font-mono font-bold text-accent">
        {formatLargeNumber(stats.totalFound)}
      </span>
      <span className="text-muted">found</span>
    </div>
  );
}

/**
 * Report stats to the server when an address is found
 */
export async function reportStats(attempts: number): Promise<void> {
  try {
    await fetch('/api/stats', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attempts }),
    });
  } catch (error) {
    // Silently fail - stats are not critical
    console.error('Failed to report stats:', error);
  }
}
