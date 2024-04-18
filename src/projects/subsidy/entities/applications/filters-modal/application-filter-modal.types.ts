import { IResponseData } from '@/shared/types/api.types';
import {
  SubsidyApplicationFiltersModel,
  SubsidyMinfinStatus
} from '@/projects/subsidy/shared/types/application.types';

export interface ApplicationFilterModalProps extends
  SubsidyApplicationFiltersModel {
  modelValue?: boolean
  model?: SubsidyApplicationFiltersModel
  requestMinfinStatuses?: () => Promise<
    IResponseData<SubsidyMinfinStatus>
  >
}

export interface ApplicationFilterModalEmits {
  (
    event: 'update:modelValue',
    value: ApplicationFilterModalProps['modelValue']
  )
  (
    event: 'update:pinfl',
    value: ApplicationFilterModalProps['pinfl']
  )
  (
    event: 'update:status',
    value: ApplicationFilterModalProps['status']
  )
  (
    event: 'update:accExternal',
    value: ApplicationFilterModalProps['accExternal']
  )
  (
    event: 'update:minfinStatus',
    value: ApplicationFilterModalProps['minfinStatus']
  )
  (
    event: 'update:amountPayableTiyinFrom',
    value: ApplicationFilterModalProps['amountPayableTiyinFrom']
  )
  (
    event: 'update:amountPayableTiyinTo',
    value: ApplicationFilterModalProps['amountPayableTiyinTo']
  )
  (
    event: 'update:paymentDayFrom',
    value: ApplicationFilterModalProps['paymentDayFrom']
  )
  (
    event: 'update:paymentDayTo',
    value: ApplicationFilterModalProps['paymentDayTo']
  )
  (event: 'submit')
}
