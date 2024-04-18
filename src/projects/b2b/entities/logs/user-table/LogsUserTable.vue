<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  ILogsUserTableEmits,
  ILogsUserTableProps
} from './logs-user-table.types';
import useLogsUserTable from './useLogsUserTable';

const props = withDefaults(
  defineProps<ILogsUserTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<ILogsUserTableEmits>();

const {
  columns,
  rowKey,
  onRowClick,
  tableRef
} = useLogsUserTable(props, emit);

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
    :row-click="onRowClick"
    :data="props.data"
  />
</template>
