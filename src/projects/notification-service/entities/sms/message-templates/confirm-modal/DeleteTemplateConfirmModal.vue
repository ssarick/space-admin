<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseModal from '@/shared/UI/base-modal';
import type {
  DeleteTemplateConfirmModalEmits,
  DeleteTemplateConfirmModalProps
} from './delete-template-confirm-modal.types';
import useDeleteTemplateConfirmModal from './useDeleteTemplateConfirmModal';

const props = defineProps<DeleteTemplateConfirmModalProps>();
const emit = defineEmits<DeleteTemplateConfirmModalEmits>();

const {
  confirmModal,
  confirmData,
  handleSubmitConfirmation
} = useDeleteTemplateConfirmModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="confirmModal"
    :title="$t('Confirm')"
  >
    <n-space class="mb-4">
      <n-text class="text-caption">
        {{ $t('confirm-template-deletion') }} {{ confirmData?.code }}
      </n-text>
    </n-space>

    <n-grid
      x-gap="16"
      cols="2"
    >
      <n-gi>
        <BaseButton
          class="w-100"
          type="tertiary"
          @click="confirmModal = false"
        >
          {{ $t('Cancel') }}
        </BaseButton>
      </n-gi>

      <n-gi>
        <BaseButton
          class="w-100"
          type="primary"
          :loading="loading"
          @click="handleSubmitConfirmation"
        >
          {{ $t('Delete') }}
        </BaseButton>
      </n-gi>
    </n-grid>
  </BaseModal>
</template>
