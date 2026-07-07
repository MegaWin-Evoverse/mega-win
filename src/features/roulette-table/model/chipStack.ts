import { CHIP_NOMINALS } from '@/entities/game';
import { parseChipValue } from '@/features/roulette-controls';

// All chip denominations, largest first, for greedy decomposition.
const CHIP_DENOMINATIONS = [...CHIP_NOMINALS].map(parseChipValue).sort((a, b) => b - a);

/**
 * Split a bet amount into the fewest standard chips, largest first.
 * e.g. 4 -> [1,1,1,1], 5 -> [5], 6 -> [5,1], 10 -> [10], 15 -> [10,5].
 */
export function decomposeIntoChips(amount: number): number[] {
  const chips: number[] = [];
  let remaining = amount;

  for (const denomination of CHIP_DENOMINATIONS) {
    while (remaining >= denomination) {
      chips.push(denomination);
      remaining -= denomination;
    }
  }

  return chips;
}
