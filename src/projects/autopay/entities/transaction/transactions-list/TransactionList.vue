<script setup lang='ts'>
import BaseDataTable from '@/shared/UI/base-data-table';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  ITransactionListTableEmits,
  ITransactionListTableProps
} from '@/projects/autopay/entities/transaction/transactions-list/transaction-list.types';
import useTransactionList from '@/projects/autopay/entities/transaction/transactions-list/useTransactionList';

const props = defineProps<ITransactionListTableProps>();
const emit = defineEmits<ITransactionListTableEmits>();

const {
  columns,
  tableRef,
  rowKey,
  onPaginationUpdate
} = useTransactionList(emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="1500"
    :columns="columns"
    :loading="props.loading"
    :data="props.transactions"
    :search-input-props="{
      allowInput: inputAllowOnlyNumber
    }"
    :row-key="rowKey"
    @update="onPaginationUpdate"
  />
</template>
