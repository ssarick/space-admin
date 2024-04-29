<script lang="ts" setup>
import PageTitle from '@/shared/UI/page-title';
import Logs from '@/projects/b2b/features/logs/main';
import useLogsPage from './useLogsPage';

const { goHistoryPage } = useLogsPage();
</script>

<template>
  <main class="users-page">
    <header
      :class="[
        'header',
        'mb-3',
        'flex',
        'justify-space-between',
        'align-items-center'
      ]"
    >
      <PageTitle
        class="mr-2"
        no-margin
        :title="$t('Logs-upload')"
      />

      <n-button
        type="primary"
        ghost
        @click="goHistoryPage"
      >
        История отчетов
      </n-button>
    </header>

    <Logs />
  </main>
</template>
