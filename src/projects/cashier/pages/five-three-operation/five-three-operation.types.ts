import { BuyerFormPayload } from '@/projects/cashier/features/five-three-operation/buyer/operation-buyer.types';

export enum FIVE_THREE_OPERATION {
  DETAILS,
  BUYER,
  DOCUMENT
}

export interface OperationFiveThreeData {
  currencyId: number,
  amount: number,
  paymentType: number
}

export interface OperationFiveThreeBrvAmount {
  convertedAmount: number,
}

export interface OperationFiveThreeFields extends
  OperationFiveThreeBrvAmount, OperationFiveThreeData {}

export interface CashboxBuyPayload extends
  BuyerFormPayload, OperationFiveThreeData {}

export interface BrvSumResponse {
  id: string,
  amount: number,
  type: string
}

export interface BrvCountResponse {
  id: string,
  buyOperationMultiplier: number,
  referenceCalculationValueId: number,
  rrnValidationThresholdInMinutes: number,
  sellOperationThreshold: number
}
