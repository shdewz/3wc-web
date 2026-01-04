import { isRegistrationOpen } from '@/utils/registration';

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: '3 Digit World Cup',
  description: '',
  navItems: [
    ...(isRegistrationOpen() ? [{ label: 'Rules', href: '/rules' }] : []),
    ...(isRegistrationOpen() ? [{ label: 'Register', href: '/register' }] : []),
  ],
};
