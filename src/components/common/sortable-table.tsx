import React, { useCallback } from 'react';
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
import type { SortDescriptor } from '@react-types/shared';
import { useSortableData } from '@hooks/use-sortable-data';

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
  defaultSortDescriptor?: SortDescriptor;
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
  const { sortedItems, sortDescriptor, onSortChange } = useSortableData({
    items,
    defaultSortDescriptor,
    numericKeys,
  });

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
      sortDescriptor={sortDescriptor}
      onSortChange={onSortChange}
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
        items={sortedItems}
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
