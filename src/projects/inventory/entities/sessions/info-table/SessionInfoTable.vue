<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type { SessionInfoTableProps } from './session-info-table.types';
import useSessionInfoTable from './useSessionInfoTable';

const props = withDefaults(
  defineProps<SessionInfoTableProps>(),
  {
    data: () => []
  }
);

const {
  columns,
  rowKey,
  tableRef
} = useSessionInfoTable(props);

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
