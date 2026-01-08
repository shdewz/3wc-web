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
