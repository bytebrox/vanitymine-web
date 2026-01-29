'use client';

/**
 * Home page content component
 * Separated to allow Suspense boundary for useSearchParams
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Navbar,
  Header,
  PatternInput,
  DifficultyDisplay,
  StatsDisplay,
  ResultDisplay,
  GeneratorControls,
  SecurityInfo,
  Footer,
  reportStats,
} from '@/components';
import { useGenerator } from '@/hooks/useGenerator';
import { useSound } from '@/hooks/useSound';
import { validatePrefix, validateSuffix, estimateDifficulty } from '@/lib/validation';

export function HomeContent() {
  const { state, start, stop, reset, updateConfig, maxThreads } = useGenerator();
  const { soundEnabled, toggleSound, playSuccessSound } = useSound();
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [copied, setCopied] = useState(false);
  const searchParams = useSearchParams();
  const prevResultRef = useRef<typeof result>(null);

  const { status, config, stats, result } = state;
  const { prefix, suffix, caseSensitive, threads } = config;

  // Play sound and report stats when result is found
  useEffect(() => {
    if (result && result !== prevResultRef.current) {
      playSuccessSound();
      // Report to community stats
      reportStats(result.attempts);
    }
    prevResultRef.current = result;
  }, [result, playSuccessSound]);

  // Load pattern from URL parameters on mount
  useEffect(() => {
    const urlPrefix = searchParams.get('prefix');
    const urlSuffix = searchParams.get('suffix');
    
    if (urlPrefix || urlSuffix) {
      if (urlPrefix) updateConfig({ prefix: urlPrefix });
      if (urlSuffix) updateConfig({ suffix: urlSuffix });
    }
  }, [searchParams, updateConfig]);

  // Calculate expected difficulty for progress bar
  const expectedDifficulty = estimateDifficulty(prefix, suffix, caseSensitive);

  // Generate share link
  const generateShareLink = useCallback(() => {
    const params = new URLSearchParams();
    if (prefix) params.set('prefix', prefix);
    if (suffix) params.set('suffix', suffix);
    
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const shareUrl = params.toString() ? `${baseUrl}/?${params.toString()}` : baseUrl;
    
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => { setCopied(false); }, 2000);
    }).catch(() => { /* Clipboard access denied */ });
  }, [prefix, suffix]);

  // Check if input is valid for starting
  const prefixValid = validatePrefix(prefix, caseSensitive).valid;
  const suffixValid = validateSuffix(suffix, caseSensitive).valid;
  const hasPattern = prefix.length > 0 || suffix.length > 0;
  const canStart = prefixValid && suffixValid && hasPattern;

  // Handle start
  const handleStart = useCallback(() => {
    if (canStart) {
      start(config);
    }
  }, [canStart, config, start]);

  // Handle reset (for generating another)
  const handleReset = useCallback(() => {
    reset();
  }, [reset]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar onHowItWorksClick={() => { setShowSecurityInfo(true); }} />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12">
        {result ? (
          // Show result when found
          <ResultDisplay result={result} onReset={handleReset} />
        ) : (
          // Generator interface - Two column layout
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column - Pattern Configuration */}
            <div className="lg:col-span-5 space-y-6">
              <div className="border-b-2 border-accent pb-3 mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider">Pattern Configuration</h2>
              </div>
              
              <PatternInput
                prefix={prefix}
                suffix={suffix}
                caseSensitive={caseSensitive}
                onPrefixChange={(value) => updateConfig({ prefix: value })}
                onSuffixChange={(value) => updateConfig({ suffix: value })}
                onCaseSensitiveChange={(value) =>
                  updateConfig({ caseSensitive: value })
                }
                disabled={status === 'running'}
              />

              {/* Share pattern */}
              {hasPattern && (
                <div className="border-t border-ink/20 pt-6 mt-8">
                  <button
                    onClick={generateShareLink}
                    disabled={status === 'running'}
                    className="flex items-center gap-2 text-caption text-muted hover:text-ink transition-colors disabled:opacity-50"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {copied ? 'Link copied!' : 'Share this pattern'}
                  </button>
                </div>
              )}

              {/* Security note */}
              <div className="border-t border-ink/20 pt-6 mt-4 space-y-2">
                <p className="text-caption text-muted">
                  <span className="text-accent">✓</span> Keys generated 100% in your browser – never sent anywhere
                </p>
                <p className="text-caption text-muted">
                  <span className="text-accent">✓</span> Community stats store only 2 numbers – no IPs, no keys, no tracking
                </p>
                <button
                  onClick={() => { setShowSecurityInfo(true); }}
                  className="text-caption text-accent hover:underline underline-offset-2"
                >
                  Verify it yourself →
                </button>
              </div>
            </div>

            {/* Right Column - Controls & Stats */}
            <div className="lg:col-span-7 lg:border-l-2 lg:border-ink lg:pl-12 space-y-8">
              {/* Difficulty estimate */}
              <DifficultyDisplay
                prefix={prefix}
                suffix={suffix}
                caseSensitive={caseSensitive}
                currentRate={stats.attemptsPerSecond}
              />

              {/* Controls */}
              <GeneratorControls
                status={status}
                threads={threads}
                maxThreads={maxThreads}
                onStart={handleStart}
                onStop={stop}
                onThreadsChange={(value) => updateConfig({ threads: value })}
                disabled={!canStart}
                soundEnabled={soundEnabled}
                onSoundToggle={toggleSound}
              />

              {/* Live stats with progress */}
              <StatsDisplay 
                stats={stats} 
                status={status} 
                expectedDifficulty={expectedDifficulty}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Security info modal */}
      <SecurityInfo
        isOpen={showSecurityInfo}
        onClose={() => { setShowSecurityInfo(false); }}
      />
    </div>
  );
}
