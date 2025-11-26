import { useEffect } from 'react';

export const useGlobalShortcut = (
  handler: (e: KeyboardEvent) => void,
  key: string,
  opt?: { isMac?: boolean }
) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const pressedKey = e.key?.toLowerCase();
      const shortcutKey = key.toLowerCase();

      if (pressedKey === shortcutKey && (opt?.isMac ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();
        handler(e);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handler, opt?.isMac]);
};
