<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  IOrganizationListEmit,
  IOrganizationListProps } from './organization-list.types';
import useOrganizationList from './useOrganizationList';

const props = defineProps<IOrganizationListProps>();
const emit = defineEmits<IOrganizationListEmit>();

const {
  columns,
  loading,
  rowKey,
  onRowClick,
  organizations,
  onPageNumberUpdated,
  onPageSizeUpdated,
  tableRef,
  selectedRowKeys
} = useOrganizationList(props, emit);
</script>

<template>
  <BaseDataTable
    v-model:checked-row-keys="selectedRowKeys"
    ref="tableRef"
    :columns="columns"
    :loading="loading || props.loading"
    :row-key="rowKey"
    :row-click="onRowClick"
    :data="organizations"
    @update-page="onPageNumberUpdated"
    @update-page-size="onPageSizeUpdated"
  />
</template>
