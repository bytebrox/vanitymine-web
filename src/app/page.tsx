'use client';

/**
 * VanityMine - Main Page
 * Solana vanity address generator
 */

import { Suspense } from 'react';
import { HomeContent } from './HomeContent';

export default function Home() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}

/**
 * Loading skeleton for the page
 */
function PageSkeleton() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar skeleton */}
      <nav className="w-full border-b border-ink bg-paper h-16" />
      
      {/* Header skeleton */}
      <header className="border-b-2 border-ink">
        <div className="px-6 md:px-12 lg:px-20 py-12 md:py-20">
          <div className="h-32 bg-ink/5 animate-pulse" />
        </div>
      </header>
      
      {/* Content skeleton */}
      <main className="flex-1 px-6 md:px-12 lg:px-20 py-12">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="h-64 bg-ink/5 animate-pulse" />
          </div>
          <div className="lg:col-span-7">
            <div className="h-96 bg-ink/5 animate-pulse" />
          </div>
        </div>
      </main>
    </div>
  );
}
