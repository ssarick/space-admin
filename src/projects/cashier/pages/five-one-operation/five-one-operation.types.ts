import {
  BuyerFormPayload
} from '@/projects/cashier/features/five-one-operation/buyer/operation-buyer.types';

export enum FIVE_ONE_OPERATION {
  DETAILS,
  BUYER,
  DOCUMENT
}

export interface RRNData {
  rrn: string,
  processingTypeId: number,
  currencyId: number,
  amount: number,
  paymentType: number,
  manualAmountFlag: boolean
}

export interface CashboxSellPayload extends
  BuyerFormPayload, RRNData {}
