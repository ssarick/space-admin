import { computed, h } from 'vue';
import { useI18n } from 'vue-i18n';
import { DataTableColumns, NButton, NPopover, NSpace } from 'naive-ui';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDate } from '@/shared/utils/functions/date';
import renderIcon from '@/shared/utils/render-icon';
import { ILogsReportInfo } from '@/projects/b2b/shared/types/log.types';
import { ILogsHistoryTableEmits } from './logs-history-table.types';

export default function useLogsHistoryTable(
  emit: ILogsHistoryTableEmits
) {
  const tableRef = useTableRef();
  const { t } = useI18n();

  const columns = computed<
    DataTableColumns<ILogsReportInfo>
  >(() => [
    {
      title: t('Дата создания'),
      key: 'requestedDate',
      render: (row: ILogsReportInfo) => formatDate(
        row.requestedDate || ''
      )
    },
    {
      title: t('Период'),
      key: 'intervalFrom',
      render: (row: ILogsReportInfo) =>
        formatDate(row.intervalFrom || '') +
          ' - ' +
          formatDate(row.intervalTo || '')
    },
    {
      title: t('Действия'),
      key: 'actions',
      width: 142,
      render: (row: ILogsReportInfo) => [
        h(NSpace, { justify: 'center' }, () => [
          h(
            NPopover,
            {
              placement: 'top'
            },
            {
              trigger: () =>
                h(NButton, {
                  type: 'info',
                  style: {
                    opacity: (row.isReadyToDownload
                      || row.isError)
                      ? 1
                      : .3
                  },
                  circle: true,
                  quaternary: true,
                  disabled: !!row.isError,
                  loading: row.loading
                    || (!row.isReadyToDownload
                      && !row.isError),
                  renderIcon: renderIcon(
                    row.isError ? 'warning-alt' : 'download'
                  ),
                  onClick: (e: Event) => {
                    e.stopPropagation();
                    emitDownload(row.id!);
                  }
                }),
              default: () => h('span', {}, t('Download'))
            }
          )
        ])
      ]
    }
  ]);

  const emitDownload = (id: string) =>
    emit('download', id);

  const rowKey = (row: ILogsReportInfo) => row.id
    || Math.random();

  return {
    columns,
    tableRef,
    rowKey
  };
}
