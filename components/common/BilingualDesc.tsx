import { cn } from "@/lib/utils";

interface BilingualDescProps {
  en: string;
  ko: string | React.ReactNode;
  enDelay?: number;
  koDelay?: number;
  className?: string;
}

export const BilingualDesc = ({
  en,
  ko,
  enDelay = 100,
  koDelay = 150,
  className = "",
}: BilingualDescProps) => {
  return (
    <div className={cn("flex flex-col gap-2 lg:gap-4", className)}>
      <span className="block overflow-hidden">
        <span
          className="anim-move-up block body-text !text-mine-shaft/70 whitespace-pre-line"
          data-delay={enDelay}
        >
          {en}
        </span>
      </span>
      <span className="block overflow-hidden">
        <span
          className="anim-move-up block body-text-ko"
          data-delay={koDelay}
        >
          {ko}
        </span>
      </span>
    </div>
  );
};
