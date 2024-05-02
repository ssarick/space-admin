<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { BinsMainTableProps } from './bins-main-table.types';
import useTerminalsMainTable from './useBinsMainTable';

const props = withDefaults(
  defineProps<BinsMainTableProps>(),
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
