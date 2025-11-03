export const LAYOUT_VARIANTS = {
  default: "min-h-screen bg-background",
  cv: "min-h-screen bg-background py-8 px-4 sm:py-12",
} as const;

export const CV_CONSTANTS = {
  maxWidth: "max-w-5xl",
  cardPadding: "p-8 sm:p-12",
  sectionGap: "gap-8 lg:gap-12",
  borderStrong: "border-[hsl(var(--cv-border-strong))]",
  borderSubtle: "border-[hsl(var(--cv-border-subtle))]",
} as const;