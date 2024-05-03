<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button/BaseButton.vue';
import BaseIcon from '@/shared/UI/base-icon/BaseIcon.vue';
import PageTitle from '@/shared/UI/page-title/PageTitle.vue';
import BinsFilterModal from '@/projects/control-panel/entities/bins/filter-modal/BinsFilterModal.vue';
import BinsMainTable from '@/projects/control-panel/entities/bins/main-table/BinsMainTable.vue';
import useBinsList from './useBinsList.ts';

const {
  fetchBins,
  bins,
  binsLoading,
  tableRef,
  filtersModal,
  showModal,
  closeModal
} = useBinsList();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
  >
    <PageTitle
      no-margin
      :title="$t('Bins')"
    />

    <n-space
      :size="[ 20, 16 ]"
    >
      <BaseButton
        type="tertiary"
        class="px-4"
        @click="showModal"
      >
        <template #icon>
          <BaseIcon
            color="#fff"
            icon="filter"
            size="24"
          />
        </template>
        {{ $t('Filters') }}
      </BaseButton>

      <BaseButton
        type="tertiary"
        class="px-5"
        link
        :to="{ name: 'bins-create' }"
      >
        <template #icon>
          <BaseIcon
            color="#fff"
            icon="download"
            size="24"
          />
        </template>
        {{ $t('Excel') }}
      </BaseButton>

      <BaseButton
        type="primary"
        link
        :to="{ name: 'bins-create' }"
      >
        {{ $t('bins-create') }}
      </BaseButton>
    </n-space>
  </n-space>

  <BinsMainTable
    ref="tableRef"
    :data="bins"
    :loading="binsLoading"
    @update="fetchBins"
  />

  <BinsFilterModal
    v-model:show-modal="filtersModal"
    @close-modal="closeModal"
  />
</template>
