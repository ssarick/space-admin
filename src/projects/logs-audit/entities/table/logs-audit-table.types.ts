import { LogsAuditItem } from '../../shared/types/logs-audit.types';

export interface LogsAuditTableProps {
  loading?: boolean
  data?: LogsAuditItem[]
}

export interface LogsAuditTableEmits {
  (
    event: 'selectItem',
    value: LogsAuditItem
  )
}
