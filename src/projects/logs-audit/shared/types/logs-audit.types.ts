import { IPagination } from '@/shared/types/pagination.types';

export interface LogsAuditItem {
  ipAddress?: string | null
  referer?: string | null
  browserName?: string | null
  browserVersion?: string | null
  os?: string | null
  osVersion?: string | null
  browserLanguage?: string | null
  timezone?: string | null
  browserIdentity?: string | null
  cookies?: string | null
  httpHeaders?: string | null
  responseCode?: number | null
  requestMethod?: string | null
  requestDateTime?: string | null
  responseDateTime?: string | null
  url?: string | null
  requestBody?: string | null
  responseBody?: string | null
  action?: string | null
  service?: string | null
  actionName?: string | null
  serviceName?: string | null
  username?: string | null
}

export interface LogsAuditFetchPayload extends
  IPagination {
  ip?: string | null
  url?: string | null
  username?: string[]
  service?: string[]
  action?: string[]
  dateFrom?: string | null
  dateTo?: string | null
}

export interface LogsAuditFiltersModel extends
  Omit<LogsAuditFetchPayload, 'dateTo'
    | 'dateFrom'> {
  dateFrom?: number | null
  dateTo?: number | null
}

export interface LogsAuditUnloadingModel extends
  LogsAuditFiltersModel {}
