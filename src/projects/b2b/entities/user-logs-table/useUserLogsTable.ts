import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumn } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { DATE_MASK } from '@/shared/utils/constants/date-mask';
import { formatDate } from '@/shared/utils/functions/date';
import { IUserLog } from '@/projects/b2b/shared/types/user.types';

export default function useUserLogsTable() {
  const tableRef = useTableRef();
  const { t } = useI18n();

  const columns = computed<DataTableColumn<IUserLog>[]>(() => [
    {
      title: t('Date-and-time'),
      key: 'dateTime',
      render: (row: IUserLog) => formatDate(
        row.dateTime || '',
        DATE_MASK.timeAndDate
      )
    },
    {
      title: t('Login-of-the-initiator-of-the-changes'),
      key: 'adminLogin'
    },
    {
      title: t('Entity'),
      key: 'controller'
    },
    {
      title: t('Action'),
      key: 'controllerAction'
    },
    {
      title: t('New-value'),
      key: 'changeCommandData',
      className: 'wrap'
    }
  ]);

  const rowKey = (row: IUserLog) =>
    row.dateTime || Math.random();

  return {
    rowKey,
    tableRef,
    columns
  };
}
