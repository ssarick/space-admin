<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { LogsAuditTableEmits, LogsAuditTableProps } from './logs-audit-table.types';
import useLogsAuditTable from './useLogsAuditTable';

const props = withDefaults(
  defineProps<LogsAuditTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<LogsAuditTableEmits>();

const {
  columns,
  tableRef,
  rowClick
} = useLogsAuditTable(emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="960"
    :columns="columns"
    :loading="props.loading"
    :data="props.data"
    :row-click="rowClick"
  />
</template>
