<script setup lang="ts">
import {
  NCard,
  NModal,
  NSpace
} from 'naive-ui';
import BaseDataTable from '@/shared/UI/base-data-table';
import { ILogsUserModalEmits, ILogsUserModalProps } from './logs-user-modal.types';
import useLogsClientModal from './useLogsUserModal';

const props = defineProps<ILogsUserModalProps>();
const emit = defineEmits<ILogsUserModalEmits>();

const {
  modelValue,
  onToggleModal,
  uploadable,
  onUpload,
  onUploadAll,
  tableRef,
  columns,
  rowKey,
  emitFetchUsers,
  onRowClick,
  selectedUserIds,
  onCloseModal
} = useLogsClientModal(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <n-modal
    v-model:show="modelValue"
    class="custom-modal"
    @after-leave="onCloseModal"
  >
    <n-card
      style="width: 800px"
      title="Выберите пользователей"
      size="huge"
      role="dialog"
      aria-modal="true"
      :bordered="false"
    >
      <BaseDataTable
        v-model:checked-row-keys="selectedUserIds"
        ref="tableRef"
        :columns="columns"
        :loading="props.usersLoading"
        :row-key="rowKey"
        :row-click="onRowClick"
        :data="props.users!"
        @update="emitFetchUsers"
      />

      <template #footer>
        <n-space
          justify="end"
        >
          <n-button
            ghost
            @click="onToggleModal"
          >
            Отмена
          </n-button>

          <n-button
            type="primary"
            ghost
            :loading="props.uploadLoading"
            :disabled="!uploadable"
            @click="onUpload"
          >
            Выгрузить выделенные
          </n-button>

          <n-button
            type="primary"
            ghost
            :loading="props.uploadLoading"
            @click="onUploadAll"
          >
            Выгрузить все
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>
