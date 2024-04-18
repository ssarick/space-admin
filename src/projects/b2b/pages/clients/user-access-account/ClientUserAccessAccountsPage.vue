<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseDataTable from '@/shared/UI/base-data-table';
import PageTitle from '@/shared/UI/page-title';
import renderIcon from '@/shared/utils/render-icon';
import useClientUserAccessAccount from './useClientUserAccessAccount';

const router = useRouter();

const {
  userFullName,
  columns,
  isLoading,
  rowKey,
  dataTable,
  fetchAccounts,
  businessCode,
  userId,
  onNext,
  tableRef
} = useClientUserAccessAccount();
</script>

<template>
  <div class="user-access-acounts">
    <PageTitle
      :title="$t('Access-rights-to-accounts') + ', ' + userFullName"
    />

    <BaseDataTable
      ref="tableRef"
      :columns="columns"
      :loading="isLoading"
      :row-key="rowKey"
      :data="dataTable"
      @update="fetchAccounts"
    />

    <footer class="flex mt-3">
      <n-button
        class="ml-auto"
        ghost
        @click="
          router.push({
            name: 'client-user-access-permissions',
            params: { businessCode, userId },
          })
        "
      >
        {{ $t('Back') }}
      </n-button>

      <n-button
        type="info"
        icon-placement="right"
        class="mx-2"
        ghost
        :render-icon="renderIcon('arrow-right')"
        @click="onNext"
      >
        {{ $t('Next') }}
      </n-button>
      <n-button
        type="warning"
        ghost
        @click="router.push({ name: 'clients' })"
      >
        {{ $t('Cancel') }}
      </n-button>
    </footer>
  </div>
</template>
