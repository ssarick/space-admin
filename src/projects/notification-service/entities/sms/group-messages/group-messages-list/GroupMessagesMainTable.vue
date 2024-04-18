<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  GroupMessagesMainTableEmits,
  GroupMessagesMainTableProps
} from './group-messages-main-table.types';
import useGroupMessagesMainTable from './useGroupMessagesMainTable';

const props = withDefaults(
  defineProps<GroupMessagesMainTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<GroupMessagesMainTableEmits>();

const {
  columns,
  rowKey,
  tableRef,
  rowProps
} = useGroupMessagesMainTable(emit);

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
