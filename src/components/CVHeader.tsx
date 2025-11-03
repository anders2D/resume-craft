import { useLanguage } from "@/contexts/LanguageContext";
import { EditableText } from "@/components/EditableText";

interface CVHeaderProps {
  name: string;
  title: string;
  email: string;
  phone: string;
  address?: string;
  linkedin?: string;
  github?: string;
  languages: string[];
  onUpdate?: (field: string, value: any) => void;
}

export const CVHeader = ({ name, title, email, phone, address, linkedin, github, languages, onUpdate }: CVHeaderProps) => {
  const { t } = useLanguage();
  
  return (
    <header className="border-b-[3px] border-[hsl(var(--cv-border-strong))] pb-4 mb-8 page-break-inside-avoid">
      <h1 className="cv-text-4xl font-bold uppercase tracking-tight text-foreground mb-2">
        <EditableText
          value={name}
          onSave={(val) => onUpdate?.('name', val)}
          className="cv-text-4xl font-bold uppercase tracking-tight text-foreground"
        />
      </h1>
      <EditableText
        value={title}
        onSave={(val) => onUpdate?.('title', val)}
        className="cv-text-xl text-secondary mb-4 block"
      />
      
      <div className="space-y-1 cv-text-sm text-muted-foreground">
        <div className="flex flex-wrap gap-x-4 items-center">
          {address && (
            <>
              <span>Location: </span>
              <EditableText
                value={address}
                onSave={(val) => onUpdate?.('location', val)}
                className="cv-text-sm text-muted-foreground"
              />
            </>
          )}
          <span>|</span>
          <span>Email: </span>
          <EditableText
            value={email}
            onSave={(val) => onUpdate?.('email', val)}
            className="cv-text-sm text-muted-foreground"
          />
          <span>|</span>
          <span>Phone: </span>
          <EditableText
            value={phone}
            onSave={(val) => onUpdate?.('phone', val)}
            className="cv-text-sm text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-x-4 items-center">
          {linkedin && (
            <>
              <span>LinkedIn: </span>
              <EditableText
                value={linkedin}
                onSave={(val) => onUpdate?.('linkedin', val)}
                className="cv-text-sm text-muted-foreground"
              />
            </>
          )}
          {linkedin && github && <span>|</span>}
          {github && (
            <>
              <span>GitHub: </span>
              <EditableText
                value={github}
                onSave={(val) => onUpdate?.('github', val)}
                className="cv-text-sm text-muted-foreground"
              />
            </>
          )}
          {(linkedin || github) && <span>|</span>}
          <span>Languages: </span>
          <EditableText
            value={languages.join(", ")}
            onSave={(val) => onUpdate?.('languages', val.split(",").map(l => l.trim()))}
            className="cv-text-sm text-muted-foreground"
          />
        </div>
      </div>
    </header>
  );
};
