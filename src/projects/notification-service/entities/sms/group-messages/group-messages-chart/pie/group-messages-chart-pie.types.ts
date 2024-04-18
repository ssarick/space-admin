import { ChartData, ChartOptions } from 'chart.js';

export interface GroupMessagesChartPieProps {
  data: ChartData<'pie'>
  options: ChartOptions<'pie'>
}
