import { computed } from 'vue';
import { DataTableColumn } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { DATE_TIME_TEXT_FORMAT } from '@/shared/utils/constants/naive-constants';
import { formatDate } from '@/shared/utils/functions/date';
import { LogsAuditItem } from '../../shared/types/logs-audit.types';
import { LogsAuditTableEmits } from './logs-audit-table.types';

export default function useLogsAuditTable(
  emit: LogsAuditTableEmits
) {
  const tableRef = useTableRef();

  const columns = computed<
    DataTableColumn<LogsAuditItem>[]
  >(() => [
    {
      title: 'IP-адрес',
      key: 'ipAddress'
    },
    {
      title: 'Дата запроса',
      key: 'requestDateTime',
      width: 200,
      render: (row: LogsAuditItem) => formatDate(
        row.requestDateTime,
        DATE_TIME_TEXT_FORMAT
      )
    },
    {
      title: 'Действие',
      key: 'actionName'
    },
    {
      title: 'Сервис',
      key: 'serviceName'
    },
    {
      title: 'Логин',
      key: 'username'
    }
  ]);

  const rowClick = (row: LogsAuditItem) =>
    emit('selectItem', row);

  return {
    tableRef,
    columns,
    rowClick
  };
}
