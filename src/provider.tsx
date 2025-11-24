import type { NavigateOptions } from 'react-router-dom';

import { HeroUIProvider } from '@heroui/system';
import { useHref, useNavigate } from 'react-router-dom';

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export const Provider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <HeroUIProvider locale="en-GB" navigate={navigate} useHref={useHref}>
      {children}
    </HeroUIProvider>
  );
};
