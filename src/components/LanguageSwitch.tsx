import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2 print:hidden">
      <Label htmlFor="language-switch" className="text-sm">
        ES
      </Label>
      <Switch
        id="language-switch"
        checked={language === 'en'}
        onCheckedChange={toggleLanguage}
      />
      <Label htmlFor="language-switch" className="text-sm">
        EN
      </Label>
    </div>
  );
};