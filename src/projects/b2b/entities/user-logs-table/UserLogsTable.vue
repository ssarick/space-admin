<script lang="ts" setup>
import BaseDataTable from '@/shared/UI/base-data-table';
import { IUserLogsTableProps } from './user-logs-table.types';
import useUserLogsTable from './useUserLogsTable';

const props = defineProps<IUserLogsTableProps>();

const {
  columns,
  tableRef,
  rowKey
} = useUserLogsTable();

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
    :data="props.logs"
  />
</template>
