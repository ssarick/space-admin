<script lang="ts" setup>
import PageTitle from '@/shared/UI/page-title';
import ContractsTable from '@/projects/autopay/entities/contract/list/ContractsTable.vue';
import useContractList from './useContractList';

const {
  contracts,
  contractsLoading,
  fetchContracts,
  tableRef
} = useContractList();
</script>

<template>
  <PageTitle
    :title="$t('Contracts')"
  />

  <ContractsTable
    ref="tableRef"
    :contracts="contracts"
    :loading="contractsLoading"
    @update="fetchContracts"
  />
</template>
