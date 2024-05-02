<script setup lang="ts">
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import BinsCreate from '@/projects/control-panel/features/bins/create';
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('bins-create')"
    />

    <BinsCreate />
  </PageContainer>
</template>
