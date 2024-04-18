import { IExcelFormInputs } from '@/projects/autopay/shared/types/transaction.types';

export interface ITransactionExcelModalProps {
  showModal: boolean,
  formValue: IExcelFormInputs
}

export interface ITransactionExcelModalEmits {
  (e: 'close-modal')
  (e: 'submitExcelModal', event: SubmitEvent)
  (e: 'update:contractId', event: null | string | number)
  (e: 'update:amountFrom', event: number | null | string)
  (e: 'update:amountTo', event: number | null | string)
  (e: 'update:dateFrom', event: number | null)
  (e: 'update:dateTo', event: number | null)
  (e: 'update:timeFrom', event: string | null)
  (e: 'update:timeTo', event: string | null)
  (e: 'update:processingTypes', event: string[])
  (event: 'update:showModal', value: boolean)
}
