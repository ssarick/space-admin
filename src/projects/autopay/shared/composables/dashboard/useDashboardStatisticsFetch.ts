import { ref } from 'vue';
import { setTimeAndFormatToUTC } from '@/shared/utils/functions/date';
import { ApiDashboard } from '../../api';
import {
  IPaymentStatistics,
  IPaymentStatisticsPayload,
  PaymentStatisticsDatePart
} from '../../types/dashboard.types';

export default function useDashboardStatisticsFetch(
  getRequestPayload?: () => IPaymentStatisticsPayload
) {
  const statistics = ref<IPaymentStatistics[][]>([]);
  const loading = ref(false);

  const fetchStatistics = async(
    dateFrom: number,
    dateTo: number
  ) => {
    if (!dateFrom || !dateTo) return;

    loading.value = true;

    const { items } = await ApiDashboard
      .fetchPaymentStatistics({
        dateFrom: setTimeAndFormatToUTC(
          dateFrom
        ),
        datePart: PaymentStatisticsDatePart.DAY,
        dateTo: setTimeAndFormatToUTC(
          dateTo, '23:59:59'
        ),
        ...(getRequestPayload?.() || {
        })
      });

    statistics.value = items || [];
    loading.value = false;
  };

  return {
    fetchStatistics,
    statistics,
    loading
  };
}
