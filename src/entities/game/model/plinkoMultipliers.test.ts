import { PLINKO_MULTIPLIERS } from './plinkoMultipliers';
import { RISK } from './constants';
import { PLINKO_ROWS } from './constants';

describe('PLINKO_MULTIPLIERS', () => {
  it('has a symmetric row of length rows+1 for every risk and row count', () => {
    const risks = [RISK.LOW, RISK.MEDIUM, RISK.HIGH] as const;
    for (const risk of risks) {
      for (let rows = PLINKO_ROWS.MIN; rows <= PLINKO_ROWS.MAX; rows++) {
        const table = PLINKO_MULTIPLIERS[risk][rows];
        expect(table).toBeDefined();
        expect(table).toHaveLength(rows + 1);
        const reversed = [...table].reverse();
        expect(table).toEqual(reversed);
      }
    }
  });
});
