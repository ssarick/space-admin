import { computed, Ref } from 'vue';
import { ChartData } from 'chart.js';
import { StatusConfig } from '@/shared/types/status.types';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import {
  IPaymentStatistics,
  ISumStatistics,
  ISumStatisticsByProcessing,
  ITotalStatistics,
  ITotalStatisticsEmpty
} from '@/projects/autopay/shared/types/dashboard.types';
import { processingTypesFullList } from '@/projects/autopay/shared/utils/constants/processing-types';

export default function useDashboardPieChart(
  statistics: Ref<IPaymentStatistics[][]>,
  processingTypes?: ProcessingType[]
) {
  const processingsList = processingTypesFullList
    .filter(item => processingTypes?.includes(item.id!));

  const labels: string[] = processingsList
    .map(item => item.label!);

  const backgroundColor: string[] = [
    '#2F53CD',
    '#FBC200',
    '#16A000',
    '#FF8E26'
  ];

  const statisticsIsEmpty = (data: number[]) =>
    !data.some(item => item);

  const sumStatistics = computed<
    ISumStatisticsByProcessing
  >(
    () => {
      const result = {} as
        ISumStatisticsByProcessing;

      statistics.value[0]?.forEach(item => {
        if (!result[item.processingType!]) {
          result[item.processingType!] = {
            count: 0, amount: 0
          };
        }

        result[item.processingType!].count +=
          item.trxCount || 0;

        result[item.processingType!].amount += AmountFormatter
          .divide(item.trxAmount || 0);
      });

      return result;
    }
  );

  const totalStatistics = computed<
    ITotalStatistics
  >(() => {
    const result: ITotalStatistics = {
      count: [], amount: []
    };

    processingsList.forEach(item => {
      const sum = sumStatistics.value[item.id!];

      result.amount.push(sum?.amount || 0);
      result.count.push(sum?.count || 0);
    });

    return result;
  });

  const totalStatisticsIsEmpty = computed<
    ITotalStatisticsEmpty
  >(() => ({
    amount: statisticsIsEmpty(
      totalStatistics.value.amount
    ),
    count: statisticsIsEmpty(
      totalStatistics.value.count
    )
  }));

  const amountLegends = computed<StatusConfig[]>(
    () => createLegends(
      sumStatistics.value, 'amount', item => {
        item.subLabel = AmountFormatter
          .format(+(item.subLabel || 0));

        return item;
      }
    )
  );

  const countLegends = computed<StatusConfig[]>(
    () => createLegends(
      sumStatistics.value, 'count'
    )
  );

  const amountChartData = computed<
    ChartData<'pie'>
  >(() => ({
    labels,
    datasets: [
      {
        data: [
          ...totalStatistics.value.amount
        ],
        backgroundColor,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }));

  const countChartData = computed<
    ChartData<'pie'>
  >(() => ({
    labels,
    datasets: [
      {
        data: [
          ...totalStatistics.value.count
        ],
        backgroundColor,
        offset: 10,
        hoverOffset: 15
      }
    ]
  }));

  function createLegends(
    statistics: ISumStatisticsByProcessing,
    key: keyof ISumStatistics,
    itemFormatter?: (
      payload: StatusConfig
    ) => StatusConfig
  ) {
    return processingsList
      .filter(item => statistics[item.id!])
      .map(item => {
        const mappedItem: StatusConfig = {
          label: item.label!,
          subLabel: String(statistics[item.id!][key]),
          color: item.color
        };

        return itemFormatter
          ? itemFormatter(mappedItem)
          : mappedItem;
      });
  }

  return {
    amountChartData,
    countChartData,
    amountLegends,
    countLegends,
    totalStatistics,
    totalStatisticsIsEmpty
  };
}
