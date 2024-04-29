<script setup lang="ts">
import {
  NCard,
  NModal,
  NSpace
} from 'naive-ui';
import { ILogsClientModalEmits, ILogsClientModalProps } from './logs-client-modal.types';
import useLogsClientModal from './useLogsClientModal';

const props = defineProps<ILogsClientModalProps>();
const emit = defineEmits<ILogsClientModalEmits>();

const {
  modelValue,
  organizationIds,
  selectOrganizationIds,
  onToggleModal,
  uploadable,
  onUpload,
  onCloseModal,
  onUploadAll
} = useLogsClientModal(props, emit);
</script>

<template>
  <n-modal
    v-model:show="modelValue"
    class="custom-modal"
    loading
    @after-leave="onCloseModal"
  >
    <n-card
      style="width: 600px"
      title="Выберите организации"
      size="huge"
      role="dialog"
      aria-modal="true"
      :bordered="false"
    >
      <slot
        :organization-ids="organizationIds"
        :select-organization-ids="selectOrganizationIds"
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
