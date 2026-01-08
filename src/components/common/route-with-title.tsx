import { useEffect } from 'react';
import { siteConfig } from '@config/site';

interface Props {
  title?: string;
  element: React.ReactElement;
}

export const RouteWithTitle = ({ title, element }: Props) => {
  useEffect(() => {
    const base = siteConfig.name;

    document.title = title ? `${title} | ${base}` : base;
  }, [title]);

  return element;
};
