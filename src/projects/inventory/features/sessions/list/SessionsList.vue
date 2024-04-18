<script setup lang="ts">
import SessionsConfirmModal from '@/projects/inventory/entities/sessions/confirm-modal';
import SessionsMainTable from '@/projects/inventory/entities/sessions/main-table';
import useSessionsList from './useSessionsList';

const {
  fetchSessions,
  sessions,
  sessionsLoading,
  tableRef,
  confirmModalShow,
  confirmModalData,
  handleSessionFinish,
  openSessionModal,
  setSessionData
} = useSessionsList();
</script>

<template>
  <SessionsMainTable
    ref="tableRef"
    :data="sessions"
    :loading="sessionsLoading"
    @update="fetchSessions"
    @confirm-modal-data="setSessionData"
    @confirm-modal-show="openSessionModal"
  />

  <SessionsConfirmModal
    v-model:confirm-modal="confirmModalShow"
    :confirm-data="confirmModalData"
    :loading="sessionsLoading"
    @handle-confirm="handleSessionFinish"
  />
</template>

<style lang="scss">
.popover-list {
  display: flex;
  flex-direction: column;
  &-item {
    font-weight: 600;
  }
}
</style>
