import { computed, h } from 'vue';
import { useVModels } from '@vueuse/core';
import { DataTableColumn } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BaseStatusItem } from '@/shared/UI/base-status';
import { BindedFace } from '@/projects/binded-face/shared/types/binded-face.types';
import { BindedFaceTableEmits, BindedFaceTableProps } from './binded-face-table.types';
import { bindedFaceStatusMapper } from './utils/constants/status-map';

export default function useApplicationsTable(
  props: BindedFaceTableProps,
  emit: BindedFaceTableEmits
) {
  const tableRef = useTableRef();
  const models = useVModels(props, emit);

  const columns = computed<
    DataTableColumn<BindedFace>[]
  >(() => [
    {
      title: 'ID контрагент',
      key: 'contragentId'
    },
    {
      title: 'ПИНФЛ',
      key: 'pinfl'
    },
    {
      title: 'ИНН',
      key: 'inn'
    },
    {
      title: 'Статус заявки',
      key: 'statusName',
      width: 200,
      render: (row: BindedFace) => h(
        BaseStatusItem,
        {
          label: row.status!,
          type: 'filled',
          ...(bindedFaceStatusMapper[
            row.status!
          ] || {})
        }
      )
    }
  ]);

  const rowKey = (row: BindedFace) => row.contragentId;

  return {
    ...models,
    tableRef,
    columns,
    rowKey
  };
}
