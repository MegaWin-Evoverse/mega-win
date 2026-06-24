export const MY_BETS_PAGE_SIZE = 40;

export const GAME_NAME = {
  ROULETTE: 'Roulette',
  KENO: 'Keno',
  PLINKO: 'Plinko',
  DICE: 'Dice',
} as const;

export type GameName = (typeof GAME_NAME)[keyof typeof GAME_NAME];
