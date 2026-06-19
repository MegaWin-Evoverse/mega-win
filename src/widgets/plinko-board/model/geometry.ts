import { BOARD } from './constants';

export interface Point {
  x: number;
  y: number;
}

export interface PegPoint extends Point {
  row: number;
  col: number;
}

export interface BoardLayout {
  width: number;
  height: number;
  centerX: number;
  topY: number;
  pitchX: number;
  pitchY: number;
  pegRadius: number;
  ballRadius: number;
}

export function getPegRowCount(rowIndex: number): number {
  return rowIndex + BOARD.TOP_PEGS;
}

export function getBucketCount(rows: number): number {
  return rows + 1;
}

export function getBoardLayout(rows: number, width: number): BoardLayout {
  const lastRowPegs = getPegRowCount(rows - 1);
  const pitchX = width / (lastRowPegs + 1);
  const pitchY = pitchX * BOARD.PITCH_Y_RATIO;
  const pegRadius = pitchX * BOARD.PEG_RADIUS_RATIO;
  const ballRadius = pitchX * BOARD.BALL_RADIUS_RATIO;
  const topY = pitchY * BOARD.TOP_OFFSET_RATIO;
  const height = topY + (rows - 1) * pitchY + pegRadius + BOARD.PEG_BORDER_WIDTH * 2;

  return { width, height, centerX: width / 2, topY, pitchX, pitchY, pegRadius, ballRadius };
}

export function getPegPositions(rows: number, layout: BoardLayout): PegPoint[] {
  const points: PegPoint[] = [];

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    const pegCount = getPegRowCount(rowIndex);
    const y = layout.topY + rowIndex * layout.pitchY;

    for (let pegIndex = 0; pegIndex < pegCount; pegIndex++) {
      const x = layout.centerX + (pegIndex - (pegCount - 1) / 2) * layout.pitchX;
      points.push({ x, y, row: rowIndex, col: pegIndex });
    }
  }

  return points;
}

export function getBucketX(bucketIndex: number, rows: number, layout: BoardLayout): number {
  return layout.centerX + (bucketIndex - rows / 2) * layout.pitchX;
}

export function xToBucket(x: number, rows: number, layout: BoardLayout): number {
  const raw = Math.round((x - layout.centerX) / layout.pitchX + rows / 2);
  return Math.min(rows, Math.max(0, raw));
}
