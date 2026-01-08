import { title } from '@components/primitives';
import { Alert, Button, Card, Divider, Switch } from '@heroui/react';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { UserCard } from '@components/common/user-card';
import { ConfirmActionButton } from '@components/common/confirm-button';
import { useAuth } from '@context/auth-context';

export const RegisterPage = () => {
  const { user, refresh } = useAuth();

  const [wantsCaptain, setWantsCaptain] = useState(
    user?.wants_captain ?? false
  );
  const [readRules, setReadRules] = useState(false);

  const rank = user?.global_rank ?? 0;
  const isRankInRange = rank >= 100 && rank <= 999;

  const discordLinked = Boolean(user?.discord_id);
  const canSubmit = Boolean(user) && readRules && discordLinked;

  const startDiscordLink = () => {
    const returnTo = window.location.href;

    window.location.assign(
      `/api/auth/discord/login?returnTo=${encodeURIComponent(returnTo)}`
    );
  };

  const csrf = Cookies.get('csrf_token') ?? '';

  const unlinkDiscord = async () => {
    const csrf = Cookies.get('csrf_token') ?? '';
    const resp = await fetch('/api/auth/discord/unlink', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf,
      },
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => 'Unknown error');

      throw new Error(text);
    }

    await refresh();
  };

  const unregister = async () => {
    const csrf = Cookies.get('csrf_token') ?? '';
    const resp = await fetch('/api/unregister', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrf,
      },
    });

    if (!resp.ok) {
      const text = await resp.text().catch(() => 'Unknown error');

      throw new Error(text);
    }

    await refresh();
  };

  return (
    <section className="flex flex-col items-start justify-center gap-4 pb-8 sm:py-8 max-w-2xl">
      <div className="inline-block w-full text-left justify-center">
        {user?.registered ? (
          <>
            <span className={title()}>Modify your registration</span>
          </>
        ) : (
          <>
            <span className={title()}>Register for </span>
            <span className={title({ color: 'green' })}>3WC&nbsp;2026</span>
          </>
        )}

        <Card className="p-3 mt-6 w-full flex flex-col gap-3 items-center">
          <form
            noValidate
            action="/api/register"
            className="flex flex-col gap-3 w-full"
            method="post"
          >
            <UserCard
              discord={{
                id: user?.discord_id ?? null,
                username: user?.discord_username ?? null,
                avatar: user?.discord_avatar_url ?? null,
              }}
              discordAction={
                user?.discord_id ? (
                  <ConfirmActionButton
                    color="default"
                    confirmColor="danger"
                    confirmText="Unlink"
                    description={
                      <>
                        This will unlink your Discord account from your profile.
                        <br />
                        <span className="text-sm text-default-500">
                          If you linked the wrong account, you can relink again
                          with a different account.
                        </span>
                      </>
                    }
                    size="sm"
                    title="Unlink Discord account?"
                    variant="flat"
                    onConfirm={unlinkDiscord}
                  >
                    Unlink
                  </ConfirmActionButton>
                ) : (
                  <Button
                    size="sm"
                    type="button"
                    variant="flat"
                    onPress={startDiscordLink}
                  >
                    Link
                  </Button>
                )
              }
              locale="en"
              osu={{
                user_id: user?.user_id,
                username: user?.username,
                avatar_url: user?.avatar_url ?? null,
                global_rank: user?.global_rank ?? null,
                country_code: user?.country_code ?? null,
              }}
            />

            {!discordLinked && (
              <Alert
                title="You need to link your Discord account to register."
                variant="flat"
              />
            )}

            {Boolean(rank) && !isRankInRange && (
              <Alert
                color="warning"
                description="Don't worry, you can still register. If you are still outside the rank range when registrations close, your registration will be removed."
                title="You are not in the rank range!"
                variant="flat"
              />
            )}

            <Divider className="my-3" />
            <Switch
              color="primary"
              isSelected={wantsCaptain}
              onValueChange={setWantsCaptain}
            >
              I am ok with being a captain
            </Switch>
            <Switch
              color="primary"
              isSelected={readRules}
              onValueChange={setReadRules}
            >
              I have read the rules
            </Switch>

            <input name="csrf_token" type="hidden" value={csrf} />
            <input
              name="wants_captain"
              type="hidden"
              value={wantsCaptain ? 'true' : 'false'}
            />
            <input
              name="read_rules"
              type="hidden"
              value={readRules ? 'true' : 'false'}
            />

            <Divider className="my-3" />

            <Button
              className="w-full font-bold"
              color="primary"
              isDisabled={!canSubmit}
              type="submit"
            >
              {user?.registered ? 'Update registration' : 'Register!'}
            </Button>
            {user?.registered && (
              <ConfirmActionButton
                className="w-full font-bold"
                color="danger"
                confirmColor="danger"
                confirmText="Remove"
                description={
                  <>
                    This will remove your registration for 3WC 2026.
                    <br />
                    <span className="text-sm text-default-500">
                      You can re-register later by re-opening the registration
                      page if the registration period is still open.
                    </span>
                  </>
                }
                title="Remove registration?"
                variant="flat"
                onConfirm={unregister}
              >
                Remove registration
              </ConfirmActionButton>
            )}
          </form>
        </Card>
      </div>
    </section>
  );
};
