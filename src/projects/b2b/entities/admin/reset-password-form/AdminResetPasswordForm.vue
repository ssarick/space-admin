<script lang="ts" setup>
import { NCard } from 'naive-ui';
import {
  IAdminResetPasswordFormEmits,
  IAdminResetPasswordFormProps } from './admin-reset-password-form.types';
import useAdminResetPasswordForm from './useAdminResetPasswordForm';

const props = defineProps<IAdminResetPasswordFormProps>();
const emit = defineEmits<IAdminResetPasswordFormEmits>();

const {
  onReset
} = useAdminResetPasswordForm(emit);
</script>

<template>
  <n-card
    size="small"
    class="mt-3"
    :title="$t('Reset-the-admin-password')"
  >
    <p>{{ $t('Reset-admin-password-desc') }}</p>

    <div class="flex">
      <n-button
        type="default"
        class="ml-auto mt-2"
        ghost
        :loading="props.loading"
        @click="onReset"
      >
        {{ $t('Reset-password') }}
      </n-button>
    </div>
  </n-card>
</template>
