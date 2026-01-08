import { useEffect } from 'react';
import { FullScreenLoader } from '@components/common/fullscreen-loader';
import { useAuth } from '@context/auth-context';

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading, login } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      const rt = window.location.href;

      login(rt);
    }
  }, [loading, user, login]);

  if (loading || (!user && typeof window !== 'undefined')) {
    return <FullScreenLoader />;
  }

  return <>{children}</>;
};
