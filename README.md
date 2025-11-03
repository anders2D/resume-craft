<div align="center">

# 📄 Resume Craft Pro 25

**A modern, professional CV/Resume builder with AI-powered optimization**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue.svg)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Demo](#) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

---

## ✨ Features

- 🌍 **Multi-language Support** - Switch between Spanish and English seamlessly
- 📄 **Advanced Page Setup** - Configure paper size (A4, Letter, Legal, A3, Tabloid, Custom)
- 🖨️ **Print Optimization** - Professional print styles with exact color reproduction
- 🤖 **AI-Powered** - Optimize your CV with Google Gemini AI
- ✏️ **Inline Editing** - Edit content directly on the page
- 💾 **Import/Export** - Save and load your CV data as JSON
- 📱 **Responsive Design** - Looks great on all devices
- 🎯 **ATS-Friendly** - Optimized for Applicant Tracking Systems
- 🎨 **Modern UI** - Built with shadcn/ui components

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/resume-craft-pro-25.git
cd resume-craft-pro-25

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 📸 Screenshots

_Coming soon: Screenshots showcasing the CV builder interface, print preview, and mobile responsiveness._

## 🛠️ Built With

- [Vite](https://vitejs.dev/) - Fast build tool and dev server
- [React 18](https://react.dev/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - High-quality React components
- [Google Gemini AI](https://ai.google.dev/) - AI-powered CV optimization

## 📖 Documentation

### Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   ├── CVHeader.tsx
│   ├── CVSettings.tsx
│   └── ...
├── contexts/        # React contexts (state management)
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
└── styles/          # CSS files
```

### Key Features Explained

#### 🖨️ Print Configuration

Configure paper size, orientation, and zoom level for perfect printing:

```typescript
const handlePageSizeChange = (dimensions: string) => {
  const style = document.createElement('style');
  style.textContent = `@media print { @page { size: ${dimensions}; } }`;
  document.head.appendChild(style);
};
```

#### 🌐 Internationalization

Add new languages in `LanguageContext.tsx`:

```typescript
const translations = {
  es: { /* Spanish translations */ },
  en: { /* English translations */ },
  // Add more languages here
};
```

#### 🤖 AI Optimization

Tailor your CV to job descriptions using AI:
- Improve writing and clarity
- Optimize for ATS systems
- Preserve factual information

## 🎯 ATS Optimization Tips

### Best Practices

✅ **Contact Format**: Use clear labels with pipe separators
```
Email: email@example.com | Phone: +1 234 567 8900 | LinkedIn: linkedin.com/in/username
```

✅ **Quantifiable Achievements**: Include numbers, timeframes, and impact
```
"Reduced deployment time by 60% through CI/CD automation for 200+ applications"
```

✅ **Skills Organization**: Group skills by clear categories
```typescript
skills: {
  'Application Security': ['SAST', 'DAST', 'OWASP Top 10'],
  'Development': ['Python', 'Java', 'JavaScript'],
  'Cloud': ['AWS', 'Docker', 'Kubernetes']
}
```

### ATS Checklist

- [ ] Contact info has clear labels
- [ ] No repeated phrases (max 2 uses)
- [ ] All action verbs are unique
- [ ] Every bullet has quantifiable metrics
- [ ] Skills grouped by categories
- [ ] Keywords from job posting included

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📋 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Deployment

Deploy to your favorite platform:

- **Vercel**: [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/resume-craft-pro-25)
- **Netlify**: [![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/YOUR_USERNAME/resume-craft-pro-25)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Icon library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework

## 📧 Support

- 📖 [Documentation](CONTRIBUTING.md)
- 🐛 [Report Bug](https://github.com/YOUR_USERNAME/resume-craft-pro-25/issues)
- 💡 [Request Feature](https://github.com/YOUR_USERNAME/resume-craft-pro-25/issues)
- 💬 [Discussions](https://github.com/YOUR_USERNAME/resume-craft-pro-25/discussions)

---

<div align="center">

Made with ❤️ by the open-source community

⭐ Star this repo if you find it helpful!

</div>
