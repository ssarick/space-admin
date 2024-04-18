<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import {
  IContractsTableEmit,
  IContractsTableProps } from './contracts-table.types';
import useContractsTable from './useContractsTable';

const props = defineProps<IContractsTableProps>();
const emit = defineEmits<IContractsTableEmit>();

const {
  columns,
  rowClick,
  rowKey,
  onUpdatePagination,
  tableRef
} = useContractsTable(emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    has-filtering-input
    :columns="columns"
    :loading="props.loading"
    :data="props.contracts"
    :row-key="rowKey"
    :row-click="rowClick"
    :search-input-props="{
      allowInput: inputAllowOnlyNumber,
      maxlength: fieldLimits.contractId.maxLength,
      placeholder: 'Искать по договору ID'
    }"
    @update="onUpdatePagination"
  />
</template>
