interface SkillChipProps {
  skill: string;
}

export const SkillChip = ({ skill }: SkillChipProps) => {
  return (
    <li className="bg-[hsl(var(--cv-chip-bg))] text-[hsl(var(--cv-chip-text))] px-3 py-1.5 rounded-full text-sm font-medium transition-all hover:scale-105 hover:shadow-sm">
      {skill}
    </li>
  );
};
