<script lang="ts" setup>
import BaseModal from '@/shared/UI/base-modal';
import InternalNotificationAlert from '@/projects/internal-notification/entities/alert';
import useRootLayout from './useRootLayout';

const {
  exitWarningModal,
  setExitWarningModal,
  closeExitWarningModal
} = useRootLayout();
</script>

<template>
  <router-view />

  <InternalNotificationAlert />

  <BaseModal
    :title="$t('Attention')"
    :model-value="exitWarningModal"
    @update:model-value="setExitWarningModal"
  >
    <n-text
      tag="p"
      class="text-caption text-weight-5"
    >
      {{ $t('all-processes-suspended') }}
    </n-text>

    <n-button
      class="mt-4"
      type="primary"
      block
      @click="closeExitWarningModal"
    >
      {{ $t('ok') }}
    </n-button>
  </BaseModal>
</template>
