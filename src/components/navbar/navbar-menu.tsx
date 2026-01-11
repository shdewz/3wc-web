import {
  Link,
  NavbarMenu as HeroUINavbarMenu,
  NavbarMenuItem,
  Divider,
  Card,
  Button,
  Avatar,
} from '@heroui/react';
import { siteConfig } from '@config/site';
import { LoginButton } from '@components/navbar/navbar-login-button';
import { LogOutIcon } from '@components/icons';
import { useAuth } from '@context/auth-context';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationWindow } from '@hooks/use-registration-window';
import { SocialLinks } from '@components/common/social-links';

type NavbarMenuProps = {
  onClose: () => void;
};

export const NavbarMenu: React.FC<NavbarMenuProps> = ({ onClose }) => {
  const { user, logout } = useAuth();
  const state = useRegistrationWindow();
  const navigate = useNavigate();

  const navItems = useMemo(() => {
    return siteConfig.navMenuItems.filter((item) => {
      if (!item.visibleWhen) return true;
      if (state.initializing || state.loading) return false;

      return item.visibleWhen(state);
    });
  }, [state.initializing, state.loading, state.open]);

  const handleNavigate = (href: string) => {
    onClose();
    navigate(href);
  };

  return (
    <HeroUINavbarMenu>
      <div className="flex min-h-full flex-col gap-4 p-4">
        {user ? (
          <Card className="p-4 flex flex-row gap-4">
            <Avatar
              isBordered
              showFallback
              className="transition-transform"
              color="default"
              name={user?.username ?? undefined}
              size="md"
              src={user?.avatar_url}
            />
            <div className="flex items-center justify-between grow">
              <div className="flex flex-col">
                <p className="text-default-600 italic text-xs">Signed in as</p>
                <p className="font-semibold">{user?.username ?? 'Unknown'}</p>
              </div>
              <Button isIconOnly color="danger" variant="flat" onPress={logout}>
                <LogOutIcon />
              </Button>
            </div>
          </Card>
        ) : (
          <LoginButton />
        )}

        <Divider />

        {navItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              size="lg"
              onPress={() => handleNavigate(item.href)}
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}

        <Divider />

        <div className="flex justify-center">
          <SocialLinks gap={4} size="md" />
        </div>
      </div>
    </HeroUINavbarMenu>
  );
};
