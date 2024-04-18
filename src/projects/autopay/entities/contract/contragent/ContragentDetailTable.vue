<script lang="ts" setup>
import BaseSimpleTable from '@/shared/UI/base-simple-table';
import { IContragentDetailTableProps } from './contragent-detail-table.types';
import useContragentDetailTable from './useContragentDetailTable';

const props = defineProps<IContragentDetailTableProps>();
const { data } = useContragentDetailTable(props);
</script>

<template>
  <BaseSimpleTable
    :data="data"
    :loading="props.loading"
  />
</template>
