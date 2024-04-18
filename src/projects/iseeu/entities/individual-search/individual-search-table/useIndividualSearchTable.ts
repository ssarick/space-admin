import { computed } from 'vue';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { IndividualClient } from '@/projects/iseeu/shared/types/individual.types';
import {
  IIndividualSearchTableEmits,
  IIndividualSearchTableProps } from './individual-search-table.types';

export default function useIndividualSearchTable(
  _props: IIndividualSearchTableProps,
  _emit: IIndividualSearchTableEmits
) {
  const tableRef = useTableRef();

  const columns = computed<
    DataTableColumns<IndividualClient>
  >(() => [
    {
      title: 'ФИО',
      key: 'name'
    },
    {
      title: 'г/р',
      key: 'rp'
    },
    {
      title: 'Адрес',
      key: 'address'
    },
    {
      title: 'Счет',
      key: 'account'
    },
    {
      title: 'Код филиала',
      key: 'branchCode'
    },
    {
      title: 'Филиал',
      key: 'branch'
    }
  ]);

  const rowKey = (row: IndividualClient) => row.name;

  return {
    columns,
    tableRef,
    rowKey
  };
}
