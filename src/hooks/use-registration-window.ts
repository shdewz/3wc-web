import { useMemo } from 'react';
import { useTournamentStatus } from '@context/tournament-status-context';
import { formatMonthDay } from '@utils/time';

export type RegistrationWindowState = ReturnType<typeof useRegistrationWindow>;

export const useRegistrationWindow = () => {
  const { initializing, loading, error, serverNow, statuses, refresh } =
    useTournamentStatus();

  const derived = useMemo(() => {
    const reg = statuses?.registration;

    const base = {
      hasData: !!reg,
      open: false,
      upcoming: false,
      closed: false,
      startDate: null as Date | null,
      endDate: null as Date | null,
      startLabel: 'TBD',
      endLabel: 'TBD',
      msUntilStart: null as number | null,
      msUntilEnd: null as number | null,
    };

    if (!reg || !reg.start || !reg.end) {
      return base;
    }

    const startDate = new Date(reg.start);
    const endDate = new Date(reg.end);
    const startValid = !Number.isNaN(startDate.getTime());
    const endValid = !Number.isNaN(endDate.getTime());

    const nowMs = serverNow ? new Date(serverNow).getTime() : Date.now();

    const open = !!reg.isActive;
    const upcoming = startValid && !open && nowMs < startDate.getTime();
    const closed = endValid && !open && nowMs >= endDate.getTime();

    const startLabel = formatMonthDay(
      startValid ? startDate : null,
      'UTC',
      'TBD'
    );
    const endLabel = formatMonthDay(endValid ? endDate : null, 'UTC', 'TBD');

    const msUntilStart =
      startValid && nowMs < startDate.getTime()
        ? startDate.getTime() - nowMs
        : null;

    const msUntilEnd =
      endValid && nowMs < endDate.getTime() ? endDate.getTime() - nowMs : null;

    return {
      hasData: true,
      open,
      upcoming,
      closed,
      startDate: startValid ? startDate : null,
      endDate: endValid ? endDate : null,
      startLabel,
      endLabel,
      msUntilStart,
      msUntilEnd,
    };
  }, [serverNow, statuses]);

  return {
    initializing,
    loading,
    error,
    refresh,
    ...derived,
  };
};
