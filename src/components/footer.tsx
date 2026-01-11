import { Link } from '@heroui/react';

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-0.5 items-center justify-center pt-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] text-xs">
      <div className="flex items-center justify-center gap-3">
        {/* <Link className="text-xs font-bold" color="foreground" href="/">
          Terms
        </Link>
        <Link className="text-xs font-bold" color="foreground" href="/">
          Privacy Policy
        </Link> */}
        <Link
          isExternal
          className="text-xs font-bold"
          color="foreground"
          href="https://github.com/shdewz/3wc-web"
        >
          Source Code
        </Link>
        <Link
          isExternal
          className="text-xs font-bold"
          color="foreground"
          href="https://3wc.betteruptime.com"
        >
          Status
        </Link>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-default-600">© 2026 shdewz</span>
      </div>
    </footer>
  );
};
