import { IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import useTableRef from '../useTableRef';

export default function useBaseDataTablePagination<
  T = void
>(
  tableRef: ReturnType<typeof useTableRef>,
  loadData: (pagination?: IPagination) =>
  Promise<IResponseData<T>>
) {
  const loadPaginatedData = async (
    pagination?: IPagination
  ) => {
    const { totalPages } = await loadData({
      pageNumber: tableRef.value?.pagination?.page,
      pageSize: tableRef.value?.pagination?.pageSize,
      ...(pagination || {
      })
    });

    if (tableRef.value?.pagination) {
      tableRef.value.pagination.pageCount =
        totalPages || 1;
    }
  };

  const onPageNumberUpdated = async (
    pageNumber: number
  ) => loadPaginatedData({
    pageNumber
  });

  const onPageSizeUpdated = async (
    pageSize: number
  ) => loadPaginatedData({
    pageNumber: 1,
    pageSize
  });

  return {
    tableRef,
    loadPaginatedData,
    onPageNumberUpdated,
    onPageSizeUpdated
  };
}
