import { cn } from '@/shared/lib/cn';
import { Button } from '@/shared/ui/button';
import { CHIP_NOMINALS } from '@/features/roulette-controls';

type ChipNominal = (typeof CHIP_NOMINALS)[number];

interface Props {
  valueText: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const CHIP_BASE_COLOR = '#1b1f26';
const CHIP_CORE_COLOR = '#151924';
const CHIP_TEXT_COLOR = '#FDFDFD';

const CHIP_STRIPES: Record<ChipNominal, string> = {
  '1': '#FFFFFF',
  '5': '#75D2FD',
  '10': '#018BCB',
  '25': '#FFBABA',
  '50': '#FF4D4D',
  '100': '#EC0303',
  '250': '#9CFFC5',
  '500': '#35FF89',
  '1K': '#35FF89',
  '2K': '#F3FF9C',
  '5K': '#B2C807',
  '10K': '#B2C807',
  '25K': '#CDB1FE',
  '50K': '#9A5FFF',
  '100K': '#6208FF',
};

export function ChipIcon({ valueText, isActive, onClick, className }: Props) {
  const stripe = CHIP_STRIPES[valueText as ChipNominal] ?? CHIP_STRIPES['1'];

  return (
    <Button
      variant="ghost"
      size="none"
      onClick={onClick}
      className={cn(
        'relative size-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 select-none outline-none border-0 bg-transparent shrink-0',
        isActive ? 'scale-105' : 'hover:scale-105',
        className
      )}
      aria-label={`Chip ${valueText}`}
    >
      <svg viewBox="0 0 100 100" className="size-full select-none pointer-events-none">
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
              r="49"
              fill="none"
              stroke="var(--chip-active-glow)"
              strokeWidth="2"
              className="animate-pulse"
            />
            <circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="var(--chip-active-glow)"
              strokeWidth="1"
              opacity="0.6"
              className="animate-pulse"
            />
          </>
        )}
      </svg>
    </Button>
  );
}
