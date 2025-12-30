export const getDiscordAvatarUrl = (
  discord_id?: string | null,
  discord_avatar?: string | null,
  size = 128
) => {
  if (!discord_id || !discord_avatar) return undefined;
  const format = discord_avatar.startsWith('a_') ? 'gif' : 'png';

  return `https://cdn.discordapp.com/avatars/${discord_id}/${discord_avatar}.${format}?size=${size}`;
};
