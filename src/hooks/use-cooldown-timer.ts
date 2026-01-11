import { useEffect, useRef, useState } from 'react';

export const useCooldownTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = (s: number) => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    setSecondsLeft(s);
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          timerRef.current = null;

          return 0;
        }

        return prev - 1;
      });
    }, 1000) as unknown as number;
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  return { secondsLeft, start };
};
