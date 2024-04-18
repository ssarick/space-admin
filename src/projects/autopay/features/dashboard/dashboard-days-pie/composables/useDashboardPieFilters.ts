import { computed, ref } from 'vue';
import { IDictionaryCommon } from '@/shared/types/common.types';
import { NonNullableObjectValues } from '@/shared/types/utility.types';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import { DatesByShortcuts, StatisticsDateShortcut } from '../dashboard-days-pie.types';

export default function useDashboardPieFilters(
  fetchStatistics: (date: number) => Promise<void>
) {
  const selectedDate = ref<number>(Date.now());

  const pieDateFilter = ref<StatisticsDateShortcut>(
    StatisticsDateShortcut.TODAY
  );

  const dates: DatesByShortcuts = {
    [StatisticsDateShortcut.TODAY]: () => Date.now(),
    [StatisticsDateShortcut.DATE]: () => selectedDate.value,
    [StatisticsDateShortcut.YESTERDAY]: () =>
      Date.now() - dateShortcuts.MS_IN_DAY
  };

  const customDateSelectable = computed(() =>
    pieDateFilter.value === StatisticsDateShortcut.DATE);

  const pieFilters: NonNullableObjectValues<IDictionaryCommon>[] = [
    {
      name: 'Вчера',
      id: StatisticsDateShortcut.YESTERDAY
    },
    {
      name: 'Сегодня',
      id: StatisticsDateShortcut.TODAY
    },
    {
      name: 'По дате',
      id: StatisticsDateShortcut.DATE
    }
  ];

  const fetchStatisticsByFilters = async () => {
    const date = dates[pieDateFilter.value]();

    date && fetchStatistics(date);
  };

  const onChangeSelectedDate = async (
    value: number
  ) => {
    selectedDate.value = value;

    await fetchStatisticsByFilters();
  };

  const onChangePieDateFilter = async (
    value: StatisticsDateShortcut
  ) => {
    pieDateFilter.value = value;

    value === StatisticsDateShortcut.DATE
      || await fetchStatisticsByFilters();
  };

  return {
    onChangeSelectedDate,
    onChangePieDateFilter,
    customDateSelectable,
    pieFilters,
    selectedDate,
    pieDateFilter
  };
}
