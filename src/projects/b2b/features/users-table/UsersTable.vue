<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { IUsersTableProps } from './users-table.types';
import useUsersTable from './useUsersTable';

const props = defineProps<IUsersTableProps>();

const {
  rowProps,
  columns,
  dataTable,
  isLoading,
  rowKey,
  tableRef,
  fetchUsers
} = useUsersTable(props);

defineExpose({
  fetchUsers,
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="isLoading"
    :row-key="rowKey"
    :data="dataTable"
    :row-props="rowProps"
    @update="fetchUsers()"
  />
</template>
