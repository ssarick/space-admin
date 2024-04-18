<script setup lang="ts">
import BaseButton from '@/shared/UI/base-button';
import BaseModal from '@/shared/UI/base-modal';
import type {
  SessionsConfirmModalEmits,
  SessionsConfirmModalProps
} from './session-confirm-modal.types';
import useSessionsConfirmModal from './useSessionsConfirmModal';

const props = defineProps<SessionsConfirmModalProps>();
const emit = defineEmits<SessionsConfirmModalEmits>();

const {
  confirmModal,
  confirmData,
  handleSubmitConfirmation
} = useSessionsConfirmModal(props, emit);
</script>

<template>
  <BaseModal
    v-model="confirmModal"
    :title="$t('Attention')"
  >
    <n-space class="mb-4">
      <n-text class="text-caption">
        {{ $t('Are-you-sure-change-status') }} <br>
        {{ $t('session-status-text')
          + ` № ${confirmData?.id} `
          + $t('session-finished-text')
        }}
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
          {{ $t('Confirm') }}
        </BaseButton>
      </n-gi>
    </n-grid>
  </BaseModal>
</template>
