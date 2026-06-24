import { BOARD } from './constants';
import type { BoardLayout, PegPoint } from './geometry';

export interface PegColors {
  base: string;
  glow: string;
}

export interface BallColors {
  from: string;
  to: string;
  highlight: string;
  trailFrom: string;
  trailTo: string;
}

function pegGlowKey(row: number, col: number): string {
  return `${row}-${col}`;
}

export function drawPegBounce(
  ctx: CanvasRenderingContext2D,
  layout: BoardLayout,
  x: number,
  y: number,
  progress: number,
  pegGlowColor: string
) {
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

export function drawPegs(
  ctx: CanvasRenderingContext2D,
  layout: BoardLayout,
  pegs: PegPoint[],
  glowMap: Map<string, number>,
  pegColors: PegColors,
  now: number
) {
  ctx.lineWidth = BOARD.PEG_BORDER_WIDTH;
  for (const peg of pegs) {
    const key = pegGlowKey(peg.row, peg.col);
    const hitAt = glowMap.get(key);
    const elapsed = hitAt === undefined ? undefined : now - hitAt;
    const isGlowing = elapsed !== undefined && elapsed < BOARD.PEG_GLOW_DURATION;
    if (elapsed !== undefined && elapsed >= BOARD.PEG_GLOW_DURATION) glowMap.delete(key);
    ctx.shadowBlur = isGlowing ? BOARD.PEG_GLOW_BLUR : 0;
    ctx.shadowColor = pegColors.glow;
    ctx.strokeStyle = isGlowing ? pegColors.glow : pegColors.base;
    ctx.beginPath();
    ctx.arc(peg.x, peg.y, layout.pegRadius, 0, Math.PI * 2);
    ctx.stroke();
    if (isGlowing)
      drawPegBounce(ctx, layout, peg.x, peg.y, elapsed / BOARD.PEG_GLOW_DURATION, pegColors.glow);
  }
  ctx.shadowBlur = 0;
}

export function drawBallTrail(
  ctx: CanvasRenderingContext2D,
  layout: BoardLayout,
  x: number,
  y: number,
  ballColors: BallColors
) {
  const trailRadius = layout.ballRadius * BOARD.BALL_TRAIL_RADIUS_RATIO;
  const gradient = ctx.createLinearGradient(x, y - trailRadius, x, y + trailRadius);
  gradient.addColorStop(0, ballColors.trailFrom);
  gradient.addColorStop(1, ballColors.trailTo);
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

export function drawBall(
  ctx: CanvasRenderingContext2D,
  layout: BoardLayout,
  x: number,
  y: number,
  scaleX: number,
  scaleY: number,
  ballColors: BallColors
) {
  drawBallTrail(ctx, layout, x, y, ballColors);
  const r = layout.ballRadius;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  const gradient = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);
  gradient.addColorStop(0, ballColors.highlight);
  gradient.addColorStop(0.45, ballColors.from);
  gradient.addColorStop(1, ballColors.to);
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(0, 0, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
