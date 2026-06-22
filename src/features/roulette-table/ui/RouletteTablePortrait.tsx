import { cn } from '@/shared/lib/cn';
import {
  COLUMN,
  DOZEN,
  HALF,
  PARITY,
  COLOR,
  ROULETTE_TABLE_LABELS,
} from '@/features/roulette-controls';
import { ROULETTE_ROWS, getNumberColor } from '../model/rouletteLayout';
import type { BettingTableHandlers } from '../model/useBettingTable';
import { BettingCell } from './BettingCell';
import { TableActions } from './TableActions';

// Literal row-start classes (rows 2..13 host the 12 number rows) so Tailwind's JIT
// can statically detect them — interpolated class names would not be generated.
const NUMBER_ROW_START = [
  'row-start-2',
  'row-start-3',
  'row-start-4',
  'row-start-5',
  'row-start-6',
  'row-start-7',
  'row-start-8',
  'row-start-9',
  'row-start-10',
  'row-start-11',
  'row-start-12',
  'row-start-13',
] as const;

// Each visual column maps to a roulette "column" bet so the 2:1 cell below it is correct.
// Reads top-to-bottom as 1 2 3 / 4 5 6 / … / 34 35 36.
const NUMBER_COLUMNS = [
  { numbers: ROULETTE_ROWS[2], colClass: 'col-start-3', columnKey: COLUMN.BOTTOM },
  { numbers: ROULETTE_ROWS[1], colClass: 'col-start-4', columnKey: COLUMN.MIDDLE },
  { numbers: ROULETTE_ROWS[0], colClass: 'col-start-5', columnKey: COLUMN.TOP },
] as const;

const DOZEN_CONFIG = [
  {
    key: DOZEN.FIRST,
    label: ROULETTE_TABLE_LABELS.DOZEN_FIRST,
    placeClass: 'row-start-2 row-span-4',
  },
  {
    key: DOZEN.SECOND,
    label: ROULETTE_TABLE_LABELS.DOZEN_SECOND,
    placeClass: 'row-start-6 row-span-4',
  },
  {
    key: DOZEN.THIRD,
    label: ROULETTE_TABLE_LABELS.DOZEN_THIRD,
    placeClass: 'row-start-10 row-span-4',
  },
] as const;

interface Props extends BettingTableHandlers {
  className?: string;
}

export function RouletteTablePortrait({
  className,
  getZoneBet,
  handleStraightBet,
  handleColumnBet,
  handleDozenBet,
  handleHalfBet,
  handleParityBet,
  handleColorBet,
  clearTable,
  undo,
}: Props) {
  return (
    /* @container drives the cqw units below so the whole portrait table scales with
       its own width. Columns: even-money | dozens | 3 number columns.
       Rows: 1 = zero, 2..13 = numbers, 14 = 2:1 / actions. */
    <div
      className={cn(
        // Right-aligned, leaving the left of the screen empty (sound toggle sits there);
        // the wheel is hidden on mobile, so the table is the main game element.
        '@container grid w-[75%] max-w-[360px] ml-auto mr-1 select-none gap-[0.8cqw]',
        'grid-cols-[1.45fr_1.45fr_1fr_1fr_1fr] grid-rows-[repeat(14,auto)]',
        className
      )}
    >
      {/* Even-money column (far left), each cell spans 2 number rows */}
      <BettingCell
        label={ROULETTE_TABLE_LABELS.HALF_LOW}
        color="dark"
        placedBet={getZoneBet(`half-${HALF.LOW}`)}
        onClick={() => handleHalfBet(HALF.LOW, ROULETTE_TABLE_LABELS.HALF_LOW)}
        className="col-start-1 row-start-2 row-span-2 rounded-[1cqw] text-[min(13px,3.2cqw)]"
      />
      <BettingCell
        label={ROULETTE_TABLE_LABELS.PARITY_EVEN}
        color="dark"
        placedBet={getZoneBet(`parity-${PARITY.EVEN}`)}
        onClick={() => handleParityBet(PARITY.EVEN, ROULETTE_TABLE_LABELS.PARITY_EVEN)}
        className="col-start-1 row-start-4 row-span-2 rounded-[1cqw] text-[min(13px,3.2cqw)]"
      />
      <BettingCell
        label=""
        color="red"
        placedBet={getZoneBet(`color-${COLOR.RED}`)}
        onClick={() => handleColorBet(COLOR.RED)}
        className="col-start-1 row-start-6 row-span-2 rounded-[1cqw]"
        ariaLabel="Bet on red"
      />
      <BettingCell
        label=""
        color="black"
        placedBet={getZoneBet(`color-${COLOR.BLACK}`)}
        onClick={() => handleColorBet(COLOR.BLACK)}
        className="col-start-1 row-start-8 row-span-2 rounded-[1cqw]"
        ariaLabel="Bet on black"
      />
      <BettingCell
        label={ROULETTE_TABLE_LABELS.PARITY_ODD}
        color="dark"
        placedBet={getZoneBet(`parity-${PARITY.ODD}`)}
        onClick={() => handleParityBet(PARITY.ODD, ROULETTE_TABLE_LABELS.PARITY_ODD)}
        className="col-start-1 row-start-10 row-span-2 rounded-[1cqw] text-[min(13px,3.2cqw)]"
      />
      <BettingCell
        label={ROULETTE_TABLE_LABELS.HALF_HIGH}
        color="dark"
        placedBet={getZoneBet(`half-${HALF.HIGH}`)}
        onClick={() => handleHalfBet(HALF.HIGH, ROULETTE_TABLE_LABELS.HALF_HIGH)}
        className="col-start-1 row-start-12 row-span-2 rounded-[1cqw] text-[min(13px,3.2cqw)]"
      />

      {/* Dozens column (vertical labels), each spans 4 number rows */}
      {DOZEN_CONFIG.map(({ key, label, placeClass }) => (
        <BettingCell
          key={key}
          label={label}
          color="dark"
          placedBet={getZoneBet(`dozen-${key}`)}
          onClick={() => handleDozenBet(key, label)}
          className={cn(
            'col-start-2 rounded-[1cqw] text-[min(12px,3cqw)] [writing-mode:vertical-rl] rotate-180',
            placeClass
          )}
        />
      ))}

      {/* Zero spans the three number columns at the top */}
      <BettingCell
        label={0}
        color="green"
        placedBet={getZoneBet('straight-0')}
        onClick={() => handleStraightBet(0)}
        className="col-start-3 col-end-6 row-start-1 rounded-[1.4cqw] text-[min(18px,5cqw)] font-bold aspect-[130/40]"
      />

      {/* Numbers grid: 12 rows × 3 columns */}
      {NUMBER_COLUMNS.map(({ numbers, colClass }) =>
        numbers.map((n, i) => (
          <BettingCell
            key={n}
            label={n}
            color={getNumberColor(n)}
            placedBet={getZoneBet(`straight-${n}`)}
            onClick={() => handleStraightBet(n)}
            className={cn(
              'aspect-square rounded-[1cqw] text-[min(14px,4cqw)]',
              colClass,
              NUMBER_ROW_START[i]
            )}
          />
        ))
      )}

      {/* 2:1 column bets at the bottom of each number column */}
      {NUMBER_COLUMNS.map(({ colClass, columnKey }) => (
        <BettingCell
          key={columnKey}
          label={ROULETTE_TABLE_LABELS.COLUMN_2_TO_1}
          color="dark"
          placedBet={getZoneBet(`column-${columnKey}`)}
          onClick={() => handleColumnBet(columnKey)}
          className={cn(
            'row-start-14 rounded-[1cqw] text-[min(13px,3.4cqw)] aspect-square',
            colClass
          )}
        />
      ))}

      {/* Erase / Undo, aligned with the 2:1 row under the side columns */}
      <div className="col-start-1 col-end-3 row-start-14 grid grid-cols-2 gap-[0.8cqw]">
        <TableActions
          onClearTable={clearTable}
          onUndo={undo}
          buttonClassName="rounded-[1cqw] aspect-[58/40]"
        />
      </div>
    </div>
  );
}
