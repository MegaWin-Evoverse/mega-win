'use client';
import CountUp from 'react-countup';

const ANIMATION_DURATION = 0.8;
const THOUSANDS_SEPARATOR = ',';

interface Props {
  value: number;
  decimals?: number;
  className?: string;
}

export function AnimatedNumber({ value, decimals = 2, className }: Props) {
  return (
    <CountUp
      end={value}
      decimals={decimals}
      duration={ANIMATION_DURATION}
      separator={THOUSANDS_SEPARATOR}
      className={className}
      preserveValue
    />
  );
}
