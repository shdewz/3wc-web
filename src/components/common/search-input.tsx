import { Input, Kbd } from '@heroui/react';
import { ChangeEventHandler, useRef } from 'react';

import { useDetectPlatform } from '@/hooks/use-detect-platform';
import { useGlobalShortcut } from '@/hooks/use-global-shortcut';
import { SearchIcon } from '@/components/icons';

export const SearchInput = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
}) => {
  const isMac = useDetectPlatform();
  const inputRef = useRef<HTMLInputElement>(null);

  useGlobalShortcut(
    () => {
      // Focus the input wrapper or input: HeroUI's Input forwards the ref to the native <input>
      inputRef.current?.focus();
    },
    'k',
    { isMac }
  );

  const shortcutHint = (
    <div className="hidden lg:flex items-center gap-1 text-foreground-400">
      {!isMac && (
        <Kbd className="font-mono px-2 pointer-events-none select-none">
          Ctrl
        </Kbd>
      )}
      {/* {isMac ? null : '+'} */}
      <Kbd
        className="font-mono px-2 pointer-events-none select-none"
        keys={isMac ? ['command'] : undefined}
      >
        K
      </Kbd>
    </div>
  );

  return (
    <Input
      ref={inputRef}
      aria-label="Search"
      classNames={{
        input: 'text-sm',
      }}
      endContent={shortcutHint}
      labelPlacement="outside"
      placeholder="Search..."
      startContent={<SearchIcon />}
      type="search"
      variant="faded"
      onChange={onChange}
    />
  );
};
