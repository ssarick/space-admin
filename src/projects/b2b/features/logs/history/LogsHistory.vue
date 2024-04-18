<script setup lang="ts">
import LogsHistoryTable from '@/projects/b2b/entities/logs/history-table';
import useLogsHistory from './useLogsHistory';

const {
  tableRef,
  logsHistory,
  logsHistoryLoading,
  pingLogsHistory,
  onDownloadLogReport
} = useLogsHistory();
</script>

<template>
  <LogsHistoryTable
    ref="tableRef"
    :data="logsHistory"
    :loading="logsHistoryLoading"
    @download="onDownloadLogReport"
    @on-update="pingLogsHistory"
  />
</template>
