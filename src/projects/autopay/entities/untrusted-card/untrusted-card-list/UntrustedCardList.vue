<script setup lang='ts'>
import BaseDataTable from '@/shared/UI/base-data-table';
import useUntrustedCardList from '@/projects/autopay/entities/untrusted-card/untrusted-card-list/useUntrustedCardList';
import {
  IUntrustedCardsListEmits, IUntrustedCardsListProps
} from './untrusted-cards-list.types';

const props = defineProps<IUntrustedCardsListProps>();
const emit = defineEmits<IUntrustedCardsListEmits>();

const {
  columns,
  tableRef,
  updateTable,
  tableRowClick
} = useUntrustedCardList(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="1050"
    :columns="columns"
    :loading="props.loading"
    :data="props.cards"
    :row-click="tableRowClick"
    @update="updateTable"
  />
</template>
