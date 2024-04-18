import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { usePagination } from '@/shared/composables';
import useTableRef from '@/shared/UI/base-data-table/useTableRef';
import downloadFile from '@/shared/utils/functions/downloadFile';
import { ApiNotificationMessages } from '@/projects/notification-service/shared/api';
import type {
  GroupMessagesClient, GroupMessagesStatus
} from '@/projects/notification-service/shared/types/group-messages.types';
import {
  MessageChannel
} from '@/projects/notification-service/shared/utils/constants/enums';
import { messagesStatusGroupsMap } from '@/projects/notification-service/shared/utils/constants/status-groups-map';
import type {
  GroupMessagesToggleStatusItem
} from '../../../../entities/sms/group-messages/group-messages-status-chart-filters/grouped-messages-statues-chart-filters.types';

export default function useGroupMessagesInfo() {
  const tableRef = useTableRef();
  const route = useRoute();
  const { t } = useI18n();
  const {
    pageNumber,
    pageCount,
    pageSize
  } = usePagination(tableRef);
  const { messageId } = route.params;
  const loading = ref(false);
  const excelLoading = ref(false);
  const statisticsLoading = ref(false);
  const totalItemsLength = ref(100);
  const groupMessagesInfoList = ref<GroupMessagesClient[]>();
  const selectedStatuses = ref<GroupMessagesToggleStatusItem['status']>([]);
  const statusesWidgetList = ref<GroupMessagesToggleStatusItem[]>([
    {
      icon: 'status-icon-default',
      title: t('status-all'),
      number: 0,
      color: '#222222',
      active: false,
      status: null
    },
    {
      icon: 'status-icon-success',
      title: t('status-success'),
      number: 0,
      color: '#16A000',
      active: false,
      status: [
        ...messagesStatusGroupsMap.done
      ]
    },
    {
      icon: 'status-icon-waiting',
      title: t('status-waiting'),
      number: 0,
      color: '#FF8E26',
      active: false,
      status: [
        ...messagesStatusGroupsMap.inProgress
      ]
    },
    {
      icon: 'status-icon-failed',
      title: t('status-failed'),
      number: 0,
      color: '#CA2027',
      active: false,
      status: [
        ...messagesStatusGroupsMap.error
      ]
    }
  ]);

  const assignNumbers = (
    fetchedStatusData: GroupMessagesStatus[],
    statusesWidgetList: GroupMessagesToggleStatusItem[]
  ) => {
    statusesWidgetList.forEach(definition => {
      definition.number = fetchedStatusData.reduce((total, statusCount) => {
        if (definition.status === null) return total + statusCount.count;
        else if (definition.status.includes(statusCount.status)) {
          return total + statusCount.count;
        }
        else return total;
      }, 0);
    });
    return statusesWidgetList;
  };

  const fetchGroupedMessages = async () => {
    loading.value = true;

    const {
      items,
      totalPages,
      totalCount,
      error
    } = await ApiNotificationMessages.fetchAllMessages({
      pageNum: (pageNumber.value - 1).toString(),
      pageSize: pageSize.value.toString(),
      channel: MessageChannel.SMS,
      massMailingId: messageId,
      statuses: selectedStatuses.value
    });

    loading.value = false;
    if (error) return;
    groupMessagesInfoList.value = items;
    totalItemsLength.value = totalCount;
    pageCount.value = totalPages;
  };

  const fetchGroupedMessagesReport = async () => {
    excelLoading.value = true;

    const {
      item,
      error
    } = await ApiNotificationMessages.fetchMessagesReportFile({
      channel: MessageChannel.SMS,
      massMailingId: messageId,
      statuses: selectedStatuses.value,
      pageSize: totalItemsLength.value.toString()
    });

    excelLoading.value = false;
    if (error) return;
    item && downloadFile(item, `grouped-messages-id-${messageId}-report.xlsx`);
  };

  const fetchGroupedMessageStatistics = async () => {
    statisticsLoading.value = true;

    const {
      items,
      error
    } = await ApiNotificationMessages.fetchMessageStatusesById(messageId);

    statisticsLoading.value = false;
    if (error) return;

    statusesWidgetList.value = assignNumbers(items, statusesWidgetList.value);
  };

  const fetchStatusesWidgetInfo = async (
    statuses: GroupMessagesToggleStatusItem['status']
  ) => {
    selectedStatuses.value = statuses || [];
    await fetchGroupedMessages();
  };

  onMounted(async () => {
    await fetchGroupedMessageStatistics();
    await fetchGroupedMessages();
  });

  return {
    loading,
    excelLoading,
    statisticsLoading,
    messageId,
    tableRef,
    pageNumber,
    pageCount,
    statusesWidgetList,
    groupMessagesInfoList,
    fetchStatusesWidgetInfo,
    fetchGroupedMessages,
    fetchGroupedMessagesReport
  };
}
