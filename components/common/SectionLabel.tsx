import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export const SectionLabel = ({ children, className }: SectionLabelProps) => (
  <p className={cn("section-label", className)}>
    {children}
  </p>
);
