<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  ILogsClientTableEmits,
  ILogsClientTableProps } from './logs-client-table.types';
import useLogsClientTable from './useLogsClientTable';

const props = withDefaults(
  defineProps<ILogsClientTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<ILogsClientTableEmits>();

const {
  columns,
  rowKey,
  onRowClick
} = useLogsClientTable(props, emit);
</script>

<template>
  <BaseDataTable
    hide-pagination
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :row-click="onRowClick"
    :data="props.data"
  />
</template>
