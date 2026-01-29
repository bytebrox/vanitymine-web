# Contributing to VanityMine

First off, thank you for considering contributing to VanityMine! 🎉

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title** describing the issue
- **Steps to reproduce** the behavior
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Browser/OS** information

### Suggesting Features

Feature suggestions are welcome! Please:

- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain why it would be useful
- Consider potential implementation approaches

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run linting (`npm run lint`)
5. Build the project (`npm run build`)
6. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance

### Development Setup

```bash
# Clone the repository
git clone https://github.com/bytebrox/vanitymine-web.git
cd vanitymine-web

# Install dependencies
npm install

# Build the worker
npm run build:worker

# Start development server
npm run dev
```

### Project Structure

```
src/
├── app/           # Next.js pages
├── components/    # React components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── types/         # TypeScript types
└── workers/       # Web Workers
```

## Security

For security vulnerabilities, please see [SECURITY.md](SECURITY.md). Do NOT open public issues for security problems.

## Questions?

Feel free to open a discussion on GitHub if you have questions!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
