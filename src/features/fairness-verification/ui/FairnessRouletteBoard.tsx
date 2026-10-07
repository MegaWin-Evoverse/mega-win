import { cn } from '@/shared/lib/cn';
import { ROULETTE_ROWS, getNumberColor } from '@/features/roulette-table';
import { COLUMN, DOZEN, ROULETTE_TABLE_LABELS } from '@/features/roulette-controls';

const NUMBERS = ROULETTE_ROWS.flat();

const COLUMN_KEYS = [COLUMN.TOP, COLUMN.MIDDLE, COLUMN.BOTTOM];

const DOZEN_CONFIG = [
  { key: DOZEN.FIRST, label: ROULETTE_TABLE_LABELS.DOZEN_FIRST },
  { key: DOZEN.SECOND, label: ROULETTE_TABLE_LABELS.DOZEN_SECOND },
  { key: DOZEN.THIRD, label: ROULETTE_TABLE_LABELS.DOZEN_THIRD },
];

const OUTSIDE_CELLS = [
  { label: ROULETTE_TABLE_LABELS.HALF_LOW, color: 'dark' as const },
  { label: ROULETTE_TABLE_LABELS.PARITY_EVEN, color: 'dark' as const },
  { label: '', color: 'red' as const },
  { label: '', color: 'black' as const },
  { label: ROULETTE_TABLE_LABELS.PARITY_ODD, color: 'dark' as const },
  { label: ROULETTE_TABLE_LABELS.HALF_HIGH, color: 'dark' as const },
];

type CellColor = 'red' | 'black' | 'green' | 'dark';

const COLOR_CLASSES: Record<CellColor, string> = {
  red: 'bg-roulette-red',
  black: 'bg-gradient-to-b from-border-default to-brand-btn-gradient-to',
  green: 'bg-brand-green-to',
  dark: 'bg-bg-primary border border-roulette-cell-border',
};

interface CellProps {
  label: string | number;
  color: CellColor;
  isHighlighted?: boolean;
  className?: string;
}

function Cell({ label, color, isHighlighted, className }: CellProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center font-outfit text-[min(14px,2.2cqw)] font-semibold text-brand-text-white select-none',
        COLOR_CLASSES[color],
        isHighlighted && 'ring-2 ring-brand-text-white',
        className
      )}
    >
      {label}
    </div>
  );
}

interface Props {
  winningNumber: number | null;
  className?: string;
}

export function FairnessRouletteBoard({ winningNumber, className }: Props) {
  return (
    <div className={cn('@container w-full select-none', className)}>
      <div className="flex flex-col gap-[0.8cqw]">
        <div className="flex items-stretch gap-[1.44cqw]">
          <Cell
            label={0}
            color="green"
            isHighlighted={winningNumber === 0}
            className="basis-[6.4cqw] shrink-0 rounded-[1.12cqw]"
          />
          <div className="grid min-w-0 flex-1 grid-cols-12 gap-[0.8cqw]">
            {NUMBERS.map((number) => (
              <Cell
                key={number}
                label={number}
                color={getNumberColor(number)}
                isHighlighted={winningNumber === number}
                className="aspect-square rounded-[0.64cqw]"
              />
            ))}
          </div>
          <div className="grid basis-[6.4cqw] shrink-0 grid-rows-3 gap-[0.8cqw]">
            {COLUMN_KEYS.map((columnKey) => (
              <Cell
                key={columnKey}
                label={ROULETTE_TABLE_LABELS.COLUMN_2_TO_1}
                color="dark"
                className="rounded-[0.64cqw]"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-[0.48cqw]">
          {DOZEN_CONFIG.map(({ key, label }) => (
            <Cell
              key={key}
              label={label}
              color="dark"
              className="aspect-[206.33/46] min-w-0 flex-1 rounded-[0.64cqw]"
            />
          ))}
        </div>
        <div className="flex gap-[0.48cqw]">
          {OUTSIDE_CELLS.map(({ label, color }, index) => (
            <Cell
              key={`${label}-${index}`}
              label={label}
              color={color}
              className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
