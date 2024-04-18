import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { IPaymentStatistics } from '@/projects/autopay/shared/types/dashboard.types';
import { DashboardWithdrawalItem } from '../dashboard-withdrawal-list.types';

export default class DashboardWithdrawalCalcUtils {

  static calcTotalStatistics(
    payload: IPaymentStatistics[][]
  ): DashboardWithdrawalItem {
    const withdrawal = {
      processingType: ProcessingType.ALL
    } as DashboardWithdrawalItem;

    payload.forEach(
      statisticsItems => {
        const date = statisticsItems[0]?.date!;

        withdrawal[date] = withdrawal[date] || {
          trxAmount: 0
        };

        statisticsItems.forEach(
          ({ trxAmount }) =>
            withdrawal[date].trxAmount! += trxAmount!
        );
      }
    );

    return withdrawal;
  }

}
