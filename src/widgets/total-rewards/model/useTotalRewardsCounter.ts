import { useState, useEffect } from 'react';

const INITIAL_COUNTER_VALUE = 183685.55;
const INCREMENT_INTERVAL_MS = 2500;
const MIN_INCREMENT = 0.02;
const MAX_INCREMENT = 0.15;
const DECIMAL_PLACES = 2;
const TOTAL_DIGITS = 8;

export function useTotalRewardsCounter() {
  const [value, setValue] = useState(INITIAL_COUNTER_VALUE);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prevValue) => {
        const randomIncrement = Math.random() * (MAX_INCREMENT - MIN_INCREMENT) + MIN_INCREMENT;
        return prevValue + randomIncrement;
      });
    }, INCREMENT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, []);

  const formattedValue = value.toFixed(DECIMAL_PLACES).replace('.', '');
  const paddedValue = formattedValue.padStart(TOTAL_DIGITS, '0').slice(-TOTAL_DIGITS);
  const digits = paddedValue.split('').map(Number);

  return digits;
}
