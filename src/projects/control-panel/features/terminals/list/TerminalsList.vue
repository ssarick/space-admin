<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button/BaseButton.vue';
import BaseIcon from '@/shared/UI/base-icon/BaseIcon.vue';
import PageTitle from '@/shared/UI/page-title/PageTitle.vue';
import TerminalsFilterModal from '@/projects/control-panel/entities/terminals/filter-modal/TerminalsFilterModal.vue';
import UsersMainTable from '@/projects/control-panel/entities/terminals/main-table';
import useTerminalsList from './useTerminalsList';

const {
  fetchTerminals,
  terminals,
  terminalsLoading,
  tableRef,
  filtersModal,
  showModal,
  closeModal
} = useTerminalsList();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
  >
    <PageTitle
      no-margin
      :title="$t('Terminals')"
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
        :to="{ name: 'terminals-create' }"
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
        :to="{ name: 'terminals-create' }"
      >
        {{ $t('terminals-create') }}
      </BaseButton>
    </n-space>
  </n-space>

  <UsersMainTable
    ref="tableRef"
    :data="terminals"
    :loading="terminalsLoading"
    @update="fetchTerminals"
  />

  <TerminalsFilterModal
    :show-modal="filtersModal"
    @close-modal="showModal"
  />

  <TerminalsFilterModal
    v-model:show-modal="filtersModal"
    @close-modal="closeModal"
  />
</template>
