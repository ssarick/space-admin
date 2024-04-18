import { IPagination } from '@/shared/types/pagination.types';
import { ProcessingType } from './administration.types';

export enum TransactionStatus {
  PERFORMED = 'PERFORMED',
  REVERSED = 'REVERSED'
}

export interface IFilterFormInputs {
  contractId: null | string | number,
  cardHolderId: string | null | number,
  amountFrom: string | null,
  amountTo: string | null,
  transactionStatus: string,
  dateFrom: number | null,
  dateTo: number | null,
  timeFrom: string | null,
  timeTo: string | null,
  processingType: string,
  b2Completed: null | boolean | string,
  passport: string | null,
  panMaskedLastNumbers: string | null
}

export interface IExcelFormInputs {
  contractId: string | null,
  amountFrom: string | null,
  amountTo: string | null,
  dateFrom: number | null,
  dateTo: number | null,
  timeFrom: string | null,
  timeTo: string | null,
  processingTypes: string[],
}

export interface IFilterFormActiveInputs {
  contractId?: string,
  borrowerId?: string,
  amountFrom?: string,
  amountTo?: string,
  transactionStatus?: string,
  dateFrom?: number | string | null,
  dateTo?: number | string | null,
  processingType?: string,
  b2Completed?: string | boolean,
  passport?: string
}

export interface ITransaction {
  id: number,
  contractId: number,
  borrowerId: number,
  cardHolderName: string,
  cardHolderSurname: string,
  cardHolderId: number | null,
  borrowerName: string,
  borrowerSurname: string,
  amount: number,
  status: TransactionStatus,
  processingType: ProcessingType,
  transactionTime: string,
  b2Completed: boolean,
  internalId: string,
  panMasked: number | string
}

export interface ITransactionListFetchPayload extends
  IPagination, IFilterFormActiveInputs {
  search?: string
}

export interface ITransactionsImportToExcelPayload {
  contractId?: null | string | number,
  amountFrom?: number | null,
  amountTo?: number | null,
  dateFrom?: number | null,
  dateTo?: number | null,
  processingTypes?: string[],
}

export interface ITransactionCancelPayload {
  internalId: string
}
