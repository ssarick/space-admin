import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { DashboardBarChartDataset } from '../dashboard-days-bar.types';

export const dashboardDatasets: DashboardBarChartDataset[] = [
  {
    label: ProcessingType.UZCARD,
    backgroundColor: '#2F53CD',
    maxBarThickness: 12
  },
  {
    label: ProcessingType.HUMO,
    backgroundColor: '#FBC200',
    maxBarThickness: 12
  },
  {
    label: ProcessingType.ABS,
    backgroundColor: '#16A000',
    maxBarThickness: 12
  },
  {
    label: ProcessingType.AUTO_PAY_UZCARD,
    backgroundColor: '#FF8E26',
    maxBarThickness: 12
  },
  {
    label: ProcessingType.MANUAL_PAY_HUMO,
    backgroundColor: '#FBC200',
    maxBarThickness: 12
  },
  {
    label: ProcessingType.MANUAL_PAY_UZCARD,
    backgroundColor: '#2F53CD',
    maxBarThickness: 12
  }
];
