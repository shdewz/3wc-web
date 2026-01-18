import React from 'react';

type FlagProps = {
  countryCode?: string | null;
  size?: number | string;
  decorative?: boolean;
  className?: string;
  baseUrl?: string;
};

export const Flag: React.FC<FlagProps> = ({
  countryCode,
  size = 1,
  decorative = false,
  className,
  baseUrl = 'https://cdn.shdewz.me/images/flags',
}) => {
  const cc = (countryCode ?? '').toUpperCase();

  if (!/^[A-Z]{2}$/.test(cc)) return null;

  const height = typeof size === 'number' ? `${size}em` : size;

  const svg = `${baseUrl}/vector/${cc}.svg`;
  const png = `${baseUrl}/${cc}.png`;

  const style: React.CSSProperties = {
    height,
    width: 'auto',
    verticalAlign: '-0.125em',
  };

  const alt = decorative ? '' : `${cc}`;

  return (
    <picture className={className}>
      <source srcSet={svg} type="image/svg+xml" />
      <img
        alt={alt}
        aria-hidden={decorative}
        decoding="async"
        loading="lazy"
        src={png}
        style={style}
      />
    </picture>
  );
};
