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

export const NavbarMenu = () => {
  const { user, logout } = useAuth();

  return (
    <HeroUINavbarMenu>
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
