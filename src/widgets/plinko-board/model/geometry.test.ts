import {
  getPegRowCount,
  getBucketCount,
  getBoardLayout,
  getPegPositions,
  getBucketX,
  xToBucket,
} from './geometry';

describe('plinko geometry', () => {
  it('computes peg/bucket counts and symmetric positions', () => {
    expect(getPegRowCount(0)).toBe(3);
    expect(getPegRowCount(7)).toBe(10);
    expect(getBucketCount(8)).toBe(9);
    const layout = getBoardLayout(8, 508);
    const pegs = getPegPositions(8, layout);
    // 3+4+...+10 = 52 pegs
    expect(pegs).toHaveLength(52);
    const firstRow = pegs.slice(0, 3).map((p) => p.x);
    expect(firstRow[1]).toBeCloseTo(layout.centerX);
    expect(firstRow[0] + firstRow[2]).toBeCloseTo(2 * layout.centerX);
  });

  it('maps x back to the bucket index it falls into (inverse of getBucketX)', () => {
    const rows = 8;
    const layout = getBoardLayout(rows, 620);
    for (let bucket = 0; bucket <= rows; bucket++) {
      expect(xToBucket(getBucketX(bucket, rows, layout), rows, layout)).toBe(bucket);
    }
    expect(xToBucket(-9999, rows, layout)).toBe(0);
    expect(xToBucket(99999, rows, layout)).toBe(rows);
  });
});
