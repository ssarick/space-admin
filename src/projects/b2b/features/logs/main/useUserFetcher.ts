import { Ref, ref } from 'vue';
import usePagination from '@/shared/composables/usePagination';
import { DataTableRefPagination } from '@/shared/types/data-table.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import MaskUtils from '@/shared/utils/mask-utils';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ILogsModel } from '@/projects/b2b/pages/logs/logs-page.types';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import { IUser } from '@/projects/b2b/shared/types/user.types';

export default function useUserFetcher(
  model: ILogsModel,
  selectedClient?: Ref<IClient | null>,
  useClientFetcher: boolean = false
) {
  const users = ref<IUser[]>([]);
  const usersLoading = ref(false);
  const usersTableRef = useTableRef();
  const { user } = useAuthStore();

  const {
    pageNumber,
    pageSize,
    pageCount,
    resetPagination
  } = usePagination(
    usersTableRef as Ref<DataTableRefPagination | null>
  );

  const fetchUsersByFilters = () => ApiUser
    .fetchUsers({
      query: {
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        userLogin: model.userLogin || undefined,
        userName: model.userName || undefined,
        userPhone: model.userPhone
          ? MaskUtils.unmaskPhone(model.userPhone)
          : undefined,
        userPidNumber: model.userPidNumber || undefined,
        userPidSN: model.userPidSN || undefined
      }
    });

  const fetchUsersByClient = () => ApiUser
    .fetchClientUsers({
      query: {
        pageNumber: pageNumber.value,
        pageSize: pageSize.value
      },
      path: {
        branch: user?.branch!,
        businessCode: selectedClient
          ?.value
          ?.clientCode || ''
      }
    });

  const fetchUsers = async () => {
    usersLoading.value = true;

    const { items, totalPages } = await (
      useClientFetcher
        ? fetchUsersByClient
        : fetchUsersByFilters)();

    users.value = items || [];
    pageCount.value = totalPages || 1;
    usersLoading.value = false;
  };

  return {
    users,
    usersLoading,
    fetchUsers,
    usersTableRef,
    resetUsersPagination: resetPagination
  };
}
