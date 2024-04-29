<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import ApplicationEdit from '@/projects/subsidy/features/applications/edit';
import useApplicationEditPage from './useApplicationEditPage';

const { subsidyId } = useApplicationEditPage();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="`Заявка №${subsidyId}`"
    />

    <ApplicationEdit
      :subsidy-id="subsidyId"
    />
  </PageContainer>
</template>

