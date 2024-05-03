import { BinsInfoFormModel } from '@/projects/control-panel/shared/types/bins.types';

export interface CreateBinsFormProps extends
  BinsInfoFormModel {
  model?: BinsInfoFormModel
  loading?: boolean
  submitLocale?: string
}

export interface CreateBinsFormEmits {
  (
    event: 'update:bankId',
    value: CreateBinsFormProps['bankId']
  )
  (
    event: 'update:cardBin',
    value: CreateBinsFormProps['cardBin']
  )
  (
    event: 'update:processing',
    value: CreateBinsFormProps['processing']
  )
  (
    event: 'update:legalType',
    value: CreateBinsFormProps['legalType']
  )
  (
    event: 'update:cardType',
    value: CreateBinsFormProps['cardType']
  )
  (
    event: 'update:processingBankId',
    value: CreateBinsFormProps['processingBankId']
  )
}
