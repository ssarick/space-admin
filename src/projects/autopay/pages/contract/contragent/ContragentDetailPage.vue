<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import ContragentDetail from '@/projects/autopay/features/contract/contragent/ContragentDetail.vue';
import useContragentDetailPage from './useContragentDetailPage';

const { contragentId } = useContragentDetailPage();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="`${$t('Contragent-id')} ${contragentId}`"
    />

    <ContragentDetail
      :contragent-id="contragentId"
    />
  </PageContainer>
</template>
