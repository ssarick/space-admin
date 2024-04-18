<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import useClientUsersTable from './useClientUsersTable';

const {
  rowProps,
  columns,
  dataTable,
  isLoading,
  rowKey,
  tableRef,
  fetchClientUsers
} = useClientUsersTable();
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="isLoading"
    :row-key="rowKey"
    :data="dataTable"
    :row-props="rowProps"
    @update="fetchClientUsers"
  />
</template>
