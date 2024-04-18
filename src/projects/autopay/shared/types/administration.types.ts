import { IResponseData } from '@/shared/types/api.types';
import { ISwitchListItemValue } from '@/shared/types/list.types';

export enum ProcessingType {
  ABS = 'ABS',
  UZCARD = 'UZCARD',
  // VISA = 'TIETO',
  HUMO = 'HUMO',
  AUTO_PAY_HUMO = 'AUTO_PAY_HUMO',
  AUTO_PAY_UZCARD = 'AUTO_PAY_UZCARD',
  ALL = 'ALL',
  MANUAL_PAY_UZCARD = 'MANUAL_PAY_UZCARD',
  MANUAL_PAY_HUMO = 'MANUAL_PAY_HUMO',
  MANUAL_PAY_VISA = 'MANUAL_PAY_TIETO',
}

export enum LimitType {
  AUTOPAY_CARD_LIMIT = 'AUTOPAY_CARD_LIMIT',
  DEPOSIT_LIMIT = 'DEPOSIT_LIMIT',
  CARD_LIMIT = 'CARD_LIMIT',
  ACTUAL_DEBT_LIMIT = 'ACTUAL_DEBT_LIMIT'
}

export enum WithdrawalCircleCode {
  BLOCKED = 'BLOCKED',
  PROCESSING = 'PROCESSING',
  EMPTY = 'EMPTY',
  FREEZE = 'FREEZE',
  CLOSED_DAY = 'CLOSED_DAY',
  B2_PROCESSING = 'B2_PROCESSING'
}

export interface IAdministationTypes {
  code?: WithdrawalCircleCode,
  status?: string,
  batchInfo?: number,
  queueInfo?: number
}

export interface IAdministrationActionResponseError {
  code?: WithdrawalCircleCode,
  message?: string,
}

export interface IDebitControlItem {
  processingType: ProcessingType | null
  active: boolean | null
}

export interface IDebitControlItemWithOptions extends
  IDebitControlItem {
  loading?: boolean
}

export interface IDebitControlItemValue extends
  ISwitchListItemValue<ProcessingType> {}

export interface ILimit {
  type: LimitType | null
  limit: number | null
}

export interface ILimitWithOptions extends
  ILimit {
  loading?: boolean
}

export interface IHumoInterval {
  id?: number | null
  name?: string | null
}

export type AdministrationFunction = () => Promise<IResponseData<IAdministationTypes>>
