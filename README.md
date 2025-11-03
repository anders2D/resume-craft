# Resume Craft Pro 25

A modern, professional CV/Resume builder with advanced print configuration and multi-language support.

## ✨ Features

- **Multi-language Support**: Switch between Spanish and English seamlessly
- **Advanced Page Setup**: Configure paper size (A4, Letter, Legal, A3, Tabloid, Custom)
- **Print Optimization**: Professional print styles with exact color reproduction
- **Responsive Design**: Looks great on all devices
- **ATS-Friendly**: Optimized for Applicant Tracking Systems
- **Modern UI**: Built with shadcn/ui components

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── CVHeader.tsx          # CV header with name, title, contact
│   ├── CVSection.tsx         # Reusable section wrapper
│   ├── CVSettings.tsx        # CV settings modal (language)
│   ├── JobExperience.tsx     # Job experience component
│   ├── LanguageSwitch.tsx    # Language toggle switch
│   ├── PageSetup.tsx         # Page configuration modal
│   └── SkillChip.tsx         # Skill badge component
├── contexts/
│   └── LanguageContext.tsx   # i18n context with translations
├── layouts/
│   └── CVLayout.tsx          # Main CV layout wrapper
├── pages/
│   └── Index.tsx             # Main CV page
└── styles/
    └── print.css             # Print-specific styles
```

### Key Components

**PageSetup** - Modal dialog for print configuration:
- Paper size selection (A4, Letter, Legal, A3, Tabloid, Custom)
- Orientation (Portrait/Landscape)
- Custom dimensions with unit selection (mm, cm, in, pt)
- Dynamic @page CSS injection

**CVSettings** - Modal dialog for CV preferences:
- Language switcher (ES/EN)
- Extensible for future settings

**LanguageContext** - Centralized i18n management:
- Translation function `t(key)`
- Job responsibilities by language
- Language toggle functionality

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd resume-craft-pro-25

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## 🎨 Technologies

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - High-quality React components
- **Lucide React** - Icon library

## 📝 Code Quality

### Strengths

✅ **Clean Component Architecture**: Well-separated concerns with single responsibility
✅ **Type Safety**: Full TypeScript implementation
✅ **Reusable Components**: DRY principle applied throughout
✅ **Context API**: Proper state management for language
✅ **Print Optimization**: Comprehensive print CSS with exact color reproduction
✅ **Accessibility**: Proper ARIA labels and semantic HTML
✅ **Responsive Design**: Mobile-first approach

### Recommendations

🔧 **Remove Unused Files**:
- `PrintSettings.tsx` (replaced by PageSetup)
- `PrintConfig.tsx` (duplicate)
- `LanguageSelect.tsx` and `LanguageToggle.tsx` (if unused)

🔧 **Potential Improvements**:
- Add unit tests (Vitest + React Testing Library)
- Implement PDF export functionality
- Add theme customization (colors, fonts)
- Create CV template variants
- Add data persistence (localStorage/backend)

## 🖨️ Print Configuration

The app uses dynamic CSS injection for print settings:

```typescript
const handlePageSizeChange = (dimensions: string) => {
  const style = document.getElementById('dynamic-print-style') || document.createElement('style');
  style.id = 'dynamic-print-style';
  style.textContent = `
    @media print {
      @page {
        size: ${dimensions};
        margin: 15mm 20mm;
      }
    }
  `;
  if (!document.getElementById('dynamic-print-style')) {
    document.head.appendChild(style);
  }
};
```

## 🌐 Internationalization

Add new languages in `LanguageContext.tsx`:

```typescript
const translations = {
  es: { /* Spanish translations */ },
  en: { /* English translations */ },
  // Add more languages here
};
```

## 📦 Deployment

**Deployment Options**:
- Vercel: `vercel deploy`
- Netlify: `netlify deploy --prod`
- GitHub Pages: Configure in repository settings

## 🎯 ATS Optimization Best Practices

### Critical Rules for ATS Compatibility

#### 1. **Contact Information Format**
✅ **DO**: Use clear labels with pipe separators
```
Location: Colombia | Email: email@example.com | Phone: +57 123 456 7890
LinkedIn: linkedin.com/in/username | GitHub: github.com/username
```
❌ **DON'T**: Use bullets (•) or concatenate fields without separators

#### 2. **Avoid Repetitive Phrases**
- Never use the same phrase more than twice across entire resume
- Vary action verbs in every bullet point
- Examples of overused phrases to avoid:
  - "with engineering teams within"
  - "security scanning into CI/CD pipelines for"
  - "threat modeling and secure coding practices"

#### 3. **Diversify Action Verbs**
✅ **Use varied verbs**: Analyzed, Implemented, Advised, Assessed, Led, Deployed, Coached, Supervised, Classified, Architected, Partnered, Engineered, Established, Mentored, Compiled

❌ **Avoid repetition**: Don't use "Monitored", "Integrated", "Collaborated" multiple times

#### 4. **Quantifiable Achievements**
Every bullet point MUST include:
- **Numbers**: 200+ applications, 150+ vulnerabilities, 60% improvement
- **Timeframes**: 30-day cycles, within SLAs
- **Impact**: Reduced by X%, Improved by Y%, Achieved Z%
- **Scope**: X teams, Y engineers, Z projects

#### 5. **Unique Bullet Points**
Each bullet must highlight:
- Different skills or tools
- Different projects or outcomes
- Different methodologies or approaches

❌ **Avoid similar bullets**:
```
// BAD - Too similar
"Analyzed 200+ applications using SAST/DAST..."
"Supervised 500+ applications using SAST/DAST..."

// GOOD - Diverse focus
"Analyzed 200+ applications using SAST/DAST..."
"Architected security-first CI/CD integration..."
```

#### 6. **Company URLs**
Always include `companyUrl` field for each job:
```typescript
{
  title: 'Application Security Analyst',
  company: 'Company Name',
  companyUrl: 'https://company.com',  // ✅ Required for ATS
  period: 'Jan 2020 — Present',
  responsibilities: [...]
}
```

#### 7. **Skills Section Organization**
Group skills by category with clear labels:
```typescript
skills: {
  'Application Security': ['SAST', 'DAST', 'OWASP Top 10'],
  'Development & Languages': ['Python', 'Java', 'JavaScript'],
  'CI/CD & DevSecOps': ['Jenkins', 'GitLab CI', 'GitHub Actions'],
  'Cloud & Containers': ['AWS', 'Docker', 'Kubernetes'],
  'Compliance & Standards': ['PCI DSS', 'GDPR', 'ISO 27001']
}
```

#### 8. **Job Title Consistency**
Match job titles to target role:
- Applying for "Application Security Analyst" → Use that exact title
- Avoid generic titles like "Security Engineer" when targeting specific roles

#### 9. **Keyword Optimization**
Include job posting keywords naturally:
- Extract keywords from job description
- Incorporate in: profile, skills, responsibilities
- Use exact phrases from job posting (e.g., "OWASP Top 10", "CI/CD pipelines")

#### 10. **Profile Summary**
First paragraph must include:
- Years of experience (5+ years)
- Core expertise (SAST/DAST, vulnerability assessment)
- Key technologies (AWS/Azure, Docker/Kubernetes)
- Soft skills (collaboration, communication)

### ATS Checklist Before Submission

- [ ] Contact info has clear labels (Email:, Phone:, LinkedIn:)
- [ ] No repeated phrases (max 2 uses per phrase)
- [ ] All action verbs are unique across resume
- [ ] Every bullet has quantifiable metrics
- [ ] No similar/duplicate bullet points
- [ ] All jobs have company URLs
- [ ] Skills grouped by clear categories
- [ ] Job titles match target role
- [ ] Keywords from job posting included
- [ ] Profile summary is keyword-rich
- [ ] No special characters that break parsing (use | not •)
- [ ] Standard date format (Month Year — Month Year)

### Testing Your Resume

1. **Copy-paste test**: Copy resume text → Should maintain structure
2. **ATS simulator**: Use tools like Jobscan or Resume Worded
3. **Keyword match**: Compare against job description (aim for 70%+ match)
4. **Length check**: Keep to 1-2 pages maximum

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please follow the existing code style and component patterns.
