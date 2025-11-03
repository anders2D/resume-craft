import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  es: {
    profile: 'Perfil',
    experience: 'Experiencia',
    education: 'Educación',
    skills: 'Habilidades Técnicas',
    languagesList: 'Español, Inglés, Portugués',
    footerText: 'Curriculum Vitae — Actualizado 2025'
  },
  en: {
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    skills: 'Technical Skills',
    languagesList: 'Spanish, English, Portuguese',
    footerText: 'Curriculum Vitae — Updated 2025'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('es');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['es']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};