import { cn } from "@/lib/utils";
import { BilingualDesc } from "./BilingualDesc";

interface PillarRowProps {
  title: string;
  sub?: string;
  descEn: string;
  descKo: string | React.ReactNode;
  delay?: number;
  className?: string;
}

export const PillarRow = ({
  title,
  sub,
  descEn,
  descKo,
  delay = 0,
  className = "",
}: PillarRowProps) => {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-12 py-12 border-t border-mine-shaft/10", className)}>
      <div className="lg:col-span-4 mb-6 lg:mb-0">
        <h4 className="anim-move-up text-[20px] font-bold uppercase font-inter" data-delay={delay}>
          {title}
        </h4>
        {sub && (
          <p className="anim-move-up text-[12px] uppercase text-mine-shaft/40 font-bold mt-2" data-delay={delay + 50}>
            {sub}
          </p>
        )}
      </div>
      <div className="lg:col-span-8">
        <BilingualDesc 
          en={descEn} 
          ko={descKo} 
          enDelay={delay + 100} 
          koDelay={delay + 150} 
        />
      </div>
    </div>
  );
};
