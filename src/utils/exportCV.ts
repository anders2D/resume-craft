interface JSONResume {
  basics: {
    name: string;
    label: string;
    email: string;
    phone: string;
    url: string;
    summary: string;
    location: { city: string; countryCode: string };
    profiles: Array<{ network: string; username: string; url: string }>;
  };
  work: Array<{
    name: string;
    position: string;
    url: string;
    startDate: string;
    endDate: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    area: string;
    startDate: string;
    endDate: string;
  }>;
  skills: Array<{ name: string; keywords: string[] }>;
  certificates?: Array<{ name: string }>;
}

export const importFromJSON = (file: File, callback: (data: any) => void) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const json: JSONResume = JSON.parse(e.target?.result as string);
      const linkedin = json.basics.profiles.find(p => p.network === 'LinkedIn');
      const github = json.basics.profiles.find(p => p.network === 'GitHub');
      
      const imported = {
        personalInfo: {
          name: json.basics.name,
          title: { es: json.basics.label, en: json.basics.label },
          email: json.basics.email,
          phone: json.basics.phone,
          location: json.basics.location.city,
          linkedin: linkedin?.url.replace('https://', '') || '',
          github: github?.url.replace('https://', '') || ''
        },
        profile: { es: json.basics.summary, en: json.basics.summary },
        experience: {
          es: json.work.map(w => {
            const endDate = w.endDate === 'Present' ? 'Actualidad' : w.endDate;
            return {
              title: w.position,
              company: w.name,
              companyUrl: w.url,
              period: `${w.startDate} — ${endDate}`,
              responsibilities: w.highlights
            };
          }),
          en: json.work.map(w => ({
            title: w.position,
            company: w.name,
            companyUrl: w.url,
            period: `${w.startDate} — ${w.endDate}`,
            responsibilities: w.highlights
          }))
        },
        education: {
          es: json.education.map(e => ({
            degree: e.area,
            institution: e.institution,
            period: `${e.startDate} - ${e.endDate}`
          })),
          en: json.education.map(e => ({
            degree: e.area,
            institution: e.institution,
            period: `${e.startDate} - ${e.endDate}`
          }))
        },
        skills: json.skills.reduce((acc, s) => ({ ...acc, [s.name]: s.keywords }), {}),
        certifications: json.certificates?.map(c => c.name) || []
      };
      callback(imported);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      alert('Invalid JSON file');
    }
  };
  reader.readAsText(file);
};

export const exportToJSON = (cvData: any, language: 'es' | 'en') => {
  const jsonResume = {
    basics: {
      name: cvData.personalInfo.name,
      label: cvData.personalInfo.title[language],
      image: '',
      email: cvData.personalInfo.email,
      phone: cvData.personalInfo.phone,
      url: `https://${cvData.personalInfo.github}`,
      summary: cvData.profile[language],
      location: {
        address: '',
        postalCode: '',
        city: cvData.personalInfo.location,
        countryCode: 'CO',
        region: cvData.personalInfo.location
      },
      profiles: [
        {
          network: 'LinkedIn',
          username: cvData.personalInfo.linkedin.split('/').pop(),
          url: `https://${cvData.personalInfo.linkedin}`
        },
        {
          network: 'GitHub',
          username: cvData.personalInfo.github.split('/').pop(),
          url: `https://${cvData.personalInfo.github}`
        }
      ]
    },
    work: cvData.experience[language].map(job => ({
      name: job.company,
      position: job.title,
      url: job.companyUrl || '',
      startDate: job.period.split('—')[0].trim(),
      endDate: job.period.split('—')[1]?.trim() || 'Present',
      summary: '',
      highlights: job.responsibilities
    })),
    education: cvData.education[language].map(edu => ({
      institution: edu.institution,
      url: '',
      area: edu.degree,
      studyType: '',
      startDate: edu.period.split('-')[0].trim(),
      endDate: edu.period.split('-')[1]?.trim() || '',
      score: '',
      courses: []
    })),
    skills: Object.entries(cvData.skills).map(([name, keywords]) => ({
      name,
      level: 'Advanced',
      keywords
    })),
    languages: [
      { language: 'Spanish', fluency: 'Native speaker' },
      { language: 'English', fluency: 'Professional working proficiency' },
      { language: 'Portuguese', fluency: 'Limited working proficiency' }
    ],
    certificates: cvData.certifications?.map(cert => ({
      name: cert,
      date: '',
      issuer: '',
      url: ''
    })) || [],
    volunteer: [],
    awards: [],
    publications: [],
    interests: [],
    references: [],
    projects: []
  };

  const blob = new Blob([JSON.stringify(jsonResume, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${cvData.personalInfo.name.replace(/\s+/g, '_')}_CV.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
