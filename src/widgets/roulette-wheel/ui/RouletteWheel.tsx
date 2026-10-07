'use client';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { useRouletteWheelAnimation } from '../model/useRouletteWheelAnimation';

interface Props {
  className?: string;
}

export function RouletteWheel({ className }: Props) {
  const { wheelGroupRef, ballCircleRef, centerCapRef, isSpinning, hasPendingResult } =
    useRouletteWheelAnimation();

  return (
    <div
      className={cn(
        'relative flex flex-col items-center justify-center select-none w-full max-w-[400px]',
        'sm:flex sm:relative sm:inset-auto sm:z-10 sm:bg-transparent sm:backdrop-blur-none sm:justify-center sm:pt-[40px] sm:max-w-[400px]',
        isSpinning || hasPendingResult
          ? 'flex absolute inset-0 z-50 bg-page-bg/40 backdrop-blur-md justify-center pt-0 px-4 max-w-none'
          : 'hidden',
        className
      )}
    >
      <div className="relative flex h-[260px] w-[260px] md:h-[300px] md:w-[300px] items-center justify-center rounded-full roulette-wheel-outer">
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="url(#wheel-border-grad)"
            strokeWidth="1.5"
          />
          <g ref={wheelGroupRef}>
            <image
              href="/roulette-wheel/roulette-wheel-art.svg"
              x="0"
              y="0"
              width="100"
              height="100"
              className="pointer-events-none"
            />
          </g>
          <circle
            ref={ballCircleRef}
            cx="50"
            cy="14"
            r="1.8"
            fill="url(#ball-grad)"
            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"
          />
          <defs>
            <linearGradient id="wheel-border-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="3.66%" stopColor="rgba(43, 48, 59, 0.4)" />
              <stop offset="56.46%" stopColor="rgba(74, 222, 128, 0.4)" />
              <stop offset="100%" stopColor="rgba(43, 48, 59, 0.4)" />
            </linearGradient>
            <filter id="center-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="2.5"
                floodColor="#1A0B00"
                floodOpacity="1"
              />
            </filter>
            <radialGradient id="ball-grad" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#c0c0c0" />
              <stop offset="100%" stopColor="#606060" />
            </radialGradient>
          </defs>
        </svg>
        <Image
          ref={centerCapRef}
          src="/roulette-wheel/center.svg"
          alt=""
          width={100}
          height={100}
          unoptimized
          className="absolute z-20 pointer-events-none rounded-full origin-center left-[calc(50%-50px)] top-[calc(50%-50px)] roulette-cap-shadow"
        />
      </div>
    </div>
  );
}
