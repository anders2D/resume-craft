import { EditableText } from "@/components/EditableText";
import { EditableList } from "@/components/EditableList";

interface JobExperienceProps {
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  responsibilities: string[];
  onUpdate?: (field: string, value: any) => void;
}

export const JobExperience = ({ title, company, companyUrl, period, responsibilities, onUpdate }: JobExperienceProps) => {
  return (
    <div className="mb-6 last:mb-0 page-break-inside-avoid">
      <h3 className="cv-text-base font-semibold text-foreground flex items-center gap-2 print:inline">
        <EditableText
          value={title}
          onSave={(val) => onUpdate?.('title', val)}
          className="cv-text-base font-semibold text-foreground print:inline"
        />
        <span className="print:inline">—</span>
        <EditableText
          value={company}
          onSave={(val) => onUpdate?.('company', val)}
          className="cv-text-base font-semibold text-foreground print:inline"
        />
      </h3>
      {companyUrl && (
        <EditableText
          value={companyUrl}
          onSave={(val) => onUpdate?.('companyUrl', val)}
          className="cv-text-xs text-muted-foreground block"
        />
      )}
      <EditableText
        value={period}
        onSave={(val) => onUpdate?.('period', val)}
        className="cv-text-sm text-muted-foreground mb-3 block"
      />
      <div className="ml-5">
        <EditableList
          items={responsibilities}
          onSave={(items) => onUpdate?.('responsibilities', items)}
        />
      </div>
    </div>
  );
};
