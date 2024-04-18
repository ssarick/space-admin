<script setup lang="ts">
import PageTitle from '@/shared/UI/page-title';
import LogsHistory from '@/projects/b2b/features/logs/history';
</script>

<template>
  <main class="users-page">
    <header class="header">
      <PageTitle :title="$t('logs-history')" />
    </header>

    <LogsHistory />
  </main>
</template>
