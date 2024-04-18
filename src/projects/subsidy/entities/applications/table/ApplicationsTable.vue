<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { ApplicationsTableEmits, ApplicationsTableProps } from './application-table.types';
import useApplicationsTable from './useApplicationsTable';

const props = withDefaults(
  defineProps<ApplicationsTableProps>(),
  {
    applications: () => []
  }
);

const emit = defineEmits<ApplicationsTableEmits>();

const {
  columns,
  tableRef,
  rowProps,
  rowKey,
  selectedIds
} = useApplicationsTable(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    v-model:checked-row-keys="selectedIds"
    ref="tableRef"
    :columns="columns"
    :loading="props.loading"
    :data="props.applications"
    :row-key="rowKey"
    :row-props="rowProps"
  />
</template>
