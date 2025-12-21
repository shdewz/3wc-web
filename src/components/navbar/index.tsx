import { useState } from 'react';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
} from '@heroui/react';

import { NavbarMenu } from '@/components/navbar/navbar-menu';
import { siteConfig } from '@/config/site';
import { Brand } from '@/components/common/brand';
import { NavbarAvatar } from '@/components/navbar/navbar-avatar';
import { useAuth } from '@/provider';
import { LoginButton } from '@/components/navbar/navbar-login-button';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <HeroUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <Brand />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Brand />

        {siteConfig.navItems.map((item, index) => (
          <NavbarItem key={`${item.label}-${index}`}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="end">
        {user?.user_id ? <NavbarAvatar /> : <LoginButton />}
      </NavbarContent>

      <NavbarMenu />
    </HeroUINavbar>
  );
};
