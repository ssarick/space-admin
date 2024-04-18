import { ref } from 'vue';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import useDashboardStatisticsFetch from '@/projects/autopay/shared/composables/dashboard/useDashboardStatisticsFetch';
import ProcessingTypesMapper from '@/projects/autopay/shared/mappers/processing-types';
import { IPaymentStatisticsPayload, PaymentStatisticsDatePart } from '@/projects/autopay/shared/types/dashboard.types';
import { processingTypesList } from '@/projects/autopay/shared/utils/constants/processing-types';
import useDashboardWithdrawalTable from './composables/useDashboardWithdrawalTable';
import { DashboardWithdrawalListProps } from './dashboard-withdrawal-list.types';

export default function useDashboardWithdrawalList(
  props: DashboardWithdrawalListProps
) {
  const now = Date.now();
  const endDate = ref<number>(now);

  const monthsMaxInMs = dateShortcuts.MS_IN_YEAR -
    dateShortcuts.MS_IN_DAY;

  const startDate = ref<number>(now - monthsMaxInMs);

  const rangeDate = computed<[ number, number ]>(
    () => [ startDate.value, endDate.value ]
  );

  const {
    statistics,
    fetchStatistics,
    loading
  } = useDashboardStatisticsFetch(
    getFetchStatisticsPayload
  );

  const dashboardWithdrawalTable = useDashboardWithdrawalTable(
    statistics
  );

  const fetchStatisticsWithFilters = async () =>
    fetchStatistics(
      startDate.value, endDate.value
    );

  const onChangeDate = async (
    value: [ number, number ]
  ) => {
    [ startDate.value, endDate.value ] = value;

    await fetchStatisticsWithFilters();
  };

  function getFetchStatisticsPayload():
    IPaymentStatisticsPayload {
    return {
      datePart: PaymentStatisticsDatePart.MONTH,
      processingTypes: props.processings
        || ProcessingTypesMapper.toTypes(
          processingTypesList
        )
    };
  }

  onMounted(fetchStatisticsWithFilters);

  return {
    ...dashboardWithdrawalTable,
    rangeDate,
    loading,
    statistics,
    onChangeDate
  };
}
