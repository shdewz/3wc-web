import { Link, NavbarBrand } from '@heroui/react';
import { Logo } from '@components/icons';

export const Brand = () => {
  return (
    <NavbarBrand>
      <Link className="flex gap-2" color="foreground" href="/">
        <Logo />
        <p className="font-bold text-inherit">3WC</p>
      </Link>
    </NavbarBrand>
  );
};
