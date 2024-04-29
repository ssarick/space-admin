import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { BaseStatusItem } from '@/shared/UI/base-status';
import { formatDateToLocaleWithTime } from '@/shared/utils/functions/date';
import type { SessionInfoTableProps } from '@/projects/inventory/entities/sessions/info-table/session-info-table.types';
import type {
  InventorySessionDetails,
  InventoryStatusesOption
} from '@/projects/inventory/shared/types/sessions.types';

export default function useSessionInfoTable(
  props: SessionInfoTableProps
) {
  const { t } = useI18n();
  const tableRef = useTableRef();

  const sessionStatusesList = computed<InventoryStatusesOption[]>(
    () => props.sessionStatusesList
      ? [ ...props.sessionStatusesList ]
      : []
  );

  const columns = computed<
    DataTableColumns<InventorySessionDetails>
  >(
    () => [
      {
        title: t('Inventory-code'),
        key: 'equipmentInventoryNumber',
        width: 140
      },
      {
        title: t('Name2'),
        key: 'equipmentName',
        width: 500
      },
      {
        title: t('Data-of-scanning'),
        key: 'createdDate',
        width: 200,
        render: (row: InventorySessionDetails) => formatDateToLocaleWithTime(
          row.createdDate
        )
      },
      {
        title: t('Status'),
        key: 'stateId',
        minWidth: 180,
        render: (row: InventorySessionDetails) => {
          const statusText = getStatusText(row);

          return h(
            BaseStatusItem,
            {
              label: statusText?.description,
              color: statusText?.color,
              type: 'filled'
            }
          );
        }
      }
    ]);

  const rowKey = (row: InventorySessionDetails) => row.id;

  const getStatusText = (row: InventorySessionDetails) => {
    return sessionStatusesList.value.find(
      item => item.stateId === row.stateId
    );
  };

  return {
    columns,
    rowKey,
    tableRef
  };
}
