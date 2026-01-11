import React, { useEffect } from 'react';
import { useAuth } from '@context/auth-context';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, initializing, login } = useAuth();

  useEffect(() => {
    if (!initializing && !user) {
      const rt = window.location.href;

      login(rt);
    }
  }, [initializing, user, login]);

  if (initializing) return null;

  if (!user) return null;

  return <>{children}</>;
};
