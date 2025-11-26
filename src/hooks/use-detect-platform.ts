import { useMemo } from 'react';

export const useDetectPlatform = () => {
  const isMac: boolean = useMemo(() => {
    const uaData = (navigator as any).userAgentData;

    if (uaData?.platform) return uaData.platform.toLowerCase().includes('mac');

    if (navigator.platform)
      return navigator.platform.toLowerCase().includes('mac');

    return /mac/i.test(navigator.userAgent);
  }, []);

  return isMac;
};
