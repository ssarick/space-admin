import {
  computed,
  ref,
  watch
} from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { globalConfig } from '@/shared/config/global-config';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import UsersTable from '@/projects/b2b/features/users-table/UsersTable.vue';
import { IUserSearchModel } from '@/projects/b2b/shared/types/user.types';

export default function useUsers() {
  const tableRef = ref<
    InstanceType<typeof UsersTable> | null
  >(null);

  const phoneFieldMask = FIELD_MASK.phone;

  const defaultSearchForm: IUserSearchModel = {
    userLogin: null,
    userName: null,
    userPhone: null,
    userPidSN: null,
    userPidNumber: null
  };

  const searchForm = ref<IUserSearchModel>({
    ...defaultSearchForm
  });

  const isSearching = computed<boolean>(() =>
    Object.values(searchForm.value).some((v) => !!v)
  );

  const onClear = () =>
    (searchForm.value = {
      ...defaultSearchForm
    });

  const onSearchUsers = () => {
    if (tableRef.value?.tableRef?.pagination) {
      tableRef.value.tableRef.pagination.page = 1;
    }

    tableRef.value?.fetchUsers();
  };

  const onClearAndSearchUsers = () => {
    onClear();
    onSearchUsers();
  };

  watch(
    () => searchForm.value,
    useDebounceFn(onSearchUsers, globalConfig.debounceInMS),
    {
      deep: true
    }
  );

  return {
    searchForm,
    onClearAndSearchUsers,
    isSearching,
    onClear,
    tableRef,
    phoneFieldMask
  };
}
