import React, { useEffect } from 'react';
import { useAuth } from '@context/auth-context';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, initializing, loading, login } = useAuth();

  useEffect(() => {
    if (!initializing && !loading && !user) {
      const rt = window.location.href;

      login(rt);
    }
  }, [initializing, loading, user, login]);

  if (initializing || loading) return null;

  if (!user) return null;

  return <>{children}</>;
};
