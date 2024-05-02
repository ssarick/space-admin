import { BinsInfoFormModel } from '@/projects/control-panel/shared/types/bins.types.ts';

export interface CreateBinsFormProps extends
  BinsInfoFormModel {
  model?: BinsInfoFormModel
  loading?: boolean
  submitLocale?: string
}

export interface CreateBinsFormEmits {
  (
    event: 'update:merchantId',
    value: CreateBinsFormProps['merchantId']
  )
  (
    event: 'update:operationType',
    value: CreateBinsFormProps['operationType']
  )
  (
    event: 'update:partner',
    value: CreateBinsFormProps['partner']
  )
  (
    event: 'update:port',
    value: CreateBinsFormProps['port']
  )
  (
    event: 'update:name',
    value: CreateBinsFormProps['name']
  )
}
