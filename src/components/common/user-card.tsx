import React, { useMemo } from 'react';
import {
  Card,
  Divider,
  Avatar,
  Chip,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@heroui/react';
import { Flag } from '@components/common/flag';
import { DiscordIcon, InfoIcon } from '@components/icons';

type OsuInfo = {
  user_id?: string | number | null;
  username?: string | null;
  avatar_url?: string | null;
  global_rank?: number | null;
  country_code?: string | null;
};

type DiscordInfo = {
  id?: string | null;
  username?: string | null;
  avatar?: string | null;
};

type Props = {
  osu?: OsuInfo;
  discord?: DiscordInfo;
  locale?: string;
  discordAction?: React.ReactNode;
};

const getOsuAvatarUrl = (
  user_id?: string | number | null,
  avatar_url?: string | null
) => {
  return avatar_url || (user_id ? `https://a.ppy.sh/${user_id}` : undefined);
};

const getDiscordAvatarUrl = (
  id?: string | null,
  hash?: string | null,
  size = 128
) => {
  if (!id || !hash) return undefined;
  const ext = hash.startsWith('a_') ? 'gif' : 'png';

  return `https://cdn.discordapp.com/avatars/${id}/${hash}.${ext}?size=${size}`;
};

export const UserCard: React.FC<Props> = ({
  osu,
  discord,
  locale = 'en',
  discordAction,
}) => {
  const osuAvatar = useMemo(
    () => getOsuAvatarUrl(osu?.user_id ?? null, osu?.avatar_url ?? null),
    [osu?.user_id, osu?.avatar_url]
  );

  const discordAvatar = useMemo(
    () => getDiscordAvatarUrl(discord?.id ?? null, discord?.avatar ?? null),
    [discord?.id, discord?.avatar]
  );

  const countryName = useMemo(() => {
    const cc = osu?.country_code ?? undefined;

    if (!cc) return null;
    try {
      const dn = new Intl.DisplayNames([locale], { type: 'region' });

      return dn.of(cc) ?? null;
    } catch {
      return null;
    }
  }, [osu?.country_code, locale]);

  const rankText =
    osu?.global_rank && osu.global_rank > 0
      ? `#${osu.global_rank.toLocaleString()}`
      : 'No rank';

  return (
    <Card className="w-full p-4">
      <div className="flex items-center gap-3">
        <Avatar isBordered radius="full" size="md" src={osuAvatar} />
        <div className="flex items-center gap-2 min-w-0">
          <Chip size="sm" variant="flat">
            osu!
          </Chip>
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate">{osu?.username ?? '—'}</span>
            <span className="text-default-500 text-sm">{rankText}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <Avatar isBordered radius="full" size="md" src={discordAvatar} />
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <Chip
            className="px-2"
            size="sm"
            startContent={<DiscordIcon />}
            variant="flat"
          >
            Discord
          </Chip>
          <div className="flex flex-col min-w-0">
            <span className="font-medium truncate">
              {discord?.username ? discord.username : 'Not linked'}
            </span>
          </div>
        </div>

        {discordAction ? (
          <div className="ml-3 shrink-0">{discordAction}</div>
        ) : null}
      </div>

      <Divider className="my-3" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-lg font-semibold">
          <Flag countryCode={osu?.country_code ?? undefined} size={1.25} />
          <span>{countryName ?? osu?.country_code ?? 'Unknown'}</span>
        </div>

        <Popover color="default" placement="top-end">
          <PopoverTrigger>
            <Button
              isIconOnly
              aria-label="About country grouping"
              className="text-default-500 shrink-0"
              radius="full"
              size="sm"
              variant="light"
            >
              <InfoIcon className="text-large" />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="max-w-xs p-3">
              <p className="font-medium">What determines my country?</p>
              <p className="text-sm text-default-600 mt-1">
                The flag on your osu! profile will be used to assign you to a
                team. There will be no exceptions to this, excluding potential
                country merges.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </Card>
  );
};
