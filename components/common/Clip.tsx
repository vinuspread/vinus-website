import { type ReactNode } from "react";

interface ClipProps {
  children: ReactNode;
  delay?: number;
}

export const Clip = ({ children, delay = 0 }: ClipProps) => (
  <span className="block overflow-hidden">
    <span className="anim-move-up block" data-delay={delay}>
      {children}
    </span>
  </span>
);
