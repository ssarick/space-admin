import { IFilterFormInputs } from '@/projects/autopay/shared/types/transaction.types';

export interface ITransactionFilterModalProps {
  showModal: boolean,
  formValue: IFilterFormInputs
}

export interface ITransactionFilterModalEmits{
  (e: 'close-modal'): void;
  (e: 'submitFilterModal', event: SubmitEvent) : void;
  (e: 'update:contractId', event: null | string | number) : void;
  (e: 'update:cardHolderId', event: number | null | string) : void;
  (e: 'update:amountFrom', event: number | null | string) : void;
  (e: 'update:amountTo', event: number | null | string) : void;
  (e: 'update:transactionStatus', event: string) : void;
  (e: 'update:dateFrom', event: number | null) : void;
  (e: 'update:dateTo', event: number | null) : void;
  (e: 'update:timeFrom', event: string | null) : void;
  (e: 'update:timeTo', event: string | null) : void;
  (e: 'update:processingType', event: string) : void;
  (e: 'update:b2Completed', event: string) : void;
  (e: 'update:passport', event: string) : void;
  (e: 'update:panMaskedLastNumbers', event: string): void
  (e: 'update:showModal', value: boolean): void
}
