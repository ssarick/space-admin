<script lang="ts" setup>
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  IOperDayListEmits,
  IOperDayListProps } from './oper-day-list.types';
import useOperDayList from './useOperDayList';

const props = withDefaults(
  defineProps<IOperDayListProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<IOperDayListEmits>();

const {
  columns,
  tableRef,
  rowKey
} = useOperDayList(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    hide-pagination
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :data="props.data"
  />
</template>
