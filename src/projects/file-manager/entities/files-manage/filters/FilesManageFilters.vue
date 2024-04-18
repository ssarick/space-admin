<script setup lang="ts">
import { NDatePicker, NSpace } from 'naive-ui';
import BaseSelect from '@/shared/UI/base-select';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import { IFilesManageFilersProps, IFilesManageFiltersEmits } from './files-manage-filters.types';
import useFilesManageFilters from './useFilesManageFilters';

const props = defineProps<IFilesManageFilersProps>();
const emit = defineEmits<IFilesManageFiltersEmits>();

const {
  signFact,
  updatedDate,
  uploadDate
} = useFilesManageFilters(props, emit);
</script>

<template>
  <n-space
    :size="[ 24, 16]"
  >
    <n-date-picker
      v-model:value="uploadDate"
      type="date"
      placeholder="Дата загрузки"
      clearable
      :format="DATE_FORMAT"
    />

    <n-date-picker
      v-model:value="updatedDate"
      type="date"
      placeholder="Дата изменения"
      clearable
      :format="DATE_FORMAT"
    />

    <BaseSelect
      v-model="signFact"
      placeholder="Факт подписи"
      class="select--sign-fact"
      clearable
      :options="props.signFactOptions"
    />
  </n-space>
</template>

<style lang="scss" scoped>
.select {
  &--sign-fact {
    width: 200px;
  }
}
</style>
