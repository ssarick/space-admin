<script lang="ts" setup>
import UserLogsTable from '@/projects/b2b/entities/user-logs-table/UserLogsTable.vue';
import { IUserLogsProps } from './user-logs.types';
import useUserLogs from './useUserLogs';

const props = defineProps<IUserLogsProps>();

const {
  loading,
  logs,
  fetchUserLogs,
  tableRef
} = useUserLogs(props);
</script>

<template>
  <UserLogsTable
    ref="tableRef"
    :logs="logs"
    :loading="loading"
    @on-update="fetchUserLogs"
  />
</template>
