<script setup lang="ts">
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import UserCreate from '@/projects/inventory/features/users/create';
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('Add-user')"
    />

    <UserCreate />
  </PageContainer>
</template>
