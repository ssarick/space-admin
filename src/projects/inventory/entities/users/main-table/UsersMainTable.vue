<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type { UsersMainTableProps } from './users-main-table.types';
import useUsersMainTable from './useUsersMainTable';

const props = withDefaults(
  defineProps<UsersMainTableProps>(),
  {
    data: () => []
  }
);

const {
  columns,
  rowKey,
  tableRef,
  rowProps
} = useUsersMainTable();

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :row-props="rowProps"
    :data="props.data"
  />
</template>
