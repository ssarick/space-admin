import { StatusConfig } from '@/shared/types/status.types';
import { ProcessingType } from './administration.types';

export enum PaymentStatisticsDatePart {
  DAY = 'DAY',
  MONTH = 'MONTH'
}

export interface IPaymentStatisticsPayload {
  datePart?: PaymentStatisticsDatePart
  dateFrom?: string
  dateTo?: string
  processingTypes?: ProcessingType[]
}

export interface IPaymentStatistics {
  processingType?: ProcessingType | null
  trxCount?: number | null
  trxAmount?: number | null
  date?: string | null
}

export interface ITotalStatistics {
  count: number[]
  amount: number[]
}

export interface ISumStatistics {
  count: number
  amount: number
}

export interface ITotalStatisticsEmpty {
  count: boolean
  amount: boolean
}

export type TotalStatisticsByProcessing = Record<
  ProcessingType, number
>

export type TotalStatisticsListByProcessings = Record<
  ProcessingType, ITotalStatistics
>

export type ISumStatisticsByProcessing = Record<
  ProcessingType, ISumStatistics
>

export type ProcessingsConfigMap = Record<
  ProcessingType, StatusConfig<ProcessingType>
>
