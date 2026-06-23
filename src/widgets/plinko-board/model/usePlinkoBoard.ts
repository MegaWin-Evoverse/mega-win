'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { getBucketIndex } from '@/entities/game';
import type { PlinkoDrop } from '@/features/plinko-bet';
import { BOARD, CSS_VAR } from './constants';
import { getBoardLayout, getPegPositions } from './geometry';
import type { BallFrame, PegHit } from './physics';
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

export interface LandedBucket {
  bucket: number;
  hitAt: number;
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

  useEffect(() => {
    landedRef.current = onDropLanded;
  }, [onDropLanded]);

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
    const pegColor = styles.getPropertyValue(CSS_VAR.PEG).trim();
    const pegGlowColor = styles.getPropertyValue(CSS_VAR.PEG_GLOW).trim();
    const ballFrom = styles.getPropertyValue(CSS_VAR.BALL_FROM).trim();
    const ballTo = styles.getPropertyValue(CSS_VAR.BALL_TO).trim();
    const ballHighlight = styles.getPropertyValue(CSS_VAR.BALL_HIGHLIGHT).trim();
    const ballTrailFrom = styles.getPropertyValue(CSS_VAR.BALL_TRAIL_FROM).trim();
    const ballTrailTo = styles.getPropertyValue(CSS_VAR.BALL_TRAIL_TO).trim();

    let raf = 0;
    let prev = performance.now();

    function drawPegBounce(x: number, y: number, progress: number) {
      const rippleRadius =
        layout.pegRadius + progress * layout.pegRadius * BOARD.PEG_RIPPLE_EXPAND_RATIO;
      ctx.save();
      ctx.globalAlpha = 1 - progress;
      ctx.strokeStyle = pegGlowColor;
      ctx.lineWidth = BOARD.PEG_BORDER_WIDTH;
      ctx.beginPath();
      ctx.arc(x, y, rippleRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    function drawPegs(now: number) {
      ctx.lineWidth = BOARD.PEG_BORDER_WIDTH;
      for (const peg of pegs) {
        const key = pegGlowKey(peg.row, peg.col);
        const hitAt = glowRef.current.get(key);
        const elapsed = hitAt === undefined ? undefined : now - hitAt;
        const isGlowing = elapsed !== undefined && elapsed < BOARD.PEG_GLOW_DURATION;
        if (elapsed !== undefined && elapsed >= BOARD.PEG_GLOW_DURATION)
          glowRef.current.delete(key);
        ctx.shadowBlur = isGlowing ? BOARD.PEG_GLOW_BLUR : 0;
        ctx.shadowColor = pegGlowColor;
        ctx.strokeStyle = isGlowing ? pegGlowColor : pegColor;
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, layout.pegRadius, 0, Math.PI * 2);
        ctx.stroke();
        if (isGlowing) drawPegBounce(peg.x, peg.y, elapsed / BOARD.PEG_GLOW_DURATION);
      }
      ctx.shadowBlur = 0;
    }

    function drawBallTrail(x: number, y: number) {
      const trailRadius = layout.ballRadius * BOARD.BALL_TRAIL_RADIUS_RATIO;
      const gradient = ctx.createLinearGradient(x, y - trailRadius, x, y + trailRadius);
      gradient.addColorStop(0, ballTrailFrom);
      gradient.addColorStop(1, ballTrailTo);
      ctx.save();
      ctx.globalAlpha = BOARD.BALL_TRAIL_OPACITY;
      ctx.globalCompositeOperation = 'lighter';
      ctx.filter = `blur(${BOARD.BALL_TRAIL_BLUR}px)`;
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, trailRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function drawBall(x: number, y: number, scaleX: number, scaleY: number) {
      drawBallTrail(x, y);
      const r = layout.ballRadius;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleX, scaleY);
      const gradient = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
      gradient.addColorStop(0, ballHighlight);
      gradient.addColorStop(0.45, ballFrom);
      gradient.addColorStop(1, ballTo);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function step(now: number) {
      const dt = now - prev;
      prev = now;
      ctx.clearRect(0, 0, layout.width, layout.height);
      drawPegs(now);

      const survivors: ActiveBall[] = [];
      for (const ball of ballsRef.current) {
        ball.frameCursor += dt * BOARD.REPLAY_FRAMES_PER_MS;
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
        drawBall(x, y, scaleX, scaleY);
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
