import { IndexPage } from '@/pages/index';
import { InfoPage } from '@/pages/information';
import { RulesPage } from '@/pages/rules';

interface RouteConfig {
  path: string;
  page: React.ReactNode;
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
    path: '/information',
    page: <InfoPage />,
    title: 'Information',
  },
  {
    path: '/rules',
    page: <RulesPage />,
    title: 'Rules',
  },
];
