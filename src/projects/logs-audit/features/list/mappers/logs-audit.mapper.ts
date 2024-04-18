import { formatDateToISO } from '@/shared/utils/functions/date';
import { LogsAuditFetchPayload, LogsAuditFiltersModel } from '@/projects/logs-audit/shared/types/logs-audit.types';

export default class LogsAuditMapper {

  static toFetchPayload(
    filters: LogsAuditFiltersModel
  ): LogsAuditFetchPayload {
    return {
      ...filters,
      dateFrom: filters.dateFrom
        ? `${formatDateToISO(filters.dateFrom)}T00:00:00`
        : undefined,
      dateTo: filters.dateTo
        ? `${formatDateToISO(filters.dateTo)}T23:59:59`
        : undefined
    };
  }

}
