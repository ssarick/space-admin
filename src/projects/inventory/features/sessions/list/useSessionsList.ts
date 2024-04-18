import { onMounted, ref } from 'vue';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';
import type { InventorySession } from '@/projects/inventory/shared/types/sessions.types';

export default function useSessionsList() {
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const sessions = ref<InventorySession[]>([]);
  const sessionsLoading = ref(false);
  const confirmModalShow = ref(false);
  const confirmModalData = ref<InventorySession>();

  const openSessionModal = (payload: boolean) => {
    confirmModalShow.value = payload;
  };

  const setSessionData = (payload: InventorySession) => {
    confirmModalData.value = payload;
  };

  const handleSessionFinish = async () => {
    sessionsLoading.value = true;

    await ApiInventorySessions.finishInventorySession(
      confirmModalData.value?.id
    );

    sessionsLoading.value = false;
    confirmModalShow.value = false;

    await fetchSessions();
  };

  const fetchSessions = async () => {
    sessionsLoading.value = true;

    const {
      totalPages,
      items,
      error
    } = await ApiInventorySessions.fetchSessions({
      page: pageNumber.value,
      count: pageSize.value
    });

    sessionsLoading.value = false;
    if (error) return;

    sessions.value = items;
    pageCount.value = totalPages;
  };

  onMounted(fetchSessions);

  return {
    sessions,
    sessionsLoading,
    tableRef,
    confirmModalData,
    confirmModalShow,
    fetchSessions,
    openSessionModal,
    setSessionData,
    handleSessionFinish
  };
}
