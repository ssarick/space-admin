<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import InternalNotificationCreate from '../../features/create';
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('notification-creation')"
    />

    <InternalNotificationCreate />
  </PageContainer>
</template>
