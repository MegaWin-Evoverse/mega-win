'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { getBucketIndex, type LandedBucket } from '@/entities/game';
import type { PlinkoDrop } from '@/features/plinko-bet';
import { useTurboModeStore } from '@/features/game-settings';
import { getTurboValue } from '@/shared/lib/getTurboValue';
import { BOARD, CSS_VAR } from './constants';
import { getBoardLayout, getPegPositions } from './geometry';
import type { BallFrame, PegHit } from './physics';
import { drawBall, drawPegs, type BallColors, type PegColors } from './render';
import { solveTrajectory } from './solver';

interface ActiveBall {
  id: string;
  payout: number;
  bucket: number;
  frames: BallFrame[];
  pegHits: PegHit[];
  frameCursor: number;
  nextHitIndex: number;
}

interface UsePlinkoBoardArgs {
  rows: number;
  drops: PlinkoDrop[];
  onDropLanded: (id: string, payout: number) => void;
}

interface UsePlinkoBoardReturn {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  landedBucket: LandedBucket | null;
}

function pegGlowKey(row: number, col: number): string {
  return `${row}-${col}`;
}

export function usePlinkoBoard({
  rows,
  drops,
  onDropLanded,
}: UsePlinkoBoardArgs): UsePlinkoBoardReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ballsRef = useRef<ActiveBall[]>([]);
  const seenIdsRef = useRef<Set<string>>(new Set());
  const glowRef = useRef<Map<string, number>>(new Map());
  const landedRef = useRef(onDropLanded);
  const [landedBucket, setLandedBucket] = useState<LandedBucket | null>(null);
  const turboMode = useTurboModeStore((state) => state.turboMode);
  const turboModeRef = useRef(turboMode);

  useEffect(() => {
    landedRef.current = onDropLanded;
  }, [onDropLanded]);

  useEffect(() => {
    turboModeRef.current = turboMode;
  }, [turboMode]);

  useEffect(() => {
    for (const drop of drops) {
      if (seenIdsRef.current.has(drop.id)) continue;
      seenIdsRef.current.add(drop.id);
      const targetBucket = getBucketIndex(drop.results);
      const trajectory = solveTrajectory(rows, targetBucket);
      ballsRef.current.push({
        id: drop.id,
        payout: drop.payout,
        bucket: trajectory.bucket,
        frames: trajectory.frames,
        pegHits: trajectory.pegHits,
        frameCursor: 0,
        nextHitIndex: 0,
      });
    }
  }, [drops, rows]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const ctx = context;

    const layout = getBoardLayout(rows, BOARD.WIDTH);
    canvas.width = layout.width;
    canvas.height = layout.height;
    const pegs = getPegPositions(rows, layout);
    const styles = getComputedStyle(document.documentElement);
    const pegColors: PegColors = {
      base: styles.getPropertyValue(CSS_VAR.PEG).trim(),
      glow: styles.getPropertyValue(CSS_VAR.PEG_GLOW).trim(),
    };
    const ballColors: BallColors = {
      from: styles.getPropertyValue(CSS_VAR.BALL_FROM).trim(),
      to: styles.getPropertyValue(CSS_VAR.BALL_TO).trim(),
      highlight: styles.getPropertyValue(CSS_VAR.BALL_HIGHLIGHT).trim(),
      trailFrom: styles.getPropertyValue(CSS_VAR.BALL_TRAIL_FROM).trim(),
      trailTo: styles.getPropertyValue(CSS_VAR.BALL_TRAIL_TO).trim(),
    };

    let raf = 0;
    let prev = performance.now();

    function step(now: number) {
      const dt = now - prev;
      prev = now;
      ctx.clearRect(0, 0, layout.width, layout.height);
      drawPegs(ctx, layout, pegs, glowRef.current, pegColors, now);

      const survivors: ActiveBall[] = [];
      for (const ball of ballsRef.current) {
        ball.frameCursor +=
          dt *
          getTurboValue(
            turboModeRef.current,
            BOARD.REPLAY_FRAMES_PER_MS,
            BOARD.REPLAY_FRAMES_PER_MS_TURBO
          );
        while (
          ball.nextHitIndex < ball.pegHits.length &&
          ball.pegHits[ball.nextHitIndex].frame <= ball.frameCursor
        ) {
          const hit = ball.pegHits[ball.nextHitIndex];
          glowRef.current.set(pegGlowKey(hit.row, hit.col), now);
          ball.nextHitIndex += 1;
        }

        const lastFrameIndex = ball.frames.length - 1;
        if (ball.frameCursor >= lastFrameIndex) {
          landedRef.current(ball.id, ball.payout);
          setLandedBucket({ bucket: ball.bucket, hitAt: now });
          continue;
        }

        const lowIndex = Math.floor(ball.frameCursor);
        const t = ball.frameCursor - lowIndex;
        const from = ball.frames[lowIndex];
        const to = ball.frames[lowIndex + 1];
        const x = from.x + (to.x - from.x) * t;
        const y = from.y + (to.y - from.y) * t;
        const scaleX = from.scaleX + (to.scaleX - from.scaleX) * t;
        const scaleY = from.scaleY + (to.scaleY - from.scaleY) * t;
        drawBall(ctx, layout, x, y, scaleX, scaleY, ballColors);
        survivors.push(ball);
      }
      ballsRef.current = survivors;
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [rows]);

  return { canvasRef, landedBucket };
}
