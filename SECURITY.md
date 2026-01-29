# Security Policy

## Our Commitment

VanityMine takes security seriously. We designed this tool with a security-first mindset:

- **100% Client-Side**: All key generation happens in your browser
- **Zero Server Storage**: Private keys never touch our servers
- **Open Source**: All code is auditable on GitHub
- **Minimal Data**: Only anonymous counters are stored

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.9.x   | :white_check_mark: |
| < 0.9   | :x:                |

## Reporting a Vulnerability

We appreciate responsible disclosure of security vulnerabilities.

### How to Report

1. **DO NOT** open a public GitHub issue for security vulnerabilities
2. Use [GitHub Security Advisories](https://github.com/bytebrox/vanitymine-web/security/advisories/new) (preferred)
3. Or email: security@vanitymine.com

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response**: Within 48 hours
- **Status Update**: Within 7 days
- **Resolution Target**: Within 30 days (depending on severity)

### What to Expect

- We will acknowledge your report promptly
- We will investigate and validate the issue
- We will keep you informed of our progress
- We will credit you in our changelog (unless you prefer anonymity)

## Security Measures

### Headers
- Content-Security-Policy (strict)
- Strict-Transport-Security (HSTS)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff

### Code Security
- Dependabot for dependency updates
- CodeQL for static analysis
- npm audit in CI pipeline

### Cryptography
- Native Web Crypto API (Ed25519)
- Hardware-backed CSPRNG
- 256-bit entropy keys

## Scope

### In Scope
- vanitymine.com website
- API endpoints
- GitHub repository code
- Client-side key generation

### Out of Scope
- Third-party services (Vercel, Upstash, GitHub)
- Social engineering
- DoS/DDoS attacks
- Physical security

## Bug Bounty

We don't currently have a formal bug bounty program, but we appreciate and acknowledge security researchers who help improve our security.

## Contact

- Security Advisories: https://github.com/bytebrox/vanitymine-web/security/advisories
- security.txt: https://vanitymine.com/.well-known/security.txt
