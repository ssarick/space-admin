<script setup lang='ts'>
import BaseDataTable from '@/shared/UI/base-data-table';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  ITransactionManualListTableEmits,
  ITransactionManualListTableProps
} from '@/projects/autopay/entities/transaction/transactions-manual-list/transaction-manual-list.types';
import useTransactionManualList from '@/projects/autopay/entities/transaction/transactions-manual-list/useTransactionManualList';

const props = defineProps<ITransactionManualListTableProps>();
const emit = defineEmits<ITransactionManualListTableEmits>();

const {
  columns,
  tableRef,
  rowKey,
  onPaginationUpdate
} = useTransactionManualList(emit);

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
