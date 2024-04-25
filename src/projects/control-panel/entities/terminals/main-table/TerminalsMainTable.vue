<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type { TerminalsMainTableProps } from './terminals-main-table.types';
import useTerminalsMainTable from './useTerminalMainTable';

const props = withDefaults(
  defineProps<TerminalsMainTableProps>(),
  {
    data: () => []
  }
);

const {
  columns,
  rowKey,
  tableRef,
  rowProps
} = useTerminalsMainTable();

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
