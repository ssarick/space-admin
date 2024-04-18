<script lang="ts" setup>
import ContractDetailTable from '@/projects/autopay/entities/contract/detail/ContractDetailTable.vue';
import { IContractDetailProps } from './contract-detail.types';
import useContractDetail from './useContractDetail';

const props = defineProps<IContractDetailProps>();

const {
  contractDetail,
  contractLoading,
  coborrowers
} = useContractDetail(props);
</script>

<template>
  <ContractDetailTable
    :contract="contractDetail"
    :loading="contractLoading"
    :coborrowers="coborrowers"
  />
</template>
