<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import { ApiAdmin } from '@/shared/api/request';
import BaseIcon from '@/shared/UI/base-icon';
import PageToolbar from '@/shared/UI/page-toolbar';
import { ApiLogsAudit } from '../../shared/api';
import LogsAuditDetails from '../../entities/details';
import LogsAuditFiltersModal from '../../entities/filters-modal';
import LogsAuditTable from '../../entities/table';
import useLogsAuditList from './useLogsAuditList';

const {
  logsAuditList,
  logsAuditListLoading,
  filtersModalIsActive,
  filtersModel,
  tableRef,
  isDetailsActive,
  logsAuditDetails,
  fetchLogsAuditList,
  unloadingModalRef,
  logsAuditUnloadLoading,
  unloadingModalIsActive,
  unloadingModel,
  toggleUnloadingModal,
  toggleFiltersModal,
  showItemDetails,
  handleSubmitFilters,
  handleSubmitDownload
} = useLogsAuditList();
</script>

<template>
  <PageToolbar
    title="Аудит логов"
    is-show-slot
  >
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <n-button
        type="tertiary"
        class="px-6"
        :loading="logsAuditUnloadLoading"
        @click="toggleUnloadingModal"
      >
        <template #icon>
          <BaseIcon
            icon="download"
            size="24"
            color="#fff"
          />
        </template>

        Excel
      </n-button>

      <n-button
        type="primary"
        class="px-6"
        @click="toggleFiltersModal"
      >
        <template #icon>
          <BaseIcon
            icon="filter"
            size="24"
          />
        </template>

        {{ $t('Filters') }}
      </n-button>
    </n-space>
  </PageToolbar>

  <LogsAuditTable
    ref="tableRef"
    :data="logsAuditList"
    :loading="logsAuditListLoading"
    @update="fetchLogsAuditList"
    @select-item="showItemDetails"
  />

  <LogsAuditDetails
    v-model="isDetailsActive"
    :data="logsAuditDetails"
  />

  <LogsAuditFiltersModal
    v-model="filtersModalIsActive"
    v-model:action="filtersModel.action"
    v-model:service="filtersModel.service"
    v-model:username="filtersModel.username"
    v-model:date-from="filtersModel.dateFrom"
    v-model:date-to="filtersModel.dateTo"
    :model="filtersModel"
    :request-admins="ApiAdmin.fetchAdminsForSelect"
    :request-actions="ApiLogsAudit.fetchActions"
    :request-services="ApiLogsAudit.fetchServices"
    @submit="handleSubmitFilters"
  />

  <LogsAuditFiltersModal
    v-model="unloadingModalIsActive"
    v-model:action="unloadingModel.action"
    v-model:service="unloadingModel.service"
    v-model:username="unloadingModel.username"
    v-model:date-from="unloadingModel.dateFrom"
    v-model:date-to="unloadingModel.dateTo"
    ref="unloadingModalRef"
    title="Excel"
    submit-text="Выгрузить"
    is-dates-required
    :model="unloadingModel"
    :request-admins="ApiAdmin.fetchAdminsForSelect"
    :request-actions="ApiLogsAudit.fetchActions"
    :request-services="ApiLogsAudit.fetchServices"
    @submit="handleSubmitDownload"
  />
</template>
