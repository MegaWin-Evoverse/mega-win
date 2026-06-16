'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/shared/lib/cn';
import { useRouletteStore } from '@/features/roulette-controls';
import { useQueryClient } from '@tanstack/react-query';
import { USER_QUERY_KEYS } from '@/shared/api/query-keys';

const WHEEL_NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14,
  31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
];

const POCKET_COUNT = 37;
const POCKET_ANGLE_DEG = 360 / POCKET_COUNT;
// The drum always rotates at this constant speed — it never accelerates or decelerates.
const WHEEL_SPEED = 0.32;
const IDLE_CENTER_SPEED = 0.08;

// Ball orbits the rim in the SAME direction as the drum; much faster while a spin is in flight
// so it visibly travels several times around before dropping.
const IDLE_BALL_SPEED = 0.25;
const SPIN_BALL_SPEED = 6;

const BALL_POCKET_RADIUS = 36;
// Ball orbits inside the dark track between the numbers ring and the wheel edge
const BALL_TRACK_RADIUS = 44.5;
const BALL_RIM_EASE = 0.15;
const BALL_DROP_DEPTH = BALL_TRACK_RADIUS - BALL_POCKET_RADIUS;

// Landing sequence: ball rolls the rim, then dives into the winning pocket, bounces off the
// pocket walls a few times and settles, riding the drum from then on.
const BALL_LANDING_DURATION_MS = 3200;
const BALL_ROLL_FRACTION = 0.55;
// Ball always approaches the pocket FORWARD by at least a full lap (extra lap if it's close),
// so it never snaps backwards.
const BALL_MIN_LANDING_GAIN_DEG = 360;
const BALL_DROP_BOUNCE_COUNT = 3;

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
  const queryClient = useQueryClient();

  const hasPendingResult = pendingBetResult !== null;

  // Refs for DOM nodes to perform zero-render direct DOM updates at 60fps
  const wheelGroupRef = useRef<SVGGElement>(null);
  const ballCircleRef = useRef<SVGCircleElement>(null);
  const centerCapRef = useRef<HTMLImageElement>(null);

  // Refs for tracking mutable animation variables
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

  // Initialize position on mount or when lastResult resets/updates outside active spin
  useEffect(() => {
    if (phaseRef.current === 'idle') {
      const activeResult = lastResult ?? 0;
      const idx = WHEEL_NUMBERS.indexOf(activeResult);
      const pocketAngle = idx !== -1 ? idx * POCKET_ANGLE_DEG : 0;

      // Align winning pocket to the top (0 degrees)
      wheelAngleRef.current = -pocketAngle;
      ballAngleRef.current = 0;
      ballRadiusRef.current = BALL_POCKET_RADIUS;
    }
  }, [lastResult]);

  // Handle transitions of store spinning state
  useEffect(() => {
    if (isSpinning) {
      phaseRef.current = 'spinning';
    } else if (lastResult !== null) {
      const idx = WHEEL_NUMBERS.indexOf(lastResult);
      if (idx !== -1) {
        // Screen angle of the winning pocket = wheelAngle + pocketAngle.
        winningPocketAngleRef.current = idx * POCKET_ANGLE_DEG;
        landingStartRef.current = null;
        phaseRef.current = 'landing';
      }
    }
  }, [isSpinning, lastResult]);

  // requestAnimationFrame Animation Loop
  useEffect(() => {
    let animId: number;

    const tick = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
        animId = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(time - lastTimeRef.current, 100); // safety cap
      lastTimeRef.current = time;
      const speedFactor = dt / 16.67; // normalize to 60fps speed

      // Center cap always spins opposite to the drum, independent of game phase
      // Drum and centre cap rotate at a constant speed in every phase — never accelerating.
      wheelAngleRef.current += WHEEL_SPEED * speedFactor;
      centerAngleRef.current -= IDLE_CENTER_SPEED * speedFactor;

      if (phaseRef.current === 'idle') {
        // Ball orbits the rim in the same direction as the drum.
        ballAngleRef.current += IDLE_BALL_SPEED * speedFactor;
        ballRadiusRef.current +=
          (BALL_TRACK_RADIUS - ballRadiusRef.current) * BALL_RIM_EASE * speedFactor;
      } else if (phaseRef.current === 'spinning') {
        // Waiting for the result: the ball races around the rim, same direction, faster.
        ballAngleRef.current += SPIN_BALL_SPEED * speedFactor;
        ballRadiusRef.current +=
          (BALL_TRACK_RADIUS - ballRadiusRef.current) * BALL_RIM_EASE * speedFactor;
      } else if (phaseRef.current === 'landing') {
        if (landingStartRef.current === null) {
          landingStartRef.current = time;
          // Capture the ball's angle relative to the (moving) winning pocket, then pick a forward
          // target a whole number of laps ahead so the ball only ever rolls forward into it.
          const pocketScreen = wheelAngleRef.current + winningPocketAngleRef.current;
          relStartRef.current = ballAngleRef.current - pocketScreen;
          relTargetRef.current =
            Math.ceil((relStartRef.current + BALL_MIN_LANDING_GAIN_DEG) / 360) * 360;
        }
        const progress = Math.min(1, (time - landingStartRef.current) / BALL_LANDING_DURATION_MS);
        const eased = easeOutCubic(progress);
        const rel = relStartRef.current + (relTargetRef.current - relStartRef.current) * eased;
        const pocketScreenAngle = wheelAngleRef.current + winningPocketAngleRef.current;

        // Angle is driven forward by the eased relative travel; it decelerates to the drum's speed
        // (rel velocity -> 0) so the ball ends riding the pocket with no backwards snap.
        ballAngleRef.current = pocketScreenAngle + rel;

        if (progress < BALL_ROLL_FRACTION) {
          // Still riding the rim.
          ballRadiusRef.current = BALL_TRACK_RADIUS;
        } else {
          // Drops onto the drum a few pockets early, bounces off the walls, settles into the pocket.
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

          // Resolve the bet result (shows overlay) and refetch user balance at the same moment.
          resolveBetResult();
          queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.me });
        }
      }

      // 60fps Direct DOM manipulation updates (avoids React re-renders)
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
        // Common layout and constraints
        'relative flex flex-col items-center justify-center select-none w-full max-w-[400px]',
        // Desktop/Tablet: always relative, inline block with standard padding
        'sm:flex sm:relative sm:inset-auto sm:z-10 sm:bg-transparent sm:backdrop-blur-none sm:justify-center sm:pt-[40px] sm:max-w-[400px]',
        // Mobile: centered absolute overlay with blurred backdrop when active
        isSpinning || hasPendingResult
          ? 'flex absolute inset-0 z-50 bg-page-bg/40 backdrop-blur-md justify-center pt-0 px-4 max-w-none'
          : 'hidden',
        className
      )}
    >
      {/* Main Wheel Rendering Container */}
      <div className="relative flex h-[260px] w-[260px] md:h-[300px] md:w-[300px] items-center justify-center rounded-full roulette-wheel-outer">
        {/* SVG Wrapper */}
        <svg viewBox="0 0 100 100" className="w-full h-full relative z-10 overflow-visible">
          {/* Single Outer Border Circle with Gradient */}
          <circle
            cx="50"
            cy="50"
            r="49"
            fill="none"
            stroke="url(#wheel-border-grad)"
            strokeWidth="1.5"
          />

          {/* Slices & Numbers Group (This rotates) */}
          <g ref={wheelGroupRef}>
            <image
              href="/roulette/icons/image-roulette.0wcv01o5us4m~.svg"
              x="0"
              y="0"
              width="100"
              height="100"
              className="pointer-events-none"
            />
          </g>

          {/* Metal Ball Rendering (Positions itself dynamically) */}
          <circle
            ref={ballCircleRef}
            cx="50"
            cy="14"
            r="1.8"
            fill="url(#ball-grad)"
            filter="drop-shadow(0px 1px 1px rgba(0,0,0,0.5))"
          />

          {/* Gradients and Filters Definitions */}
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

        {/* Center Dome Cap Image styled exactly as 100x100px, rotating in sync */}
        <Image
          ref={centerCapRef}
          src="/roulette/icons/center.svg"
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
