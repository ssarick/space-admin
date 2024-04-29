<script lang="ts" setup>
import PageContainer from '@/shared/UI/page-container';
import PageTitle from '@/shared/UI/page-title';
import ContractDetail from '@/projects/autopay/features/contract/detail/ContractDetail.vue';
import useContractDetailPage from './useContractDetailPage';

const { contractId } = useContractDetailPage();
</script>

<template>
  <PageContainer>
    <PageTitle
      :title="`${$t('Contract ID')} ${contractId}`"
    />

    <ContractDetail
      :contract-id="contractId"
    />
  </PageContainer>
</template>
