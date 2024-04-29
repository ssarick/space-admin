import {
  onMounted,
  reactive,
  ref
} from 'vue';
import { usePagination } from '@/shared/composables';
import { globalConfig } from '@/shared/config/global-config';
import { IResponseData } from '@/shared/types/api.types';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import dateShortcuts from '@/shared/utils/constants/date-shortcuts';
import { formatDateToUTC } from '@/shared/utils/functions/date';
import { ApiNotificationMessages } from '@/projects/notification-service/shared/api';
import type {
  GroupMessagesClient,
  GroupMessagesClientInternal,
  GroupMessagesDatePickerModel
} from '@/projects/notification-service/shared/types/group-messages.types';
import { MessageDateFormatted } from '@/projects/notification-service/shared/types/send-message.types';
import { MessageChannel } from '@/projects/notification-service/shared/utils/constants/enums';
import useGroupMessagesProgressControls from './composables/useGroupMessagesProgressControls';

export default function useGroupMessagesSearch() {
  const tableRef = useTableRef();
  const loading = ref(false);
  let fetchPollingId: number = 0;

  const {
    pageNumber,
    pageCount,
    pageSize,
    resetPagination
  } = usePagination(tableRef);

  const dateFilters = reactive<
    GroupMessagesDatePickerModel
  >({
    dateFrom: null,
    dateTo: null
  });

  const groupMessagesList = ref<
    GroupMessagesClientInternal[]
  >([]);

  const groupMessageSetter = useGroupMessagesProgressControls(
    groupMessagesList
  );

  const filterGroupMessages = async (_: SubmitEvent) => {
    resetPagination();
    await fetchGroupMessages();
  };

  const requestFetchGroupMessages = async (): Promise<
    IResponseData<GroupMessagesClient>
  > => {
    const { dateFrom, dateTo } = dateFilters;

    const formattedDates: MessageDateFormatted = {
      dateFrom: dateFrom
        && formatDateToUTC(dateFrom).slice(0, 19),
      dateTo: dateTo
        && formatDateToUTC(dateTo).slice(0, 19)
    };

    return ApiNotificationMessages
      .fetchGroupMessages({
        channel: MessageChannel.SMS,
        pageNum: (pageNumber.value - 1).toString(),
        pageSize: pageSize.value.toString(),
        ...formattedDates
      });
  };

  const fetchControllableGroupMessages = async (
    enableLoading: boolean = true
  ) => {
    if (enableLoading) loading.value = true;

    const {
      items,
      totalPages,
      error
    } = await requestFetchGroupMessages();

    if (enableLoading) loading.value = false;
    if (error) return;

    groupMessagesList.value = items;
    pageCount.value = totalPages;
  };

  const fetchGroupMessages = () =>
    fetchControllableGroupMessages();

  const startFetchPolling = () =>
    fetchPollingId = setInterval(
      () => fetchControllableGroupMessages(false),
      globalConfig.pollingDelayInSec *
        dateShortcuts.MS_IN_SEC
    );

  const stopFetchPolling = () => clearInterval(
    fetchPollingId
  );

  onMounted(async () => {
    await fetchGroupMessages();
    startFetchPolling();
  });

  onBeforeUnmount(stopFetchPolling);

  return {
    ...groupMessageSetter,
    loading,
    groupMessagesList,
    dateFilters,
    tableRef,
    filterGroupMessages,
    fetchGroupMessages
  };
}
