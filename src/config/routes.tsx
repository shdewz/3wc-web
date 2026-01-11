import { IndexPage } from '@pages/index';
import { RegisterPage } from '@pages/register';
import { RulesPage } from '@pages/rules';
import { RegisterSuccessPage } from '@pages/register-success';
import { SettingsPage } from '@pages/settings';

interface RouteConfig {
  path: string;
  page: React.ReactElement;
  title: string;
  requiresAuth?: boolean;
  permissions?: string[];
  parent?: {
    title: string;
    path: string;
  };
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    page: <IndexPage />,
    title: 'Home',
  },
  {
    path: '/rules',
    page: <RulesPage />,
    title: 'Rules',
  },
  {
    path: '/account/settings',
    page: <SettingsPage />,
    title: 'Account Settings',
  },
  {
    path: '/register',
    page: <RegisterPage />,
    title: 'Register',
    requiresAuth: true,
  },
  {
    path: '/register/success',
    page: <RegisterSuccessPage />,
    title: 'Registration successful',
    requiresAuth: true,
  },
];
