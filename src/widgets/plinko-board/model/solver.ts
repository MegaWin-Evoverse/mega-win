import { BOARD, SOLVER } from './constants';
import { getBoardLayout, getBucketX, getPegPositions } from './geometry';
import { simulate, type SimResult } from './physics';

const trajectoryCache = new Map<string, SimResult>();

function cacheKey(rows: number, targetBucket: number): string {
  return `${rows}-${targetBucket}`;
}

function touchesEveryRow(result: SimResult, rows: number): boolean {
  const touchedRows = new Set(result.pegHits.map((hit) => hit.row));
  return touchedRows.size === rows;
}

export function solveTrajectory(rows: number, targetBucket: number): SimResult {
  const key = cacheKey(rows, targetBucket);
  const cached = trajectoryCache.get(key);
  if (cached) return cached;

  const layout = getBoardLayout(rows, BOARD.WIDTH);
  const pegs = getPegPositions(rows, layout);
  const minX = layout.ballRadius;
  const maxX = layout.width - layout.ballRadius;
  const aimX = getBucketX(targetBucket, rows, layout);
  const startBase = layout.centerX + (aimX - layout.centerX) * SOLVER.START_BIAS_RATIO;

  let best: SimResult | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  let shortestFullCoverageMatch: SimResult | null = null;
  let anyMatch: SimResult | null = null;

  for (let attempt = 0; attempt < SOLVER.MAX_ATTEMPTS; attempt++) {
    const seed = attempt + 1;
    const jitter = (Math.sin(seed * 12.9898) * 0.5 + 0.5) * 2 - 1;
    const startX = Math.min(
      maxX,
      Math.max(minX, startBase + jitter * layout.pitchX * SOLVER.START_JITTER_RATIO)
    );
    const result = simulate({ pegs, layout, rows, startX, seed });
    if (result.bucket === targetBucket) {
      const fullCoverage = touchesEveryRow(result, rows);
      if (fullCoverage && result.frames.length <= SOLVER.MAX_FRAMES) {
        trajectoryCache.set(key, result);
        return result;
      }
      if (fullCoverage) {
        if (
          !shortestFullCoverageMatch ||
          result.frames.length < shortestFullCoverageMatch.frames.length
        ) {
          shortestFullCoverageMatch = result;
        }
      } else if (!anyMatch || result.frames.length < anyMatch.frames.length) {
        anyMatch = result;
      }
    }
    const distance = Math.abs(result.bucket - targetBucket);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = result;
    }
  }

  const winner = shortestFullCoverageMatch ?? anyMatch;
  if (winner) {
    trajectoryCache.set(key, winner);
    return winner;
  }

  const fallback: SimResult = best ?? simulate({ pegs, layout, rows, startX: startBase, seed: 1 });
  const corrected: SimResult = { ...fallback, bucket: targetBucket };
  trajectoryCache.set(key, corrected);
  return corrected;
}
