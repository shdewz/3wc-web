import { title, subtitle } from '@components/primitives';
import { Button } from '@heroui/button';
import { Link } from '@heroui/react';

export const IndexPage = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>Get ready for </span>
        <span className={title({ color: 'green' })}>3WC&nbsp;2026</span>
        <br />
        <div className={subtitle({ class: 'mt-4' })}>Coming January 11</div>
        <br />
        <Button
          as={Link}
          className="px-8 font-bold"
          color="primary"
          href="/register"
          variant="shadow"
        >
          Register now!
        </Button>
      </div>
    </section>
  );
};
