import { CVHeader } from "@/components/CVHeader";
import { CVSection } from "@/components/CVSection";
import { EditableText } from "@/components/EditableText";
import { JobExperience } from "@/components/JobExperience";
import { EditableSkills } from "@/components/EditableSkills";
import { PageSetup } from "@/components/PageSetup";
import { CVSettings } from "@/components/CVSettings";
import { CVLayout } from "@/layouts";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCVData } from "@/hooks/useCVData";
import { useEffect } from "react";
import { Plus, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { t, language } = useLanguage();
  const { 
    cvData, 
    getSection, 
    updateSection,
    updateLanguageSection,
    getPersonalField,
    updatePersonalField,
    updateProfile,
    updateExperience,
    updateEducation
  } = useCVData();

  const addExperience = () => {
    const experiences = getSection('experience');
    const newJob = {
      title: 'Nuevo Puesto',
      company: 'Nueva Empresa',
      companyUrl: 'https://example.com',
      period: 'Mes Año — Presente',
      responsibilities: ['Responsabilidad 1', 'Responsabilidad 2']
    };
    updateLanguageSection('experience', [...experiences, newJob]);
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const experiences = [...getSection('experience')];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= experiences.length) return;
    [experiences[index], experiences[newIndex]] = [experiences[newIndex], experiences[index]];
    updateLanguageSection('experience', experiences);
  };

  const deleteExperience = (index: number) => {
    const experiences = getSection('experience').filter((_: any, i: number) => i !== index);
    updateLanguageSection('experience', experiences);
  };
  
  const handlePageSizeChange = (dimensions: string) => {
    const style = document.getElementById('dynamic-print-style') || document.createElement('style');
    style.id = 'dynamic-print-style';
    style.textContent = `
      @media print {
        @page {
          size: ${dimensions};
          margin: 10mm 15mm;
        }
      }
    `;
    if (!document.getElementById('dynamic-print-style')) {
      document.head.appendChild(style);
    }
  };

  useEffect(() => {
    handlePageSizeChange('210mm 297mm'); // Default A4
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Main CV Content */}
      <div className="flex-1">
        <CVLayout footerContent={<p>{t('footerText')}</p>}>
          <CVHeader
            name={getPersonalField('name')}
            title={getPersonalField('title')?.[language]}
            email={getPersonalField('email')}
            phone={getPersonalField('phone')}
            address={getPersonalField('location')}
            linkedin={getPersonalField('linkedin')}
            github={getPersonalField('github')}
            languages={t('languagesList').split(', ')}
            onUpdate={(field, value) => {
              if (field === 'title') {
                const currentTitle = getPersonalField('title');
                updatePersonalField('title', { ...currentTitle, [language]: value });
              } else {
                updatePersonalField(field, value);
              }
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 clearfix">
            <div className="lg:col-span-2">
              <CVSection title={t('profile')}>
                <EditableText
                  value={getSection('profile')}
                  onSave={updateProfile}
                  className="cv-text-base leading-relaxed text-foreground block"
                  multiline
                />
              </CVSection>

              <CVSection title={t('experience')}>
                <div className="space-y-4">
                  {getSection('experience').map((job: any, index: number) => (
                    <div key={index} className="relative group">
                      <JobExperience
                        title={job.title}
                        company={job.company}
                        companyUrl={job.companyUrl}
                        period={job.period}
                        responsibilities={job.responsibilities}
                        onUpdate={(field, value) => updateExperience(index, field, value)}
                      />
                      <div className="print:hidden absolute -right-12 top-0 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => moveExperience(index, 'up')}
                          disabled={index === 0}
                        >
                          <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0"
                          onClick={() => moveExperience(index, 'down')}
                          disabled={index === getSection('experience').length - 1}
                        >
                          <ArrowDown className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          className="h-7 w-7 p-0 text-red-500 hover:text-red-700"
                          onClick={() => deleteExperience(index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addExperience}
                    variant="outline"
                    size="sm"
                    className="w-full print:hidden"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Añadir Experiencia
                  </Button>
                </div>
              </CVSection>
            </div>

            <aside className="space-y-8 lg:border-l-2 lg:border-[hsl(var(--cv-border-subtle))] lg:pl-8 page-break-inside-avoid">
              <CVSection title={t('education')}>
                <div className="space-y-4">
                  {getSection('education').map((edu: any, index: number) => (
                    <div key={index}>
                      <EditableText
                        value={edu.degree}
                        onSave={(val) => updateEducation(index, 'degree', val)}
                        className="cv-text-sm font-semibold text-foreground block"
                      />
                      <EditableText
                        value={edu.institution}
                        onSave={(val) => updateEducation(index, 'institution', val)}
                        className="cv-text-sm text-muted-foreground block"
                      />
                      <EditableText
                        value={edu.period}
                        onSave={(val) => updateEducation(index, 'period', val)}
                        className="cv-text-xs text-muted-foreground block"
                      />
                      {'details' in edu && edu.details && (
                        <EditableText
                          value={edu.details as string}
                          onSave={(val) => updateEducation(index, 'details', val)}
                          className="cv-text-xs text-muted-foreground block"
                          multiline
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CVSection>

              <CVSection title={t('skills')}>
                <EditableSkills
                  skills={cvData.skills}
                  onSave={(skills) => updateSection('skills', skills)}
                />
              </CVSection>
            </aside>
          </div>
        </CVLayout>
      </div>

      {/* Right Sidebar - Settings (Outside CV) */}
      <aside className="print:hidden w-80 border-l bg-muted/30 p-6 space-y-6 sticky top-0 h-screen overflow-y-auto">
        <CVSettings />
        <PageSetup onPageSizeChange={handlePageSizeChange} />
      </aside>
    </div>
  );
};

export default Index;
