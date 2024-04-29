import {
  onBeforeUnmount,
  onMounted,
  ref
} from 'vue';
import usePagination from '@/shared/composables/usePagination';
import { DownloadType } from '@/shared/types/download.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import DATE_SHORTCUTS from '@/shared/utils/constants/date-shortcuts';
import { downloadFile } from '@/shared/utils/download';
import { ApiLog } from '@/projects/b2b/shared/api';
import { ILogsReportInfo } from '@/projects/b2b/shared/types/log.types';

export default function useLogsHistory() {
  const tableRef = useTableRef();
  const logsHistory = ref<ILogsReportInfo[]>([]);
  const logsHistoryLoading = ref(false);
  const logsHistoryPingDelayInSeconds = 3;
  let logsHistoryPingId = 0;

  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const mapLogsHistory = (
    list: ILogsReportInfo[]
  ): ILogsReportInfo[] => list
    .map(item => ({
      ...item,
      loading: false
    }));

  const fetchLogsHistory = async () => {
    const { items, totalPages } = await ApiLog
      .fetchReports({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value
      });

    logsHistory.value = mapLogsHistory(
      items || []
    );

    pageCount.value = totalPages || 1;
  };

  const stopPingLogsHistory = () =>
    logsHistoryPingId
      && clearTimeout(logsHistoryPingId);

  const pingLogsHistory = async () => {
    stopPingLogsHistory();

    logsHistoryPingId = setTimeout(
      pingLogsHistory,
      logsHistoryPingDelayInSeconds * DATE_SHORTCUTS.MS_IN_SEC
    );

    await fetchLogsHistory();
  };

  const startPingLogsHistory = async () => {
    logsHistoryLoading.value = true;

    await pingLogsHistory();

    logsHistoryLoading.value = false;
  };

  const setLogsHistoryItemLoading = (
    id: string,
    value: boolean
  ) => {
    const item = logsHistory.value.find(
      item => item.id === id
    );

    item && (item.loading = value);
  };

  const onDownloadLogReport = async (
    id: string
  ) => {
    setLogsHistoryItemLoading(id, true);

    const { item } = await ApiLog
      .fetchReport(id);

    item?.base64String
      && downloadFile(
        DownloadType.EXCEL_BASE64,
        item.base64String
      );

    setLogsHistoryItemLoading(id, false);
  };

  onMounted(startPingLogsHistory);
  onBeforeUnmount(stopPingLogsHistory);

  return {
    tableRef,
    logsHistory,
    logsHistoryLoading,
    pingLogsHistory,
    onDownloadLogReport
  };
}
