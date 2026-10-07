import { renderHook, act } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-06-21T00:00:00.000Z'));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('formats the remaining time as h:m:s', () => {
    const target = new Date('2026-06-21T01:46:34.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    expect(result.current.label).toBe('1h:46m:34s');
    expect(result.current.isComplete).toBe(false);
  });

  it('ticks down every second', () => {
    const target = new Date('2026-06-21T00:00:05.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.label).toBe('0h:00m:04s');
  });

  it('marks complete once the target time has passed', () => {
    const target = new Date('2026-06-21T00:00:01.000Z').toISOString();
    const { result } = renderHook(() => useCountdown(target));

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isComplete).toBe(true);
    expect(result.current.label).toBe('0h:00m:00s');
  });
});
