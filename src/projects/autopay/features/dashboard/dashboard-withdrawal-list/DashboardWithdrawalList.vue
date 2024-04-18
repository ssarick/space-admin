<script lang="ts" setup>
import { NDatePicker } from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import BaseDataTable from '@/shared/UI/base-data-table';
import { DATE_MONTH_FORMAT } from '@/shared/utils/constants/naive-constants';
import { DashboardWithdrawalListProps } from './dashboard-withdrawal-list.types';
import useDashboardWithdrawalList from './useDashboardWithdrawalList';

const props = defineProps<DashboardWithdrawalListProps>();

const {
  loading,
  rangeDate,
  columns,
  tableData,
  rowKey,
  onChangeDate
} = useDashboardWithdrawalList(props);
</script>

<template>
  <BaseCard
    title="Таблица списания по месяцам"
    :loading="loading"
  >
    <template #title-append>
      <n-date-picker
        type="monthrange"
        start-placeholder="Дата от"
        end-placeholder="Дата до"
        class="date-picker"
        :format="DATE_MONTH_FORMAT"
        :value="rangeDate"
        @update:value="onChangeDate"
      />
    </template>

    <BaseDataTable
      hide-pagination
      :columns="columns"
      :loading="loading"
      :data="tableData"
      :row-key="rowKey"
    />
  </BaseCard>
</template>

<style lang="scss" scoped>
.date-picker {
  width: 280px;
}
</style>
