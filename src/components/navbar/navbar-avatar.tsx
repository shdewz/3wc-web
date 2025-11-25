import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@heroui/react';

import { LogOutIcon, UserSettingsIcon } from '@/components/icons';

export const NavbarAvatar = () => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          showFallback
          className="transition-transform"
          color="default"
          name="Unknown"
          size="md"
          src="https://a.ppy.sh/1"
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="text-default-600 italic text-xs">Signed in as</p>
          <p className="font-semibold">Unknown</p>
        </DropdownItem>
        <DropdownItem key="settings" startContent={<UserSettingsIcon />}>
          Settings
        </DropdownItem>
        <DropdownItem
          key="logout"
          className="text-danger"
          color="danger"
          startContent={<LogOutIcon />}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
