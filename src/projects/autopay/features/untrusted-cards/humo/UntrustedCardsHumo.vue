<script setup lang='ts'>
import { NSpace, NTag } from 'naive-ui';
import BaseIcon from '@/shared/UI/base-icon';
import PageTitle from '@/shared/UI/page-title';
import UntrustedHumoCardsFilterModal from '@/projects/autopay/entities/untrusted-card/untrusted-humo-card-filter-modal';
import UntrustedHumoCardList from '@/projects/autopay/entities/untrusted-card/untrusted-humo-card-list/UntrustedHumoCardList.vue';
import useUntrustedCards from './useUntrustedCardsHumo';

const {
  modalState,
  showModal,
  closeModal,
  approveOrDeclineCard,
  checkedValuesIds,
  toggleCheckedValueInArray,
  formValue,
  filterCards,
  activeFIlters,
  formValuesNaming,
  removeFilter,
  cards,
  cardsLoading,
  fetchCards,
  tableRef
} = useUntrustedCards();
</script>

<template>
  <div>
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <PageTitle
        no-margin
        :title="`${$t('card-untrusted-list-wrapper')} Cards`"
      />

      <n-space :size="[ 24, 12 ]">
        <n-button
          type="error"
          class="px-5"
          @click="approveOrDeclineCard(checkedValuesIds, false)"
        >
          <span>{{ $t('Decline') }}</span>
        </n-button>

        <n-button
          type="success"
          class="px-5"
          @click="approveOrDeclineCard(checkedValuesIds, true)"
        >
          <span>{{ $t('Approve') }}</span>
        </n-button>

        <n-button
          class="px-5"
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
        </n-button>
      </n-space>
    </n-space>

    <n-space class="mb-4">
      <n-tag
        v-for="(_, key) in activeFIlters"
        :key="key"
        type="warning"
      >
        <div class="flex align-items-center">
          <span class="color-common_black mr-1">{{ formValuesNaming[key] }}</span>

          <div
            class="flex cursor-pointer"
            @click="removeFilter(key)"
          >
            <BaseIcon
              icon="close"
              size="18"
            />
          </div>
        </div>
      </n-tag>
    </n-space>

    <UntrustedHumoCardList
      ref="tableRef"
      :cards="cards"
      :loading="cardsLoading"
      :checked-values="checkedValuesIds"
      @update="fetchCards"
      @row-click="toggleCheckedValueInArray"
    />

    <UntrustedHumoCardsFilterModal
      v-model:showModal="modalState"
      v-model:contractId="formValue.contractId"
      v-model:clientId="formValue.clientId"
      v-model:status="formValue.status"
      v-model:similarity-from="formValue.similarityFrom"
      v-model:similarity-to="formValue.similarityTo"
      :form-values="formValue"
      @submit-filter-modal="filterCards"
      @close-modal="closeModal"
    />

  </div>
</template>
