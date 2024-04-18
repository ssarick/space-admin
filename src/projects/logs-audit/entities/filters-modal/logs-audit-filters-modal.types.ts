import { RequestSelectOptions } from '@/shared/types/select.types';
import { LogsAuditFiltersModel } from '../../shared/types/logs-audit.types';

export interface LogsAuditFiltersModalProps extends
  LogsAuditFiltersModel {
  modelValue?: boolean
  model?: LogsAuditFiltersModel
  isDatesRequired?: boolean
  requestServices?: RequestSelectOptions
  requestActions?: RequestSelectOptions
  requestAdmins?: RequestSelectOptions
  title?: string
  submitText?: string
}

export interface LogsAuditFiltersModalEmits {
  (
    event: 'update:modelValue',
    value: LogsAuditFiltersModalProps['modelValue']
  )
  (
    event: 'update:service',
    value: LogsAuditFiltersModalProps['service']
  )
  (
    event: 'update:action',
    value: LogsAuditFiltersModalProps['action']
  )
  (
    event: 'update:username',
    value: LogsAuditFiltersModalProps['username']
  )
  (
    event: 'update:dateTo',
    value: LogsAuditFiltersModalProps['dateTo']
  )
  (
    event: 'update:dateFrom',
    value: LogsAuditFiltersModalProps['dateFrom']
  )
  (event: 'submit')
}
