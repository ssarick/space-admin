<script lang="ts" setup>
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  IIndividualSearchTableEmits,
  IIndividualSearchTableProps
} from './individual-search-table.types';
import useIndividualSearchTable from './useIndividualSearchTable';

const props = withDefaults(
  defineProps<IIndividualSearchTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<IIndividualSearchTableEmits>();

const {
  columns,
  rowKey
} = useIndividualSearchTable(props, emit);
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    :columns="columns"
    :loading="props.loading"
    :row-key="rowKey"
    :data="props.data"
  />
</template>
