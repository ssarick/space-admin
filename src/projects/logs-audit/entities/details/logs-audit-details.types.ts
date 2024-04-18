import { LogsAuditItem } from '../../shared/types/logs-audit.types';

export interface LogsAuditDetailsProps {
  modelValue?: boolean
  data?: LogsAuditItem | null
}

export interface LogsAuditDetailsEmits {
  (
    event: 'update:modelValue',
    value: LogsAuditDetailsProps['modelValue']
  )
}
