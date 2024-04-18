<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import GroupMessagesDatePickers
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-date-picker';
import GroupMessagesMainTable
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-list';
import useGroupMessagesSearch
  from '@/projects/notification-service/features/sms/group-messages/list/useGroupMessagesSearch';

const {
  loading,
  dateFilters,
  tableRef,
  groupMessagesList,
  stopMailing,
  pauseMailing,
  playMailing,
  filterGroupMessages,
  fetchGroupMessages
} = useGroupMessagesSearch();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-3"
  >
    <n-space>
      <PageTitle
        no-margin
        :title="$t('grouped-messages-table')"
      />
    </n-space>

    <n-space
      justify="space-around"
      :size="[20, 16]"
    >
      <GroupMessagesDatePickers
        v-model:date-from="dateFilters.dateFrom"
        v-model:date-to="dateFilters.dateTo"
      />

      <BaseButton
        type="tertiary"
        class="px-4"
        :loading="loading"
        @click="filterGroupMessages"
      >
        <template #icon>
          <BaseIcon
            icon="search"
            size="24"
            color="#fff"
          />
        </template>

        {{ $t('Search') }}
      </BaseButton>
    </n-space>
  </n-space>

  <GroupMessagesMainTable
    ref="tableRef"
    :data="groupMessagesList"
    :loading="loading"
    @play="playMailing"
    @pause="pauseMailing"
    @stop="stopMailing"
    @update="fetchGroupMessages"
  />
</template>

