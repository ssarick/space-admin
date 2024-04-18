<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import Profile from '@/projects/superadmin/features/profile';
</script>

<template>
  <PageContainer>
    <PageTitle
      class="mb-2"
      no-margin
      :title="$t('profile')"
    />

    <Profile />
  </PageContainer>
</template>
