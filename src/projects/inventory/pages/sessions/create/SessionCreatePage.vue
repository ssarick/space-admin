<script setup lang="ts">
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import SessionCreate from '@/projects/inventory/features/sessions/create';
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('create-session')"
    />

    <SessionCreate />
  </PageContainer>
</template>
