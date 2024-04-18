<script setup lang="ts">
import { NSpace } from 'naive-ui';
import SessionInfoTable from '@/projects/inventory/entities/sessions/info-table';
import useSessionInfo from './useSessionInfo';

const {
  fetchSessionDetails,
  handleEquipmentListChange,
  sessionType,
  sessionTypes,
  sessions,
  sessionsLoading,
  sessionStatusesList,
  tableRef
} = useSessionInfo();
</script>

<template>
  <n-space
    class="mb-4"
    :size="[20, 16]"
  >
    <n-radio-group
      v-model:value="sessionType"
    >
      <n-space class="radio-list">
        <n-radio
          v-for="item in sessionTypes"
          :key="`switch-sender-${item.id}`"
          class="radio-color"
          :value="item.value"
          :label="item.name"
          @click="handleEquipmentListChange(item.value)"
        />
      </n-space>
    </n-radio-group>
  </n-space>

  <SessionInfoTable
    ref="tableRef"
    :data="sessions"
    :loading="sessionsLoading"
    :session-statuses-list="sessionStatusesList"
    @update="fetchSessionDetails"
  />
</template>

<style lang="scss" scoped>
.radio-list {
  gap: 12px 16px!important;
}

.radio-color {
  background: #F6F6F3;
  padding: 12px 16px;
  border-radius: 6px;
}
</style>
