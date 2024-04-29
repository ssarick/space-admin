import {
  computed,
  h,
  onMounted,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import {
  DataTableColumns,
  NButton,
  NPopover
} from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatPhoneNumber } from '@/shared/utils/functions';
import { formatDate } from '@/shared/utils/functions/date';
import { excludeEmptyObjectValues } from '@/shared/utils/functions/object';
import MaskUtils from '@/shared/utils/mask-utils';
import renderIcon from '@/shared/utils/render-icon';
import { ApiUser } from '@/projects/b2b/shared/api';
import { IUser, IUserQueryParams } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { IUsersTableProps } from './users-table.types';

export default function useClientsTable(
  props: IUsersTableProps
) {
  const { t } = useI18n();
  const dataTable = ref<IUser[]>([]);
  const tableRef = useTableRef();
  const isLoading = ref(false);
  const router = useRouter();

  const redirectToUsersDetail = (user: IUser) => {
    router.push({
      name: 'user-data-tabs',
      params: {
        userId: user.userId
      }
    });
  };

  const rowProps = (user: IUser) => {
    return {
      style: 'cursor: pointer;',
      ondblclick: () => {
        redirectToUsersDetail(user);
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
      title: t('Phone'),
      key: 'phone',
      render(row: IUser) {
        return formatPhoneNumber(row.phone || '');
      }
    },
    {
      title: t('E-mail'),
      key: 'email'
    },
    {
      title: t('Data-of-creation'),
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
      width: '100px',
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

                    redirectToUsersDetail(row);
                  },
                  circle: true,
                  quaternary: true,
                  class: 'mx-1',
                  renderIcon: renderIcon('order-details', {
                    size: 24,
                    color: '#16A000'
                  })
                }),
              default: () => h('span', {
              }, t('User-data'))
            }
          )
        ];
      }
    }
  ]);

  async function fetchUsers() {
    const pagination = tableRef.value?.pagination;

    const pageSize = pagination?.pageSize
      || globalConfig.pageSize;

    const queryParams: IUserQueryParams = {
      pageNumber: pagination?.page || 1,
      pageSize,
      ...(props.filters || {
      }),
      userPhone: props.filters?.userPhone
        ? MaskUtils.unmaskPhone(
          props.filters.userPhone
        )
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

  const rowKey = (row: IUser) => row.userId
    || Math.random();

  onMounted(() => {
    fetchUsers();
  });

  return {
    isLoading,
    rowProps,
    columns,
    dataTable,
    rowKey,
    tableRef,
    fetchUsers
  };
}
