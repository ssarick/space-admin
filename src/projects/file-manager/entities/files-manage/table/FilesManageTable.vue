<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { IFilesManageTableEmits, IFilesManageTableProps } from './files-manage-table.types';
import useFilesManageTable from './useFilesManageTable';

const props = withDefaults(
  defineProps<IFilesManageTableProps>(),
  {
    data: () => []
  }
);

const emit = defineEmits<IFilesManageTableEmits>();

const {
  columns,
  rowKey,
  expandedRowKeys,
  tableRef,
  onRowClick
} = useFilesManageTable(props, emit);

defineExpose({
  tableRef
});
</script>

<template>
  <BaseDataTable
    ref="tableRef"
    scroll-x="600"
    has-filtering-input
    hide-expand-icon
    :hide-table="props.hideTable"
    :columns="columns"
    :loading="props.loading"
    :data="props.data"
    :row-key="rowKey"
    :row-click="onRowClick"
    :expanded-row-keys="expandedRowKeys"
    :search-input-props="{
      maxlength: fieldLimits.search.maxLength,
      placeholder: 'Поиск'
    }"
  />
</template>
