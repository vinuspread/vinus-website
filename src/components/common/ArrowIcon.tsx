interface ArrowIconProps {
  className?: string;
  size?: number;
}

export const ArrowIcon = ({ className = "", size = 18 }: ArrowIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.5 15.5L15.5 4.5M15.5 4.5H6.5M15.5 4.5V13.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="square"
      strokeLinejoin="round"
    />
  </svg>
);
