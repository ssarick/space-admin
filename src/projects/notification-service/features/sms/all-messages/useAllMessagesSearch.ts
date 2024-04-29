import {
  onMounted,
  reactive,
  ref
} from 'vue';
import { useI18n } from 'vue-i18n';
import { SelectOption } from 'naive-ui';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import { formatDateToUTC } from '@/shared/utils/functions/date';
import downloadFile from '@/shared/utils/functions/downloadFile';
import type { Filter } from '@/projects/notification-service/entities/sms/all-messages/all-messages-active-filters/all-messages-active-filters.types';
import { ApiNotificationMessages } from '@/projects/notification-service/shared/api';
import type {
  AllMessagesClient,
  AllMessagesDatePickerModel,
  AllMessagesFiltersInput
} from '@/projects/notification-service/shared/types/all-messages.types';
import { MessageDateFormatted } from '@/projects/notification-service/shared/types/send-message.types';
import { MessageChannel } from '@/projects/notification-service/shared/utils/constants/enums';
import { MessagesStatusMap } from '@/projects/notification-service/shared/utils/constants/status-map';

export default function useAllMessageSearch() {
  const { t } = useI18n();
  const tableRef = useTableRef();
  const {
    pageNumber,
    pageSize,
    pageCount,
    resetPagination
  } = usePagination(tableRef);

  const filters = reactive<AllMessagesFiltersInput>({
  });
  const dateFilters = reactive<AllMessagesDatePickerModel>({
    dateFrom: null,
    dateTo: null
  });
  const activeFilterValues = ref<Filter[]>([]);
  const loading = ref(false);
  const excelLoading = ref(false);
  const excelTotalItems = ref<number>(0);
  const maxPageSize = ref<number>(10000);
  const modalState = ref(false);
  const excelModalState = ref(false);
  const allMessagesList = ref<AllMessagesClient[]>();

  const statusOptions = computed<
    SelectOption[]
  >(() => MessagesStatusMap.map(item => {
    return {
      label: t(`${item.value}`),
      value: item.value
    };
  }));

  const showModal = () =>
    modalState.value = true;

  const closeModal = () =>
    modalState.value = false;

  const removeActiveFilter = (
    key: keyof AllMessagesFiltersInput
  ) => {
    const index = activeFilterValues.value.findIndex(
      item => item.key === key
    );

    index > -1 && activeFilterValues.value.splice(
      index, 1
    );
  };

  const filterMessages = async (_: SubmitEvent) => {
    const newFilters: Filter[] = [];

    for (const key in filters) {
      const typedKey = key as keyof AllMessagesFiltersInput;

      filters[key] && newFilters.push({
        key: typedKey,
        value: filters[key]
      });
    }

    activeFilterValues.value = newFilters;

    closeModal();
    await fetchAllMessages();
  };

  const handleCloseActiveFilters = async (value?: Filter) => {
    value && delete filters[value.key];
    value && removeActiveFilter(value.key);

    resetPagination();
    await fetchAllMessages();
  };

  const formatDate = (date: number) => formatDateToUTC(date).slice(0, 19);

  const fetchAllMessages = async () => {
    loading.value = true;

    const {
      dateFrom,
      dateTo
    } = dateFilters;

    const formattedDates: MessageDateFormatted = {
      dateFrom: dateFrom && formatDate(dateFrom),
      dateTo: dateTo && formatDate(dateTo)
    };

    const {
      items,
      totalPages,
      totalCount,
      error
    } = await ApiNotificationMessages.fetchAllMessages({
      pageNum: (pageNumber.value - 1).toString(),
      pageSize: pageSize.value.toString(),
      channel: MessageChannel.SMS,
      massMailingId: '',
      ...filters,
      ...formattedDates
    });

    await ApiNotificationMessages.fetchMessageStatuses();

    loading.value = false;

    if (error) return;
    allMessagesList.value = items;
    excelTotalItems.value = totalCount;
    pageCount.value = totalPages;
  };

  const downloadExcelReport = async () => {
    excelLoading.value = true;

    const {
      dateFrom,
      dateTo
    } = dateFilters;

    const formattedDates: MessageDateFormatted = {
      dateFrom: dateFrom && formatDate(dateFrom),
      dateTo: dateTo && formatDate(dateTo)
    };

    const {
      item,
      error
    } = await ApiNotificationMessages.fetchMessagesReportFile({
      channel: MessageChannel.SMS,
      ...filters,
      ...formattedDates,
      pageSize: Math.min(excelTotalItems.value, maxPageSize.value).toString()
    });

    excelLoading.value = false;

    if (error) return;

    item && downloadFile(item, 'grouped-messages-report.xlsx');
  };

  const updateDateFilters = async () => await fetchAllMessages();

  onMounted(fetchAllMessages);

  return {
    loading,
    excelLoading,
    allMessagesList,
    filters,
    tableRef,
    modalState,
    excelModalState,
    activeFilterValues,
    dateFilters,
    statusOptions,
    showModal,
    closeModal,
    handleCloseActiveFilters,
    filterMessages,
    updateDateFilters,
    downloadExcelReport
  };
}
