import type { NavigateOptions } from 'react-router-dom';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

type User = {
  user_id: string;
  username: string;
  country_code: string;
  avatar_url?: string;
  roles: string[];
  global_rank: number;
  country_rank: number;
  discord_id: string;
  discord_username: string;
  discord_avatar_url?: string;
  registered: boolean;
  wants_captain: boolean;
};

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  login: (returnTo?: string) => void;
  logout: () => Promise<void>;
  hasRole: (role: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) throw new Error('useAuth must be used within AuthProvider');

  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = (await response.json()) as User;

        setUser(data);
      } else if (response.status === 401 || response.status === 403) {
        setUser(null);
      } else {
        const text = await response.text().catch(() => '');

        setError(`Failed to load user: ${response.status} ${text}`);
        setUser(null);
      }
    } catch (e: any) {
      setError(e?.message ?? 'Network error');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      await refresh();
      setInitializing(false);
    })();
  }, [refresh]);

  const login = (returnTo?: string) => {
    const rt = returnTo ?? window.location.href;

    window.location.assign(
      `/api/auth/osu/login?returnTo=${encodeURIComponent(rt)}`
    );
  };

  const logout = async () => {
    try {
      const csrf = Cookies.get('csrf_token') ?? '';

      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      });
    } catch {}
    await refresh();
    window.location.assign('/');
  };

  const hasRole = (role: string) => !!user?.roles?.includes(role);

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        loading,
        error,
        refresh,
        login,
        logout,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
