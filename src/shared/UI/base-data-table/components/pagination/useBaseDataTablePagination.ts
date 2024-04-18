import { BaseDataTablePaginationProps } from './base-data-table-pagination.types';

export default function useBaseDataTablePagination(
  props: BaseDataTablePaginationProps
) {
  const pageInputValue = ref<string>('');

  const pagePlaceholder = computed<string>(
    () => props.pagination.page.toString()
  );

  const handlePageInputBlur = () => {
    const pageNumber = +pageInputValue.value;

    const {
      pageCount,
      onUpdatePage
    } = props.pagination;

    if (pageCount < pageNumber || !pageNumber) {
      pageInputValue.value = '';
    } else {
      typeof onUpdatePage === 'function'
        && onUpdatePage?.(pageNumber);
    }
  };

  return {
    pageInputValue,
    pagePlaceholder,
    handlePageInputBlur
  };
}
