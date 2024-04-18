<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type {
  SessionsMainTableEmits,
  SessionsMainTableProps
} from './sessions-main-table.types';
import useSessionsMainTable from './useSessionsMainTable';

const props = withDefaults(
  defineProps<SessionsMainTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<SessionsMainTableEmits>();

const {
  columns,
  rowKey,
  tableRef,
  rowProps
} = useSessionsMainTable(emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="1000"
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :row-props="rowProps"
    :data="props.data"
  />
</template>
