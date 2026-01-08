import React from 'react';
import { FullScreenLoader } from '@components/common/fullscreen-loader';
import { useAuth } from '@context/auth-context';
import { useTournamentStatus } from '@context/tournament-status-context';

export const LoadingGate: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { initializing: authInit, error: authError } = useAuth();
  const { initializing: statusInit, error: statusError } =
    useTournamentStatus();

  const initializing = authInit || statusInit;
  const combinedError = authError ?? statusError ?? null;

  if (initializing) return <FullScreenLoader />;

  if (combinedError) {
    return (
      <div style={{ padding: 24 }}>
        <h3>Something went wrong</h3>
        <p>{combinedError}</p>
      </div>
    );
  }

  return <>{children}</>;
};
