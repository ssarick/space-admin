<script setup lang="ts">
import { NCard, NSpace } from 'naive-ui';
import { UserCertificateRevokingForm } from '@/projects/b2b/entities/user-certificate';
import {
  IUserCertificateActionsEmit,
  IUserCertificateActionsProps
} from './user-certificate-actions.types';
import useUserCertificateActions from './useUserCertificateActions';

const props = defineProps<IUserCertificateActionsProps>();
const emit = defineEmits<IUserCertificateActionsEmit>();

const { revokingLoading, revokingReason, onBeforeRevoke, formRef } =
  useUserCertificateActions(props, emit);
</script>

<template>
  <n-card
    size="small"
    :title="$t('Actions-with-selected-certificate')"
  >
    <UserCertificateRevokingForm
      v-model:custom-reason-text="revokingReason.customReasonText"
      v-model:has-custom-reason-text="revokingReason.hasCustomReasonText"
      v-model:reason-id="revokingReason.reasonId"
      v-model:reason-text="revokingReason.reasonText"
      ref="formRef"
      :model="revokingReason"
      :disabled="revokingLoading"
      :certificate="props.certificate"
    />

    <n-space justify="end">
      <n-button
        type="error"
        class="mt-1"
        ghost
        :loading="revokingLoading"
        @click="onBeforeRevoke"
      >
        {{ $t('Revoke') }}
      </n-button>
    </n-space>
  </n-card>
</template>
