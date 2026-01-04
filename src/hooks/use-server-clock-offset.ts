import { useEffect, useState } from 'react';

export const useServerClockOffset = () => {
  const [offsetMs, setOffsetMs] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const resp = await fetch('/api/config', {
          cache: 'no-store',
          credentials: 'include',
        });
        const data = await resp.json();

        const serverNow = data?.serverNow
          ? Date.parse(data.serverNow)
          : Date.parse(resp.headers.get('Date') ?? new Date().toUTCString());

        if (!Number.isFinite(serverNow)) throw new Error('Invalid server time');
        const offset = serverNow - Date.now();

        if (!cancelled) setOffsetMs(offset);
      } catch (e: any) {
        if (!cancelled) setError(e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { offsetMs, error };
};
