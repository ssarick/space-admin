import { computed } from 'vue';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { EntityClient } from '@/projects/iseeu/shared/types/entity.types';
import {
  IEntitySearchTableEmits,
  IEntitySearchTableProps
} from './entity-search-table.types';

export default function useEntitySearchTable(
  _props: IEntitySearchTableProps,
  _emit: IEntitySearchTableEmits
) {
  const tableRef = useTableRef();

  const columns = computed<
    DataTableColumns<EntityClient>
  >(() => [
    {
      title: 'МФО',
      key: 'mfo'
    },
    {
      title: 'ИНН',
      key: 'inn'
    },
    {
      title: 'Код клиента',
      key: 'clientCode'
    },
    {
      title: 'Наименование',
      key: 'name'
    },
    {
      title: 'Дата открытия',
      key: 'openDate'
    },
    {
      title: 'Дата закрытия',
      key: 'closeDate'
    },
    {
      title: 'Состояние',
      key: 'state'
    }
  ]);

  const rowKey = (row: EntityClient) => row.name;

  return {
    columns,
    tableRef,
    rowKey
  };
}
