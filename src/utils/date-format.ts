export const formatMonthDay = (d: Date, tz = 'UTC') => {
  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    timeZone: tz,
  }).format(d);
};
