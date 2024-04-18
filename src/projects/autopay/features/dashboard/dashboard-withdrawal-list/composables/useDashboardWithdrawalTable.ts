import { computed, Ref } from 'vue';
import { DataTableColumn } from 'naive-ui';
import { BaseStatusItem } from '@/shared/UI/base-status';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDate } from '@/shared/utils/functions/date';
import { IPaymentStatistics } from '@/projects/autopay/shared/types/dashboard.types';
import { processingsConfigMap } from '@/projects/autopay/shared/utils/constants/processing-types';
import { DashboardWithdrawalItem } from '../dashboard-withdrawal-list.types';
import DashboardWithdrawalMapper from '../mappers/dashboard-withdrawal-mapper';
import DashboardWithdrawalCalcUtils from '../utils/dashboard-withdrawal-calc-utils';

export default function useDashboardWithdrawalTable(
  statistics: Ref<IPaymentStatistics[][]>
) {
  const columns = computed<
    DataTableColumn<DashboardWithdrawalItem>[]
  >(() => [
    {
      title: '',
      key: 'processingType',
      fixed: 'left',
      width: 180,
      render: (
        row: DashboardWithdrawalItem
      ) => {
        const config = processingsConfigMap[
          row.processingType!
        ];

        return h(
          BaseStatusItem,
          {
            color: config.color,
            label: config.label
          }
        );
      }
    },
    ...mapStatisticsToColumns(
      statistics.value
    )
  ]);

  const tableData = computed<
    DashboardWithdrawalItem[]
  >(() => [
    ...DashboardWithdrawalMapper
      .toWithdrawalList(statistics.value),
    DashboardWithdrawalCalcUtils
      .calcTotalStatistics(statistics.value)
  ]);

  const rowKey = (
    row: DashboardWithdrawalItem
  ) => row.processingType;

  function mapStatisticsToColumns(
    payload: IPaymentStatistics[][]
  ): DataTableColumn<DashboardWithdrawalItem>[] {
    return payload.map(
      (
        statisticsItems: IPaymentStatistics[]
      ): DataTableColumn<DashboardWithdrawalItem> => {
        const date = statisticsItems[0].date!;
        const title = formatDate(date) || '';

        return {
          title,
          key: title,
          width: 145,
          render: (
            row: DashboardWithdrawalItem
          ) => AmountFormatter.divideAndFormat(
            row[date]?.trxAmount || 0
          )
        };
      }
    );
  }

  return {
    columns,
    rowKey,
    tableData
  };
}
