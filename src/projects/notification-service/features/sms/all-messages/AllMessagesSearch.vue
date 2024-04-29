<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import AllMessagesActiveFilters
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-active-filters';
import AllMessagesDatePicker
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-date-picker';
import AllMessagesFilterModal
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-filter-modal';
import AllMessagesMainTable
  from '@/projects/notification-service/entities/sms/all-messages/all-messages-list';
import useAllMessageSearch from './useAllMessagesSearch';

const {
  tableRef,
  modalState,
  loading,
  excelLoading,
  statusOptions,
  allMessagesList,
  filters,
  activeFilterValues,
  dateFilters,
  filterMessages,
  updateDateFilters,
  downloadExcelReport,
  handleCloseActiveFilters,
  closeModal,
  showModal
} = useAllMessageSearch();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-3"
  >
    <n-space>
      <PageTitle
        no-margin
        :title="$t('messages-table')"
      />
    </n-space>

    <n-space
      justify="space-around"
      :size="[ 20, 16 ]"
    >
      <AllMessagesDatePicker
        v-model:date-from="dateFilters.dateFrom"
        v-model:date-to="dateFilters.dateTo"
        @update:date-from="updateDateFilters"
        @update:date-to="updateDateFilters"
      />

      <n-space
        :size="[ 20, 16 ]"
      >
        <BaseButton
          class="px-6"
          type="tertiary"
          :loading="excelLoading"
          @click="downloadExcelReport"
        >
          <template #icon>
            <BaseIcon
              icon="download"
              size="24"
              color="#fff"
            />
          </template>

          Excel
        </BaseButton>

        <BaseButton
          class="px-6"
          type="primary"
          @click="showModal"
        >
          <template #icon>
            <BaseIcon
              icon="filter"
              size="24"
            />
          </template>

          {{ $t('Filters') }}
        </BaseButton>
      </n-space>
    </n-space>
  </n-space>

  <AllMessagesActiveFilters
    :filter-items="activeFilterValues"
    @handle-close="handleCloseActiveFilters"
  />

  <AllMessagesMainTable
    ref="tableRef"
    :data="allMessagesList"
    :loading="loading"
    @update="filterMessages"
  />

  <AllMessagesFilterModal
    v-model:show-modal="modalState"
    v-model:recipientAddress="filters.recipientAddress"
    v-model:statuses="filters.statuses"
    v-model:messageSnippet="filters.messageSnippet"
    :status-options="statusOptions"
    :form-value="filters"
    @submit-filter-modal="filterMessages"
    @close-modal="closeModal"
  />
</template>

