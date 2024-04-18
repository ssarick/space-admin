import { onMounted, ref } from 'vue';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiInventoryUsers } from '@/projects/inventory/shared/api';
import type{ InventoryUser } from '@/projects/inventory/shared/types/users.types';

export default function useUsersList() {
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const users = ref<InventoryUser[]>([]);
  const usersLoading = ref(false);

  const fetchUsers = async () => {
    usersLoading.value = true;

    const {
      items,
      totalPages
    } = await ApiInventoryUsers.fetchUsers({
      page: pageNumber.value,
      count: pageSize.value
    });

    users.value = items || [];
    pageCount.value = totalPages || 0;
    usersLoading.value = false;
  };

  onMounted(fetchUsers);

  return {
    users,
    usersLoading,
    tableRef,
    fetchUsers
  };
}
