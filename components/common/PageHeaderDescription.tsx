import { type ReactNode } from "react";

interface PageHeaderDescriptionProps {
  en: ReactNode;
  ko: ReactNode;
}

export const PageHeaderDescription = ({ en, ko }: PageHeaderDescriptionProps) => (
  <div className="flex flex-col gap-6">
    <span className="block text-[clamp(22px,1.8vw,28px)] font-medium leading-[1.6] tracking-[-0.02em] text-mine-shaft/80">{en}</span>
    <div className="body-text-ko break-keep">{ko}</div>
  </div>
);
