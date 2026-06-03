import { type ComponentProps } from 'react';

interface Props extends ComponentProps<'svg'> {
  className?: string;
}

export function KenoIcon(props: Props) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="3" y="9" width="12" height="12" rx="2" ry="2" />
      <path d="M9 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    </svg>
  );
}
