<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import ApplicationInfo from '@/projects/subsidy/features/applications/info';
import useApplicationInfoPage from './useApplicationInfoPage';

const { subsidyId } = useApplicationInfoPage();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="`Заявка №${subsidyId}`"
    />

    <ApplicationInfo :subsidy-id="subsidyId" />
  </PageContainer>
</template>

