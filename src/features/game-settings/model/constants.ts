import { GAME, type Game } from '@/entities/game';
import type { RuleStep } from './types';

export const VOLUME_MIN = 0;
export const VOLUME_MAX = 100;
export const VOLUME_STEP = 1;
export const DEFAULT_VOLUME = 75;

export const GAME_SETTINGS_LABELS = {
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit Fullscreen',
  toggleFullscreen: 'Toggle Fullscreen',
  settings: 'Settings',
  gameSettings: 'Game Settings',
  gameRules: 'Game Rules',
  turboMode: 'Turbo Mode',
  maxBet: 'Max Bet',
} as const;

export const GAME_RULES: Record<Game, RuleStep[]> = {
  [GAME.DICE]: [
    { text: 'Pick a game mode (Under, Over, Between, Double Between or Outside).' },
    { text: 'Drag the slider to set your target value.' },
    {
      text: 'Higher win chance means a lower multiplier, so pick your balance of risk and reward.',
    },
    { text: 'Press Bet to roll; a random number from 0.00 to 100.00 is generated.' },
    {
      text: 'In the Advanced tab, the chosen strategy adjusts your next bet based on the previous result:',
      subBullets: [
        'Martingale doubles the bet after a loss and resets it after a win.',
        'Delayed Martingale stays flat after the first loss, doubles after every next loss, and resets on a win.',
        'Paroli doubles the bet after a win and resets it after a loss or 3 wins in a row.',
        "D'Alembert raises the bet by one unit after a loss and lowers it by one after a win.",
      ],
    },
    { text: 'The theoretical Return to Player (RTP) is 96.00%' },
    { text: 'Max Bet: 100,000' },
    { text: 'The maximum payout is $500,000.' },
  ],
  [GAME.KENO]: [
    { text: 'Choose your bet amount and risk level.' },
    { text: 'Select 1 to 10 numbers on the board.' },
    { text: 'Press Play to draw numbers.' },
    {
      text: 'Your payout is determined by how many numbers match your selection and the corresponding multiplier.',
    },
    { text: 'The maximum multiplier is 10,000x.' },
    { text: 'The maximum payout is $500,000.' },
  ],
  [GAME.PLINKO]: [
    { text: 'Choose your bet amount, risk level, and the number of rows.' },
    { text: 'Drop the ball by pressing Play.' },
    { text: 'The multiplier you land on determines your payout.' },
    { text: 'The maximum multiplier is 10,000x.' },
    { text: 'The maximum payout is $500,000.' },
  ],
  [GAME.ROULETTE]: [
    { text: 'Place your chips on the board before spinning the wheel.' },
    {
      text: 'Choose from multiple bet types:',
      subBullets: [
        'Straight (1 number) — pays 36:1',
        'Split (2 numbers) — pays 17:1',
        'Street (3 numbers) — pays 11:1',
        'Corner (4 numbers) — pays 8:1',
        'Double Street (6 numbers) — pays 5:1',
        'Column or Dozen (12 numbers) — pays 2:1',
        'Red/Black, Even/Odd, 1-18/19-36 — pays 1:1',
      ],
    },
    { text: 'Press Bet to spin the wheel. The ball lands on a random number.' },
    { text: 'If the result matches your bet, you win the corresponding payout.' },
    { text: 'The theoretical Return to Player (RTP) is 97.30%.' },
    { text: 'The maximum payout is $500,000.' },
  ],
};
