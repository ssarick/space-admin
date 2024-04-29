<script setup lang='ts'>
import BaseDataTable from '@/shared/UI/base-data-table';
import { IUntrustedCardsListEmits, IUntrustedCardsListProps } from './untrusted-humo-cards-list.types';
import useUntrustedHumoCardList from './useUntrustedHumoCardList';

const props = defineProps<IUntrustedCardsListProps>();
const emit = defineEmits<IUntrustedCardsListEmits>();

const {
  columns,
  tableRef,
  updateTable,
  tableRowClick
} = useUntrustedHumoCardList(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="900"
    :columns="columns"
    :loading="props.loading"
    :data="props.cards"
    :row-click="tableRowClick"
    @update="updateTable"
  />
</template>
