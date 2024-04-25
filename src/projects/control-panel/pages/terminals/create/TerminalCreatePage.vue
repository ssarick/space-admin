<script setup lang="ts">
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import TerminalCreate from '@/projects/control-panel/features/terminals/create';
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('terminals-create')"
    />

    <TerminalCreate />
  </PageContainer>
</template>
