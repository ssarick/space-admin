<script setup lang="ts">
import { NSpace, NText } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import BaseModal from '@/shared/UI/base-modal';
import useConfirmationDialogProvider from './useConfirmationDialogProvider';

const {
  dialogIsActive,
  dialogOptions,
  onNegativeClick,
  onPositiveClick
} = useConfirmationDialogProvider();
</script>

<template>
  <slot />

  <BaseModal
    v-model="dialogIsActive"
    :title="dialogOptions.title"
    :close-on-esc="dialogOptions.closeOnEsc"
    :mask-closable="dialogOptions.maskClosable"
  >
    <component
      v-if="(typeof dialogOptions.content === 'function')"
      :is="dialogOptions.content"
    />

    <n-text
      v-else
      class="text-caption"
    >
      {{ dialogOptions.content }}
    </n-text>

    <n-space
      class="mt-4"
      :size="16"
      :wrap-item="false"
    >
      <BaseButton
        class="flex-1"
        :loading="dialogOptions.negativeButtonProps?.loading"
        :type="dialogOptions.negativeButtonProps?.type"
        :text-color="dialogOptions.negativeButtonProps?.textColor"
        :disabled="dialogOptions.negativeButtonProps?.disabled"
        @click="onNegativeClick"
      >
        {{ dialogOptions.negativeText }}
      </BaseButton>

      <BaseButton
        class="flex-1"
        :loading="dialogOptions.positiveButtonProps?.loading"
        :type="dialogOptions.positiveButtonProps?.type"
        :text-color="dialogOptions.positiveButtonProps?.textColor"
        :disabled="dialogOptions.positiveButtonProps?.disabled"
        @click="onPositiveClick"
      >
        {{ dialogOptions.positiveText }}
      </BaseButton>
    </n-space>
  </BaseModal>
</template>
