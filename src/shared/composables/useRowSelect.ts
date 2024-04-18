import { Ref, WritableComputedRef } from 'vue';

export default function useRowSelect<
  T,
  K extends keyof T
>(
  selectedRows: Ref<T[]> | WritableComputedRef<T[]>,
  key?: K
) {
  const inRows = (
    row: T,
    rows?: T[] | null
  ): boolean => !!(
    key
      ? rows?.some(
        _row => _row[key] === row[key]
      )
      : rows?.includes(row)
  );

  const addToSelectedRows = (
    row: T
  ) => {
    selectedRows.value = [
      ...(selectedRows.value || []),
      row
    ];
  };

  const removeFromSelectedRows = (
    row: T
  ) => {
    selectedRows.value = key
      ? selectedRows.value?.filter(
        _row => _row[key] !== row[key]
      )
      : selectedRows.value?.filter(
        _row => _row !== row
      );
  };

  const toggleSelectedRow = (row: T) =>
    (inRows(row, selectedRows.value)
      ? removeFromSelectedRows
      : addToSelectedRows)(row);

  return {
    toggleSelectedRow,
    inRows
  };
}
