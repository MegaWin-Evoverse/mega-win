'use client';
import { useState, useEffect } from 'react';
import { computeCountdown } from './computeCountdown';
import type { CountdownValues } from './types';

export function useCountdown(targetDate: Date) {
  const [values, setValues] = useState<CountdownValues>(() => computeCountdown(targetDate));

  useEffect(() => {
    const id = setInterval(() => setValues(computeCountdown(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return values;
}
