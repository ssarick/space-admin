<script setup lang="ts">
import BaseDataTable from '@/shared/UI/base-data-table';
import { fieldLimits } from '@/shared/utils/constants/field-limits';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import useClientsTable from './useClientsTable';

const {
  rowProps,
  columns,
  dataTable,
  isLoading,
  rowKey,
  tableRef,
  onChangeSearchValue,
  onAdd
} = useClientsTable();
</script>

<template>
  <header
    :class="[
      'align-start',
      'mb-4',
      'justify-space-between',
      'flex'
    ]"
  >
    <slot />

    <n-button
      type="primary"
      @click="onAdd"
    >
      {{ $t('Add') }}
    </n-button>
  </header>

  <BaseDataTable
    v-bind="$attrs"
    ref="tableRef"
    scroll-x="900"
    has-filtering-input
    :columns="columns"
    :loading="isLoading"
    :row-key="rowKey"
    :data="dataTable"
    :row-props="rowProps"
    :search-input-props="{
      placeholder: `${$t('INN')} / ${$t('Pinfl')} / ${$t('Client-code')}`,
      allowInput: inputAllowOnlyNumber,
      maxlength: fieldLimits.pinfl.maxLength
    }"
    @update="onChangeSearchValue"
  />
</template>
