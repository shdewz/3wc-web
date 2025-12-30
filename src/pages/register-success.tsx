import { Card, Button, Link as HeroUILink } from '@heroui/react';
import { title } from '@components/primitives';
import { Link } from 'react-router-dom';

import { useAuth } from '@/provider';
import { UserCard } from '@/components/common/user-card';

export const RegisterSuccessPage = () => {
  const { user } = useAuth();

  return (
    <section className="flex flex-col items-left justify-center gap-4 pb-8 sm:py-8 w-2xl">
      <div className="inline-block w-full text-left justify-center">
        <span className={title()}>Registration </span>
        <span className={title({ color: 'green' })}>Complete</span>

        <Card className="p-4 mt-6 w-full gap-3">
          <p>Your registration for 3WC 2026 has been recorded.</p>
          <UserCard
            discord={{
              id: user?.discord_id ?? null,
              username: user?.discord_username ?? null,
              avatar: user?.discord_avatar_url ?? null,
            }}
            locale="en"
            osu={{
              user_id: user?.user_id,
              username: user?.username,
              avatar_url: user?.avatar_url ?? null,
              global_rank: user?.global_rank ?? null,
              country_code: user?.country_code ?? null,
            }}
          />
          <p className="text-default-500">
            See the <HeroUILink href="/rules">rules&nbsp;page</HeroUILink> for
            more information about the registration process. You may modify your
            registration at any time by revisiting the registration page.
          </p>
          <div className="flex gap-3">
            <Button as={Link} color="primary" to="/" variant="flat">
              Go to Home
            </Button>
            <Button as={Link} to="/register" variant="flat">
              Modify your registration
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
