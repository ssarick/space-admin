<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import PageTitle from '@/shared/UI/page-title';
import renderIcon from '@/shared/utils/render-icon';
import SessionInfo from '@/projects/inventory/features/sessions/info';
import useSessionInfoPage from './useSessionInfoPage';

const {
  pageTitle,
  reportDownloadLoading,
  onDownloadInventoryReport
} = useSessionInfoPage();
</script>

<template>
  <main>
    <n-space
      justify="space-between"
      class="mb-4"
    >
      <PageTitle
        no-margin
        :title="pageTitle"
      />

      <BaseButton
        type="primary"
        :loading="reportDownloadLoading"
        :render-icon="renderIcon(
          'download',
          {
            size: 24
          }
        )"
        @click="onDownloadInventoryReport"
      >
        {{ $t('download-report') }}
      </BaseButton>
    </n-space>

    <SessionInfo />
  </main>
</template>
