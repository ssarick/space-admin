<script setup lang="ts">
import { NSpace } from 'naive-ui';
import { UserCertificateFullTable } from '@/projects/b2b/entities/user-certificate';
import useUserCertificateAddExisting from './useUserCertificateAddExisting';

const {
  onCloseModule,
  visibleKeys,
  selectedCertificate,
  isMobileCertificate,
  onSave,
  certificates,
  saveIsLoading
} = useUserCertificateAddExisting();
</script>

<template>
  <UserCertificateFullTable
    v-bind="$attrs"
    v-model:selected-certificate="selectedCertificate"
    v-model:certificates="certificates"
    v-model:is-mobile-certificates="isMobileCertificate"
    hide-switch
    :visible-keys="visibleKeys"
    :title="$t('Available-mobile-certificates')"
  />

  <n-space
    align="center"
    justify="end"
    class="mt-3"
  >
    <n-space align="center">
      <n-button @click="onCloseModule">
        {{ $t('Close') }}
      </n-button>

      <n-button
        :loading="saveIsLoading"
        @click="onSave"
      >
        {{ $t('Save') }}
      </n-button>
    </n-space>
  </n-space>
</template>
