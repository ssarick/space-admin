import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChartData } from 'chart.js';
import type {
  ChartItem,
  GroupMessagesStatusChartFilterEmits,
  GroupMessagesStatusChartFilterProps,
  GroupMessagesToggledClass,
  GroupMessagesToggleStatusItem
} from './grouped-messages-statues-chart-filters.types';

export default function useGroupedMessagesStatusChartFilters(
  props: GroupMessagesStatusChartFilterProps,
  emit: GroupMessagesStatusChartFilterEmits
) {
  const { t } = useI18n();
  const itemsList = ref<GroupMessagesToggleStatusItem[]>();
  const selectedStatus = ref<GroupMessagesToggleStatusItem>();
  const activeColors = ref<GroupMessagesToggledClass>();
  const activeColorsHover = ref<GroupMessagesToggledClass>();
  const chartData = ref<ChartData<'pie'>>();

  const hoverActiveClass = (payload: GroupMessagesToggleStatusItem) => {
    const { color } = payload;

    activeColorsHover.value = {
      color: color,
      alpha: alphaColorTransformer(color, 15)
    };
  };

  const toggleActiveClass = (payload: GroupMessagesToggleStatusItem) => {
    const { title } = payload;

    itemsList.value && itemsList.value.forEach(item => {
      item.active = item.title === title;

      if (item.active) {
        activeColors.value = {
          color: item.color,
          alpha: alphaColorTransformer(item.color, 15)
        };
      }
    });

    selectedStatus.value = payload;
    emit('onSelectStatuses', payload.status);
  };

  const alphaColorTransformer = (color: string, modifier?: number | null) => {
    return modifier ? `${color}${modifier}` : `${color}`;
  };

  const createPieChart = (itemsList: ChartItem[]) => {
    const filteredItems = itemsList.filter(item => item.status !== null);

    chartData.value = {
      labels: filteredItems.map(item => t(`${item.title!}`)),
      datasets: [ {
        backgroundColor: filteredItems.map(item => alphaColorTransformer(item.color, 50)),
        data: [ ...filteredItems.map(item => item.number) ]
      } ]
    };
  };

  onMounted(() => {
    createPieChart([]);
  });

  watch(
    () => props.data,
    () => {
      itemsList.value = props.data;
      createPieChart(props.data);
    },
    {
      deep: true
    }
  );

  return {
    activeColors,
    activeColorsHover,
    itemsList,
    chartData,
    selectedStatus,
    toggleActiveClass,
    hoverActiveClass
  };
}
