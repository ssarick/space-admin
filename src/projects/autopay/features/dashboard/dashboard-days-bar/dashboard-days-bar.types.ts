import { ChartDataset } from 'chart.js';
import { StatusConfig } from '@/shared/types/status.types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';

export enum DashboardDaysBarType {
  COUNT,
  AMOUNT
}

export interface IDashboardDaysBarProps {
  title?: string | null
  datePart?: PaymentStatisticsDatePart | null
  processingFilters?: StatusConfig<ProcessingType>[]
}

export type DashboardBarChartDataset = Partial<
  ChartDataset<'bar'>
> & {
  label: ProcessingType
};
