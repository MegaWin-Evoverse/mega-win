// Рядки таблиці (зверху вниз): TOP, MIDDLE, BOTTOM
export const ROULETTE_ROWS: [number[], number[], number[]] = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36], // TOP → column: 'TOP'
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35], // MIDDLE → column: 'MIDDLE'
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34], // BOTTOM → column: 'BOTTOM'
];

const RED_NUMBERS = new Set([1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]);

export type NumberColor = 'red' | 'black' | 'green';

export function getNumberColor(n: number): NumberColor {
  if (n === 0) return 'green';
  return RED_NUMBERS.has(n) ? 'red' : 'black';
}
