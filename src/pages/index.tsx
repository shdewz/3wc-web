import { title, subtitle } from '@components/primitives';
import { Button, Link } from '@heroui/react';
import { useRegistrationWindow } from '@hooks/use-registration-window';

export const IndexPage = () => {
  const { initializing, loading, error, open, upcoming, closed, startLabel } =
    useRegistrationWindow();

  const showChecking = initializing || loading;

  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>Get ready for </span>
        <span className={title({ color: 'green' })}>3WC&nbsp;2026</span>
        <br />

        <div className={subtitle({ class: 'mt-4' })}>
          {showChecking && <>...</>}
          {!showChecking && error && <>Could not load status</>}
          {!showChecking && !error && upcoming && <>Coming {startLabel}</>}
          {!showChecking && !error && closed && <>Registrations closed</>}
        </div>

        <br />
        {!showChecking && !error && open && (
          <Button
            as={Link}
            className="px-8 font-bold"
            color="primary"
            href="/register"
            variant="shadow"
          >
            Register now!
          </Button>
        )}
      </div>
    </section>
  );
};
