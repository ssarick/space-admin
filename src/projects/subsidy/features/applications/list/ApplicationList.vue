<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import BaseUpload from '@/shared/UI/base-upload';
import PageToolbar from '@/shared/UI/page-toolbar';
import { FileMimeType } from '@/shared/utils/constants/file-mime-types';
import ApplicationFilterModal from '@/projects/subsidy/entities/applications/filters-modal';
import ApplicationsTable from '@/projects/subsidy/entities/applications/table';
import { ApiSubsidyApplication } from '@/projects/subsidy/shared/api';
import useApplicationList from './useApplicationList';

const {
  tableRef,
  applications,
  applicationsLoading,
  fileUploadLoading,
  filtersModel,
  filtersModalIsActive,
  handleFileUpload,
  fetchApplications,
  showFiltersModal,
  deleteApplication,
  selectedApplicationIds,
  canSendToMinfin,
  handleSendToMinfin,
  minfinApplications,
  minfinModalIsActive,
  toggleMinfinModal,
  updateMinfinApplication
} = useApplicationList();
</script>

<template>
  <PageToolbar
    title="Заявки на субсидии"
    is-show-slot
  >
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <BaseUpload
        :show-file-list="false"
        :accept="[
          FileMimeType.xls,
          FileMimeType.xlsx
        ]"
        @change="handleFileUpload"
      >
        <n-button
          tertiary
          :loading="fileUploadLoading"
        >
          <template #icon>
            <BaseIcon
              icon="download"
              size="24"
            />
          </template>

          Загрузить Excel
        </n-button>
      </BaseUpload>

      <n-button
        type="tertiary"
        :disabled="!canSendToMinfin"
        @click="handleSendToMinfin"
      >
        Отправить в Минфин
      </n-button>

      <n-button
        type="primary"
        class="px-6"
        @click="showFiltersModal"
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

  <ApplicationsTable
    v-model:selected-ids="selectedApplicationIds"
    ref="tableRef"
    :applications="applications"
    :loading="applicationsLoading"
    @update="fetchApplications"
    @delete="deleteApplication"
  />

  <ApplicationFilterModal
    v-model="filtersModalIsActive"
    v-model:acc-external="filtersModel.accExternal"
    v-model:amount-payable-tiyin-from="filtersModel.amountPayableTiyinFrom"
    v-model:amount-payable-tiyin-to="filtersModel.amountPayableTiyinTo"
    v-model:minfin-status="filtersModel.minfinStatus"
    v-model:payment-day-from="filtersModel.paymentDayFrom"
    v-model:payment-day-to="filtersModel.paymentDayTo"
    v-model:pinfl="filtersModel.pinfl"
    v-model:status="filtersModel.status"
    :model="filtersModel"
    :request-minfin-statuses="ApiSubsidyApplication.fetchMinfinStatuses"
    @submit="fetchApplications"
  />

  <slot
    :show-modal="minfinModalIsActive"
    :applications="minfinApplications"
    :set-show-modal="toggleMinfinModal"
    :update-application="updateMinfinApplication"
  />
</template>
