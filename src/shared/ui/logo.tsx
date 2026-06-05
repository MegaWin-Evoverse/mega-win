import { cn } from '@/shared/lib/cn';

interface Props {
  className?: string;
  size?: 'sm' | 'lg';
}

const BRAND_NAME = 'MEGA WIN';

export function Logo({ className, size = 'sm' }: Props) {
  const isLarge = size === 'lg';

  return (
    <div className={cn('flex flex-col items-center justify-center gap-0 select-none', className)}>
      <svg
        viewBox="0 0 100 100"
        className={cn('shrink-0', isLarge ? 'w-[60px] h-[60px]' : 'w-8 h-8')}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="var(--brand-black)"
          stroke="var(--brand-green-to)"
          strokeWidth="3"
        />
        <circle
          cx="50"
          cy="50"
          r="38"
          stroke="var(--brand-green-to)"
          strokeWidth="10"
          strokeDasharray="20 12"
        />
        <circle cx="50" cy="50" r="30" stroke="var(--brand-black)" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="24" stroke="var(--brand-green-to)" strokeWidth="3" />
        <circle cx="50" cy="50" r="18" fill="var(--brand-dark)" />
        <path
          d="M50 32 L54 44 L66 44 L56 52 L60 64 L50 56 L40 64 L44 52 L34 44 L46 44 Z"
          fill="var(--brand-green-from)"
        />
      </svg>
      <span
        className={cn(
          'logo-text font-nekst font-black leading-none uppercase relative z-10',
          isLarge ? 'text-lg tracking-[0.1em] -mt-[18px]' : 'text-[12px] tracking-wider -mt-[10px]'
        )}
      >
        {BRAND_NAME}
      </span>
    </div>
  );
}
