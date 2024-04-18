<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import GroupMessagesInfoTable
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-info-list';
import GroupMessagesStatusChartFilters
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-status-chart-filters';
import useGroupMessagesInfo
  from './useGroupMessagesInfo';

const {
  loading,
  excelLoading,
  statisticsLoading,
  messageId,
  statusesWidgetList,
  groupMessagesInfoList,
  fetchGroupedMessages,
  fetchStatusesWidgetInfo,
  fetchGroupedMessagesReport,
  tableRef
} = useGroupMessagesInfo();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-3"
  >
    <PageTitle
      no-margin
      :title="$t('group-messages-no') + messageId"
    />

    <BaseButton
      class="px-6"
      type="tertiary"
      :loading="excelLoading"
      @click="fetchGroupedMessagesReport"
    >
      <template #icon>
        <BaseIcon
          icon="download"
          size="24"
          color="#fff"
        />
      </template>

      {{ $t('download-report') }}
    </BaseButton>
  </n-space>

  <GroupMessagesStatusChartFilters
    :data="statusesWidgetList"
    :loading="statisticsLoading"
    @on-select-statuses="fetchStatusesWidgetInfo"
  />

  <GroupMessagesInfoTable
    ref="tableRef"
    :data="groupMessagesInfoList"
    :loading="loading"
    @update="fetchGroupedMessages"
  />
</template>
