import { Link } from '@heroui/react';

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col gap-0.5 items-center justify-center py-3 text-xs">
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
      </div>
      <div className="flex items-center justify-center">
        <span className="text-default-600">© 2026 shdewz</span>
      </div>
    </footer>
  );
};
