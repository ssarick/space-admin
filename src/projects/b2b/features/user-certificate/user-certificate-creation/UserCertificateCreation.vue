<script setup lang="ts">
import { NSpace } from 'naive-ui';
import { UserCertificateFullTable } from '@/projects/b2b/entities/user-certificate';
import useUserCertificateCreation from './useUserCertificateCreation';

const {
  onCloseModule,
  visibleKeys,
  certificates,
  isMobileCertificate,
  userCertificateTableRef,
  pagination,
  popCertificate,
  unshiftCertificate,
  onChangeIsMobileCertificate
} = useUserCertificateCreation();
</script>

<template>
  <UserCertificateFullTable
    v-bind="$attrs"
    v-model:certificates="certificates"
    v-model:is-mobile-certificates="isMobileCertificate"
    ref="userCertificateTableRef"
    :selectable="false"
    :visible-keys="visibleKeys"
  />

  <n-space
    align="end"
    justify="space-between"
    class="mt-3"
  >
    <slot
      :certificates="certificates"
      :pagination="pagination"
      :is-mobile-certificate="isMobileCertificate"
      :pop-certificate="popCertificate"
      :unshift-certificate="unshiftCertificate"
      :on-change-is-mobile-certificate="onChangeIsMobileCertificate"
    />

    <n-button @click="onCloseModule">
      {{ $t('Close') }}
    </n-button>
  </n-space>
</template>
