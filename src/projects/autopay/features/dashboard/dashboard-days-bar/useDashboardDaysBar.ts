import { computed, onMounted } from 'vue';
import { DatePickerProps } from 'naive-ui';
import { StatusConfig } from '@/shared/types/status.types';
import { DATE_MONTH_FORMAT, DATE_SHORT_FORMAT } from '@/shared/utils/constants/naive-constants';
import useDashboardStatisticsFetch from '@/projects/autopay/shared/composables/dashboard/useDashboardStatisticsFetch';
import ProcessingTypesMapper from '@/projects/autopay/shared/mappers/processing-types';
import { ProcessingType } from '@/projects/autopay/shared/types/administration.types';
import { IPaymentStatisticsPayload, PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import { processingTypesList } from '@/projects/autopay/shared/utils/constants/processing-types';
import { IDashboardDaysBarProps } from './dashboard-days-bar.types';
import useDashboardDaysBarChart from './useDashboardDaysBarChart';
import useDashboardDaysBarFilters from './useDashboardDaysBarFilters';

export default function useDashboardDaysBar(
  props: IDashboardDaysBarProps
) {
  const {
    statistics,
    fetchStatistics,
    loading
  } = useDashboardStatisticsFetch(
    getFetchStatisticsPayload
  );

  const processingFilters = computed<
    StatusConfig<ProcessingType>[]
  >(
    () => props.processingFilters || processingTypesList
  );

  const barFilters = useDashboardDaysBarFilters(
    props, fetchStatistics
  );

  const datePickerProps = computed<DatePickerProps>(
    () => (props.datePart ===
      PaymentStatisticsDatePart.MONTH)
      ? getMonthProps()
      : getDateProps()
  );

  const barChart = useDashboardDaysBarChart(
    statistics
  );

  function getFetchStatisticsPayload():
  IPaymentStatisticsPayload {
    return {
      datePart: props.datePart
        || PaymentStatisticsDatePart.DAY,
      processingTypes: ProcessingTypesMapper
        .toTypes(processingFilters.value)
    };
  }

  function getDateProps(): DatePickerProps {
    return {
      format: DATE_SHORT_FORMAT,
      type: 'daterange',
      isDateDisabled
    };
  }

  function getMonthProps(): DatePickerProps {
    return {
      format: DATE_MONTH_FORMAT,
      type: 'monthrange'
    };
  }

  function isDateDisabled(
    date: number,
    position: 'start' | 'end',
    value: [ number, number ] | null
  ) {
    const startDate = (
      position === 'start' ? date : value?.[0]
    ) || 0;

    const endDate = (
      position === 'end' ? date : value?.[1]
    ) || 0;

    const diffDate = endDate - startDate;

    return diffDate > barFilters.daysMaxInMs;
  }

  onMounted(() => {
    fetchStatistics(
      barFilters.startDate.value,
      barFilters.endDate.value
    );
  });

  return {
    ...barChart,
    ...barFilters,
    processingFilters,
    loading,
    datePickerProps
  };
}
