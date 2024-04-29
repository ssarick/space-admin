import {
  onMounted,
  reactive,
  ref,
  watch
} from 'vue';
import { useDebounceFn } from '@vueuse/core';
import usePagination from '@/shared/composables/usePagination';
import { globalConfig } from '@/shared/config/global-config';
import { IDictionaryCommon } from '@/shared/types/common.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { excludeEmptyObjectValues } from '@/shared/utils/functions/object';
import MaskUtils from '@/shared/utils/mask-utils';
import { ApiAdmin, ApiDictionary } from '@/projects/b2b/shared/api';
import { IAdmin, IAdminSearchModel } from '@/projects/b2b/shared/types/admin.types';
import useAdminDelete from './useAdminDelete';
import useAdminFilterDefaults from './useAdminFilterDefaults';

export default function useAdminList() {
  const admins = ref<IAdmin[]>([]);
  const loading = ref<boolean>(false);
  const tableRef = useTableRef();
  const roles = ref<IDictionaryCommon[]>([]);
  const rolesLoading = ref(false);

  const {
    defaults,
    saveAdminFiltersRole
  } = useAdminFilterDefaults();

  const searchValues = reactive<
    IAdminSearchModel
  >(defaults);

  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const {
    showConfirmationDialog:
      onBeforeDeleteAdmin
  } = useAdminDelete(admins);

  const fetchAdmins = async () => {
    loading.value = true;

    const { items, totalPages } = await ApiAdmin
      .fetchAdmins(
        excludeEmptyObjectValues({
          ...searchValues,
          Phone: MaskUtils.unmaskPhone(
            searchValues.Phone
          ),
          pageNumber: pageNumber.value,
          pageSize: pageSize.value
        })
      );

    admins.value = items || [];
    pageCount.value = totalPages || 1;
    loading.value = false;
  };

  const debounceFetchAdmins = useDebounceFn(
    fetchAdmins,
    globalConfig.debounceInMS
  );

  const fetchRoles = async () => {
    rolesLoading.value = true;

    const { items } = await ApiDictionary
      .fetchAdminRoles();

    roles.value = items || [];
    rolesLoading.value = false;
  };

  watch(searchValues, () => {
    searchValues.RoleId
      && saveAdminFiltersRole(searchValues.RoleId);

    debounceFetchAdmins();
  });

  onMounted(() => {
    fetchRoles();
    fetchAdmins();
  });

  return {
    tableRef,
    admins,
    loading,
    fetchAdmins,
    onBeforeDeleteAdmin,
    searchValues,
    roles,
    rolesLoading
  };
}
