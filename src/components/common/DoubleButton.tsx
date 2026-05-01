import React from "react";
import { cn } from "@/lib/utils";

interface DoubleButtonProps {
  labelFront: string;
  labelBack: string;
  href?: string;
  className?: string;
}

export const DoubleButton = ({
  labelFront,
  labelBack,
  href = "#",
  className,
}: DoubleButtonProps) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-start h-[22px]",
        className
      )}
    >
      {/* Back Button (Beige) */}
      <div className="absolute left-0 top-0 h-full bg-ash rounded-full px-6 flex items-center translate-x-4 transition-transform group-hover:translate-x-6">
        <span className="text-[10.5px] font-inter text-mine-shaft whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {labelBack}
        </span>
        <span className="text-[10.5px] font-inter text-mine-shaft whitespace-nowrap pl-2">
          {labelBack}
        </span>
      </div>

      {/* Front Button (Dark) */}
      <div className="relative h-full bg-mine-shaft rounded-full px-3 flex items-center z-10 border border-mine-shaft">
        <span className="text-[10.5px] font-inter text-white whitespace-nowrap">
          {labelFront}
        </span>
      </div>
    </a>
  );
};
