<script lang="ts" setup>
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import { IContractDetailTableProps } from './contract-detail-table.types';
import useContractDetailTable from './useContractDetailTable';

const props = defineProps<IContractDetailTableProps>();
const { data } = useContractDetailTable(props);
</script>

<template>
  <BaseSimpleTable
    :loading="props.loading"
    :data="data"
  />
</template>
