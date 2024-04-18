import { onMounted, ref } from 'vue';
import { setTimeAndFormatToUTC } from '@/shared/utils/functions/date';
import { ApiDashboard } from '@/projects/autopay/shared/api';
import { IPaymentStatistics, PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import useDashboardPieChart from './composables/useDashboardPieChart';
import useDashboardPieFilters from './composables/useDashboardPieFilters';
import { DashboardDaysPieProps } from './dashboard-days-pie.types';

export default function useDashboardDaysPie(
  props: DashboardDaysPieProps
) {
  const statistics = ref<IPaymentStatistics[][]>([]);
  const loading = ref(false);

  const pieChart = useDashboardPieChart(
    statistics, props.processings
  );

  const fetchStatistics = async (
    date: number
  ) => {
    loading.value = true;

    const { items } = await ApiDashboard
      .fetchPaymentStatistics({
        dateFrom: setTimeAndFormatToUTC(
          date
        ),
        dateTo: setTimeAndFormatToUTC(
          date,
          '23:59:59'
        ),
        datePart: PaymentStatisticsDatePart.DAY,
        processingTypes: props.processings
      });

    statistics.value = items || [];
    loading.value = false;
  };

  const pieFilters = useDashboardPieFilters(
    fetchStatistics
  );

  onMounted(() => {
    fetchStatistics(
      pieFilters.selectedDate.value
    );
  });

  return {
    ...pieChart,
    ...pieFilters,
    loading
  };
}
