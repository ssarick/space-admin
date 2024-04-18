import { computed, ref } from 'vue';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import { PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import { IDashboardDaysBarProps } from './dashboard-days-bar.types';

export default function useDashboardDaysBarFilters(
  props: IDashboardDaysBarProps,
  fetchStatistics: (
    dateFrom: number,
    dateTo: number
  ) => Promise<void>
) {
  const now = Date.now();
  const statisticsDaysCount = 30;
  const endDate = ref<number>(now);

  const monthsMaxInMs = dateShortcuts.MS_IN_YEAR -
    dateShortcuts.MS_IN_DAY;

  const daysMaxInMs = statisticsDaysCount *
    dateShortcuts.MS_IN_DAY;

  const startDate = ref<number>(
    props.datePart === PaymentStatisticsDatePart.MONTH
      ? now - monthsMaxInMs
      : now - daysMaxInMs
  );

  const rangeDate = computed<[ number, number ]>(
    () => [ startDate.value, endDate.value ]
  );

  const fetchStatisticsByFilters = async () => {
    await fetchStatistics(
      startDate.value, endDate.value
    );
  };

  const onChangeDate = async (
    value: [ number, number ]
  ) => {
    [ startDate.value, endDate.value ] = value;

    await fetchStatisticsByFilters();
  };

  return {
    monthsMaxInMs,
    daysMaxInMs,
    startDate,
    endDate,
    rangeDate,
    onChangeDate
  };
}
