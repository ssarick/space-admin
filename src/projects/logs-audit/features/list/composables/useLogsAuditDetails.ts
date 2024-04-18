import { LogsAuditItem } from '@/projects/logs-audit/shared/types/logs-audit.types';

export default function useLogsAuditDetails() {
  const isDetailsActive = ref(false);
  const logsAuditDetails = ref<LogsAuditItem | null>(null);

  const showItemDetails = (
    payload: LogsAuditItem
  ) => {
    logsAuditDetails.value = payload;
    isDetailsActive.value = true;
  };

  return {
    isDetailsActive,
    logsAuditDetails,
    showItemDetails
  };
}
