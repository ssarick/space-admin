<script lang="ts" setup>
import {
  NDatePicker,
  NGi,
  NGrid,
  NRadio,
  NRadioGroup,
  NSpace
} from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import { DATE_FORMAT } from '@/shared/utils/constants/naive-constants';
import ChartPie from '@/projects/autopay/entities/chart/pie';
import { DashboardDaysPieProps } from './dashboard-days-pie.types';
import useDashboardDaysPie from './useDashboardDaysPie';

const props = defineProps<DashboardDaysPieProps>();

const {
  amountChartData,
  countChartData,
  totalStatisticsIsEmpty,
  pieDateFilter,
  pieFilters,
  selectedDate,
  customDateSelectable,
  loading,
  amountLegends,
  countLegends,
  onChangeSelectedDate,
  onChangePieDateFilter
} = useDashboardDaysPie(props);
</script>

<template>
  <BaseCard
    title="Динамика списаний по дням"
    :loading="loading"
  >
    <template #title-append>
      <n-space
        align="center"
        class="filters-list"
      >
        <n-radio-group
          :value="pieDateFilter"
          @update:value="onChangePieDateFilter"
        >
          <n-space class="filters-list">
            <n-radio
              v-for="item in pieFilters"
              :key="item.id"
              :value="item.id"
              :label="item.name"
            />
          </n-space>
        </n-radio-group>

        <n-date-picker
          class="date-picker"
          type="date"
          :value="selectedDate"
          :disabled="!customDateSelectable"
          :format="DATE_FORMAT"
          @update:value="onChangeSelectedDate"
        />
      </n-space>
    </template>

    <n-grid
      x-gap="0"
      y-gap="0"
      cols="12"
      responsive="screen"
      item-responsive
    >
      <n-gi span="12 m:6">
        <ChartPie
          title="Сумма"
          :is-empty="totalStatisticsIsEmpty.amount"
          :data="amountChartData"
          :legends="amountLegends"
        />
      </n-gi>

      <n-gi span="12 m:6">
        <ChartPie
          title="Количество"
          :is-empty="totalStatisticsIsEmpty.count"
          :data="countChartData"
          :legends="countLegends"
        />
      </n-gi>
    </n-grid>
  </BaseCard>
</template>

<style scoped lang="scss">
.date-picker {
  width: 140px;
}
</style>

<style lang="scss">
.filters-list {
  gap: 12px 30px!important;
}
</style>
