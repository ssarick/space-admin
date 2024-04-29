<script setup lang="ts">
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import UserInfo from '@/projects/inventory/features/users/info';
import useUserInfoPage from './useUserInfoPage';

const { userId } = useUserInfoPage();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="$t('User-data')"
    />

    <UserInfo
      :user-id="userId"
    />
  </PageContainer>
</template>
