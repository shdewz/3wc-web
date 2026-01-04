import { title, subtitle } from '@components/primitives';
import { Button } from '@heroui/button';
import { Link } from 'react-router-dom';

import { useServerClockOffset } from '@/hooks/use-server-clock-offset';
import {
  isRegistrationOpenAt,
  nowWithOffset,
  registrationWindow,
} from '@/utils/registration';
import { formatMonthDay } from '@/utils/date-format';

export const IndexPage = () => {
  const { offsetMs } = useServerClockOffset();

  const now = offsetMs === null ? null : nowWithOffset(offsetMs);
  const open = now !== null && isRegistrationOpenAt(now);
  const upcoming = now !== null && now < registrationWindow.start;

  const startLabel = registrationWindow.start;

  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>Get ready for </span>
        <span className={title({ color: 'green' })}>3WC&nbsp;2026</span>
        <br />

        <div className={subtitle({ class: 'mt-4' })}>
          {offsetMs === null && <>Checking tournament status...</>}
          {offsetMs !== null && upcoming && (
            <>Coming {formatMonthDay(startLabel)}</>
          )}
          {offsetMs !== null && !open && !upcoming && <>Registrations closed</>}
        </div>

        <br />
        {open && (
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
