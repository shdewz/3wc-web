import { title, subtitle } from '@components/primitives';

export const IndexPage = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 h-full md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>Get ready for </span>
        <span className={title({ color: 'green' })}>3WC&nbsp;2026</span>
        <br />
        <div className={subtitle({ class: 'mt-4' })}>Coming January 3</div>
      </div>
    </section>
  );
};
