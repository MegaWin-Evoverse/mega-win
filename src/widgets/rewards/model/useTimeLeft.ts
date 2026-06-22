import { useState, useEffect } from 'react';
import { formatTimeLeft } from './formatTimeLeft';
import { TIME_LEFT_TICK_MS } from './constants';

export function useTimeLeft(endDate: string): string {
  const [timeLeft, setTimeLeft] = useState(() => formatTimeLeft(endDate));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(formatTimeLeft(endDate));
    }, TIME_LEFT_TICK_MS);

    return () => clearInterval(interval);
  }, [endDate]);

  return timeLeft;
}
