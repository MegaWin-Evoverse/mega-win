import { ROUTES } from '@/shared/config';
import type { GameCardAccent, GameCardData } from './types';
import puzzleIcon from '../assets/icons/puzzle.svg';

export const GAME_CARDS_CONSTANTS = {
  SECTION_TITLE: 'Games',
  SECTION_ARIA_LABEL: 'Games catalog',
  ICON_SRC: puzzleIcon,
  ICON_WIDTH: 23,
  ICON_HEIGHT: 24,
} as const;

export const CARD_ACCENT_GLOW_CLASS: Record<GameCardAccent, string> = {
  purple: 'hover:shadow-[0_0_40px_-4px_var(--promo-purple)]',
  yellow: 'hover:shadow-[0_0_40px_-4px_var(--risk-medium)]',
  red: 'hover:shadow-[0_0_40px_-4px_var(--risk-high)]',
  green: 'hover:shadow-[0_0_40px_-4px_var(--risk-low)]',
};

export const GAME_CARDS: readonly GameCardData[] = [
  {
    id: 'roulette',
    title: 'Roulette',
    imageSrc: '/games-cards/roulette.webp',
    imageWidth: 268,
    imageHeight: 182,
    href: ROUTES.GAMES_ROULETTE,
    accentColor: 'red',
  },
  {
    id: 'keno',
    title: 'Keno',
    imageSrc: '/games-cards/keno.webp',
    imageWidth: 268,
    imageHeight: 182,
    href: ROUTES.GAMES_KENO,
    accentColor: 'yellow',
  },
  {
    id: 'plinko',
    title: 'Plinko',
    imageSrc: '/games-cards/plinko.webp',
    imageWidth: 268,
    imageHeight: 182,
    href: ROUTES.GAMES_PLINKO,
    accentColor: 'green',
  },
  {
    id: 'dice',
    title: 'Dice',
    imageSrc: '/games-cards/dice.webp',
    imageWidth: 268,
    imageHeight: 182,
    href: ROUTES.GAMES_DICE,
    accentColor: 'purple',
  },
] as const;

const WIDE_CARD_SIZE = { imageWidth: 1768, imageHeight: 920 } as const;

export const GAME_CARDS_WIDE: readonly GameCardData[] = GAME_CARDS.map((card) => ({
  ...card,
  imageSrc: `/games-cards/wide/${card.id}.webp`,
  ...WIDE_CARD_SIZE,
}));
