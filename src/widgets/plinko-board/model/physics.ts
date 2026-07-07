import { BOARD, PHYSICS } from './constants';
import { type BoardLayout, type PegPoint, xToBucket } from './geometry';

export interface BallFrame {
  x: number;
  y: number;
  scaleX: number;
  scaleY: number;
}

export interface PegHit {
  row: number;
  col: number;
  frame: number;
}

export interface SimResult {
  frames: BallFrame[];
  pegHits: PegHit[];
  bucket: number;
}

interface SimulateArgs {
  pegs: PegPoint[];
  layout: BoardLayout;
  rows: number;
  startX: number;
  seed: number;
}

function makeRandom(seed: number): () => number {
  let state = seed >>> 0;
  return function next(): number {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function simulate({ pegs, layout, rows, startX, seed }: SimulateArgs): SimResult {
  const random = makeRandom(seed);
  const collideDistance = layout.pegRadius + layout.ballRadius;
  const gravity = PHYSICS.GRAVITY_RATIO * layout.pitchX;
  const safetySpeed = PHYSICS.SAFETY_SPEED_RATIO * collideDistance;
  const bounceKick = PHYSICS.BOUNCE_JITTER_RATIO * layout.pitchX;
  const settleY = layout.height - layout.ballRadius;
  const maxUpwardSpeed = Math.sqrt(2 * gravity * PHYSICS.MAX_BOUNCE_HEIGHT_RATIO * layout.pitchY);
  const minBounceSpeed = PHYSICS.MIN_BOUNCE_SPEED_RATIO * layout.pitchX;

  function halfSpanAt(yPos: number): number {
    const level = Math.min(rows - 1, Math.max(0, (yPos - layout.topY) / layout.pitchY));
    const outerPegOffset = ((level + BOARD.TOP_PEGS - 1) / 2) * layout.pitchX;
    return outerPegOffset + layout.ballRadius;
  }

  const topSpan = halfSpanAt(layout.topY);
  let x = clamp(startX, layout.centerX - topSpan, layout.centerX + topSpan);
  let y = layout.topY - PHYSICS.START_OFFSET_RATIO * layout.pitchY;
  let deepestY = y;
  let vx = 0;
  let vy = 0;
  let scaleX = 1;
  let scaleY = 1;
  let currentTier = 0;
  let tierBounceCount = 0;

  const frames: BallFrame[] = [];
  const pegHits: PegHit[] = [];

  for (let stepIndex = 0; stepIndex < PHYSICS.MAX_STEPS && y < settleY; stepIndex++) {
    vy += gravity;
    const speed = Math.hypot(vx, vy);
    if (speed > safetySpeed) {
      vx = (vx / speed) * safetySpeed;
      vy = (vy / speed) * safetySpeed;
    }

    const substeps = PHYSICS.COLLISION_SUBSTEPS;
    for (let slice = 0; slice < substeps; slice++) {
      x += vx / substeps;
      y += vy / substeps;

      deepestY = Math.max(deepestY, y);
      const ceilingY = deepestY - PHYSICS.MAX_BOUNCE_HEIGHT_RATIO * layout.pitchY;
      if (y < ceilingY) {
        y = ceilingY;
        if (vy < 0) vy = 0;
      }

      const span = halfSpanAt(y);
      const leftWall = layout.centerX - span;
      const rightWall = layout.centerX + span;
      if (x < leftWall) {
        x = leftWall;
        vx = Math.abs(vx) * PHYSICS.WALL_RESTITUTION;
      } else if (x > rightWall) {
        x = rightWall;
        vx = -Math.abs(vx) * PHYSICS.WALL_RESTITUTION;
      }

      let nearest: PegPoint | null = null;
      let nearestDistance = collideDistance;
      for (const peg of pegs) {
        const distance = Math.hypot(x - peg.x, y - peg.y);
        if (distance < nearestDistance) {
          nearest = peg;
          nearestDistance = distance;
        }
      }

      if (nearest && nearestDistance > 0) {
        const nx = (x - nearest.x) / nearestDistance;
        const ny = (y - nearest.y) / nearestDistance;
        const overlap = collideDistance - nearestDistance;
        x += nx * overlap;
        y += ny * overlap;
        const vn = vx * nx + vy * ny;
        const tangentX = vx - vn * nx;
        const tangentY = vy - vn * ny;

        if (vn < 0) {
          const tier = Math.floor(Math.max(0, (y - layout.topY) / layout.pitchY));
          if (tier !== currentTier) {
            currentTier = tier;
            tierBounceCount = 0;
          }
          tierBounceCount += 1;

          const outgoingNormalSpeed = Math.max(minBounceSpeed, -vn * PHYSICS.RESTITUTION);
          vx = tangentX * PHYSICS.TANGENT_RETENTION + nx * outgoingNormalSpeed;
          vy = tangentY * PHYSICS.TANGENT_RETENTION + ny * outgoingNormalSpeed;
          const kick = (random() * 2 - 1) * bounceKick;
          vx += -ny * kick;
          vy += nx * kick;
          if (vy < -maxUpwardSpeed) vy = -maxUpwardSpeed;
          if (tierBounceCount > PHYSICS.MAX_BOUNCES_PER_TIER) {
            if (vy < 0) vy = 0;
            const escapeSpeed = PHYSICS.STUCK_ESCAPE_SPEED_RATIO * layout.pitchX;
            if (Math.abs(vx) < escapeSpeed) {
              const escapeDirection = nx !== 0 ? Math.sign(nx) : random() < 0.5 ? -1 : 1;
              vx = escapeDirection * escapeSpeed;
            }
          }
          scaleX = 1 + PHYSICS.SQUASH_FACTOR * (Math.abs(ny) - Math.abs(nx));
          scaleY = 1 + PHYSICS.SQUASH_FACTOR * (Math.abs(nx) - Math.abs(ny));
          pegHits.push({ row: nearest.row, col: nearest.col, frame: frames.length });
        } else {
          vx = tangentX * PHYSICS.TANGENT_RETENTION + nx * minBounceSpeed;
          vy = tangentY * PHYSICS.TANGENT_RETENTION + ny * minBounceSpeed;
        }
      }
    }

    const wallSpan = halfSpanAt(y);
    x = clamp(x, layout.centerX - wallSpan, layout.centerX + wallSpan);

    scaleX += (1 - scaleX) * PHYSICS.SQUASH_RECOVERY;
    scaleY += (1 - scaleY) * PHYSICS.SQUASH_RECOVERY;
    frames.push({ x, y, scaleX, scaleY });
  }

  return { frames, pegHits, bucket: xToBucket(x, rows, layout) };
}
