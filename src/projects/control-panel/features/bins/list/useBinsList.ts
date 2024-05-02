import { ref } from 'vue';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { TerminalInfo } from '@/projects/control-panel/shared/types/terminals.types';
import { ApiInventoryUsers } from '@/projects/inventory/shared/api';

export default function useBinsList() {
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const terminals = ref<TerminalInfo[]>([]);
  const terminalsLoading = ref(false);
  const filtersModal = ref(false);

  const fetchTerminals = async () => {
    terminalsLoading.value = true;

    const { totalPages } = await ApiInventoryUsers.fetchUsers({
      page: pageNumber.value,
      count: pageSize.value
    });

    // users.value = items || [];
    pageCount.value = totalPages || 0;
    terminalsLoading.value = false;
  };

  const showModal = () =>
    filtersModal.value = true;

  const closeModal = () =>
    filtersModal.value = false;

  return {
    terminals,
    terminalsLoading,
    tableRef,
    filtersModal,
    showModal,
    closeModal,
    fetchTerminals
  };
}
