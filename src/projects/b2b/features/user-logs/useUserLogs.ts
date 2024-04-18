import { onMounted, Ref, ref } from 'vue';
import usePagination from '@/shared/composables/usePagination';
import { DataTableRefPagination } from '@/shared/types/data-table.types';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUserLog } from '@/projects/b2b/shared/types/user.types';
import { IUserLogsProps } from './user-logs.types';

export default function useUserLogs(
  props: IUserLogsProps
) {
  const logs = ref<IUserLog[]>([]);
  const loading = ref(false);

  const tableRef = ref<
    DataTableRefPagination | null
  >(null) as Ref<DataTableRefPagination | null>;

  const {
    pageNumber,
    pageSize,
    pageCount
  } = usePagination(tableRef);

  const fetchUserLogs = async () => {
    if (!props.userId) return;

    loading.value = true;

    const { items, totalPages } = await ApiUser
      .fetchUserLogs({
        userId: props.userId,
        pageNumber: pageNumber.value,
        pageSize: pageSize.value
      });

    logs.value = items || [];
    pageCount.value = totalPages || 1;
    loading.value = false;
  };

  onMounted(() => {
    fetchUserLogs();
  });

  return {
    logs,
    loading,
    tableRef,
    fetchUserLogs
  };
}
