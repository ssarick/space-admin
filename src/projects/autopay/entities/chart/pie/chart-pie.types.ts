import { ChartData, ChartOptions } from 'chart.js';
import { StatusConfig } from '@/shared/types/status.types';

export interface IChartPieProps {
  title?: string
  isEmpty?: boolean
  data?: ChartData<'pie'>
  options?: ChartOptions<'pie'>
  legends?: StatusConfig[]
}
