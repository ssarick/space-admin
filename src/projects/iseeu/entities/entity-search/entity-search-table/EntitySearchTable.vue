<script lang="ts" setup>
import BaseDataTable from '@/shared/UI/base-data-table';
import {
  IEntitySearchTableEmits,
  IEntitySearchTableProps
} from './entity-search-table.types';
import useEntitySearchTable from './useEntitySearchTable';

const props = withDefaults(
  defineProps<IEntitySearchTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<IEntitySearchTableEmits>();

const {
  columns,
  rowKey
} = useEntitySearchTable(props, emit);
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
