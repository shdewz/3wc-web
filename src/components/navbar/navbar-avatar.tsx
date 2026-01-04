import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';
import { LogOutIcon } from '@components/icons';

import { useAuth } from '@/provider';

export const NavbarAvatar = () => {
  const { user, logout } = useAuth();

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          className="transition-transform cursor-pointer"
          color="default"
          name={user?.username ?? undefined}
          size="md"
          src={user?.avatar_url}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem
          key="profile"
          isReadOnly
          className="h-14 gap-2 pointer-events-none"
        >
          <p className="text-default-600 italic text-xs">Signed in as</p>
          <p className="font-semibold">{user?.username ?? 'Unknown'}</p>
        </DropdownItem>
        {/* <DropdownItem key="settings" startContent={<UserSettingsIcon />}>
          Settings
        </DropdownItem> */}
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogOutIcon />}
          onClick={logout}
        >
          Log out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
