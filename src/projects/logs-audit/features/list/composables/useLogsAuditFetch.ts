import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiLogsAudit } from '@/projects/logs-audit/shared/api';
import { LogsAuditFiltersModel, LogsAuditItem } from '@/projects/logs-audit/shared/types/logs-audit.types';
import LogsAuditMapper from '../mappers/logs-audit.mapper';

export default function useLogsAuditFetch() {
  const tableRef = useTableRef();
  const logsAuditListLoading = ref(false);
  const filtersModalIsActive = ref(false);
  const logsAuditList = ref<LogsAuditItem[]>([]);

  const filtersModel = reactive<LogsAuditFiltersModel>({
    action: [],
    dateFrom: null,
    dateTo: null,
    service: [],
    username: []
  });

  const {
    pageCount,
    pageNumber,
    pageSize
  } = usePagination(tableRef);

  const fetchLogsAuditList = async () => {
    logsAuditListLoading.value = true;

    const {
      items,
      totalPages
    } = await ApiLogsAudit
      .fetchList({
        pageNumber: pageNumber.value,
        pageSize: pageSize.value,
        ...LogsAuditMapper.toFetchPayload(
          filtersModel
        )
      });

    logsAuditList.value = items || [];
    pageCount.value = totalPages || 1;
    logsAuditListLoading.value = false;
  };

  const toggleFiltersModal = () =>
    filtersModalIsActive.value = !filtersModalIsActive.value;

  const handleSubmitFilters = async () => {
    toggleFiltersModal();
    await fetchLogsAuditList();
  };

  onMounted(fetchLogsAuditList);

  return {
    logsAuditListLoading,
    filtersModalIsActive,
    logsAuditList,
    filtersModel,
    toggleFiltersModal,
    tableRef,
    fetchLogsAuditList,
    handleSubmitFilters
  };
}
