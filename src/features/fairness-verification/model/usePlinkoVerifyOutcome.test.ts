import { renderHook, waitFor } from '@testing-library/react';
import { PLINKO_MULTIPLIERS, RISK } from '@/entities/game';
import { usePlinkoVerifyOutcome } from './usePlinkoVerifyOutcome';

describe('usePlinkoVerifyOutcome', () => {
  it('returns null when seeds are empty', () => {
    const { result } = renderHook(() => usePlinkoVerifyOutcome('', '', '1', 8, RISK.LOW));
    expect(result.current).toBeNull();
  });

  it('returns a bucket/multiplier pair matching the multiplier table once seeds are set', async () => {
    const { result } = renderHook(() =>
      usePlinkoVerifyOutcome('client-seed', 'server-seed', '1', 8, RISK.LOW)
    );
    await waitFor(() => expect(result.current).not.toBeNull());
    const outcome = result.current;
    expect(outcome).not.toBeNull();
    if (!outcome) return;
    expect(PLINKO_MULTIPLIERS[RISK.LOW][8]?.[outcome.bucket]).toBe(outcome.multiplier);
  });
});
