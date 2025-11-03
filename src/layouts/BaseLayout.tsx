import { cn } from "@/lib/utils";
import { LAYOUT_VARIANTS } from "./constants";
import { BaseLayoutProps } from "./types";

export const BaseLayout = ({ 
  children, 
  className = "", 
  variant = "default" 
}: BaseLayoutProps) => {
  return (
    <div className={cn(LAYOUT_VARIANTS[variant], className)}>
      {children}
    </div>
  );
};