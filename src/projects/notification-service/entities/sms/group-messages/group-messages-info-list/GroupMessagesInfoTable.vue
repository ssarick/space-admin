<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import type { GroupMessagesInfoTableProps } from '@/projects/notification-service/entities/sms/group-messages/group-messages-info-list/group-messages-info-table.types';
import useGroupMessagesInfoTable from './useGroupMessagesInfoTable';

withDefaults(defineProps<GroupMessagesInfoTableProps>(),
  {
    data: () => []
  }
);

const {
  columns,
  rowKey,
  tableRef
} = useGroupMessagesInfoTable();

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="loading"
    :row-key="rowKey"
    :data="data"
  />
</template>
