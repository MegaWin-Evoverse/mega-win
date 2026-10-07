interface Props {
  className?: string;
}

export function BurgerIcon({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect x="0.5" y="1" width="23" height="4" rx="2" fill="currentColor" />
      <rect x="0.5" y="10" width="23" height="4" rx="2" fill="currentColor" />
      <rect x="0.5" y="19" width="23" height="4" rx="2" fill="currentColor" />
    </svg>
  );
}
