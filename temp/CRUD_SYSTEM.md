# CV Data CRUD System

## 📦 Centralized Data Management

All CV data operations are now centralized in the `useCVData` hook located at `src/hooks/useCVData.ts`.

## 🎯 API Reference

### General Operations

```typescript
const { cvData, language, getSection, updateSection } = useCVData();

// Get entire section (language-aware)
const profile = getSection('profile'); // Returns current language profile
const skills = getSection('skills'); // Returns all skills

// Update entire section
updateSection('skills', newSkills);
```

### Personal Info CRUD

```typescript
const { getPersonalField, updatePersonalField } = useCVData();

// Get field
const name = getPersonalField('name');
const email = getPersonalField('email');
const title = getPersonalField('title'); // Returns { es: '...', en: '...' }

// Update field
updatePersonalField('name', 'John Doe');
updatePersonalField('email', 'john@example.com');
updatePersonalField('title', { es: 'Ingeniero', en: 'Engineer' });
```

### Profile CRUD

```typescript
const { updateProfile } = useCVData();

// Update profile for current language
updateProfile('New professional summary...');
```

### Experience CRUD

```typescript
const { getExperience, updateExperience } = useCVData();

// Get specific job
const job = getExperience(0); // First job

// Update job field
updateExperience(0, 'title', 'Senior Engineer');
updateExperience(0, 'company', 'Tech Corp');
updateExperience(0, 'responsibilities', ['Task 1', 'Task 2']);
```

### Education CRUD

```typescript
const { getEducation, updateEducation } = useCVData();

// Get specific education
const edu = getEducation(0);

// Update education field
updateEducation(0, 'degree', 'Master Degree');
updateEducation(0, 'institution', 'University Name');
updateEducation(0, 'period', '2015 - 2019');
```

### Skills CRUD

```typescript
const { getSkillCategory, updateSkillCategory } = useCVData();

// Get skills by category
const frontend = getSkillCategory('Frontend');

// Update category
updateSkillCategory('Frontend', ['React', 'Vue', 'Angular']);
```

## 🔄 Data Flow

```
User Edit
   ↓
Component (EditableText/EditableList)
   ↓
useCVData hook method
   ↓
ProfileContext.updateCvData()
   ↓
State update & re-render
```

## ✅ Benefits

- **Single Source of Truth**: All CRUD operations in one place
- **Type Safety**: TypeScript support for all operations
- **Language Awareness**: Automatically handles language-specific data
- **Validation**: Built-in data validation in ProfileContext
- **Clean Code**: No repetitive update logic in components
- **Easy Testing**: Centralized logic is easier to test

## 📝 Usage Example in Components

### Before (Repetitive)
```typescript
const { cvData, updateCvData } = useProfile();
const { language } = useLanguage();

const handleUpdate = (field, value) => {
  const updatedExperience = [...cvData.experience[language]];
  updatedExperience[index] = { ...updatedExperience[index], [field]: value };
  updateCvData({
    ...cvData,
    experience: { ...cvData.experience, [language]: updatedExperience }
  });
};
```

### After (Clean)
```typescript
const { updateExperience } = useCVData();

const handleUpdate = (field, value) => {
  updateExperience(index, field, value);
};
```

## 🎨 Supported Sections

- `personalInfo` - Name, email, phone, location, links, title
- `profile` - Professional summary (language-specific)
- `experience` - Job history (language-specific array)
- `education` - Education history (language-specific array)
- `skills` - Skills by category (global)
- `certifications` - Certifications list (global)

## 🔧 Implementation Details

### Language-Specific Data
Data with `{ es: ..., en: ... }` structure is automatically handled:
- `getSection()` returns data for current language
- `updateLanguageSection()` updates only current language
- Language switching is automatic

### Non-Language Data
Data like skills and certifications are global:
- `updateSection()` updates entire section
- No language parameter needed

### Array Operations
Experience and education are arrays:
- Use index-based operations
- Automatic array cloning for immutability
- Safe updates without mutations
