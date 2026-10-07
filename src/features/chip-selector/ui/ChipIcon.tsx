'use client';
import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { type ChipNominal, CHIP_STRIPES } from '@/entities/game';
import { CHIP_BASE_COLOR, CHIP_CORE_COLOR, CHIP_TEXT_COLOR } from '../model/constants';

interface Props {
  valueText: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function ChipIcon({ valueText, isActive, onClick, className }: Props) {
  const stripe = CHIP_STRIPES[valueText as ChipNominal] ?? CHIP_STRIPES['1'];

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      className={cn(
        'relative size-12 rounded-full flex items-center justify-center transition-all duration-100 select-none outline-none border-0 bg-transparent shrink-0 active:scale-90 cursor-pointer hover:scale-105',
        isActive && 'scale-105',
        className
      )}
      aria-label={`Chip ${valueText}`}
    >
      <svg viewBox="-7 -7 114 114" className="size-full select-none pointer-events-none">
        <circle cx="50" cy="50" r="48" fill={CHIP_BASE_COLOR} />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke={stripe}
          strokeWidth="10"
          strokeDasharray="16 26.9"
        />
        <circle cx="50" cy="50" r="38" fill={CHIP_BASE_COLOR} />
        <circle cx="50" cy="50" r="33.5" fill={CHIP_CORE_COLOR} />
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
          fill={CHIP_TEXT_COLOR}
          fontSize={valueText.length > 3 ? '13' : valueText.length > 2 ? '15' : '20'}
          fontWeight="600"
          fontFamily="Outfit, sans-serif"
          textAnchor="middle"
          dominantBaseline="central"
        >
          {valueText}
        </text>
        {isActive && (
          <>
            <circle
              cx="50"
              cy="50"
              r="51"
              fill="none"
              stroke="var(--chip-active-glow)"
              strokeWidth="6"
              className="animate-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="55"
              fill="none"
              stroke="var(--chip-active-glow)"
              strokeWidth="3"
              opacity="0.6"
              className="animate-pulse"
            />
          </>
        )}
      </svg>
    </Button>
  );
}
