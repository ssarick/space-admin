import {
  computed,
  h,
  onMounted,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import {
  DataTableColumns,
  NButton,
  NPopover
} from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDate } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';

export default function useClientsTable() {
  const router = useRouter();
  const route = useRoute();
  const { user } = useAuthStore();
  const businessCode = route.params?.businessCode?.toString();
  const { t } = useI18n();
  const dataTable = ref<IUser[]>([]);
  const tableRef = useTableRef();
  const isLoading = ref(false);

  const rowProps = (row: IUser) => {
    return {
      style: 'cursor: pointer;',
      ondblclick: () => {
        goToUserDataTabs(row);
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
      title: t('AuthRole'),
      key: 'role'
    },
    {
      title: t('User-creation-date'),
      key: 'createDate',
      render: (row: IUser) => formatDate(row.createDate || '')
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
      width: '120px',
      render(row: IUser) {
        return [
          h(
            NPopover,
            {
              placement: 'top'
            },
            {
              trigger: () =>
                h(NButton, {
                  onClick: (e) => {
                    e.stopPropagation();
                    goToUserDataTabs(row);
                  },
                  type: 'success',
                  size: 'small',
                  circle: true,
                  quaternary: true,
                  class: 'mx-1',
                  renderIcon: renderIcon('order-details')
                }),
              default: () => h('span', {
              }, t('User-data'))
            }
          )
        ];
      }
    }
  ]);

  function goToUserDataTabs(row: IUser) {
    router.push({
      name: 'user-data-tabs',
      params: {
        userId: row.userId
      },
      query: {
        clientId: businessCode
      }
    });
  }

  async function fetchClientUsers() {
    const pagination = tableRef.value?.pagination;

    const pageSize = pagination?.pageSize
      || globalConfig.pageSize;

    const queryParams = {
      pageNumber: pagination?.page || 1,
      pageSize
    };

    isLoading.value = true;

    const { items, totalPages } = await ApiUser.fetchClientUsers({
      path: {
        branch: user?.branch!,
        businessCode: businessCode
      },
      query: queryParams
    });

    isLoading.value = false;
    dataTable.value = items;

    if (tableRef.value?.pagination) {
      tableRef.value.pagination.pageCount = totalPages;
    }
  }

  onMounted(() => {
    fetchClientUsers();
  });

  return {
    isLoading,
    rowProps,
    columns,
    dataTable,
    rowKey: (row: IUser) => row.userId || Math.random(),
    tableRef,
    fetchClientUsers
  };
}
