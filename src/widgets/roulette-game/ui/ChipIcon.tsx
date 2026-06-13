import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { getChipStripe } from '@/features/roulette-controls';

interface Props {
  valueText: string;
  isActive?: boolean;
  canSelect?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChipIcon({ valueText, isActive, canSelect = true, onClick, className }: Props) {
  const stripe = getChipStripe(valueText);

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      disabled={!canSelect}
      className={cn(
        'relative size-12 rounded-full flex items-center justify-center transition-all duration-100 select-none outline-none border-0 bg-transparent shrink-0 active:scale-90',
        canSelect ? 'cursor-pointer' : 'cursor-not-allowed opacity-40',
        isActive
          ? 'scale-105 ring-2 ring-chip-active-glow ring-offset-2 ring-offset-bg-primary'
          : canSelect && 'hover:scale-105',
        className
      )}
      aria-label={`Chip ${valueText}`}
    >
      <svg viewBox="0 0 100 100" className="size-full select-none pointer-events-none">
        <circle cx="50" cy="50" r="48" fill="var(--color-border-default)" />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke={stripe}
          strokeWidth="10"
          strokeDasharray="16 26.9"
        />
        <circle cx="50" cy="50" r="38" fill="var(--color-border-default)" />
        <circle cx="50" cy="50" r="33.5" fill="var(--color-surface-inset)" />
        <circle
          cx="50"
          cy="50"
          r="31"
          fill="none"
          stroke={stripe}
          strokeWidth="1.8"
          strokeDasharray="6 5.5"
        />
        <text
          x="50"
          y="51.5"
          fill="var(--color-brand-text-white)"
          fontSize={valueText.length > 3 ? '13' : valueText.length > 2 ? '15' : '20'}
          fontWeight="600"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {valueText}
        </text>
      </svg>
    </Button>
  );
}
