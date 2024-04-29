<script setup lang="ts">
import {
  NGrid,
  NGridItem,
  NSpace
} from 'naive-ui';
import BaseDataTable from '@/shared/UI/base-data-table';
import OrganizationList from '@/projects/b2b/entities/organization-list/OrganizationList.vue';
import { IUserAccessAccountsProps } from './user-access-accounts.types';
import useUserAccessAccounts from './useUserAccessAccounts';

const props = defineProps<IUserAccessAccountsProps>();

const {
  selectedOrganization,
  columns,
  isLoading,
  rowKey,
  dataTable,
  fetchAccounts,
  onCloseModule,
  tableRef,
  userId
} = useUserAccessAccounts(props);
</script>

<template>
  <n-grid
    x-gap="40"
    y-gap="22"
    responsive="screen"
    item-responsive
    :cols="2"
  >
    <n-grid-item>
      <p class="my-2">{{ $t('Organization') }}</p>

      <OrganizationList
        v-model:organization="selectedOrganization"
        :single-organization="!!props.businessCode"
        :loading="props.clientUserLoading"
        :user-id="userId"
      />
    </n-grid-item>

    <n-grid-item v-if="selectedOrganization">
      <p class="my-2">{{ $t('Access-rights-to-accounts') }}</p>

      <BaseDataTable
        ref="tableRef"
        :columns="columns"
        :loading="isLoading"
        :row-key="rowKey"
        :data="dataTable"
        @update="fetchAccounts"
      />

      <n-space
        justify="end"
        class="mt-3"
      >
        <n-button
          type="default"
          ghost
          @click="onCloseModule"
        >
          {{ $t('Close') }}
        </n-button>
      </n-space>
    </n-grid-item>
  </n-grid>
</template>
