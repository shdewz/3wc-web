import { type RegistrationWindowState } from '@/hooks/use-registration-window';

export type NavItem = {
  label: string;
  href: string;
  visibleWhen?: (state: RegistrationWindowState) => boolean;
};

export type SiteConfig = typeof siteConfig;

const navItems: NavItem[] = [
  {
    label: 'Rules',
    href: '/rules',
    visibleWhen: (s) => s.open === true,
  },
  {
    label: 'Register',
    href: '/register',
    visibleWhen: (s) => s.open === true,
  },
];

const navMenuItems: NavItem[] = [
  { label: 'Home', href: '/' },
  ...navItems,
  { label: 'Settings', href: '/account/settings' },
];

export const siteConfig = {
  name: '3 Digit World Cup',
  description: '',
  navItems,
  navMenuItems,
  socials: {
    discord: 'https://discord.gg/ZjPs7ya',
    twitch: 'https://www.twitch.tv/3wc_osu',
    youtube: 'https://www.youtube.com/@3wc_osu',
  },
};
