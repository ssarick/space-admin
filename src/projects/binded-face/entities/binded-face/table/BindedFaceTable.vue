<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table/BaseDataTable.vue';
import { BindedFaceTableEmits, BindedFaceTableProps } from './binded-face-table.types';
import useBindedFaceTable from './useBindedFaceTable';

const props = withDefaults(
  defineProps<BindedFaceTableProps>(),
  {
    applications: () => []
  }
);

const emit = defineEmits<BindedFaceTableEmits>();

const {
  columns,
  tableRef,
  rowKey,
  selectedIds
} = useBindedFaceTable(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    v-model:checked-row-keys="selectedIds"
    ref="tableRef"
    has-filtering-input
    :search-input-props="{
      placeholder: 'ID / ИНН / ПИНФЛ'
    }"
    :columns="columns"
    :loading="props.loading"
    :data="props.applications"
    :row-key="rowKey"
  />
</template>