import { IPagination } from '@/shared/types/pagination.types';
import { MergeObjects } from '@/shared/types/utility.types';

export enum SubsidyApplicationStatus {
  CREATED = 'CREATED',
  SENDING_PROCESS = 'SENDING_PROCESS',
  SENDING_ERROR = 'SENDING_ERROR',
  VALIDATE_MINFIN = 'VALIDATE_MINFIN',
  DUPLICATE_MINFIN = 'DUPLICATE_MINFIN',
  SENT_MINFIN = 'SENT_MINFIN'
}

export interface SubsidyApplication {
  id?: number | null
  amountThisMonthTiyin?: number | null
  restAmountTiyin?: number | null
  pinfl?: string | null
  accExternal?: string | null
  createdDate?: string | null
  creditAmountTiyin?: number | null
  percentagePaymentDate?: string | null
  updateDate?: string | null
  bankCode?: string | null
  mfo?: string | null
  contractPaymentStartDate?: string | null
  requestKey?: string | null
  contractType?: number | null
  contractTypeName?: string | null
  status?: SubsidyApplicationStatus | null
  statusName?: string | null
  minfinStatus?: number | null
  minfinStatusName?: string | null
  decision?: string | null
  descriptionError?: string | null
}

export interface SubsidyApplicationInternal extends
  SubsidyApplication {
  loadingForDelete?: boolean
  loadingForSent?: boolean
}

export interface SubsidyApplicationFetchPayload extends
  IPagination,
  Pick<SubsidyApplication, 'pinfl'
    | 'status'
    | 'minfinStatus'> {
  amountPayableTiyinFrom?: number
  amountPayableTiyinTo?: number
  paymentDayFrom?: string
  paymentDayTo?: string
}

export interface SubsidyApplicationUploadPayload {
  excelFile: File
}

export interface SubsidyApplicationSendToMinfinPayload {
  ids: number[]
}

export interface SubsidyApplicationFormModel extends
  Pick<SubsidyApplication, 'pinfl'
    | 'accExternal'
    | 'contractType'
    | 'mfo'
    | 'decision'> {
  percentagePaymentDate?: number | null
  contractPaymentStartDate?: number | null
  amountThisMonthTiyin?: string | null
  restAmountTiyin?: string | null
  creditAmountTiyin?: string | null
}

export interface SubsidyApplicationUpdatePayload extends
  MergeObjects<
    SubsidyApplicationFormModel,
    SubsidyApplication,
    'percentagePaymentDate'
      | 'contractPaymentStartDate'
      | 'amountThisMonthTiyin'
      | 'restAmountTiyin'
      | 'creditAmountTiyin'
  > {
  id: number
}

export interface SubsidyApplicationFiltersModel extends
  Pick<SubsidyApplication, 'pinfl'
    | 'status'
    | 'accExternal'
    | 'minfinStatus'> {
  amountPayableTiyinFrom?: string | null
  amountPayableTiyinTo?: string | null
  paymentDayFrom?: number | null
  paymentDayTo?: number | null
}

export interface SubsidyApplicationItemFetchPayload {
  id: number
}

export interface SubsidyApplicationDeletePayload extends
  SubsidyApplicationItemFetchPayload {}

export interface SubsidyContract {
  code?: number | null
  description?: string | null
}

export interface SubsidyMinfinStatus {
  state?: number | null
  stateMessage?: string | null
}

export interface SubsidySentStatus extends
  Pick<SubsidyApplication, 'id'> {
  success?: boolean | null
  message?: string | null
}

export interface SubsidyApplicationWithSentStatus extends
  SubsidyApplicationInternal {
  sentStatus?: SubsidySentStatus
}
