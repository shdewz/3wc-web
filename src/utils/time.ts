export const formatMonthDay = (
  input: Date | string | null | undefined,
  tz = 'UTC',
  missingString = 'TBD'
): string => {
  if (!input) return missingString;
  const date = typeof input === 'string' ? new Date(input) : input;

  if (Number.isNaN(date.getTime())) return 'Invalid date';

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    timeZone: tz,
  }).format(date);
};

export const formatClock = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  const hh = String(h).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  const ss = String(sec).padStart(2, '0');

  return h === 0 ? `${mm}:${ss}` : `${hh}:${mm}:${ss}`;
};
