import { computed, h, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useDebounceFn } from '@vueuse/core';
import { DataTableColumns, NButton, NPopover, NSpace } from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import { IResponseData } from '@/shared/types/api.types';
import { IPagination } from '@/shared/types/pagination.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import useFormRef from '@/shared/UI/base-form/useFormRef';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { formatDate } from '@/shared/utils/functions/date';
import { isEmptyObject } from '@/shared/utils/functions/object';
import renderIcon from '@/shared/utils/render-icon';
import { useAuthStore } from '@/app/store/auth/useAuthStore';
import { ApiClient } from '@/projects/b2b/shared/api';
import { IClient } from '@/projects/b2b/shared/types/client.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import { IClientSearchValues } from './clients-table.types';

export default function useClientsTable() {
  const router = useRouter();
  const { t } = useI18n();
  const dataTable = ref<IClient[]>([]);
  const tableRef = useTableRef();
  const isLoading = ref(false);
  const { user } = useAuthStore();
  const searchFormRef = useFormRef();

  const searchValues = reactive<IClientSearchValues>({
    anyCode: ''
  });

  const anyCodeAvailableLengths: number[] = [
    fieldLimits.clientCode.minLength,
    fieldLimits.inn.maxLength,
    fieldLimits.pinfl.minLength
  ];

  const rowProps = (row: IClient) => {
    return {
      style: 'cursor: pointer;',
      ondblclick: () => {
        goToClientDetailPage(row);
      }
    };
  };

  const columns = computed<DataTableColumns<IClient>>(() => [
    {
      title: t('Client-code'),
      key: 'clientCode'
    },
    {
      title: `${t('INN')}\n${t('Pinfl')}`,
      key: 'inn',
      render: (row: IClient) =>
        row.inn && row.pinfl
          ? `${row.inn}\n${row.pinfl}`
          : (row.inn || row.pinfl || '-')
    },
    {
      title: t('Name2'),
      key: 'clientName'
    },
    {
      title: t('Data-of-creation'),
      key: 'fillDate',
      render: (row: IClient) => formatDate(row.fillDate || '')
    },
    {
      title: t('Status'),
      key: 'stateReason',
      render(row: IClient) {
        return stateMap.value[row.stateId!];
      }
    },
    {
      title: '',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: '120px',
      render: (row: IClient) => h(
        NSpace,
        {
          align: 'center',
          wrap: false,
          size: [ 2, 2 ]
        },
        () => [
          h(
            NPopover,
            {
              placement: 'top'
            },
            {
              trigger: () =>
                h(NButton, {
                  circle: true,
                  quaternary: true,
                  renderIcon: renderIcon('clients', {
                    size: 24,
                    color: '#FBC200'
                  }),
                  onClick: (e) => {
                    e.stopPropagation();
                    router.push({
                      name: 'client-users',
                      params: {
                        businessCode: row.clientCode
                      }
                    });
                  }
                }),
              default: () => h('span', {}, t('Users'))
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
                    onClick: (e) => {
                      e.stopPropagation();
                      goToClientDetailPage(row);
                    },
                    circle: true,
                    quaternary: true,
                    renderIcon: renderIcon('order-details', {
                      size: 24,
                      color: '#16A000'
                    })
                  }
                ),
              default: () => h('span', {}, t('Client-data'))
            }
          )
        ]
      )
    }
  ]);

  const isAvailableAnyCodeLength = (
    value: number
  ): boolean => anyCodeAvailableLengths
    .includes(value);

  const createClientsFetch = <T = void>(
    fetcher: (
      pagination: IPagination,
      payload: T
    ) => Promise<IResponseData<IClient>>
  ) => {
    return async (payload: T) => {
      const pagination = tableRef.value?.pagination;

      const pageSize = pagination?.pageSize
        || globalConfig.pageSize;

      isLoading.value = true;

      const { items, totalPages } = await fetcher({
        pageNumber: pagination?.page || 1,
        pageSize
      }, payload);

      isLoading.value = false;
      dataTable.value = items;

      if (tableRef.value?.pagination) {
        tableRef.value.pagination.pageCount = totalPages;
      }
    };
  };

  const fetchClientsByAnyCode = createClientsFetch(
    async (
      pagination: IPagination,
      anyCode: string
    ): Promise<IResponseData<IClient>> => {
      const data = await ApiClient
        .fetchClientsByAnyCode({
          branch: user?.branch!,
          anyCode,
          ...pagination
        });

      if (!data.error
        && !isEmptyObject(data.item))
        data.items = [ data.item ];

      return data;
    }
  );

  const fetchClients = createClientsFetch(
    (pagination: IPagination) => ApiClient
      .fetchClients({
        path: {
          branch: user?.branch!
        },
        query: pagination
      })
  );

  const onChangeAnyCode = useDebounceFn(
    async () => {
      const { length } = searchValues.anyCode;

      if (!length) {
        fetchClients();
      } else if (isAvailableAnyCodeLength(length)) {
        fetchClientsByAnyCode(
          searchValues.anyCode
        );
      }
    },
    globalConfig.debounceInMS
  );

  const onChangeSearchValue = async (
    value?: string
  ) => {
    searchValues.anyCode = value || '';

    onChangeAnyCode();
  };

  const rowKey = (row: IClient) => row.inn
    || Math.random();

  const onAdd = () => router.push({
    name: 'client-create'
  });

  function goToClientDetailPage(row: IClient) {
    router.push({
      name: 'client-detail',
      params: {
        businessCode: row.clientCode
      }
    });
  }

  onMounted(() => {
    fetchClients();
  });

  return {
    isLoading,
    rowProps,
    columns,
    dataTable,
    rowKey,
    tableRef,
    fetchClients,
    searchFormRef,
    onChangeSearchValue,
    onAdd
  };
}
