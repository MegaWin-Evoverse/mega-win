import { ROUTES } from '@/shared/config';

export interface GameCardData {
  id: string;
  title: string;
  imageSrc: string;
  href: string;
}

export const GAME_CARDS_CONSTANTS = {
  SECTION_TITLE: 'Games',
  SECTION_ARIA_LABEL: 'Games catalog',
  ICON_SRC: '/games-cards/puzle.svg',
  ICON_WIDTH: 23,
  ICON_HEIGHT: 24,
  CARD_WIDTH: 268,
  CARD_HEIGHT: 182,
} as const;

export const GAME_CARDS: readonly GameCardData[] = [
  {
    id: 'roulette',
    title: 'Roulette',
    imageSrc: '/games-cards/roulette.webp',
    href: ROUTES.GAMES_ROULETTE,
  },
  {
    id: 'keno',
    title: 'Keno',
    imageSrc: '/games-cards/keno.webp',
    href: ROUTES.GAMES_KENO,
  },
  {
    id: 'plinko',
    title: 'Plinko',
    imageSrc: '/games-cards/plinko.webp',
    href: ROUTES.GAMES_PLINKO,
  },
  {
    id: 'dice',
    title: 'Dice',
    imageSrc: '/games-cards/dice.webp',
    href: ROUTES.GAMES_DICE,
  },
] as const;
