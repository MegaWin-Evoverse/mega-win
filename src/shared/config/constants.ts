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
