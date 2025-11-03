import { useProfile } from '@/contexts/ProfileContext';
import { SkillChip } from './SkillChip';

export const DynamicSkills = () => {
  const { cvData } = useProfile();
  
  return (
    <div className="space-y-3">
      {Object.entries(cvData.skills).map(([category, skills]) => (
        <div key={category}>
          <p className="cv-text-xs font-semibold text-muted-foreground mb-2">{category}</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillChip key={skill} skill={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
