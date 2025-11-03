import { GoogleGenAI } from '@google/genai';
import { CVData } from '@/contexts/ProfileContext';

export const extractCVDataWithAI = async (text: string, apiKey: string, onProgress?: (response: string) => void): Promise<CVData> => {
  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `Extract CV/Resume information from the following text and return ONLY a valid JSON object with this exact structure:

{
  "personalInfo": {
    "name": "Full Name",
    "title": {
      "en": "Job Title in English",
      "es": "Job Title in Spanish"
    },
    "email": "email@example.com",
    "phone": "+1234567890",
    "location": "City, Country",
    "linkedin": "linkedin.com/in/username",
    "github": "github.com/username"
  },
  "profile": {
    "en": "Professional summary in English",
    "es": "Professional summary in Spanish"
  },
  "experience": {
    "en": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "companyUrl": "https://company.com",
        "period": "Jan 2020 — Present",
        "responsibilities": ["Achievement 1", "Achievement 2"]
      }
    ],
    "es": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "companyUrl": "https://company.com",
        "period": "Jan 2020 — Present",
        "responsibilities": ["Achievement 1", "Achievement 2"]
      }
    ]
  },
  "education": {
    "en": [
      {
        "degree": "Degree Name",
        "institution": "University Name",
        "period": "2015 — 2019",
        "details": "Additional details"
      }
    ],
    "es": [
      {
        "degree": "Degree Name",
        "institution": "University Name",
        "period": "2015 — 2019",
        "details": "Additional details"
      }
    ]
  },
  "skills": {
    "Category 1": ["Skill 1", "Skill 2"],
    "Category 2": ["Skill 3", "Skill 4"]
  },
  "certifications": [
    {
      "name": "Certification Name",
      "issuer": "Issuing Organization",
      "date": "2023"
    }
  ]
}

IMPORTANT: For title, profile, experience, and education, provide BOTH English (en) and Spanish (es) versions. If the text is only in one language, translate it to the other language.

Text to extract from:
${text}

Return ONLY the JSON object, no markdown, no explanations.`;

  const config = {
    thinkingConfig: { thinkingBudget: -1 }
  };
  
  const contents = [{
    role: 'user',
    parts: [{ text: prompt }]
  }];

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash-lite',
    config,
    contents
  });

  let fullResponse = '';
  for await (const chunk of response) {
    fullResponse += chunk.text;
    if (onProgress) onProgress(fullResponse);
  }

  const jsonMatch = fullResponse.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to extract JSON from AI response');
  
  const parsed = JSON.parse(jsonMatch[0]);
  
  // Validate structure
  if (!parsed.experience?.en || !parsed.experience?.es) {
    throw new Error('Invalid data structure: missing language fields');
  }
  
  return parsed;
};
