'use client';
import { useEffect, useRef, type RefObject } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { useRouletteStore } from '@/features/roulette-controls';
import { useTurboModeStore } from '@/features/game-settings';
import { USER_QUERY_KEYS } from '@/shared/api/query-keys';
import {
  WHEEL_NUMBERS,
  POCKET_ANGLE_DEG,
  FULL_TURN_DEG,
  WHEEL_SPEED,
  IDLE_CENTER_SPEED,
  IDLE_BALL_SPEED,
  SPIN_BALL_SPEED,
  BALL_POCKET_RADIUS,
  BALL_TRACK_RADIUS,
  BALL_RIM_EASE,
  BALL_DROP_DEPTH,
  BALL_LANDING_DURATION_MS,
  BALL_LANDING_DURATION_TURBO_MS,
  BALL_ROLL_FRACTION,
  BALL_MIN_LANDING_GAIN_DEG,
  BALL_DROP_BOUNCE_COUNT,
  FRAME_TIME_CAP_MS,
  FRAME_TIME_60FPS_MS,
} from './constants';

export interface RouletteWheelAnimation {
  wheelGroupRef: RefObject<SVGGElement | null>;
  ballCircleRef: RefObject<SVGCircleElement | null>;
  centerCapRef: RefObject<HTMLImageElement | null>;
  isSpinning: boolean;
  hasPendingResult: boolean;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function useRouletteWheelAnimation(): RouletteWheelAnimation {
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
            Math.ceil((relStartRef.current + BALL_MIN_LANDING_GAIN_DEG) / FULL_TURN_DEG) *
            FULL_TURN_DEG;
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
  }, [queryClient, resolveBetResult]);

  return {
    wheelGroupRef,
    ballCircleRef,
    centerCapRef,
    isSpinning,
    hasPendingResult,
  };
}
