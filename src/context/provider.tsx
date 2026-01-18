import React, { useCallback } from 'react';
import { useHref, useNavigate, type NavigateOptions } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { LoadingGate } from '@components/common/loading-gate';
import { AuthProvider } from '@context/auth-context';
import { TournamentStatusProvider } from '@context/tournament-status-context';
import { ToastProvider } from '@heroui/react';
import { RouteToast } from '@components/common/route-toast';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();
  const routerUseHref = useHref;

  const customNavigate = useCallback(
    (path: string, options?: NavigateOptions) => {
      if (path.startsWith('http://') || path.startsWith('https://')) {
        window.location.href = path;

        return;
      }
      navigate(path, options);
    },
    [navigate]
  );

  const customUseHref = useCallback(
    (to: string) => {
      if (to.startsWith('http://') || to.startsWith('https://')) {
        return to;
      }

      return routerUseHref(to);
    },
    [routerUseHref]
  );

  return (
    <HeroUIProvider
      locale="en-GB"
      navigate={customNavigate}
      useHref={customUseHref}
    >
      <ToastProvider toastOffset={20} />
      <RouteToast />

      <TournamentStatusProvider>
        <AuthProvider>
          <LoadingGate>{children}</LoadingGate>
        </AuthProvider>
      </TournamentStatusProvider>
    </HeroUIProvider>
  );
};
