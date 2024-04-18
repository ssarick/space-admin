<script setup lang="ts">
import { NCard, NSpace } from 'naive-ui';
import { UserCertificateCreationForm } from '@/projects/b2b/entities/user-certificate';
import {
  IUserCertificateCreationActionEmit,
  IUserCertificateCreationActionProps
} from './user-certificate-creation-actions.types';
import useUserCertificateCreationActions from './useUserCertificateCreationActions';

const props = defineProps<IUserCertificateCreationActionProps>();
const emit = defineEmits<IUserCertificateCreationActionEmit>();

const {
  loading,
  formRef,
  newCertificateModel,
  submitButtonLabel,
  onBeforeCreate
} = useUserCertificateCreationActions(props, emit);
</script>

<template>
  <n-card
    size="small"
    :title="$t('Adding-new-certificate')"
  >
    <UserCertificateCreationForm
      v-model:certificate-serial="newCertificateModel.certificateSerial"
      v-model:certificate-type="newCertificateModel.certificateType"
      ref="formRef"
      :model="newCertificateModel"
      :disabled="loading"
    />

    <n-space justify="end">
      <n-button
        class="mt-1"
        ghost
        :loading="loading"
        @click="onBeforeCreate"
      >
        {{ submitButtonLabel }}
      </n-button>
    </n-space>
  </n-card>
</template>
