import { GAME, type Game } from '@/entities/game';

export const FAIRNESS_TAB = {
  SEEDS: 'seeds',
  VERIFY: 'verify',
} as const;

export type FairnessTab = (typeof FAIRNESS_TAB)[keyof typeof FAIRNESS_TAB];

export const FAIRNESS_TAB_ITEMS: { value: FairnessTab; label: string }[] = [
  { value: FAIRNESS_TAB.SEEDS, label: 'Seeds' },
  { value: FAIRNESS_TAB.VERIFY, label: 'Verify' },
];

export const VERIFY_GAMES = [GAME.DICE, GAME.KENO, GAME.PLINKO, GAME.ROULETTE] as const;

export const COPY_RESET_MS = 2000;

export const FAIRNESS_SEED_ENDPOINT = '/api/fairness/seed';

export const FAIRNESS_SEED_ERROR = 'API server returned non-OK status';

export const DEFAULT_VERIFY_NONCE = '1';

export const LOADING_PLACEHOLDER = 'Loading...';

export const GAME_LABELS: Record<Game, string> = {
  [GAME.DICE]: 'Dice',
  [GAME.KENO]: 'Keno',
  [GAME.PLINKO]: 'Plinko',
  [GAME.ROULETTE]: 'Roulette',
};

export const FAIRNESS_LABELS = {
  provablyFair: 'Provably Fair',
  verifyFairness: 'Verify game fairness',
  title: 'Fairness',
  close: 'Close',
  copyToClipboard: 'Copy to clipboard',
  verifyButton: 'Verify Game Outcome',
  fieldGame: 'Game',
  fieldClientSeed: 'Client Seed',
  fieldServerSeed: 'Server Seed',
  fieldNonce: 'Nonce',
  placeholderClientSeed: 'Enter client seed',
  placeholderServerSeed: 'Enter server seed',
  placeholderNonce: 'Enter nonce',
  activeClientSeed: 'Active client seed',
  activeServerSeedHash: 'Active server seed hash',
  rotateSeedPair: 'Rotate Seed Pair',
  totalBets: 'Total Bets Made with Pair',
  newClientSeed: 'New client seed',
  nextServerSeedHash: 'Next Server Seed (Hash)',
  change: 'Change',
  wait: 'Wait...',
} as const;
