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

### HTTP Security Headers
| Header | Value | Purpose |
|--------|-------|---------|
| Content-Security-Policy | strict | Prevents XSS, data injection |
| Strict-Transport-Security | max-age=31536000 | Forces HTTPS (HSTS) |
| X-Frame-Options | DENY | Prevents clickjacking |
| X-Content-Type-Options | nosniff | Prevents MIME sniffing |

### Automated Security (CI/CD)

We run continuous security checks on every push and pull request:

| Tool | Trigger | What it does |
|------|---------|--------------|
| **Dependabot** | Daily + on vulnerability | Auto-creates PRs for security updates |
| **CodeQL** | Every push/PR + weekly | Semantic code analysis for vulnerabilities |
| **Codacy** | Every push/PR | Automated code quality and security review |
| **Snyk** | Continuous | Real-time dependency vulnerability monitoring |
| **npm audit** | Every push/PR | Scans for known CVEs in dependencies |
| **Lighthouse CI** | Every push/PR | Performance, accessibility, best practices |

**View results:**
- [CI Status](https://github.com/bytebrox/vanitymine-web/actions/workflows/ci.yml)
- [CodeQL Scans](https://github.com/bytebrox/vanitymine-web/security/code-scanning)
- [Dependabot Alerts](https://github.com/bytebrox/vanitymine-web/security/dependabot)
- [Codacy Dashboard](https://app.codacy.com/gh/bytebrox/vanitymine-web/dashboard)
- [Snyk Report](https://snyk.io/test/github/bytebrox/vanitymine-web)

### Cryptography
| Component | Implementation | Standard |
|-----------|----------------|----------|
| Key Generation | Native Web Crypto API | Ed25519 |
| Random Numbers | crypto.getRandomValues() | Hardware-backed CSPRNG |
| Entropy | 256 bits | Industry standard |
| Encoding | Base58 | Solana compatible |

### Key Security Check

After each key generation, we perform real-time verification:
- **Entropy Level**: Confirms 256-bit entropy
- **CSPRNG**: Verifies cryptographically secure RNG
- **Chi-Square Test**: Statistical randomness verification
- **Distribution**: Ensures uniform byte distribution

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
