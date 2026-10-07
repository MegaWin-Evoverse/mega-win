import { Mail, MessageCircle, Send, Briefcase } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const SUPPORT_LABELS = {
  TITLE: 'Help & Support',
  SUBTITLE:
    'Our team is available around the clock. Choose the channel that works best for you and we will get back to you as soon as possible.',
  CONTACT_TITLE: 'Contact Us',
  FAQ_TITLE: 'Frequently Asked Questions',
  RESPONSE_NOTE: 'Average response time: under 2 hours',
} as const;

export const SUPPORT_CONTACTS = [
  {
    method: 'Email',
    value: 'support@megawin.gg',
    description: 'For account issues, billing, and general questions.',
    available: '24 / 7',
  },
  {
    method: 'Live Chat',
    value: 'Available in the bottom-right corner',
    description: 'Instant help from our support agents.',
    available: '24 / 7',
  },
  {
    method: 'Discord',
    value: 'discord.gg/megawin',
    description: 'Join our community and get help from staff and players.',
    available: 'Mon – Sun, 08:00 – 24:00 UTC',
  },
  {
    method: 'Business',
    value: 'partnerships@megawin.gg',
    description: 'Sponsorships, collaborations, and media requests.',
    available: 'Mon – Fri, 09:00 – 18:00 UTC',
  },
] as const;

export type SupportContactMethod = (typeof SUPPORT_CONTACTS)[number]['method'];

export const SUPPORT_CONTACT_ICONS: Record<SupportContactMethod, LucideIcon> = {
  Email: Mail,
  'Live Chat': MessageCircle,
  Discord: Send,
  Business: Briefcase,
};
