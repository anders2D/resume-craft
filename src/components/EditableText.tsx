import { useState, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";
import { FormattedText } from "@/components/FormattedText";

interface EditableTextProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  multiline?: boolean;
}

export const EditableText = ({ value, onSave, className = "", multiline = false }: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [isHovered, setIsHovered] = useState(false);

  // CRÍTICO: Sincronizar estado local cuando el prop cambia
  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} w-full border border-primary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary`}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={`${className} w-full border border-primary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary`}
            autoFocus
          />
        )}
        <div className="flex gap-1 mt-1 print:hidden">
          <button
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-text"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsEditing(true)}
    >
      <FormattedText text={value} className={className} />
      {isHovered && (
        <Pencil className="h-3 w-3 text-muted-foreground absolute -right-4 top-1/2 -translate-y-1/2 print:hidden" />
      )}
    </div>
  );
};
