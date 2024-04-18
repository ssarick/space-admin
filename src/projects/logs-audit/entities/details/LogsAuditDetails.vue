<script setup lang="ts">
import { NDrawer, NDrawerContent } from 'naive-ui';
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import { LogsAuditDetailsEmits, LogsAuditDetailsProps } from './logs-audit-details.types';
import useLogsAuditDetails from './useLogsAuditDetails';

const props = defineProps<LogsAuditDetailsProps>();
const emit = defineEmits<LogsAuditDetailsEmits>();

const {
  modelValue,
  detailList
} = useLogsAuditDetails(props, emit);
</script>

<template>
  <n-drawer
    v-model:show="modelValue"
    width="360"
  >
    <n-drawer-content
      title="Информация"
      body-content-class="py-0"
      closable
    >
      <BaseSimpleTable
        column
        no-border-x
        no-border-top
        :data="detailList"
      />
    </n-drawer-content>
  </n-drawer>
</template>
