import React from 'react';
import Cookies from 'js-cookie';
import { Button, ButtonVariantProps } from '@heroui/react';
import { useAuth } from '@context/auth-context';
import { ConfirmActionButton } from '@components/common/confirm-button';
import { LinkIcon, UnlinkIcon } from '@components/icons';

type DiscordLinkActionProps = {
  size?: ButtonVariantProps['size'];
  variant?: ButtonVariantProps['variant'];
  className?: string;
  returnTo?: string;
};

export const DiscordLinkAction: React.FC<DiscordLinkActionProps> = ({
  size = 'sm',
  variant = 'flat',
  className,
  returnTo,
}) => {
  const { user, refresh } = useAuth();

  const startDiscordLink = () => {
    const rt = returnTo ?? window.location.href;

    window.location.assign(
      `/api/auth/discord/login?returnTo=${encodeURIComponent(rt)}`
    );
  };

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

  const isLinked = Boolean(user?.discord_id);

  if (isLinked) {
    return (
      <ConfirmActionButton
        className={className}
        color="default"
        confirmColor="danger"
        confirmText="Unlink"
        description={
          <>
            This will unlink your Discord account from your profile.
            <br />
            <span className="text-sm text-default-500">
              If you linked the wrong account, you can relink again with a
              different account.
            </span>
          </>
        }
        size={size}
        startContent={<UnlinkIcon />}
        title="Unlink Discord account?"
        variant={variant}
        onConfirm={unlinkDiscord}
      >
        Unlink
      </ConfirmActionButton>
    );
  }

  return (
    <Button
      className={className}
      size={size}
      startContent={<LinkIcon />}
      type="button"
      variant={variant}
      onPress={startDiscordLink}
    >
      Link
    </Button>
  );
};
