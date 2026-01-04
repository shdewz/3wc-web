const REG_START = '2026-01-11T12:00:00Z';
const REG_END = '2026-01-26T00:00:00Z';

export const registrationWindow = {
  start: new Date(REG_START),
  end: new Date(REG_END),
};

export const nowWithOffset = (offsetMs: number | null | undefined) => {
  return new Date(Date.now() + (offsetMs ?? 0));
};

export const isRegistrationOpenAt = (when: Date) => {
  const t = when.getTime();

  return (
    t >= registrationWindow.start.getTime() &&
    t <= registrationWindow.end.getTime()
  );
};

export const isRegistrationOpen = (now: Date = new Date()): boolean => {
  const t = now.getTime();

  return (
    t >= registrationWindow.start.getTime() &&
    t <= registrationWindow.end.getTime()
  );
};

export const getRegistrationState = (now: Date = new Date()) => {
  const t = now.getTime();
  const start = registrationWindow.start.getTime();
  const end = registrationWindow.end.getTime();

  if (t < start) return { state: 'upcoming', msUntilStart: start - t };
  if (t > end) return { state: 'closed', msSinceEnd: t - end };

  return { state: 'open', msUntilEnd: end - t };
};
