'use client';

/**
 * Security Page
 * Comprehensive explanation of VanityMine's security architecture
 */

import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SecurityInfo } from '@/components/SecurityInfo';

export default function SecurityPage() {
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onHowItWorksClick={() => { setShowSecurityInfo(true); }} />

      {/* Hero with background image */}
      <header className="border-b-2 border-ink relative">
        {/* Background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: 'url(/hero.png)' }}
        />
        
        {/* Content */}
        <div className="relative px-4 sm:px-6 md:px-12 lg:px-20">
          {/* Top rule */}
          <div className="hidden sm:flex border-b border-ink py-3 justify-between items-center text-micro uppercase tracking-widest text-muted">
            <span>Security First</span>
            <span>100% Client-Side</span>
            <span>Open Source</span>
          </div>

          {/* Main content */}
          <div className="py-8 sm:py-12 md:py-20">
            <div className="grid md:grid-cols-12 gap-6 md:gap-8 items-end">
              {/* Left: Main headline */}
              <div className="md:col-span-6 lg:col-span-5">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-4xl">🔒</span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    Verified Secure
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-[0.85]">
                  <span className="text-accent">Security</span><br />
                  at<br />
                  VanityMine
                </h1>
              </div>

              {/* Right: Description */}
              <div className="md:col-span-6 lg:col-span-5 lg:col-start-8 border-l-2 border-ink pl-4 sm:pl-6 mt-4 md:mt-0">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-3 sm:mb-4">
                  Your private keys <strong className="text-accent">never leave your browser</strong>. 
                  No exceptions. No backdoors. Here's exactly how we ensure that.
                </p>
                <p className="text-xs sm:text-caption font-mono mb-2 sm:mb-3">
                  <span className="text-accent font-bold">Zero Server Access</span> • Open Source • Verifiable
                </p>
                <p className="text-micro text-muted">
                  All cryptographic operations happen locally. You can verify this yourself.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="flex flex-col sm:flex-row border-t-2 border-accent">
            <div className="flex-1 py-2 sm:py-3 sm:border-r border-b sm:border-b-0 border-ink/30 text-center text-micro uppercase tracking-wider">
              <span className="text-accent font-bold">256-bit</span> Entropy
            </div>
            <div className="flex-1 py-2 sm:py-3 sm:border-r border-b sm:border-b-0 border-ink/30 text-center text-micro uppercase tracking-wider">
              CSPRNG
            </div>
            <div className="flex-1 py-2 sm:py-3 text-center text-micro uppercase tracking-wider">
              Ed25519
            </div>
          </div>
        </div>
      </header>

      {/* Mini Navigation */}
      <nav className="sticky top-0 z-40 bg-paper border-b border-ink/20 py-3 px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <span className="text-xs text-muted font-medium shrink-0 hidden sm:block">Jump to:</span>
            <div className="flex gap-1 sm:gap-2">
              <a href="#architecture" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                01 Architecture
              </a>
              <a href="#storage" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                02 Storage
              </a>
              <a href="#crypto" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                03 Crypto
              </a>
              <a href="#cicd" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                04 CI/CD
              </a>
              <a href="#headers" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                05 Headers
              </a>
              <a href="#verify" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                06 Verify
              </a>
              <a href="#opensource" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                07 Open Source
              </a>
              <a href="#audits" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                08 Audits
              </a>
              <a href="#faq" className="px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium bg-ink/5 hover:bg-accent hover:text-white transition-colors whitespace-nowrap">
                09 FAQ
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 md:px-12 lg:px-20 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto space-y-16">

          {/* TL;DR */}
          <section className="bg-green-50 border-2 border-green-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-4 text-green-800">TL;DR – The Short Version</h2>
            <ul className="space-y-2 text-green-900">
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Keys are generated in YOUR browser</strong> – never on our servers</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>We cannot see your keys</strong> – we don't receive them, store them, or have access to them</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Works offline</strong> – disconnect from internet after loading to prove it</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Open source</strong> – all code is auditable on GitHub</span>
              </li>
              <li className="flex gap-3">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Verifiable</strong> – use DevTools to confirm zero data transmission</span>
              </li>
            </ul>
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">01</span>
              Where Your Keys Are Generated
            </h2>
            
            {/* Visual Architecture Diagram */}
            <div className="mb-8 space-y-4">
              {/* Your Browser Box */}
              <div className="border-4 border-green-500 bg-green-50 p-6 sm:p-8">
                <div className="text-center mb-6">
                  <span className="bg-green-500 text-white px-4 py-2 font-bold text-lg">YOUR BROWSER</span>
                </div>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                  {/* Main Thread */}
                  <div className="border-2 border-green-400 bg-white p-4 text-center">
                    <p className="font-bold text-green-800">Main Thread</p>
                    <p className="text-sm text-muted">(UI / React)</p>
                  </div>
                  
                  {/* Web Workers */}
                  <div className="border-2 border-green-400 bg-white p-4">
                    <p className="font-bold text-green-800 text-center mb-3">Web Workers (parallel)</p>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="bg-green-100 p-2 text-center text-xs">
                        <p className="font-bold">W1</p>
                        <p className="text-[10px]">Ed25519</p>
                      </div>
                      <div className="bg-green-100 p-2 text-center text-xs">
                        <p className="font-bold">W2</p>
                        <p className="text-[10px]">Ed25519</p>
                      </div>
                      <div className="bg-green-100 p-2 text-center text-xs">
                        <p className="font-bold">...</p>
                        <p className="text-[10px]">Ed25519</p>
                      </div>
                      <div className="bg-green-100 p-2 text-center text-xs">
                        <p className="font-bold">Wn</p>
                        <p className="text-[10px]">Ed25519</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Keys generated here */}
                <div className="bg-green-600 text-white p-4 text-center">
                  <p className="text-xl font-bold">🔐 Keys Generated HERE</p>
                  <p className="text-sm opacity-90">Using YOUR CPU cores • In YOUR browser's memory</p>
                </div>
              </div>
              
              {/* Arrow */}
              <div className="flex justify-center">
                <div className="text-center py-2">
                  <div className="text-3xl text-muted">↑</div>
                  <p className="text-sm text-muted font-medium">Static files only (HTML, JS, CSS)</p>
                  <p className="text-xs text-red-600 font-bold">NO key data flows here</p>
                  <div className="text-3xl text-muted">↓</div>
                </div>
              </div>
              
              {/* Server Box */}
              <div className="border-4 border-ink/30 bg-ink/5 p-6 sm:p-8">
                <div className="text-center mb-4">
                  <span className="bg-ink/20 text-ink px-4 py-2 font-bold text-lg">OUR SERVER</span>
                </div>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm text-center">
                  <div className="bg-white p-3 border border-ink/20">
                    <p className="text-muted">Delivers static files</p>
                  </div>
                  <div className="bg-white p-3 border border-ink/20">
                    <p className="text-muted">Cannot compute keys</p>
                  </div>
                  <div className="bg-white p-3 border border-ink/20">
                    <p className="text-muted">No memory access</p>
                  </div>
                  <div className="bg-white p-3 border border-ink/20">
                    <p className="text-red-600 font-bold">NO key access</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 p-5">
                <h3 className="font-bold text-green-800 mb-3">✓ What happens in YOUR browser</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>• All JavaScript execution</li>
                  <li>• All cryptographic operations</li>
                  <li>• Random number generation</li>
                  <li>• Key pair creation</li>
                  <li>• Pattern matching</li>
                  <li>• File downloads</li>
                </ul>
              </div>
              <div className="bg-red-50 border border-red-200 p-5">
                <h3 className="font-bold text-red-800 mb-3">✗ What our server CANNOT do</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• See your private keys</li>
                  <li>• Access your browser memory</li>
                  <li>• Execute code on your device</li>
                  <li>• Intercept generated keys</li>
                  <li>• Track your patterns</li>
                  <li>• Identify you personally</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Data Storage */}
          <section id="storage" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">02</span>
              What We Store (Almost Nothing)
            </h2>

            <div className="border-2 border-ink p-6 sm:p-8 mb-6">
              <h3 className="font-bold mb-4">Community Statistics – The ONLY Data We Store</h3>
              <p className="text-muted mb-4">
                VanityMine displays community statistics (total attempts, addresses found). 
                Here's <strong>exactly</strong> what gets stored:
              </p>
              
              <div className="bg-ink/5 p-4 font-mono text-sm mb-4">
                <p className="text-muted mb-2">// Our entire "database":</p>
                <p>{"{"}</p>
                <p className="ml-4">"totalAttempts": 847293847,</p>
                <p className="ml-4">"totalFound": 12847</p>
                <p>{"}"}</p>
              </div>

              <p className="text-sm text-muted">
                That's it. Two numbers. No user data, no keys, no patterns, no IP addresses, 
                no cookies, no tracking. When you find an address, we receive ONE number: 
                how many attempts it took. Nothing else.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 border border-green-200 p-5">
                <h3 className="font-bold text-green-800 mb-3">✓ What IS stored</h3>
                <ul className="space-y-2 text-sm text-green-900">
                  <li>• totalAttempts (one integer)</li>
                  <li>• totalFound (one integer)</li>
                </ul>
                <p className="text-xs text-green-700 mt-3">
                  Stored anonymously in Upstash Redis
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 p-5">
                <h3 className="font-bold text-red-800 mb-3">✗ What is NOT stored</h3>
                <ul className="space-y-2 text-sm text-red-900">
                  <li>• No private keys</li>
                  <li>• No public keys / addresses</li>
                  <li>• No patterns searched</li>
                  <li>• No IP addresses</li>
                  <li>• No timestamps</li>
                  <li>• No user identifiers</li>
                  <li>• No cookies</li>
                  <li>• No analytics</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Cryptography */}
          <section id="crypto" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">03</span>
              Cryptographic Security
            </h2>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-ink/20">
                <thead>
                  <tr className="bg-ink/5">
                    <th className="border border-ink/20 p-3 text-left">Component</th>
                    <th className="border border-ink/20 p-3 text-left">Technology</th>
                    <th className="border border-ink/20 p-3 text-left">Standard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-ink/20 p-3 font-medium">Key Algorithm</td>
                    <td className="border border-ink/20 p-3">Ed25519</td>
                    <td className="border border-ink/20 p-3">RFC 8032</td>
                  </tr>
                  <tr className="bg-ink/5">
                    <td className="border border-ink/20 p-3 font-medium">Key Generation</td>
                    <td className="border border-ink/20 p-3">Native Web Crypto API</td>
                    <td className="border border-ink/20 p-3">W3C Standard</td>
                  </tr>
                  <tr>
                    <td className="border border-ink/20 p-3 font-medium">Random Numbers</td>
                    <td className="border border-ink/20 p-3">crypto.getRandomValues()</td>
                    <td className="border border-ink/20 p-3">Hardware-backed CSPRNG</td>
                  </tr>
                  <tr className="bg-ink/5">
                    <td className="border border-ink/20 p-3 font-medium">Entropy</td>
                    <td className="border border-ink/20 p-3">256 bits</td>
                    <td className="border border-ink/20 p-3">Industry standard</td>
                  </tr>
                  <tr>
                    <td className="border border-ink/20 p-3 font-medium">Address Encoding</td>
                    <td className="border border-ink/20 p-3">Base58</td>
                    <td className="border border-ink/20 p-3">Solana compatible</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-5">
              <h3 className="font-bold text-blue-800 mb-3">Key Security Check</h3>
              <p className="text-sm text-blue-900 mb-3">
                After generating a key, VanityMine performs real-time security analysis:
              </p>
              <ul className="space-y-1 text-sm text-blue-900">
                <li>• <strong>Entropy verification</strong> – Confirms 256-bit entropy</li>
                <li>• <strong>CSPRNG check</strong> – Verifies cryptographically secure RNG</li>
                <li>• <strong>Chi-Square test</strong> – Statistical verification of randomness</li>
                <li>• <strong>Distribution analysis</strong> – Ensures uniform byte distribution</li>
              </ul>
            </div>
          </section>

          {/* Automated Security */}
          <section id="cicd" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">04</span>
              Automated Security (CI/CD)
            </h2>

            <p className="text-muted mb-6">
              Every code change triggers automated security checks. All results are public 
              and visible on GitHub.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="font-bold">Dependabot</h3>
                </div>
                <p className="text-sm text-muted">
                  Monitors all npm dependencies for known vulnerabilities. 
                  Automatically creates pull requests for security updates.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🔍</span>
                  <h3 className="font-bold">CodeQL</h3>
                </div>
                <p className="text-sm text-muted">
                  GitHub&apos;s semantic code analysis. Scans for security vulnerabilities, 
                  bugs, and code quality issues on every push.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">📦</span>
                  <h3 className="font-bold">npm audit</h3>
                </div>
                <p className="text-sm text-muted">
                  Runs in our CI pipeline to check for known CVEs (Common Vulnerabilities 
                  and Exposures) in all dependencies.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">✅</span>
                  <h3 className="font-bold">Codacy</h3>
                </div>
                <p className="text-sm text-muted">
                  Automated code quality and security analysis. Monitors code patterns, 
                  complexity, and potential vulnerabilities.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💡</span>
                  <h3 className="font-bold">Lighthouse CI</h3>
                </div>
                <p className="text-sm text-muted">
                  Monitors performance, accessibility, and best practices. 
                  Ensures the site meets web standards.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🔮</span>
                  <h3 className="font-bold">Snyk</h3>
                </div>
                <p className="text-sm text-muted">
                  Real-time vulnerability monitoring for dependencies. 
                  Alerts on new security issues.
                </p>
              </div>
            </div>

            <a
              href="https://github.com/bytebrox/vanitymine-web/actions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
            >
              View live security status on GitHub Actions →
            </a>
          </section>

          {/* HTTP Headers */}
          <section id="headers" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">05</span>
              HTTP Security Headers
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-ink/20">
                <thead>
                  <tr className="bg-ink/5">
                    <th className="border border-ink/20 p-3 text-left">Header</th>
                    <th className="border border-ink/20 p-3 text-left">Value</th>
                    <th className="border border-ink/20 p-3 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-ink/20 p-3 font-mono text-sm">Content-Security-Policy</td>
                    <td className="border border-ink/20 p-3 text-sm">Strict</td>
                    <td className="border border-ink/20 p-3 text-sm">Prevents XSS, blocks external scripts</td>
                  </tr>
                  <tr className="bg-ink/5">
                    <td className="border border-ink/20 p-3 font-mono text-sm">Strict-Transport-Security</td>
                    <td className="border border-ink/20 p-3 text-sm">max-age=31536000</td>
                    <td className="border border-ink/20 p-3 text-sm">Forces HTTPS for 1 year (HSTS)</td>
                  </tr>
                  <tr>
                    <td className="border border-ink/20 p-3 font-mono text-sm">X-Frame-Options</td>
                    <td className="border border-ink/20 p-3 text-sm">DENY</td>
                    <td className="border border-ink/20 p-3 text-sm">Prevents clickjacking</td>
                  </tr>
                  <tr className="bg-ink/5">
                    <td className="border border-ink/20 p-3 font-mono text-sm">X-Content-Type-Options</td>
                    <td className="border border-ink/20 p-3 text-sm">nosniff</td>
                    <td className="border border-ink/20 p-3 text-sm">Prevents MIME sniffing</td>
                  </tr>
                  <tr>
                    <td className="border border-ink/20 p-3 font-mono text-sm">Referrer-Policy</td>
                    <td className="border border-ink/20 p-3 text-sm">strict-origin</td>
                    <td className="border border-ink/20 p-3 text-sm">Limits referrer information</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* How to Verify */}
          <section id="verify" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">06</span>
              How to Verify Yourself
            </h2>

            <p className="text-muted mb-6">
              Don't trust us – verify it yourself. Here are three methods to confirm 
              that your keys never leave your browser:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Method 1 */}
              <div className="border-2 border-ink p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="bg-ink text-paper w-8 h-8 flex items-center justify-center text-sm rounded-full">1</span>
                  Network Monitor
                </h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Open DevTools (F12)</li>
                  <li>2. Go to <strong>Network</strong> tab</li>
                  <li>3. Clear existing requests</li>
                  <li>4. Generate an address</li>
                  <li>5. Watch: <strong>Zero requests</strong></li>
                </ol>
                <div className="bg-green-50 border border-green-200 p-3 mt-4 text-xs text-green-800">
                  <strong>Result:</strong> No key data ever transmitted
                </div>
              </div>

              {/* Method 2 */}
              <div className="border-2 border-ink p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="bg-ink text-paper w-8 h-8 flex items-center justify-center text-sm rounded-full">2</span>
                  Offline Test
                </h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Load VanityMine</li>
                  <li>2. <strong>Go offline</strong> (airplane mode)</li>
                  <li>3. Generate an address</li>
                  <li>4. It works!</li>
                </ol>
                <div className="bg-green-50 border border-green-200 p-3 mt-4 text-xs text-green-800">
                  <strong>Result:</strong> No server needed for keys
                </div>
              </div>

              {/* Method 3 */}
              <div className="border-2 border-ink p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <span className="bg-ink text-paper w-8 h-8 flex items-center justify-center text-sm rounded-full">3</span>
                  Code Review
                </h3>
                <ol className="space-y-2 text-sm">
                  <li>1. Visit <a href="https://github.com/bytebrox/vanitymine-web" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">GitHub</a></li>
                  <li>2. Check <code className="bg-ink/10 px-1 text-xs">vanity.worker.source.ts</code></li>
                  <li>3. Check <code className="bg-ink/10 px-1 text-xs">api/stats/route.ts</code></li>
                  <li>4. Verify yourself</li>
                </ol>
                <div className="bg-green-50 border border-green-200 p-3 mt-4 text-xs text-green-800">
                  <strong>Result:</strong> All code is auditable
                </div>
              </div>
            </div>
          </section>

          {/* Open Source */}
          <section id="opensource" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">07</span>
              Open Source Transparency
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="https://github.com/bytebrox/vanitymine-web"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 p-5 hover:border-accent transition-colors"
              >
                <h3 className="font-bold mb-2">📂 Source Code</h3>
                <p className="text-sm text-muted">
                  Complete source code available on GitHub. MIT licensed.
                </p>
              </a>
              <a
                href="https://github.com/bytebrox/vanitymine-web/security/policy"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 p-5 hover:border-accent transition-colors"
              >
                <h3 className="font-bold mb-2">🛡️ Security Policy</h3>
                <p className="text-sm text-muted">
                  Our SECURITY.md with vulnerability reporting guidelines.
                </p>
              </a>
              <a
                href="https://github.com/bytebrox/vanitymine-web/actions"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 p-5 hover:border-accent transition-colors"
              >
                <h3 className="font-bold mb-2">⚡ CI/CD Status</h3>
                <p className="text-sm text-muted">
                  Live build and security check results.
                </p>
              </a>
              <a
                href="https://vanitymine.com/.well-known/security.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-ink/20 p-5 hover:border-accent transition-colors"
              >
                <h3 className="font-bold mb-2">📄 security.txt</h3>
                <p className="text-sm text-muted">
                  Standard security contact file for researchers.
                </p>
              </a>
            </div>
          </section>

          {/* External Security Audits */}
          <section id="audits" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">08</span>
              External Security Audits
            </h2>

            <p className="text-muted mb-6">
              Our code is continuously monitored by independent third-party security services. 
              Click any badge to view the full report.
            </p>

            {/* Live Badges */}
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-ink/5 border border-ink/20 justify-center">
              <a href="https://github.com/bytebrox/vanitymine-web/actions/workflows/ci.yml" target="_blank" rel="noopener noreferrer">
                <img src="https://github.com/bytebrox/vanitymine-web/actions/workflows/ci.yml/badge.svg" alt="CI" className="h-5" />
              </a>
              <a href="https://github.com/bytebrox/vanitymine-web/actions/workflows/codeql.yml" target="_blank" rel="noopener noreferrer">
                <img src="https://github.com/bytebrox/vanitymine-web/actions/workflows/codeql.yml/badge.svg" alt="CodeQL" className="h-5" />
              </a>
              <a href="https://snyk.io/test/github/bytebrox/vanitymine-web" target="_blank" rel="noopener noreferrer">
                <img src="https://snyk.io/test/github/bytebrox/vanitymine-web/badge.svg" alt="Snyk" className="h-5" />
              </a>
              <a href="https://app.codacy.com/gh/bytebrox/vanitymine-web/dashboard" target="_blank" rel="noopener noreferrer">
                <img src="https://app.codacy.com/project/badge/Grade/87604c4f215b425290fdc373a1c69b00" alt="Codacy" className="h-5" />
              </a>
              <a href="https://socket.dev" target="_blank" rel="noopener noreferrer">
                <img src="https://img.shields.io/badge/Socket.dev-Protected-blue.svg" alt="Socket.dev" className="h-5" />
              </a>
              <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
                <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="License" className="h-5" />
              </a>
              <a href="https://github.com/bytebrox/vanitymine-web/security/policy" target="_blank" rel="noopener noreferrer">
                <img src="https://img.shields.io/badge/Security-Policy-blue.svg" alt="Security Policy" className="h-5" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Snyk */}
              <a
                href="https://snyk.io/test/github/bytebrox/vanitymine-web"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">🔮</div>
                <h3 className="font-bold text-lg mb-1">Snyk</h3>
                <p className="text-sm text-muted mb-3">Dependency Vulnerabilities</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Monitored
                </span>
              </a>

              {/* Codacy */}
              <a
                href="https://app.codacy.com/gh/bytebrox/vanitymine-web/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-green-500 hover:bg-green-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">✅</div>
                <h3 className="font-bold text-lg mb-1">Codacy</h3>
                <p className="text-sm text-muted mb-3">Code Quality Analysis</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Monitored
                </span>
              </a>

              {/* Socket.dev */}
              <a
                href="https://socket.dev/npm/package/vanitymine"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">🔌</div>
                <h3 className="font-bold text-lg mb-1">Socket.dev</h3>
                <p className="text-sm text-muted mb-3">Supply Chain Security</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Monitored
                </span>
              </a>

              {/* CodeQL */}
              <a
                href="https://github.com/bytebrox/vanitymine-web/security/code-scanning"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-bold text-lg mb-1">CodeQL</h3>
                <p className="text-sm text-muted mb-3">Static Code Analysis</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Active
                </span>
              </a>

              {/* Dependabot */}
              <a
                href="https://github.com/bytebrox/vanitymine-web/security/dependabot"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-cyan-500 hover:bg-cyan-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">🤖</div>
                <h3 className="font-bold text-lg mb-1">Dependabot</h3>
                <p className="text-sm text-muted mb-3">Auto Security Updates</p>
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Active
                </span>
              </a>

              {/* Mozilla Observatory */}
              <a
                href="https://observatory.mozilla.org/analyze/www.vanitymine.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-ink/20 p-6 hover:border-red-500 hover:bg-red-50 transition-colors text-center"
              >
                <div className="text-3xl mb-3">🦊</div>
                <h3 className="font-bold text-lg mb-1">Mozilla Observatory</h3>
                <p className="text-sm text-muted mb-3">HTTP Security Headers</p>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  Check Score
                </span>
              </a>
            </div>

            <div className="bg-ink/5 border border-ink/20 p-4 text-sm text-center">
              <p className="text-muted">
                All security reports are public and independently verifiable. 
                <br className="hidden sm:block" />
                Click any service above to view the full audit report.
              </p>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3">
              <span className="text-accent">09</span>
              Common Questions
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-ink/20 p-5">
                <h3 className="font-bold mb-2">Can you steal my keys?</h3>
                <p className="text-sm text-muted">
                  No. We physically cannot access your keys because they never leave your browser. 
                  There is no code path that transmits key data to any server. You can verify 
                  this by auditing our source code or monitoring network traffic.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <h3 className="font-bold mb-2">What if your servers get hacked?</h3>
                <p className="text-sm text-muted">
                  Even if our servers were compromised, attackers could not access your keys. 
                  The server only delivers static files – it never receives or processes keys. 
                  Your keys exist only in your browser's memory.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <h3 className="font-bold mb-2">Are vanity addresses less secure?</h3>
                <p className="text-sm text-muted">
                  No. The cryptographic security is identical to random addresses. The private 
                  key is generated using the same secure methods. Only the resulting public 
                  key (address) is filtered for your pattern.
                </p>
              </div>
              <div className="border border-ink/20 p-5">
                <h3 className="font-bold mb-2">Why do you collect community stats?</h3>
                <p className="text-sm text-muted">
                  It's fun to see how many addresses the community has generated together! 
                  We designed it to be minimally invasive: just two anonymous counters, 
                  no user identification whatsoever.
                </p>
              </div>
              <div className="border border-ink/20 p-5 md:col-span-2">
                <h3 className="font-bold mb-2">Should I use this for large amounts?</h3>
                <p className="text-sm text-muted">
                  For significant amounts, we recommend additional precautions: generate keys 
                  while offline, verify the key works with a small test transaction first, 
                  and consider using a hardware wallet for long-term storage.
                </p>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-ink text-paper p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-paper/80 mb-6 max-w-lg mx-auto">
              Security is our top priority. If you have any concerns or want to report 
              a vulnerability, we want to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/bytebrox/vanitymine-web/security/advisories/new"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-paper text-ink px-6 py-3 font-medium hover:bg-paper/90 transition-colors"
              >
                Report a Vulnerability
              </a>
              <a
                href="/faq"
                className="border border-paper px-6 py-3 font-medium hover:bg-paper/10 transition-colors"
              >
                View FAQ
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      
      <SecurityInfo
        isOpen={showSecurityInfo}
        onClose={() => { setShowSecurityInfo(false); }}
      />
    </div>
  );
}
