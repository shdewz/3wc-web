import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type StatusBase = { isActive: boolean; start?: string; end?: string };
type RegistrationStatus = StatusBase & { overrideReason?: string | null };
type BracketStatus = StatusBase & { currentRound?: string; rounds: string[] };

type StatusResponse = {
  serverNow: string;
  statuses: { registration: RegistrationStatus; bracket: BracketStatus };
};

type Ctx = {
  initializing: boolean;
  loading: boolean;
  error: string | null;
  serverNow: string | null;
  statuses: StatusResponse['statuses'] | null;
  refresh: () => Promise<void>;
};

const TournamentStatusContext = createContext<Ctx | undefined>(undefined);

export function TournamentStatusProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serverNow, setServerNow] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<StatusResponse['statuses'] | null>(
    null
  );

  const fetchStatuses = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/status', { cache: 'no-store' });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: StatusResponse = await res.json();

      setServerNow(json.serverNow);
      setStatuses(json.statuses);
    } catch (e: any) {
      setError(e.message || 'Failed to load statuses');
      setServerNow(null);
      setStatuses(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchStatuses();
      setInitializing(false);
    })();
  }, []);

  return (
    <TournamentStatusContext.Provider
      value={{
        initializing,
        loading,
        error,
        serverNow,
        statuses,
        refresh: fetchStatuses,
      }}
    >
      {children}
    </TournamentStatusContext.Provider>
  );
}

export const useTournamentStatus = () => {
  const ctx = useContext(TournamentStatusContext);

  if (!ctx)
    throw new Error(
      'useTournamentStatus must be used within TournamentStatusProvider'
    );

  return ctx;
};
