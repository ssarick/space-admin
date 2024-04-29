import {
  computed,
  h,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import {
  DataTableColumns,
  NButton,
  NPopover,
  NSpace,
  useMessage
} from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { FIELD_MASK } from '@/shared/utils/constants/field-mask';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { excludeEmptyObjectValues } from '@/shared/utils/functions/object';
import MaskUtils from '@/shared/utils/mask-utils';
import renderIcon from '@/shared/utils/render-icon';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser, IUserQueryParams } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';

export default function useClientsTable() {
  const toast = useMessage();
  const router = useRouter();
  const route = useRoute();
  const businessCode = route.params?.businessCode?.toString();
  const { t } = useI18n();
  const dataTable = ref<IUser[]>([]);
  const tableRef = useTableRef();
  const isLoading = ref(false);
  const isAddUserLoadingMap = ref({
  });
  const { user } = useAuthStore();
  const phoneFieldMask = FIELD_MASK.phone;

  const defaultSearchForm = {
    userLogin: null,
    userName: null,
    userPhone: null
  };

  const searchForm = reactive<IUserQueryParams>({
    ...defaultSearchForm
  });

  const isSearching = computed(() =>
    Object.values(searchForm).some((v) => !!v)
  );

  const onSearchUsers = () => {
    if (tableRef.value?.pagination) {
      tableRef.value.pagination.page = 1;
    }

    fetchUsers({
      ...searchForm
    });
  };

  const onClear = () => Object
    .assign(searchForm, defaultSearchForm);

  const onAddUser = async (row: IUser) => {
    isAddUserLoadingMap.value[row.userId || 0] = true;

    const { error } = await ApiUser.addExistUserToClient({
      path: {
        branch: user?.branch!,
        businessCode
      },
      body: {
        userId: +(row.userId || 0)
      }
    });

    isAddUserLoadingMap.value[row.userId || 0] = false;

    if (error) return;

    toast.success(t('User-added'));

    router.push({
      name: 'client-user-access-permissions',
      params: {
        businessCode,
        userId: row.userId
      }
    });
  };

  const rowProps = (row: IUser) => {
    return {
      style: 'cursor: pointer;',
      ondblclick: () => {
        onAddUser(row);
      }
    };
  };

  const columns = computed<DataTableColumns<IUser>>(() => [
    {
      title: t('Full-name-short'),
      key: 'fio'
    },
    {
      title: t('Login'),
      key: 'login'
    },
    {
      title: t('Document-series-and-number'),
      key: 'docSeries'
    },
    {
      title: t('Phone'),
      key: 'phone',
      render(row: IUser) {
        return formatPhoneNumber(row.phone || '');
      }
    },
    {
      title: t('Status'),
      key: 'stateId',
      render(row: IUser) {
        return stateMap.value[row.stateId!];
      }
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: '200px',
      render(row: IUser) {
        return [
          h(NSpace, {
            justify: 'center'
          }, () => [
            h(
              NPopover,
              {
                placement: 'top'
              },
              {
                trigger: () =>
                  h(NButton, {
                    type: 'info',
                    size: 'small',
                    circle: true,
                    quaternary: true,
                    renderIcon: renderIcon('people'),
                    onClick: (e) => {
                      e.stopPropagation();
                      goToUserDetail(row);
                    }
                  }),
                default: () => h('span', {
                }, t('User-data'))
              }
            ),
            h(
              NPopover,
              {
                placement: 'top'
              },
              {
                trigger: () =>
                  h(
                    NButton,
                    {
                      type: 'success',
                      size: 'small',
                      quaternary: true,
                      class: 'mx-1',
                      renderIcon: renderIcon('arrow-right'),
                      iconPlacement: 'right',
                      loading: isAddUserLoadingMap.value?.[row.userId || 0],
                      onClick: (e) => {
                        e.stopPropagation();

                        onAddUser(row);
                      }
                    },
                    () => t('Next')
                  ),
                default: () => h('span', {
                }, t('Add-user'))
              }
            )
          ])
        ];
      }
    }
  ]);

  const onClearAndSearchUsers = () => {
    onClear();
    onSearchUsers();
  };

  function goToUserDetail(row: IUser) {
    router.push({
      name: 'user-data-tabs',
      params: {
        userId: row.userId
      }
    });
  }

  async function fetchUsers(filterParams: IUserQueryParams = {
  }) {
    const pagination = tableRef.value?.pagination;

    const pageSize = pagination?.pageSize
      || globalConfig.pageSize;

    const queryParams: IUserQueryParams = {
      pageNumber: pagination?.page || 1,
      pageSize,
      excludeBranch: user?.branch!,
      excludeBusinessCode: businessCode,
      ...filterParams,
      userPhone: filterParams.userPhone
        ? MaskUtils.unmaskPhone(filterParams.userPhone)
        : undefined
    };

    isLoading.value = true;

    const { items, totalPages } = await ApiUser.fetchUsers({
      query: excludeEmptyObjectValues(queryParams)
    });

    isLoading.value = false;
    dataTable.value = items;

    if (tableRef.value?.pagination) {
      tableRef.value.pagination.pageCount = totalPages;
    }
  }

  watch(
    () => searchForm,
    useDebounceFn(onSearchUsers, globalConfig.debounceInMS),
    {
      deep: true
    }
  );

  onMounted(() => {
    fetchUsers();
  });

  return {
    isSearching,
    isLoading,
    rowProps,
    columns,
    dataTable,
    rowKey: (row: IUser) => row.userId || Math.random(),
    tableRef,
    fetchUsers,
    searchForm,
    onSearchUsers,
    onClear,
    phoneFieldMask,
    onClearAndSearchUsers
  };
}
