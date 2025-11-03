import { ReactNode } from "react";

interface CVSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const CVSection = ({ title, children, className = "" }: CVSectionProps) => {
  return (
    <section className={`mb-8 page-break-inside-avoid ${className}`}>
      <h2 className="cv-text-lg font-bold uppercase tracking-wide border-b border-[hsl(var(--cv-border-strong))] pb-2 mb-4 text-foreground">
        {title}
      </h2>
      {children}
    </section>
  );
};
