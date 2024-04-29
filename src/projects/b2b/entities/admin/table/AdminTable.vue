<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  IAdminTableEmits,
  IAdminTableProps
} from './admin-table.types';
import useAdminTable from './useAdminTable';

const props = withDefaults(
  defineProps<IAdminTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<IAdminTableEmits>();

const {
  columns,
  rowKey,
  tableRef,
  rowProps
} = useAdminTable(emit);

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
