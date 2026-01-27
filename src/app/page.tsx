'use client';

/**
 * VanityMine - Main Page
 * Solana vanity address generator
 */

import { useState, useCallback } from 'react';
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
} from '@/components';
import { useGenerator } from '@/hooks/useGenerator';
import { validatePrefix, validateSuffix } from '@/lib/validation';

export default function Home() {
  const { state, start, stop, reset, updateConfig, maxThreads } = useGenerator();
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  const { status, config, stats, result } = state;
  const { prefix, suffix, caseSensitive, threads } = config;

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
      <Navbar onHowItWorksClick={() => setShowSecurityInfo(true)} />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-1 px-6 md:px-12 lg:px-20 py-12">
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

              {/* Security note */}
              <div className="border-t border-ink/20 pt-6 mt-8">
                <p className="text-caption text-muted">
                  Your keys are generated entirely in your browser.{' '}
                  <button
                    onClick={() => setShowSecurityInfo(true)}
                    className="text-accent hover:underline underline-offset-2"
                  >
                    Learn more →
                  </button>
                </p>
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
              />

              {/* Live stats */}
              <StatsDisplay stats={stats} status={status} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Security info modal */}
      <SecurityInfo
        isOpen={showSecurityInfo}
        onClose={() => setShowSecurityInfo(false)}
      />
    </div>
  );
}
