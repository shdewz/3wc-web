import {
  Link,
  NavbarMenu as HeroUINavbarMenu,
  NavbarMenuItem,
} from '@heroui/react';

import { siteConfig } from '@/config/site';

export const NavbarMenu = () => {
  return (
    <HeroUINavbarMenu>
      {siteConfig.navItems.map((item, index) => (
        <NavbarMenuItem key={`${item.label}-${index}`}>
          <Link
            className="w-full"
            color="foreground"
            href={item.href}
            size="lg"
          >
            {item.label}
          </Link>
        </NavbarMenuItem>
      ))}
    </HeroUINavbarMenu>
  );
};
