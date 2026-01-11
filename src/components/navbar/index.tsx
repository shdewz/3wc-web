import { useCallback, useMemo, useState } from 'react';
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
} from '@heroui/react';
import { siteConfig } from '@config/site';
import { NavbarMenu } from '@components/navbar/navbar-menu';
import { Brand } from '@components/common/brand';
import { NavbarAvatar } from '@components/navbar/navbar-avatar';
import { LoginButton } from '@components/navbar/navbar-login-button';
import { useAuth } from '@context/auth-context';
import { useRegistrationWindow } from '@hooks/use-registration-window';
import { SocialLinks } from '@components/common/social-links';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  const state = useRegistrationWindow();

  const navItems = useMemo(() => {
    return siteConfig.navItems.filter((item) => {
      if (!item.visibleWhen) return true;
      if (state.initializing || state.loading) return false;

      return item.visibleWhen(state);
    });
  }, [state.initializing, state.loading, state.open]);

  const onMenuOpenChange = useCallback((open: boolean) => {
    setIsMenuOpen(open);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  return (
    <HeroUINavbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={onMenuOpenChange}
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

        {navItems.map((item, index) => (
          <NavbarItem key={`${item.label}-${index}`}>
            <Link color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent className="hidden sm:flex items-center" justify="end">
        <SocialLinks className="mr-2" gap={2} size="sm" />
        {user?.user_id ? <NavbarAvatar /> : <LoginButton />}
      </NavbarContent>

      <NavbarMenu onClose={handleCloseMenu} />
    </HeroUINavbar>
  );
};
