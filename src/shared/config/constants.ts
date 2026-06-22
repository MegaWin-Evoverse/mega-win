import coin1Icon from '../assets/icons/coin-1.svg';

export const BUTTON_LABELS = {
  LOG: 'Log In',
  PLAY: 'Play',
  REG: 'Register',
  CLAIM: 'Claim',
} as const;

export const FOOTER_ABOUT_LINKS = [
  { label: 'Pointshop', href: '/pointshop' },
  { label: 'Leaderboard', href: '/leaderboard' },
  { label: 'Games', href: '/games' },
  { label: 'Rewards', href: '/rewards' },
  { label: 'Bonuses', href: '/bonuses' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { label: 'Twitter', href: 'https://x.com', icon: 'twitter' },
  { label: 'Telegram', href: 'https://t.me', icon: 'telegram' },
  { label: 'Discord', href: 'https://discord.gg', icon: 'discord' },
] as const;

export const COPYRIGHT_TEXT =
  'Copyright © 2025 www.thedoctor.com is owned and operated by Wild Technology Ltd. registration number: 3-102-898807 registered address: San Rafael,Edificio, Fuentecantos, San Jose, Costa Rica and is licensed and regulated by the Government of the Autonomous Island of Anjouan, Union of Comoros and operates under License No. ALSI-132405034-FI3';

export const FOOTER_HEADERS = {
  ABOUT: 'ABOUT',
  SOCIALS: 'SOCIALS',
} as const;

export const FOOTER_ARIA = {
  FOOTER: 'Main footer',
  LOGO_LINK: 'Go to homepage',
  SOCIAL_LINK_PREFIX: 'Visit our ',
} as const;

export const GAME_PANEL_TAB = {
  MANUAL: 'manual',
  AUTO: 'auto',
} as const;

export type GamePanelTab = (typeof GAME_PANEL_TAB)[keyof typeof GAME_PANEL_TAB];

export const GAME_PANEL_LABELS = {
  MANUAL: 'Manual',
  AUTO: 'Auto',
  BET_AMOUNT: 'Bet Amount',
  BET: 'Bet',
  HALF: '1/2',
  DOUBLE: '2X',
  MAX: 'MAX',
  NUMBER_OF_BETS: 'Number of bets',
  INFINITY_SYMBOL: '∞',
  INFINITY_ARIA_LABEL: 'Set infinite bets',
} as const;

export const BET_AMOUNT_STEP = {
  HALF: 0.5,
  DOUBLE: 2,
} as const;

export const BET_AMOUNT_DECIMALS = 2;

export const GAME_BALANCE = 4593.24;

export const COIN_ICON = {
  SRC: coin1Icon,
  ALT: 'Coin',
  SIZE_BALANCE: 20,
  SIZE_INPUT: 16,
  SIZE_SUMMARY: 14,
} as const;
