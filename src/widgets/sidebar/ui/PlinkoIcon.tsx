import { type ComponentProps } from 'react';

export function PlinkoIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="7" r="2.5" />
      <circle cx="7" cy="16" r="2.5" />
      <circle cx="17" cy="16" r="2.5" />
    </svg>
  );
}
