"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const ArrowLink = ({ href, children, className = "", external, ...props }: ArrowLinkProps) => {
  const classes = cn(
    "group flex flex-row items-center justify-between gap-4 transition-all duration-500 ease-out whitespace-nowrap",
    "font-inter text-[15px] font-medium tracking-[-0.01em] text-mine-shaft",
    className
  );

  const ArrowIcon = () => (
    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center overflow-hidden">
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
      >
        <path 
          d="M4.5 15.5L15.5 4.5M15.5 4.5H6.5M15.5 4.5V13.5" 
          stroke="currentColor" 
          strokeWidth="1.2" 
          strokeLinecap="square" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        <span className="flex-grow text-left">{children}</span>
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...(props as any)}>
      <span className="flex-grow text-left">{children}</span>
      <ArrowIcon />
    </Link>
  );
};
