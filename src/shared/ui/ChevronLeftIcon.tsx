import { type ComponentProps } from "react";

interface Props extends ComponentProps<"svg"> {
  className?: string;
}

export function ChevronLeftIcon({ className, ...props }: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M13 3L5 10l8 7" />
    </svg>
  );
}
