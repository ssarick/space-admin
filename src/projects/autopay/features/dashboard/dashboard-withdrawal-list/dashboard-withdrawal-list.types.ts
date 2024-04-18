import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { IPaymentStatistics } from '@/projects/autopay/shared/types/dashboard.types';

export interface DashboardWithdrawalListProps {
  processings?: ProcessingType[]
}

export type DashboardWithdrawalItem = {
  processingType?: ProcessingType
} & Record<string, IPaymentStatistics>
