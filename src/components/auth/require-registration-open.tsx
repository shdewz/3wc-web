import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { isRegistrationOpen } from '@/utils/registration';

export const RequireRegistrationOpen: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const location = useLocation();
  const open = isRegistrationOpen();

  if (!open) {
    return (
      <Navigate
        replace
        state={{ from: location.pathname, reason: 'registration_closed' }}
        to="/"
      />
    );
  }

  return <>{children}</>;
};
