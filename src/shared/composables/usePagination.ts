import { computed, Ref } from 'vue';
import { globalConfig } from '../config/global-config';
import {
  DataTableRef,
  IDataTableExpose,
  IDataTablePagination
} from '../types/data-table.types';
import { PickEqual } from '../types/utility.types';

export default function usePagination(
  tableRef: DataTableRef
) {
  const pagination = computed<
    IDataTablePagination | undefined
  >(() => hasPaginationInFirstDepth(tableRef)
    ? tableRef.value?.pagination
    : tableRef.value?.tableRef?.pagination);

  const createPaginationRef = (
    prop: keyof PickEqual<IDataTablePagination, number>,
    defaultValue: number = 1
  ) => computed<number>({
    get: () => (pagination.value
      && pagination.value[prop])
      || defaultValue,
    set: (value: number) => {
      if (pagination.value) {
        pagination.value[prop] = value;
      }
    }
  });

  const pageNumber = createPaginationRef('page');
  const pageCount = createPaginationRef('pageCount');

  const pageSize = createPaginationRef(
    'pageSize', globalConfig.pageSize
  );

  const resetPagination = () => {
    pageNumber.value = 1;
    pageCount.value = 1;
    pageSize.value = globalConfig.pageSize;
  };

  function hasPaginationInFirstDepth(
    payload: DataTableRef
  ): payload is Ref<IDataTableExpose> {
    return !!(
      payload.value as IDataTableExpose
    )?.pagination;
  }

  return {
    pageNumber,
    pageSize,
    pageCount,
    resetPagination
  };
}
