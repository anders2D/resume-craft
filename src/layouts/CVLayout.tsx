import { cn } from "@/lib/utils";
import { BaseLayout } from "./BaseLayout";
import { CV_CONSTANTS } from "./constants";
import { CVLayoutProps } from "./types";

export const CVLayout = ({ 
  children, 
  className = "",
  showFooter = true,
  footerContent
}: CVLayoutProps) => {
  return (
    <BaseLayout variant="cv">
      <main className={cn(
        CV_CONSTANTS.maxWidth,
        "mx-auto bg-card shadow-lg rounded-sm",
        CV_CONSTANTS.cardPadding,
        className
      )}>
        {children}
        
        {showFooter && (
          <footer className="mt-8 pt-6 border-t-2 border-[hsl(var(--cv-border-strong))] text-xs text-muted-foreground text-center">
            {footerContent || <p>Curriculum Vitae — Actualizado 2025</p>}
          </footer>
        )}
      </main>
    </BaseLayout>
  );
};