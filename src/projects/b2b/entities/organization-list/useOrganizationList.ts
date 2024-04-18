import { computed, onMounted, Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVModels } from '@vueuse/core';
import { DataTableColumn } from 'naive-ui';
import { useAutoSelectData, useRowSelect } from '@/shared/composables';
import useTablePagination from '@/shared/UI/base-data-table/composables/useTablePagination';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { IUserOrganization } from '@/projects/b2b/shared/types/user.types';
import { stateMap } from '@/projects/b2b/shared/utils/constants';
import {
  IOrganizationListEmit,
  IOrganizationListProps
} from './organization-list.types';
import useOrganizationsLoader from './useOrganizationsFetch';

export default function useOrganizationsList(
  props: IOrganizationListProps,
  emit: IOrganizationListEmit
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const {
    organization: selectedRow,
    organizationIds
  } = useVModels(props, emit);

  const { loading, organizations, loadOrganizations } =
    useOrganizationsLoader(props);

  const findOrganization = (
    clientCode: string
  ): IUserOrganization | null => organizations
    .value
    .find(organization => organization
      .clientCode === clientCode
    ) || null;

  const selectedRowKeys = computed<string[]>({
    get: () => {
      if (props.multiple)
        return organizationIds?.value || [];

      const clientCode = selectedRow
        ?.value
        ?.clientCode;

      return clientCode ? [ clientCode ] : [];
    },
    set: (value: string[]) => {
      if (props.multiple && organizationIds) {
        organizationIds.value = value;
      } else if (selectedRow) {
        selectedRow.value = value[0]
          ? findOrganization(value[0])
          : null;
      }
    }
  });

  const {
    toggleSelectedRow
  } = useRowSelect(
    selectedRowKeys as Ref<string[]>
  );

  const onRowClick = (
    row: IUserOrganization, _, e: Event
  ) => {
    const target = e.target as HTMLElement;

    if (target.closest('.n-checkbox')
      || target.closest('.n-radio'))
      return;

    if (props.multiple) {
      toggleSelectedRow(row.clientCode!);
    } else {
      selectedRow!.value = row;
    }
  };

  const { loadPaginatedData, onPageNumberUpdated, onPageSizeUpdated } =
    useTablePagination(tableRef, loadOrganizations);

  const columns = computed<
    DataTableColumn<IUserOrganization>[]
  >(() => [
    {
      type: 'selection',
      multiple: props.multiple,
      width: 36
    },
    {
      title: t('Client-code'),
      key: 'clientCode',
      render: (row: IUserOrganization) => row.clientCode || '-'
    },
    {
      title: t('Name2'),
      key: 'clientName',
      render: (row: IUserOrganization) => row.clientName || '-'
    },
    {
      title: t('INN'),
      key: 'inn',
      render: (row: IUserOrganization) => row.inn || '-'
    },
    {
      title: t('Status'),
      key: 'stateId',
      render: (row: IUserOrganization) =>
        stateMap.value[row.stateId!] || '-'
    }
  ]);

  const rowKey = (row: IUserOrganization) =>
    row.clientCode || Math.random();

  useAutoSelectData(selectedRow!, organizations);

  if (props.singleOrganization) {
    watch(
      () => selectedRow?.value,
      () => {
        organizations.value = selectedRow!.value
          ? [ selectedRow!.value ]
          : [];
      },
      { immediate: true }
    );
  }

  onMounted(() => {
    props.singleOrganization
      || loadPaginatedData();
  });

  return {
    organizations,
    loading,
    rowKey,
    columns,
    onPageNumberUpdated,
    onPageSizeUpdated,
    onRowClick,
    tableRef,
    selectedRowKeys
  };
}
