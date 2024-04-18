<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { ILogsHistoryTableEmits, ILogsHistoryTableProps } from './logs-history-table.types';
import useLogsHistoryTable from './useLogsHistoryTable';

const props = withDefaults(
  defineProps<ILogsHistoryTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<ILogsHistoryTableEmits>();

const {
  columns,
  tableRef,
  rowKey
} = useLogsHistoryTable(emit);

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
    :data="props.data"
  />
</template>
