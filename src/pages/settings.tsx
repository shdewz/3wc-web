import { useState } from 'react';
import Cookies from 'js-cookie';
import { Button, Card, Chip, Alert, Divider } from '@heroui/react';
import { useAuth } from '@context/auth-context';
import { title } from '@components/primitives';
import { UserCard } from '@components/common/user-card';
import { useCooldownTimer } from '@hooks/use-cooldown-timer';
import { Link } from 'react-router-dom';
import { DiscordLinkAction } from '@components/account/discord-unlink-action';

import { formatClock } from '@/utils/time';

export const SettingsPage = () => {
  const { user, refresh, login } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { secondsLeft, start } = useCooldownTimer();

  const onRefreshStats = async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      const csrf = Cookies.get('csrf_token') ?? '';
      const resp = await fetch('/api/auth/osu/refresh', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      });

      if (resp.status === 401) {
        login(window.location.href);

        return;
      }

      if (resp.status === 429) {
        const data = await resp.json().catch(() => ({}) as any);
        const retry = Number(data?.retry_after_s ?? 60);

        start(retry);

        return;
      }

      if (!resp.ok) {
        const data = await resp.json().catch(() => ({}) as any);

        throw new Error(data?.message ?? `Refresh failed (${resp.status})`);
      }

      await refresh();
    } catch (e: any) {
      setError(e?.message ?? 'Network error during refresh');
    } finally {
      setIsRefreshing(false);
    }
  };

  if (!user) {
    return (
      <section className="flex flex-col gap-4 py-8 max-w-2xl">
        <span className={title()}>User Settings</span>
        <Card className="p-4">
          <Alert title="You are not logged in." variant="flat" />
          <div className="mt-4">
            <Button color="primary" onPress={() => login(window.location.href)}>
              Sign in with osu!
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  const inCooldown = secondsLeft > 0;

  return (
    <section className="flex flex-col items-start justify-center gap-4 pb-8 sm:py-8 w-2xl">
      <div className="inline-block w-full text-left justify-center">
        <span className={title()}>Account Settings</span>

        <Card className="p-3 mt-6 flex flex-col gap-3 w-full">
          <div className="flex flex-col gap-3">
            <UserCard
              discord={{
                id: user.discord_id ?? null,
                username: user.discord_username ?? null,
                avatar: user.discord_avatar_url ?? null,
              }}
              discordAction={<DiscordLinkAction />}
              locale="en"
              osu={{
                user_id: user.user_id,
                username: user.username,
                avatar_url: user.avatar_url ?? null,
                global_rank: user.global_rank ?? null,
                country_code: user.country_code ?? null,
              }}
            />

            {error && (
              <Alert
                color="danger"
                description={error}
                title="Refresh error"
                variant="flat"
              />
            )}

            <div className="flex items-center gap-3">
              <Button
                color="default"
                isDisabled={isRefreshing || inCooldown}
                isLoading={isRefreshing}
                variant="flat"
                onPress={onRefreshStats}
              >
                {isRefreshing
                  ? 'Syncing…'
                  : inCooldown
                    ? `Try again in ${formatClock(secondsLeft)}`
                    : 'Refresh osu! stats'}
              </Button>
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {user.registered ? (
                <Chip color="success" variant="flat">
                  Registered for 3WC 2026
                </Chip>
              ) : (
                <Chip color="warning" variant="flat">
                  Not registered for 3WC 2026
                </Chip>
              )}
            </div>

            <Button as={Link} to="/register" variant="flat">
              {user.registered ? 'Modify registration' : 'Register'}
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
