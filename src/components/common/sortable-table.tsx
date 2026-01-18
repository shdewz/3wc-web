import React, { useCallback, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  getKeyValue,
} from '@heroui/react';
import { useAsyncList } from '@react-stately/data';

export type Column<T> = {
  key: Extract<keyof T, string | number>;
  label: string;
  allowSorting?: boolean;
  align?: 'start' | 'center' | 'end';
};

type SortableTableProps<T extends Record<string, any>> = {
  items: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyContent?: React.ReactNode;
  defaultSortDescriptor?: any;
  getRowKey?: (item: T, index: number) => string | number;
  renderCell?: (
    item: T,
    columnKey: Extract<keyof T, string | number>,
    value: any
  ) => React.ReactNode;
  numericKeys?: (keyof T)[];
};

export const SortableTable = <T extends Record<string, any>>({
  items,
  columns,
  isLoading = false,
  emptyContent = 'No data',
  defaultSortDescriptor,
  getRowKey,
  renderCell: customRenderCell,
  numericKeys = [] as (keyof T)[],
}: SortableTableProps<T>) => {
  const list = useAsyncList<T>({
    async load() {
      return { items: items ?? [] };
    },
    async sort({ items, sortDescriptor }) {
      const { column, direction } = sortDescriptor;

      if (!column) return { items };
      const col = column as keyof T;

      const sorted = [...items].sort((a, b) => {
        const first = a[col];
        const second = b[col];

        // sort unknown/empty last
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

      return { items: sorted };
    },
  });

  useEffect(() => {
    list.setSelectedKeys('all');
    list.setSelectedKeys(new Set());
    list.setFilterText('');
    list.reload();

    if (defaultSortDescriptor) {
      list.sort(defaultSortDescriptor);
    }
  }, [JSON.stringify(items)]);

  const renderCell = useCallback(
    (item: T, columnKey: Extract<keyof T, string | number>) => {
      const cellValue = getKeyValue(item, columnKey);

      if (customRenderCell) {
        return customRenderCell(item, columnKey, cellValue);
      }

      return cellValue;
    },
    [customRenderCell]
  );

  return (
    <Table
      isStriped
      aria-label="Sortable table"
      className="table-rounded-striped"
      classNames={{
        tbody: '[&_tr:nth-child(odd)_td]:bg-content2',
      }}
      sortDescriptor={list.sortDescriptor}
      onSortChange={list.sort}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={String(column.key)}
            align={column.align ?? 'start'}
            allowsSorting={column.allowSorting ?? true}
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody
        emptyContent={emptyContent}
        isLoading={isLoading}
        items={list.items}
        loadingContent={<Spinner label="Loading..." />}
      >
        {(item) => (
          <TableRow key={getRowKey ? getRowKey(item, 0) : (item as any).id}>
            {(columnKey) => (
              <TableCell>
                {renderCell(
                  item,
                  columnKey as Extract<keyof T, string | number>
                )}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
