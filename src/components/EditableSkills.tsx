import { useState, useEffect } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { SkillChip } from "./SkillChip";

interface EditableSkillsProps {
  skills: Record<string, string[]>;
  onSave: (skills: Record<string, string[]>) => void;
}

export const EditableSkills = ({ skills, onSave }: EditableSkillsProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editSkills, setEditSkills] = useState(skills);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditSkills(skills);
    }
  }, [skills, isEditing]);

  const handleSave = () => {
    onSave(editSkills);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditSkills(skills);
    setIsEditing(false);
  };

  const handleCategoryChange = (oldCategory: string, newCategory: string) => {
    const newSkills = { ...editSkills };
    newSkills[newCategory] = newSkills[oldCategory];
    delete newSkills[oldCategory];
    setEditSkills(newSkills);
  };

  const handleSkillChange = (category: string, index: number, value: string) => {
    const newSkills = { ...editSkills };
    newSkills[category][index] = value;
    setEditSkills(newSkills);
  };

  const handleAddSkill = (category: string) => {
    const newSkills = { ...editSkills };
    newSkills[category] = [...newSkills[category], ''];
    setEditSkills(newSkills);
  };

  const handleRemoveSkill = (category: string, index: number) => {
    const newSkills = { ...editSkills };
    newSkills[category] = newSkills[category].filter((_, i) => i !== index);
    setEditSkills(newSkills);
  };

  const handleAddCategory = () => {
    const newSkills = { ...editSkills };
    newSkills['New Category'] = [''];
    setEditSkills(newSkills);
  };

  const handleRemoveCategory = (category: string) => {
    const newSkills = { ...editSkills };
    delete newSkills[category];
    setEditSkills(newSkills);
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        {Object.entries(editSkills).map(([category, skillList]) => (
          <div key={category} className="border rounded p-3 space-y-2">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                value={category}
                onChange={(e) => handleCategoryChange(category, e.target.value)}
                className="flex-1 border border-primary rounded px-2 py-1 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={() => handleRemoveCategory(category)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill, index) => (
                <div key={index} className="flex gap-1 items-center">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(category, index, e.target.value)}
                    className="border border-primary rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Skill name"
                  />
                  <button
                    onClick={() => handleRemoveSkill(category, index)}
                    className="p-1 text-red-500 hover:bg-red-50 rounded"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => handleAddSkill(category)}
                className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handleAddCategory}
            className="px-3 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus className="h-3 w-3" /> Add Category
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
          >
            <Check className="h-3 w-3" /> Save
          </button>
          <button
            onClick={handleCancel}
            className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <div className="space-y-3">
        {Object.entries(skills).map(([category, skillList]) => (
          <div key={category}>
            <p className="cv-text-xs font-semibold text-muted-foreground mb-2">{category}</p>
            <div className="flex flex-wrap gap-2">
              {skillList.map((skill) => (
                <SkillChip key={skill} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
      {isHovered && (
        <Pencil className="h-3 w-3 text-muted-foreground absolute -right-4 top-2 print:hidden" />
      )}
    </div>
  );
};
