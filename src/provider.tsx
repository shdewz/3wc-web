import type { NavigateOptions } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/system';
import { useHref, useNavigate } from 'react-router-dom';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import Cookies from 'js-cookie';
import { FullScreenLoader } from '@components/common/fullscreen-loader';

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
};

type AuthContextValue = {
  user: User | null;
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

  if (!ctx) throw new Error('useAuth must be used within Provider');

  return ctx;
};

export const Provider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

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

    const onFocus = () => refresh();

    window.addEventListener('focus', onFocus);

    return () => window.removeEventListener('focus', onFocus);
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
        headers: { 'X-CSRF-Token': csrf },
      });
    } catch {}
    await refresh();
    window.location.assign('/');
  };

  const hasRole = (role: string) => !!user?.roles?.includes(role);

  return (
    <HeroUIProvider locale="en-GB" navigate={navigate} useHref={useHref}>
      <AuthContext.Provider
        value={{ user, loading, error, refresh, login, logout, hasRole }}
      >
        {initializing ? <FullScreenLoader /> : children}
      </AuthContext.Provider>
    </HeroUIProvider>
  );
};
