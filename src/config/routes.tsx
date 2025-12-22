import { IndexPage } from '@pages/index';
import { RegisterPage } from '@pages/register';
import { RulesPage } from '@pages/rules';

interface RouteConfig {
  path: string;
  page: React.ReactElement;
  title: string;
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
    path: '/register',
    page: <RegisterPage />,
    title: 'Register',
  },
];
