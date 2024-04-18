<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type {
  AllMessagesMainTableProps
} from './all-messages-main-table.types';
import useAllMessagesMainTable from './useAllMessagesMainTable';

const props = withDefaults(
  defineProps<AllMessagesMainTableProps>(),
  {
    data: () => []
  }
);

const {
  columns,
  rowKey,
  tableRef
} = useAllMessagesMainTable();

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
