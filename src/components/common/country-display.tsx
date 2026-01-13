import React, { useMemo } from 'react';
import { Flag } from '@components/common/flag';

type CountryDisplayProps = {
  countryCode?: string | null;
  locale?: string;
};

export const CountryDisplay: React.FC<CountryDisplayProps> = ({
  countryCode,
  locale = 'en',
}) => {
  const countryName = useMemo(() => {
    if (!countryCode) return null;
    try {
      const dn = new Intl.DisplayNames([locale], { type: 'region' });

      return dn.of(countryCode) ?? null;
    } catch {
      return null;
    }
  }, [countryCode, locale]);

  return (
    <div className="flex items-center gap-2">
      <Flag countryCode={countryCode ?? undefined} size={1} />
      <span>{countryName ?? countryCode ?? 'Unknown'}</span>
    </div>
  );
};
