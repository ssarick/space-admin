<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseButton from '@/shared/UI/base-button';
import PageTitle from '@/shared/UI/page-title';
import renderIcon from '@/shared/utils/render-icon';
import SessionsList from '@/projects/inventory/features/sessions/list';
import useSessionListPage from '@/projects/inventory/pages/sessions/list/useSessionListPage';

const {
  reportDownloadLoading,
  onDownloadInventoryAllReport
} = useSessionListPage();
</script>

<template>
  <n-space
    justify="space-between"
    class="mb-4"
    :size="[20, 16]"
  >
    <PageTitle
      no-margin
      :title="$t('session')"
    />

    <n-space
      justify="space-between"
      :size="[20, 16]"
    >
      <BaseButton
        type="tertiary"
        :loading="reportDownloadLoading"
        :render-icon="renderIcon(
          'download',
          {
            size: 24,
            color: '#fff'
          }
        )"
        @click="onDownloadInventoryAllReport"
      >
        {{ $t('download-report-all') }}
      </BaseButton>

      <BaseButton
        type="primary"
        link
        :to="{ name: 'inventory-sessions-create' }"
      >
        {{ $t('create-session') }}
      </BaseButton>
    </n-space>
  </n-space>

  <SessionsList />
</template>
