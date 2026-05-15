import Link from "next/link";
import { cn } from "@/lib/utils";

interface DoubleButtonProps {
  labelFront: string;
  labelBack?: string;
  href?: string;
  className?: string;
}

export const DoubleButton = ({
  labelFront,
  href = "#",
  className,
}: DoubleButtonProps) => {
  return (
    <Link href={href} className={cn("btn-front", className)}>
      {labelFront}
    </Link>
  );
};
