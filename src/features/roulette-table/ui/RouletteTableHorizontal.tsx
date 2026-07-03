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
import { TableActions, TABLE_ACTIONS } from '@/features/table-actions';
import { BettingCell } from './BettingCell';

const COLUMN_KEYS: Array<'TOP' | 'MIDDLE' | 'BOTTOM'> = [COLUMN.TOP, COLUMN.MIDDLE, COLUMN.BOTTOM];

const DOZEN_CONFIG = [
  { key: DOZEN.FIRST, label: ROULETTE_TABLE_LABELS.DOZEN_FIRST },
  { key: DOZEN.SECOND, label: ROULETTE_TABLE_LABELS.DOZEN_SECOND },
  { key: DOZEN.THIRD, label: ROULETTE_TABLE_LABELS.DOZEN_THIRD },
] as const;

const NUMBERS = ROULETTE_ROWS.flat();

interface Props extends BettingTableHandlers {
  className?: string;
}

export function RouletteTableHorizontal({
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
    /* @container makes every cqw unit below scale with the table's own width,
       so the whole grid shrinks proportionally instead of overflowing. */
    <div className={cn('@container w-full max-w-[625px] mx-auto select-none', className)}>
      <div className="flex flex-col gap-[0.8cqw]">
        {/* Row 1: zero block, numbers grid, 2:1 columns */}
        <div className="flex items-stretch gap-[1.44cqw]">
          {/* Zero (spans the 3 number rows) */}
          <BettingCell
            label={0}
            color="green"
            placedBet={getZoneBet('straight-0')}
            onClick={() => handleStraightBet(0)}
            className="basis-[6.4cqw] shrink-0 rounded-[1.12cqw] font-bold"
          />

          {/* Numbers grid (12 × 3) */}
          <div className="grid min-w-0 flex-1 grid-cols-12 gap-[0.8cqw]">
            {NUMBERS.map((n) => (
              <BettingCell
                key={n}
                label={n}
                color={getNumberColor(n)}
                placedBet={getZoneBet(`straight-${n}`)}
                onClick={() => handleStraightBet(n)}
                className="aspect-square rounded-[0.64cqw]"
              />
            ))}
          </div>

          {/* 2:1 columns */}
          <div className="grid basis-[6.4cqw] shrink-0 grid-rows-3 gap-[0.8cqw]">
            {COLUMN_KEYS.map((col) => (
              <BettingCell
                key={col}
                label={ROULETTE_TABLE_LABELS.COLUMN_2_TO_1}
                color="dark"
                placedBet={getZoneBet(`column-${col}`)}
                onClick={() => handleColumnBet(col)}
                className="rounded-[0.64cqw]"
              />
            ))}
          </div>
        </div>

        {/* Dozen bets */}
        <div className="flex gap-[0.48cqw]">
          {DOZEN_CONFIG.map(({ key, label }) => (
            <BettingCell
              key={key}
              label={label}
              color="dark"
              placedBet={getZoneBet(`dozen-${key}`)}
              onClick={() => handleDozenBet(key, label)}
              className="aspect-[206.33/46] min-w-0 flex-1 rounded-[0.64cqw]"
            />
          ))}
        </div>

        {/* Outside bets (+ erase/undo below lg, matching the mobile/tablet mockups) */}
        <div className="flex gap-[0.48cqw]">
          <BettingCell
            label={ROULETTE_TABLE_LABELS.HALF_LOW}
            color="dark"
            placedBet={getZoneBet(`half-${HALF.LOW}`)}
            onClick={() => handleHalfBet(HALF.LOW, ROULETTE_TABLE_LABELS.HALF_LOW)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
          />
          <BettingCell
            label={ROULETTE_TABLE_LABELS.PARITY_EVEN}
            color="dark"
            placedBet={getZoneBet(`parity-${PARITY.EVEN}`)}
            onClick={() => handleParityBet(PARITY.EVEN, ROULETTE_TABLE_LABELS.PARITY_EVEN)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
          />
          <BettingCell
            label=""
            color="red"
            placedBet={getZoneBet(`color-${COLOR.RED}`)}
            onClick={() => handleColorBet(COLOR.RED)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
            ariaLabel="Bet on red"
          />
          <BettingCell
            label=""
            color="black"
            placedBet={getZoneBet(`color-${COLOR.BLACK}`)}
            onClick={() => handleColorBet(COLOR.BLACK)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
            ariaLabel="Bet on black"
          />
          <BettingCell
            label={ROULETTE_TABLE_LABELS.PARITY_ODD}
            color="dark"
            placedBet={getZoneBet(`parity-${PARITY.ODD}`)}
            onClick={() => handleParityBet(PARITY.ODD, ROULETTE_TABLE_LABELS.PARITY_ODD)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
          />
          <BettingCell
            label={ROULETTE_TABLE_LABELS.HALF_HIGH}
            color="dark"
            placedBet={getZoneBet(`half-${HALF.HIGH}`)}
            onClick={() => handleHalfBet(HALF.HIGH, ROULETTE_TABLE_LABELS.HALF_HIGH)}
            className="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw]"
          />
          <TableActions
            variant={TABLE_ACTIONS.ROULETTE_TABLE}
            onClearTable={clearTable}
            onUndo={undo}
            buttonClassName="aspect-[101.67/46] min-w-0 flex-1 rounded-[0.64cqw] lg:hidden"
          />
        </div>
      </div>
    </div>
  );
}
