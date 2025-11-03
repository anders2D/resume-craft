import { useProfile } from '@/contexts/ProfileContext';
import { useLanguage } from '@/contexts/LanguageContext';

export type CVSection = 'personalInfo' | 'profile' | 'experience' | 'education' | 'skills' | 'certifications';

export const useCVData = () => {
  const { cvData, updateCvData } = useProfile();
  const { language } = useLanguage();

  // Get data from specific section
  const getSection = (section: CVSection) => {
    const data = cvData[section];
    
    // Return language-specific data if available
    if (data && typeof data === 'object' && language in data) {
      return data[language];
    }
    
    return data;
  };

  // Update specific section
  const updateSection = (section: CVSection, value: any) => {
    updateCvData({
      ...cvData,
      [section]: value
    });
  };

  // Update language-specific section (for profile, experience, education)
  const updateLanguageSection = (section: CVSection, value: any, lang?: string) => {
    const targetLang = lang || language;
    const currentData = cvData[section];
    
    // If value is already the full object with all languages, use it directly
    if (typeof value === 'object' && !Array.isArray(value) && ('es' in value || 'en' in value)) {
      updateCvData({
        ...cvData,
        [section]: value
      });
    } else {
      // Otherwise, update only the target language
      updateCvData({
        ...cvData,
        [section]: {
          ...currentData,
          [targetLang]: value
        }
      });
    }
  };

  // Get specific field from personalInfo
  const getPersonalField = (field: string) => {
    return cvData.personalInfo?.[field];
  };

  // Update specific field in personalInfo (handles both simple and language-specific fields)
  const updatePersonalField = (field: string, value: any) => {
    updateCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value
      }
    });
  };

  // Update profile for current language
  const updateProfile = (value: string) => {
    updateLanguageSection('profile', value);
  };

  // Get experience by index
  const getExperience = (index: number) => {
    const experiences = getSection('experience');
    return Array.isArray(experiences) ? experiences[index] : null;
  };

  // Update experience by index
  const updateExperience = (index: number, field: string, value: any) => {
    const experiences = [...getSection('experience')];
    experiences[index] = { ...experiences[index], [field]: value };
    updateLanguageSection('experience', experiences);
  };

  // Get education by index
  const getEducation = (index: number) => {
    const education = getSection('education');
    return Array.isArray(education) ? education[index] : null;
  };

  // Update education by index
  const updateEducation = (index: number, field: string, value: any) => {
    const education = [...getSection('education')];
    education[index] = { ...education[index], [field]: value };
    updateLanguageSection('education', education);
  };

  // Get skills by category
  const getSkillCategory = (category: string) => {
    return cvData.skills?.[category] || [];
  };

  // Update skills category
  const updateSkillCategory = (category: string, skills: string[]) => {
    updateCvData({
      ...cvData,
      skills: {
        ...cvData.skills,
        [category]: skills
      }
    });
  };

  return {
    // General
    cvData,
    language,
    getSection,
    updateSection,
    updateLanguageSection,
    
    // Personal Info
    getPersonalField,
    updatePersonalField,
    
    // Profile
    updateProfile,
    
    // Experience
    getExperience,
    updateExperience,
    
    // Education
    getEducation,
    updateEducation,
    
    // Skills
    getSkillCategory,
    updateSkillCategory
  };
};
