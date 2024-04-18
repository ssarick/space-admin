<script setup lang="ts">
import { NGi, NGrid } from 'naive-ui';
import PageTitle from '@/shared/UI/page-title';
import AdministrationCard from '@/projects/autopay/entities/administration/administration-card/AdministrationCard.vue';
import DebitControlCard from '@/projects/autopay/entities/administration/debit-control-card';
import LimitEditModal from '@/projects/autopay/entities/administration/limit-edit-modal';
import LimitsEditCard from '@/projects/autopay/entities/administration/limits-edit-card';
import useAdministration from '@/projects/autopay/features/administration/useAdministration';

const {
  administrationInfo,
  debitList,
  debitListLoading,
  limitList,
  limitListLoading,
  limitEditModalIsOpen,
  limitForEdit,
  turnOn,
  pause,
  renew,
  onCheckDebitListItem,
  onEditLimitItem,
  onConfirmEditLimit
} = useAdministration();
</script>

<template>
  <div>
    <PageTitle :title="$t('Administration')" />

    <n-grid
      x-gap="16"
      y-gap="32"
      cols="12"
      responsive="screen"
      item-responsive
    >
      <n-gi span="12 m:7">
        <LimitsEditCard
          class="h-100"
          :list="limitList"
          :loading="limitListLoading"
          @edit="onEditLimitItem"
        />
      </n-gi>

      <n-gi span="12 m:5">
        <DebitControlCard
          class="h-100"
          :list="debitList"
          :loading="debitListLoading"
          @check="onCheckDebitListItem"
        />
      </n-gi>

      <n-gi span="12 m:7">
        <AdministrationCard
          class="h-100"
          :administration-info="administrationInfo"
          @turn-on="turnOn"
          @pause="pause"
          @renew="renew"
        />
      </n-gi>
    </n-grid>

    <LimitEditModal
      v-model="limitEditModalIsOpen"
      :limit="limitForEdit"
      @edit="onConfirmEditLimit"
    />
  </div>
</template>
