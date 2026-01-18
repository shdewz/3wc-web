import { useCallback, useEffect, useMemo, useState } from 'react';
import type { SortDescriptor } from '@react-types/shared';

export type SortableDataOptions<T> = {
  items: T[];
  defaultSortDescriptor?: SortDescriptor;
  numericKeys?: (keyof T)[];
};

export const useSortableData = <T extends Record<string, any>>({
  items,
  defaultSortDescriptor,
  numericKeys = [] as (keyof T)[],
}: SortableDataOptions<T>) => {
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >(defaultSortDescriptor);

  useEffect(() => {
    if (!sortDescriptor?.column && defaultSortDescriptor?.column) {
      setSortDescriptor(defaultSortDescriptor);
    }
  }, [defaultSortDescriptor, sortDescriptor?.column]);

  const onSortChange = useCallback((descriptor: SortDescriptor) => {
    setSortDescriptor(descriptor);
  }, []);

  const sortedItems = useMemo(() => {
    if (!sortDescriptor?.column) return items ?? [];

    const { column, direction } = sortDescriptor;
    const col = column as keyof T;

    return [...(items ?? [])].sort((a, b) => {
      const first = a[col];
      const second = b[col];

      const isUnknownA =
        first === null ||
        first === undefined ||
        first === '' ||
        first === 'unknown';
      const isUnknownB =
        second === null ||
        second === undefined ||
        second === '' ||
        second === 'unknown';

      if (isUnknownA && !isUnknownB) return 1;
      if (!isUnknownA && isUnknownB) return -1;
      if (isUnknownA && isUnknownB) return 0;

      const isNumeric = numericKeys.includes(col);

      if (isNumeric) {
        const aNum = Number(first);
        const bNum = Number(second);
        const cmp = aNum === bNum ? 0 : aNum < bNum ? -1 : 1;

        return direction === 'descending' ? -cmp : cmp;
      }

      const cmp = String(first).localeCompare(String(second), undefined, {
        numeric: true,
        sensitivity: 'base',
      });

      return direction === 'descending' ? -cmp : cmp;
    });
  }, [items, numericKeys, sortDescriptor]);

  return { sortedItems, sortDescriptor, onSortChange };
};
