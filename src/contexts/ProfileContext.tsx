import { createContext, useContext, ReactNode, useState } from 'react';
import { cvData as defaultCvData } from '@/data/cvData';

export interface CVData {
  personalInfo: any;
  profile: any;
  experience: any;
  education: any;
  skills: Record<string, string[]>;
  certifications?: string[];
}

interface ProfileContextType {
  role: string;
  cvData: CVData;
  updateCvData: (data: CVData) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [cvData, setCvData] = useState(defaultCvData);

  const updateCvData = (data: any) => {
    if (!data || typeof data !== 'object') {
      console.error('Invalid CV data:', data);
      return;
    }
    
    // Crear nueva referencia para forzar re-render
    setCvData({ ...data });
  };

  return (
    <ProfileContext.Provider value={{ role: 'appsec-engineer', cvData, updateCvData }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
