import { computed, Ref, ref } from 'vue';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  Tooltip } from 'chart.js';
import { IDictionaryCommon } from '@/shared/types/common.types';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import AmountFormatter from '@/shared/utils/amount-formatter';
import { formatDate } from '@/shared/utils/functions/date';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import {
  IPaymentStatistics,
  ITotalStatistics,
  TotalStatisticsListByProcessings
} from '@/projects/autopay/shared/types/dashboard.types';
import { DashboardDaysBarType } from './dashboard-days-bar.types';
import { dashboardDatasets } from './models/dashboard-datasets';

ChartJS.register(
  Tooltip,
  ArcElement,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function useDashboardDaysBarChart(
  statistics: Ref<IPaymentStatistics[][]>
) {
  const dateFormat = 'DD.MM.YY';

  const processingTypes = ref<ProcessingType[]>([
    ProcessingType.ALL
  ]);

  const noFillProcessings: ProcessingType[] = [
    ProcessingType.ALL
  ];

  const barType = ref<DashboardDaysBarType>(
    DashboardDaysBarType.AMOUNT
  );

  const barTypes: NonNullableObjectValues<
    IDictionaryCommon
  >[] = [
    {
      id: DashboardDaysBarType.COUNT,
      name: 'Количество'
    },
    {
      id: DashboardDaysBarType.AMOUNT,
      name: 'Сумма'
    }
  ];

  const fillStatistics = (
    list: IPaymentStatistics[]
  ): IPaymentStatistics[] => {
    for (const key in ProcessingType) {
      const processing = ProcessingType[key];

      if (noFillProcessings.includes(processing))
        continue;

      const hasItem = list.some(item =>
        item.processingType === processing);

      hasItem || list.push({
        processingType: processing
      });
    }

    return list;
  };

  const calcAndMergeStatistics = (
    result: TotalStatisticsListByProcessings
  ) => (
    list: IPaymentStatistics[]
  ) => {
    let totalCount = 0;
    let totalAmount = 0;

    fillStatistics(list).forEach(subItem => {
      if (!subItem.processingType) return;

      const count = subItem.trxCount || 0;

      const amount = AmountFormatter.divide(
        subItem.trxAmount || 0
      );

      if (!result[subItem.processingType]) {
        result[subItem.processingType] = {
          count: [], amount: []
        };
      }

      result[subItem.processingType]
        .count
        .push(count);

      result[subItem.processingType]
        .amount
        .push(amount);

      totalCount += count;
      totalAmount += amount;
    });

    result[ProcessingType.ALL]
      .amount
      .push(totalAmount);

    result[ProcessingType.ALL]
      .count
      .push(totalCount);
  };

  const totalStatistics = computed<
    Partial<TotalStatisticsListByProcessings>
  >(() => {
    const result = {
      [ProcessingType.ALL]: {
        count: [], amount: []
      }
    } as {} as TotalStatisticsListByProcessings;

    const calcAndMerge = calcAndMergeStatistics(
      result
    );

    statistics.value.forEach(calcAndMerge);

    return result;
  });

  const chartData = computed<
    ChartData<'bar'>
  >(() => {
    const key: keyof ITotalStatistics = barType
      .value === DashboardDaysBarType.AMOUNT
      ? 'amount'
      : 'count';

    return {
      labels: statistics.value.map(
        item => item[0]?.date
          && formatDate(item[0].date, dateFormat)
      ),
      datasets: processingTypes
        .value
        .includes(ProcessingType.ALL)
        ? [
          {
            label: ProcessingType.ALL,
            data: totalStatistics
              .value[ProcessingType.ALL]
              ?.[key] || [],
            backgroundColor: '#868686',
            maxBarThickness: 12
          }
        ]
        : dashboardDatasets
          .filter(item => processingTypes
            .value.includes(item.label))
          .map(item => Object.assign(
            item,
            {
              data: totalStatistics
                .value[item.label]
                ?.[key] || []
            }
          ))
    };
  });

  const chartOptions: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
          color: 'rgba(0, 0, 0, 0)'
        },
        ticks: {
          color: '#222222',
          padding: 12
        }
      },
      y: {
        border: {
          display: false
        },
        grid: {
          color: 'rgba(207, 206, 206, .5)'
        },
        ticks: {
          color: 'rgba(34, 34, 34, 0.4)'
        }
      }
    }
  };

  const isCheckedProcessingType = (
    processingType: ProcessingType
  ): boolean => processingTypes.value.includes(
    processingType
  );

  const onChangeProcessingTypes = (
    payload: (string | number)[]
  ) => {
    const typedPayload = payload as ProcessingType[];

    const hasAll = isCheckedProcessingType(
      ProcessingType.ALL
    );

    const hasNewAll = typedPayload.includes(
      ProcessingType.ALL
    );

    const hasMany = hasNewAll
      && typedPayload.length >= 2;

    if (hasAll && hasMany) {
      processingTypes.value = typedPayload.filter(
        item => item !== ProcessingType.ALL
      );
    } else if (hasNewAll) {
      processingTypes.value = [
        ProcessingType.ALL
      ];
    } else {
      processingTypes.value = typedPayload;
    }
  };

  return {
    chartData,
    chartOptions,
    processingTypes,
    barTypes,
    barType,
    isCheckedProcessingType,
    onChangeProcessingTypes
  };
}
