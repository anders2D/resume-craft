import { ReactNode } from "react";
import { LAYOUT_VARIANTS } from "./constants";

export type LayoutVariant = keyof typeof LAYOUT_VARIANTS;

export interface BaseLayoutProps {
  children: ReactNode;
  className?: string;
  variant?: LayoutVariant;
}

export interface CVLayoutProps extends BaseLayoutProps {
  showFooter?: boolean;
  footerContent?: ReactNode;
}