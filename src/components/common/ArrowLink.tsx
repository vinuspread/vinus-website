"use client";
import Link from "next/link";

interface ArrowLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}

export const ArrowLink = ({ href, children, className = "", external, ...props }: ArrowLinkProps) => {
  const classes = `group inline-flex items-center gap-3 border-b border-mine-shaft/30 pb-3 
    font-inter text-[15px] font-medium tracking-[-0.01em] text-mine-shaft 
    hover:border-mine-shaft transition-colors duration-300 ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
        <span>{children}</span>
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...(props as any)}>
      <span>{children}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
    </Link>
  );
};
