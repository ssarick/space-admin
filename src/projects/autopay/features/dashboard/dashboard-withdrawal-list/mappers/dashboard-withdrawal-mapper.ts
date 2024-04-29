import { IPaymentStatistics } from '@/projects/autopay/shared/types/dashboard.types';
import { DashboardWithdrawalItem } from '../dashboard-withdrawal-list.types';

export default class DashboardWithdrawalMapper {

  static addWithdrawalItems(
    withdrawalList: DashboardWithdrawalItem[],
    paymentsList: IPaymentStatistics[]
  ): DashboardWithdrawalItem[] {
    paymentsList.forEach(payment => {
      let withdrawalItem = withdrawalList.find(
        ({ processingType }) =>
          processingType === payment.processingType
      );

      if (!withdrawalItem) {
        withdrawalItem = {
          processingType: payment.processingType
        } as DashboardWithdrawalItem;

        withdrawalList.push(withdrawalItem);
      }

      withdrawalItem[payment.date!] = payment;
    });

    return withdrawalList;
  }

  static toWithdrawalList(
    payload: IPaymentStatistics[][]
  ): DashboardWithdrawalItem[] {
    return payload
      .reduce<DashboardWithdrawalItem[]>(
      DashboardWithdrawalMapper
        .addWithdrawalItems,
      []
    );
  }

}
