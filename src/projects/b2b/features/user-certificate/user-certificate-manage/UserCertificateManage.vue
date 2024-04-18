<script setup lang="ts">
import { NSpace } from 'naive-ui';
import { UserCertificateFullTable } from '@/projects/b2b/entities/user-certificate';
import { IUserCertificateManageProps } from './user-certificate-manage.types';
import useUserCertificateManage from './useUserCertificateManage';

const props = defineProps<IUserCertificateManageProps>();

const {
  selectedCertificate,
  onAddCertificate,
  onCloseModule,
  selectedCertificateIsRevokable,
  selectedCertificateIsBlockable,
  isMobileCertificate,
  certificates,
  selectedCertificateStateChangingButtonText,
  selectedCertificateStateChangingLoading,
  onBeforeChangeSelectedCertificateState,
  selectedCertificateStateChangingButtonType,
  setCertificateDeactivateDate,
  setCertificateRevokedReason,
  setCertificateState
} = useUserCertificateManage(props);
</script>

<template>
  <UserCertificateFullTable
    v-bind="$attrs"
    v-model:selected-certificate="selectedCertificate"
    v-model:certificates="certificates"
    v-model:is-mobile-certificates="isMobileCertificate"
    :selectable="props.isEdit"
  />

  <n-space
    align="end"
    class="mt-3"
    :justify="selectedCertificateIsRevokable ? 'space-between' : 'end'"
  >
    <slot
      v-if="selectedCertificateIsRevokable"
      :certificate="selectedCertificate"
      :set-certificate-deactivate-date="setCertificateDeactivateDate"
      :set-certificate-revoked-reason="setCertificateRevokedReason"
      :set-certificate-state="setCertificateState"
    />

    <n-space align="center">
      <n-button
        v-if="selectedCertificateIsBlockable"
        ghost
        :type="selectedCertificateStateChangingButtonType"
        :loading="selectedCertificateStateChangingLoading"
        @click="onBeforeChangeSelectedCertificateState"
      >
        {{ selectedCertificateStateChangingButtonText }}
      </n-button>

      <n-button
        v-if="props.isEdit"
        @click="onAddCertificate"
      >
        {{ $t('Add') }}
      </n-button>

      <n-button @click="onCloseModule">
        {{ $t('Close') }}
      </n-button>
    </n-space>
  </n-space>
</template>
