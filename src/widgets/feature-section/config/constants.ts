import { ROUTES } from '@/shared/config';

export interface FeatureDecoration {
  src: string;
  width: number;
  height: number;
  className: string;
}

export interface FeatureCardData {
  title: string;
  href: string;
  imageSrc: string;
  ariaLabel: string;
  decorations: readonly FeatureDecoration[];
}

export const FEATURE_CARDS: readonly FeatureCardData[] = [
  {
    title: 'Leaderboard',
    href: ROUTES.LEADERBOARD,
    imageSrc: '/feature/crown-big.webp',
    ariaLabel: 'Go to Leaderboard',
    decorations: [
      { src: '/feature/diamont.svg', width: 145, height: 108, className: 'left-0 top-0' },
      { src: '/feature/blur-cube.svg', width: 85, height: 188, className: 'right-0 bottom-0' },
    ],
  },
  {
    title: 'Rewards',
    href: ROUTES.REWARDS,
    imageSrc: '/feature/box.webp',
    ariaLabel: 'Go to Rewards',
    decorations: [
      { src: '/feature/star-small.svg', width: 61, height: 61, className: 'left-3 top-1' },
      { src: '/feature/star-big.svg', width: 96, height: 89, className: 'right-5 top-2' },
    ],
  },
  {
    title: 'Games',
    href: ROUTES.GAMES,
    imageSrc: '/feature/cubes.webp',
    ariaLabel: 'Go to Games',
    decorations: [
      { src: '/feature/bomb.svg', width: 128, height: 169, className: 'left-0 top-0' },
      { src: '/feature/coin.svg', width: 100, height: 144, className: 'right-0 bottom-0' },
    ],
  },
] as const;
