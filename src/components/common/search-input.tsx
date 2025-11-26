import { Input } from '@heroui/react';
import { ChangeEventHandler } from 'react';

import { SearchIcon } from '@/components/icons';

export const SearchInput = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-50 focus-within:bg-default-200',
        input: 'text-sm',
      }}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={<SearchIcon />}
      type="search"
      variant="flat"
      onChange={onChange}
    />
  );
};
