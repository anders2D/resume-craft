import { GoogleGenAI } from '@google/genai';

export const improveJobsPrompt = (jobsData: string) => `You are an expert career strategist and resume writer. Improve the job experience descriptions using the STAR method.

Rules:
- Start with strong, unique action verbs (no repetition)
- Max 120-150 characters per bullet
- Include measurable results (%, $, time, quantity)
- Highlight impact, not duties
- ATS-optimized keywords
- Professional, confident, metrics-driven tone

**Current job experience:**
${jobsData}

**Return ONLY valid JSON in this EXACT format (no markdown, no explanations):**
{
  "en": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "companyUrl": "https://company.com",
      "period": "Jan 2020 — Present",
      "responsibilities": ["Improved bullet 1", "Improved bullet 2", "Improved bullet 3"]
    }
  ],
  "es": [
    {
      "title": "Título del Trabajo",
      "company": "Nombre de la Empresa",
      "companyUrl": "https://company.com",
      "period": "Ene 2020 — Presente",
      "responsibilities": ["Punto mejorado 1", "Punto mejorado 2", "Punto mejorado 3"]
    }
  ]
}`;

export const improveProfilePrompt = (profileData: string) => `You are an expert career coach. Improve the professional summary to be concise (3-4 sentences, max 100 words), achievement-focused, keyword-rich, and compelling.

**Current profile:**
${profileData}

**Return ONLY valid JSON (no markdown, no explanations):**
{
  "en": "Improved professional summary in English",
  "es": "Resumen profesional mejorado en español"
}`;

export const improveEducationPrompt = (educationData: string) => `You are an expert resume writer. Enhance the education section with relevant details, honors, and ATS-friendly formatting.

**Current education:**
${educationData}

**Return ONLY valid JSON (no markdown, no explanations):**
{
  "en": [
    {
      "degree": "Degree Name",
      "institution": "University Name",
      "period": "2015 — 2019",
      "details": "Enhanced details with honors, GPA, relevant coursework"
    }
  ],
  "es": [
    {
      "degree": "Nombre del Título",
      "institution": "Nombre de la Universidad",
      "period": "2015 — 2019",
      "details": "Detalles mejorados con honores, promedio, cursos relevantes"
    }
  ]
}`;

export const improveSkillsPrompt = (skillsData: string) => `You are an expert in technical skills categorization and ATS optimization. Reorganize skills into clear categories with industry-standard names.

**Current skills:**
${skillsData}

**Return ONLY valid JSON (no markdown, no explanations):**
{
  "Category 1": ["Skill 1", "Skill 2", "Skill 3"],
  "Category 2": ["Skill 4", "Skill 5", "Skill 6"],
  "Category 3": ["Skill 7", "Skill 8"]
}`;

export const getAdvicePrompt = (cvData: string) => `You are a senior career advisor and ATS optimization expert. Analyze the CV and provide actionable advice.

**Current CV:**
${cvData}

**Return advice in this format (plain text, not JSON):**

📊 ATS Score: X/10

✅ Strengths:
1. [Strength 1]
2. [Strength 2]
3. [Strength 3]

⚠️ Areas to Improve:
1. [Area 1]
2. [Area 2]
3. [Area 3]

🎯 Action Items:
1. [Action 1]
2. [Action 2]
3. [Action 3]

💡 Industry Tips:
- [Tip 1]
- [Tip 2]
- [Tip 3]`;

export const tailorCVPrompt = (cvData: string, jobDescription: string) => `You are an expert CV writer and ATS optimization specialist. Tailor the entire CV to match the job description using professional CV best practices.

**Job Description:**
${jobDescription}

**Current CV:**
${cvData}

**CRITICAL RULES:**
- DO NOT change company names, job titles, periods, or companyUrl - keep them EXACTLY as they are
- ONLY optimize the responsibilities/achievements bullets to match job keywords
- DO NOT invent or modify factual information (companies, dates, institutions)

**Instructions:**
1. Analyze the job description to extract key requirements, skills, and keywords
2. Rewrite the profile summary to align with the role (3-4 sentences, achievement-focused)
3. ONLY rewrite responsibilities bullets using STAR method with job keywords - DO NOT change title, company, period, or companyUrl
4. Reorganize and prioritize skills to match job requirements
5. Keep education exactly as is - only add relevant details if missing
6. Ensure 70%+ keyword match with job description in responsibilities and profile
7. Maintain professional tone, ATS-friendly formatting

**Return ONLY valid JSON (no markdown, no explanations):**
{
  "personalInfo": {
    "name": "Keep original name",
    "title": {
      "en": "Tailored job title in English",
      "es": "Título adaptado en español"
    },
    "email": "Keep original",
    "phone": "Keep original",
    "location": "Keep original",
    "linkedin": "Keep original",
    "github": "Keep original"
  },
  "profile": {
    "en": "Tailored profile summary in English matching job requirements",
    "es": "Resumen adaptado en español"
  },
  "experience": {
    "en": [
      {
        "title": "KEEP ORIGINAL TITLE EXACTLY",
        "company": "KEEP ORIGINAL COMPANY NAME EXACTLY",
        "companyUrl": "KEEP ORIGINAL URL EXACTLY",
        "period": "KEEP ORIGINAL PERIOD EXACTLY",
        "responsibilities": ["ONLY OPTIMIZE THESE - Tailored achievement with job keywords", "Another optimized bullet"]
      }
    ],
    "es": [
      {
        "title": "MANTENER TÍTULO ORIGINAL EXACTAMENTE",
        "company": "MANTENER NOMBRE DE EMPRESA EXACTAMENTE",
        "companyUrl": "MANTENER URL ORIGINAL EXACTAMENTE",
        "period": "MANTENER PERÍODO ORIGINAL EXACTAMENTE",
        "responsibilities": ["SOLO OPTIMIZAR ESTOS - Logro adaptado con palabras clave", "Otro punto optimizado"]
      }
    ]
  },
  "education": {
    "en": [
      {
        "degree": "Degree Name",
        "institution": "University",
        "period": "2015 — 2019",
        "details": "Relevant coursework or achievements matching job"
      }
    ],
    "es": [
      {
        "degree": "Título",
        "institution": "Universidad",
        "period": "2015 — 2019",
        "details": "Detalles relevantes"
      }
    ]
  },
  "skills": {
    "Primary Skills (from job)": ["Skill 1", "Skill 2", "Skill 3"],
    "Technical Skills": ["Skill 4", "Skill 5"],
    "Additional Skills": ["Skill 6", "Skill 7"]
  }
}`;

export const callGeminiAI = async (prompt: string, apiKey: string, onProgress?: (text: string) => void): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey });
  
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

  return fullResponse;
};
