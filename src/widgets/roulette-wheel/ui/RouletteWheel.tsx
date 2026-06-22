'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { useRouletteStore } from '@/features/roulette-controls';
import { useTurboModeStore } from '@/features/game-settings';
import { useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/shared/api/query-keys';

const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const POCKET_COUNT = 37;
const POCKET_ANGLE_DEG = 360 / POCKET_COUNT;
const WHEEL_SPEED = 0.32;
const IDLE_CENTER_SPEED = 0.08;

const IDLE_BALL_SPEED = 0.25;
const SPIN_BALL_SPEED = 6;

const BALL_POCKET_RADIUS = 36;
const BALL_TRACK_RADIUS = 44.5;
const BALL_RIM_EASE = 0.15;
const BALL_DROP_DEPTH = BALL_TRACK_RADIUS - BALL_POCKET_RADIUS;

const BALL_LANDING_DURATION_MS = 3200;
const BALL_LANDING_DURATION_TURBO_MS = 900;
const BALL_ROLL_FRACTION = 0.55;
const BALL_MIN_LANDING_GAIN_DEG = 360;
const BALL_DROP_BOUNCE_COUNT = 3;

const FRAME_TIME_CAP_MS = 100;
const FRAME_TIME_60FPS_MS = 16.67;

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

interface Props {
  className?: string;
}

export function RouletteWheel({ className }: Props) {
  const lastResult = useRouletteStore((state) => state.lastResult);
  const isSpinning = useRouletteStore((state) => state.isSpinning);
  const pendingBetResult = useRouletteStore((state) => state.pendingBetResult);
  const resolveBetResult = useRouletteStore((state) => state.resolveBetResult);
  const turboMode = useTurboModeStore((state) => state.turboMode);
  const queryClient = useQueryClient();

  const hasPendingResult = pendingBetResult !== null;

  const turboModeRef = useRef(turboMode);
  useEffect(() => {
    turboModeRef.current = turboMode;
  }, [turboMode]);

  const wheelGroupRef = useRef<SVGGElement>(null);
  const ballCircleRef = useRef<SVGCircleElement>(null);
  const centerCapRef = useRef<HTMLImageElement>(null);

  const wheelAngleRef = useRef(0);
  const ballAngleRef = useRef(0);
  const ballRadiusRef = useRef(BALL_POCKET_RADIUS);
  const centerAngleRef = useRef(0);
  const phaseRef = useRef<'idle' | 'spinning' | 'landing'>('idle');

  const winningPocketAngleRef = useRef(0);
  const landingStartRef = useRef<number | null>(null);
  const relStartRef = useRef(0);
  const relTargetRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (phaseRef.current === 'idle') {
      const activeResult = lastResult ?? 0;
      const idx = WHEEL_NUMBERS.indexOf(activeResult);
      const pocketAngle = idx !== -1 ? idx * POCKET_ANGLE_DEG : 0;
      wheelAngleRef.current = -pocketAngle;
      ballAngleRef.current = 0;
      ballRadiusRef.current = BALL_POCKET_RADIUS;
    }
  }, [lastResult]);

  useEffect(() => {
    if (isSpinning) {
      phaseRef.current = 'spinning';
    } else if (lastResult !== null) {
      const idx = WHEEL_NUMBERS.indexOf(lastResult);
      if (idx !== -1) {
        winningPocketAngleRef.current = idx * POCKET_ANGLE_DEG;
        landingStartRef.current = null;
        phaseRef.current = 'landing';
      }
    }
  }, [isSpinning, lastResult]);

  useEffect(() => {
    let animId: number;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        animId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(time - lastTimeRef.current, FRAME_TIME_CAP_MS);
      lastTimeRef.current = time;
      const speedFactor = dt / FRAME_TIME_60FPS_MS;

      wheelAngleRef.current += WHEEL_SPEED * speedFactor;
      centerAngleRef.current -= IDLE_CENTER_SPEED * speedFactor;

      if (phaseRef.current === 'idle') {
        ballAngleRef.current += IDLE_BALL_SPEED * speedFactor;
        ballRadiusRef.current +=
          (BALL_TRACK_RADIUS - ballRadiusRef.current) * BALL_RIM_EASE * speedFactor;
      } else if (phaseRef.current === 'spinning') {
        ballAngleRef.current += SPIN_BALL_SPEED * speedFactor;
        ballRadiusRef.current +=
          (BALL_TRACK_RADIUS - ballRadiusRef.current) * BALL_RIM_EASE * speedFactor;
      } else if (phaseRef.current === 'landing') {
        if (landingStartRef.current === null) {
          landingStartRef.current = time;
          const pocketScreen = wheelAngleRef.current + winningPocketAngleRef.current;
          relStartRef.current = ballAngleRef.current - pocketScreen;
          relTargetRef.current =
            Math.ceil((relStartRef.current + BALL_MIN_LANDING_GAIN_DEG) / 360) * 360;
        }
        const landingDuration = getTurboValue(
          turboModeRef.current,
          BALL_LANDING_DURATION_MS,
          BALL_LANDING_DURATION_TURBO_MS
        );
        const progress = Math.min(1, (time - landingStartRef.current) / landingDuration);
        const eased = easeOutCubic(progress);
        const rel = relStartRef.current + (relTargetRef.current - relStartRef.current) * eased;
        const pocketScreenAngle = wheelAngleRef.current + winningPocketAngleRef.current;
        ballAngleRef.current = pocketScreenAngle + rel;

        if (progress < BALL_ROLL_FRACTION) {
          ballRadiusRef.current = BALL_TRACK_RADIUS;
        } else {
          const dropProgress = (progress - BALL_ROLL_FRACTION) / (1 - BALL_ROLL_FRACTION);
          const dropAmplitude = BALL_DROP_DEPTH * (1 - dropProgress);
          const dropPhase = dropProgress * Math.PI * BALL_DROP_BOUNCE_COUNT;
          ballRadiusRef.current =
            BALL_POCKET_RADIUS + dropAmplitude * Math.abs(Math.cos(dropPhase));
        }

        if (progress >= 1) {
          ballAngleRef.current = pocketScreenAngle;
          ballRadiusRef.current = BALL_POCKET_RADIUS;
          phaseRef.current = 'idle';
          landingStartRef.current = null;
          resolveBetResult();
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.me });
        }
      }

      if (wheelGroupRef.current) {
        wheelGroupRef.current.style.transform = `rotate(${wheelAngleRef.current}deg)`;
        wheelGroupRef.current.style.transformOrigin = '50px 50px';
      }
      if (centerCapRef.current) {
        centerCapRef.current.style.transform = `rotate(${centerAngleRef.current}deg)`;
      }
      if (ballCircleRef.current) {
        const rad = (ballAngleRef.current * Math.PI) / 180;
        const x = 50 + ballRadiusRef.current * Math.sin(rad);
        const y = 50 - ballRadiusRef.current * Math.cos(rad);
        ballCircleRef.current.setAttribute('cx', x.toFixed(3));
        ballCircleRef.current.setAttribute('cy', y.toFixed(3));
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

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
