import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useRegistrationWindow } from '@/hooks/use-registration-window';

type Props = {
  children: React.ReactNode;
  redirectTo?: string;
};

export const RequireRegistrationOpen: React.FC<Props> = ({
  children,
  redirectTo = '/',
}) => {
  const { initializing, loading, error, open } = useRegistrationWindow();
  const location = useLocation();

  if (initializing || loading) return null;

  if (error) {
    return (
      <Navigate
        replace
        state={{
          from: location,
          toast: {
            color: 'danger',
            title: 'Registration status unavailable',
            description: 'Please try again later.',
          },
        }}
        to={redirectTo}
      />
    );
  }

  if (!open) {
    return (
      <Navigate
        replace
        state={{
          from: location,
          toast: {
            color: 'warning',
            title: 'Registration is closed',
            description:
              'The registration period has passed and no new registrations will be accepted.',
          },
        }}
        to={redirectTo}
      />
    );
  }

  return <>{children}</>;
};
