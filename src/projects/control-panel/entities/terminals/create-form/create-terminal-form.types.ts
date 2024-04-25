import { TerminalInfoFormModel } from '@/projects/control-panel/shared/types/terminals.types';

export interface CreateTerminalFormProps extends
  TerminalInfoFormModel {
  model?: TerminalInfoFormModel
  loading?: boolean
  submitLocale?: string
}

export interface CreateTerminalFormEmits {
  (
    event: 'update:merchantId',
    value: CreateTerminalFormProps['merchantId']
  )
  (
    event: 'update:operationType',
    value: CreateTerminalFormProps['operationType']
  )
  (
    event: 'update:partner',
    value: CreateTerminalFormProps['partner']
  )
  (
    event: 'update:port',
    value: CreateTerminalFormProps['port']
  )
  (
    event: 'update:name',
    value: CreateTerminalFormProps['name']
  )
}
