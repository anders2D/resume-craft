# Contributing to Resume Craft Pro 25

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## 🤔 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Screenshots** if applicable
- **Environment details** (OS, browser, Node version)

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md).

### Suggesting Features

Feature suggestions are welcome! Please:

- **Check existing feature requests** to avoid duplicates
- **Provide clear use cases** for the feature
- **Explain why** this feature would be useful
- **Consider implementation** complexity

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md).

### Asking Questions

Have a question? Use the [question template](.github/ISSUE_TEMPLATE/question.md) or start a [GitHub Discussion](https://github.com/YOUR_USERNAME/resume-craft-pro-25/discussions).

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup Steps

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/resume-craft-pro-25.git
cd resume-craft-pro-25

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Project Structure

```
src/
├── components/     # React components
├── contexts/       # React contexts (state management)
├── hooks/          # Custom React hooks
├── layouts/        # Layout components
├── pages/          # Page components
├── styles/         # CSS files
└── utils/          # Utility functions
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types/interfaces (avoid `any`)
- Use meaningful variable and function names

### React

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types

### Styling

- Use Tailwind CSS utility classes
- Follow existing class naming patterns
- Use CSS variables for theming
- Ensure print styles work correctly

### Code Quality

```bash
# Run linter
npm run lint

# Build to check for errors
npm run build
```

## 💬 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(cv-header): add phone number validation
fix(print): correct page margins for A4 size
docs(readme): update installation instructions
refactor(hooks): simplify useCVData logic
```

## 🔄 Pull Request Process

### Before Submitting

1. **Create a feature branch** from `main`
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following coding standards

3. **Test your changes** thoroughly
   - Test in development mode
   - Test production build
   - Test print functionality
   - Test on different browsers

4. **Commit your changes** with proper commit messages

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting the PR

1. **Open a Pull Request** against the `main` branch

2. **Fill out the PR template** completely

3. **Link related issues** using keywords (e.g., "Closes #123")

4. **Add screenshots/GIFs** for UI changes

5. **Wait for review** - maintainers will review your PR

### PR Review Process

- Maintainers will review your code
- Address any requested changes
- Once approved, your PR will be merged
- Your contribution will be credited in the changelog

### PR Checklist

- [ ] Code follows project coding standards
- [ ] Commit messages follow conventional commits
- [ ] Changes are tested and working
- [ ] Documentation is updated (if needed)
- [ ] No console errors or warnings
- [ ] Print functionality still works
- [ ] Responsive design is maintained

## 🎯 Areas for Contribution

Looking for where to start? Check out:

- **Good First Issues** - Perfect for newcomers
- **Help Wanted** - Issues that need attention
- **Documentation** - Always room for improvement
- **Tests** - Help us increase test coverage
- **Translations** - Add support for more languages

## 🐛 Debugging Tips

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5173
npx kill-port 5173
```

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Type errors:**
```bash
# Check TypeScript errors
npx tsc --noEmit
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 💡 Questions?

- Open a [GitHub Discussion](https://github.com/YOUR_USERNAME/resume-craft-pro-25/discussions)
- Create an [issue](https://github.com/YOUR_USERNAME/resume-craft-pro-25/issues)

Thank you for contributing! 🎉
