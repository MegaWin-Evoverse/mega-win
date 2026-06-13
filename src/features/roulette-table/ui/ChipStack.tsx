import { type CSSProperties } from 'react';
import { getChipStripe } from '@/features/roulette-controls';
import { decomposeIntoChips } from '../model/chipStack';

// Most chips to render in one stack; greedy decomposition keeps this small in practice.
const MAX_VISIBLE_CHIPS = 5;
const CHIP_K_THRESHOLD = 1000;

function formatChipValue(denomination: number): string {
  if (denomination >= CHIP_K_THRESHOLD) {
    return `${denomination / CHIP_K_THRESHOLD}K`;
  }
  return denomination.toString();
}

interface MiniChipProps {
  denomination: number;
}

function MiniChip({ denomination }: MiniChipProps) {
  const nominal = formatChipValue(denomination);
  const stripe = getChipStripe(nominal);

  return (
    <svg viewBox="0 0 100 100" className="size-full">
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
      <circle cx="50" cy="50" r="32" fill="var(--color-surface-inset)" />
      <circle
        cx="50"
        cy="50"
        r="29"
        fill="none"
        stroke={stripe}
        strokeWidth="1.8"
        strokeDasharray="6 5.5"
      />
      <text
        x="50"
        y="51.5"
        fill="var(--color-brand-text-white)"
        fontSize={denomination >= CHIP_K_THRESHOLD ? '34' : '40'}
        fontWeight="700"
        fontFamily="Outfit, sans-serif"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {formatChipValue(denomination)}
      </text>
    </svg>
  );
}

interface Props {
  amount: number;
}

export function ChipStack({ amount }: Props) {
  const chips = decomposeIntoChips(amount).slice(0, MAX_VISIBLE_CHIPS);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Each higher chip is later in the DOM, so it paints on top of the one below it. */}
      <div className="absolute top-1/2 left-1/2 aspect-square w-[12cqw] sm:w-[4.4cqw] -translate-x-1/2 -translate-y-1/2">
        {chips.map((denomination, i) => (
          <div
            key={i}
            style={{ '--chip-index': i } as CSSProperties}
            className="absolute inset-x-0 bottom-[calc(var(--chip-index)*25%)] aspect-square rounded-full border border-black/10 shadow-[0_2px_4px_rgba(0,0,0,0.4)]"
          >
            <MiniChip denomination={denomination} />
          </div>
        ))}
      </div>
    </div>
  );
}
