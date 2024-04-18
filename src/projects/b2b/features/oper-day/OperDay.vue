<script lang="ts" setup>
import OperDayList from '@/projects/b2b/entities/oper-day-list';
import useOperDay from './useOperDay';

const {
  operDays,
  loading,
  onBeforeToggleDocumentState,
  onBeforeToggleAllDocumentsState,
  onBeforeToggleReportState,
  onBeforeToggleAllReportsState
} = useOperDay();
</script>

<template>
  <OperDayList
    :data="operDays"
    :loading="loading"
    @toggle-document-state="onBeforeToggleDocumentState"
    @toggle-all-documents-state="onBeforeToggleAllDocumentsState"
    @toggle-report-state="onBeforeToggleReportState"
    @toggle-all-reports-state="onBeforeToggleAllReportsState"
  />
</template>
