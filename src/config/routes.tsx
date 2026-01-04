import { IndexPage } from '@pages/index';
import { RegisterPage } from '@pages/register';
import { RulesPage } from '@pages/rules';
import { RegisterSuccessPage } from '@pages/register-success';
import { RequireRegistrationOpen } from '@components/auth/require-registration-open';

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
    path: '/register',
    page: (
      <RequireRegistrationOpen>
        <RegisterPage />
      </RequireRegistrationOpen>
    ),
    title: 'Register',
    requiresAuth: true,
  },
  {
    path: '/register/success',
    page: (
      <RequireRegistrationOpen>
        <RegisterSuccessPage />
      </RequireRegistrationOpen>
    ),
    title: 'Registration successful',
    requiresAuth: true,
  },
];
