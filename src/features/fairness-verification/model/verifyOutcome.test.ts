import { computePlinkoOutcome, computeRouletteOutcome } from './verifyOutcome';

describe('computePlinkoOutcome', () => {
  it('returns one 0/1 step per row, deterministically for fixed inputs', async () => {
    const first = await computePlinkoOutcome('client-seed', 'server-seed', '1', 8);
    const second = await computePlinkoOutcome('client-seed', 'server-seed', '1', 8);
    expect(first).toHaveLength(8);
    expect(first.every((step) => step === 0 || step === 1)).toBe(true);
    expect(first).toEqual(second);
  });

  it('changes when the nonce changes', async () => {
    const atNonceOne = await computePlinkoOutcome('client-seed', 'server-seed', '1', 8);
    const atNonceTwo = await computePlinkoOutcome('client-seed', 'server-seed', '2', 8);
    expect(atNonceOne).not.toEqual(atNonceTwo);
  });

  it('returns exactly `rows` steps for the maximum row count', async () => {
    const steps = await computePlinkoOutcome('client-seed', 'server-seed', '1', 16);
    expect(steps).toHaveLength(16);
  });
});

describe('computeRouletteOutcome', () => {
  it('still returns a pocket number between 0 and 36', async () => {
    const pocket = await computeRouletteOutcome('client-seed', 'server-seed', '1');
    expect(pocket).toBeGreaterThanOrEqual(0);
    expect(pocket).toBeLessThanOrEqual(36);
  });
});
