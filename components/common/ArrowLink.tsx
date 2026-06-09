"use client";
import { TransitionLink } from "@/components/common/TransitionLink";
import { cn } from "@/lib/utils";
import { ArrowIcon } from "@/components/common/ArrowIcon";

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  hoverUnderline?: boolean;
}

export const ArrowLink = ({ href, children, className = "", external, hoverUnderline = false, ...props }: ArrowLinkProps) => {
  const classes = cn(
    "group flex flex-row items-center justify-between gap-4 transition-all duration-200 ease-out whitespace-nowrap",
    "font-inter text-[15px] font-medium tracking-[-0.01em] text-mine-shaft",
    className
  );
  const textClasses = cn(
    "flex-grow text-left",
    hoverUnderline && "arrow-link-label--underline"
  );

  const icon = (
    <ArrowIcon className="flex-shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-[3px] group-hover:-translate-y-[3px]" />
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        <span className={textClasses}>{children}</span>
        {icon}
      </a>
    );
  }

  return (
    <TransitionLink href={href} className={classes} {...props}>
      <span className={textClasses}>{children}</span>
      {icon}
    </TransitionLink>
  );
};
