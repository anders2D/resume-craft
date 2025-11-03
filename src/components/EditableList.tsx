import { useState } from "react";
import { Pencil, Check, X, Plus, Trash2 } from "lucide-react";
import { FormattedText } from "@/components/FormattedText";

interface EditableListProps {
  items: string[];
  onSave: (items: string[]) => void;
  className?: string;
}

export const EditableList = ({ items, onSave, className = "" }: EditableListProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editItems, setEditItems] = useState(items);
  const [isHovered, setIsHovered] = useState(false);

  const handleSave = () => {
    onSave(editItems.filter(item => item.trim() !== ''));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditItems(items);
    setIsEditing(false);
  };

  const handleItemChange = (index: number, value: string) => {
    const newItems = [...editItems];
    newItems[index] = value;
    setEditItems(newItems);
  };

  const handleAddItem = () => {
    setEditItems([...editItems, '']);
  };

  const handleRemoveItem = (index: number) => {
    setEditItems(editItems.filter((_, i) => i !== index));
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        {editItems.map((item, index) => (
          <div key={index} className="flex gap-2 items-start">
            <span className="text-muted-foreground mt-2">•</span>
            <textarea
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              className="flex-1 border border-primary rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              rows={2}
            />
            <button
              onClick={() => handleRemoveItem(index)}
              className="p-1 text-red-500 hover:bg-red-50 rounded mt-1"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        <div className="flex gap-2 print:hidden">
          <button
            onClick={handleAddItem}
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus className="h-3 w-3" /> Add Item
          </button>
          <button
            onClick={handleSave}
            className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-1"
          >
            <Check className="h-3 w-3" /> Save
          </button>
          <button
            onClick={handleCancel}
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 flex items-center gap-1"
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
      <ul className={`list-disc list-inside space-y-2 ${className}`}>
        {items.map((item, index) => (
          <li key={index} className="cv-text-sm leading-relaxed text-foreground">
            <FormattedText text={item} />
          </li>
        ))}
      </ul>
      {isHovered && (
        <Pencil className="h-3 w-3 text-muted-foreground absolute -right-4 top-2 print:hidden" />
      )}
    </div>
  );
};
