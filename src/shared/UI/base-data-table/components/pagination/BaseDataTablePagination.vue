<script lang="ts" setup>
import {
  NPagination,
  NSpace,
  NText
} from 'naive-ui';
import BaseInput from '@/shared/UI/base-input';
import BaseSelect from '@/shared/UI/base-select';
import { inputAllowOnlyNumber } from '@/shared/utils/input-allow-rules';
import { BaseDataTablePaginationProps } from './base-data-table-pagination.types';
import useBaseDataTablePagination from './useBaseDataTablePagination';

const props = defineProps<BaseDataTablePaginationProps>();

const {
  pagePlaceholder,
  pageInputValue,
  handlePageInputBlur
} = useBaseDataTablePagination(props);
</script>

<template>
  <n-space
    align="center"
    justify="space-between"
  >
    <n-space
      align="center"
      :size="[ 10, 8 ]"
    >
      <BaseSelect
        placeholder=""
        size="small"
        :options="props.pagination.pageSizes"
        :value="props.pagination.pageSize"
        :show-checkmark="false"
        @update:model-value="props.pagination.onUpdatePageSize"
      />

      <n-text class="text-weight-5 text-body1">
        {{ $t('strings') }}
      </n-text>
    </n-space>

    <n-pagination
      size="large"
      :page="props.pagination.page"
      :prev="props.pagination.prev"
      :next="props.pagination.next"
      :page-count="props.pagination.pageCount"
      @update:page="props.pagination.onUpdatePage"
    />

    <n-space
      align="center"
      :size="[ 10, 8 ]"
    >
      <n-text class="text-weight-5 text-body1">
        {{ $t('page') }}
      </n-text>

      <BaseInput
        v-model="pageInputValue"
        class="base-data-table__pagination-input"
        size="small"
        :allow-input="inputAllowOnlyNumber"
        :placeholder="pagePlaceholder"
        @change="handlePageInputBlur"
      />
    </n-space>
  </n-space>
</template>

<style lang="scss" scoped>
.base-data-table {
  &__pagination-input {
    width: 54px;
  }
}
</style>
