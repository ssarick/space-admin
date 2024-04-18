import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { ApiInventorySessions } from '@/projects/inventory/shared/api';
import type {
  InventorySessionDetails,
  InventoryStatusesOption,
  InventoryTypeInput
} from '@/projects/inventory/shared/types/sessions.types';
import { InventoryStatusesColorMap } from '@/projects/inventory/shared/utils/constants/status-map';

export default function useSessionInfo() {
  const { t } = useI18n();
  const route = useRoute();
  const tableRef = useTableRef();
  const {
    pageCount,
    pageNumber,
    pageSize,
    resetPagination
  } = usePagination(tableRef);

  const sessions = ref<InventorySessionDetails[]>([]);
  const sessionsLoading = ref(false);
  const sessionType = ref<InventoryTypeInput['value']>('inventoried');
  const { sessionId } = route.params;
  const sessionStatusesList = ref<InventoryStatusesOption[]>();

  const sessionUrlType = ref<string>('inventoried');

  const sessionTypes = computed<InventoryTypeInput[]>(() => [
    {
      id: 0,
      name: t('inventoried'),
      value: 'inventoried'
    },
    {
      id: 1,
      name: t('uninventoried'),
      value: 'uninventoried'
    }
  ]);

  const fetchSessionDetails = async () => {
    sessionsLoading.value = true;

    const {
      totalPages,
      items
    } = await ApiInventorySessions.fetchSessionsDetails({
      page: pageNumber.value,
      count: pageSize.value,
      id: sessionId,
      type: sessionUrlType.value
    });

    sessions.value = items;
    pageCount.value = totalPages;
    sessionsLoading.value = false;
  };

  const fetchSessionStatuses = async () => {
    const {
      result
    } = await ApiInventorySessions.fetchInventoryStatusesList();

    sessionStatusesList.value = InventoryStatusesColorMap.map(status => {
      return {
        ...result.find((item) => item.stateId === status.stateId),
        color: status.color
      };
    }) as InventoryStatusesOption[];
  };

  const handleEquipmentListChange = async (
    payload: InventoryTypeInput['value']) => {
    sessionUrlType.value = payload;
    resetPagination();
    await fetchSessionDetails();
  };

  onMounted(async () => {
    await fetchSessionStatuses();
    await fetchSessionDetails();
  });

  return {
    sessionType,
    sessionTypes,
    sessions,
    sessionsLoading,
    sessionStatusesList,
    tableRef,
    fetchSessionDetails,
    handleEquipmentListChange
  };
}
