import { getBoardLayout, getPegPositions } from './geometry';
import { simulate } from './physics';

describe('plinko physics', () => {
  const rows = 8;
  const layout = getBoardLayout(rows, 620);
  const pegs = getPegPositions(rows, layout);

  it('is deterministic: same seed and start produce identical frames and bucket', () => {
    const first = simulate({ pegs, layout, rows, startX: layout.centerX, seed: 42 });
    const second = simulate({ pegs, layout, rows, startX: layout.centerX, seed: 42 });
    expect(second.bucket).toBe(first.bucket);
    expect(second.frames).toEqual(first.frames);
  });

  it('drops the ball to the bottom and settles in a valid bucket', () => {
    const result = simulate({ pegs, layout, rows, startX: layout.centerX, seed: 1 });
    expect(result.frames.length).toBeGreaterThan(1);
    expect(result.bucket).toBeGreaterThanOrEqual(0);
    expect(result.bucket).toBeLessThanOrEqual(rows);
    const lastFrame = result.frames[result.frames.length - 1];
    const lastPegRowY = layout.topY + (rows - 1) * layout.pitchY;
    expect(lastFrame.y).toBeGreaterThan(lastPegRowY);
  });

  it('records peg hits while falling (real collisions, not a straight drop)', () => {
    const result = simulate({ pegs, layout, rows, startX: layout.centerX, seed: 3 });
    expect(result.pegHits.length).toBeGreaterThan(0);
  });
});
