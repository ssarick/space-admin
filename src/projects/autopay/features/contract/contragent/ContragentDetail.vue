<script lang="ts" setup>
import ContragentDetailTable from '@/projects/autopay/entities/contract/contragent/ContragentDetailTable.vue';
import { IContragentDetailProps } from './contragent-detail.types';
import useContragentDetail from './useContragentDetail';

const props = defineProps<IContragentDetailProps>();

const {
  contragent,
  contragentLoading
} = useContragentDetail(props);
</script>

<template>
  <ContragentDetailTable
    :contragent="contragent"
    :loading="contragentLoading"
  />
</template>
