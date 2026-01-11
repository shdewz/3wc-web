import React from 'react';
import { Button, Tooltip, Link } from '@heroui/react';
import { DiscordIcon, TwitchIcon, YouTubeIcon } from '@components/icons';
import clsx from 'clsx';
import { siteConfig } from '@config/site';

type SocialLinksProps = {
  className?: string;
  size?: 'sm' | 'md';
  gap?: number;
  links?: Partial<typeof siteConfig.socials>;
};

const DEFAULT_ORDER: (keyof typeof siteConfig.socials)[] = [
  'discord',
  'twitch',
  'youtube',
];

const ICONS: Record<keyof typeof siteConfig.socials, React.ReactNode> = {
  discord: <DiscordIcon className="text-[18px]" />,
  twitch: <TwitchIcon className="text-[18px]" />,
  youtube: <YouTubeIcon className="text-[18px]" />,
};

const LABELS: Record<keyof typeof siteConfig.socials, string> = {
  discord: 'Discord',
  twitch: 'Twitch',
  youtube: 'YouTube',
};

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className,
  size = 'sm',
  gap = 2,
  links = siteConfig.socials,
}) => {
  const entries = DEFAULT_ORDER.map((k) => [k, links[k]] as const).filter(
    ([, href]) => !!href
  );

  if (!entries.length) return null;

  return (
    <div className={clsx('flex items-center', `gap-${gap}`, className)}>
      {entries.map(([key, href]) => (
        <Tooltip key={key} showArrow content={LABELS[key]} placement="bottom">
          <Button
            isIconOnly
            aria-label={LABELS[key]}
            as={Link}
            className="p-0 text-default-700"
            href={href!}
            radius="full"
            rel="noopener noreferrer"
            size={size}
            target="_blank"
            variant="light"
          >
            {ICONS[key]}
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
