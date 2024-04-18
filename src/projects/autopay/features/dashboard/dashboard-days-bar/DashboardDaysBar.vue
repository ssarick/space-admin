<script lang="ts" setup>
import { Bar } from 'vue-chartjs';
import {
  NCheckbox,
  NCheckboxGroup,
  NDatePicker,
  NRadio,
  NRadioGroup,
  NSpace } from 'naive-ui';
import BaseCard from '@/shared/UI/base-card';
import { BaseStatusIndicator } from '@/shared/UI/base-status';
import { IDashboardDaysBarProps } from './dashboard-days-bar.types';
import useDashboardDaysBar from './useDashboardDaysBar';

const props = defineProps<IDashboardDaysBarProps>();

const {
  chartData,
  chartOptions,
  loading,
  rangeDate,
  processingTypes,
  barType,
  barTypes,
  datePickerProps,
  processingFilters,
  onChangeDate,
  isCheckedProcessingType,
  onChangeProcessingTypes
} = useDashboardDaysBar(props);
</script>

<template>
  <BaseCard
    :title="props.title"
    :loading="loading"
  >
    <template #title-append>
      <n-date-picker
        v-bind="datePickerProps"
        start-placeholder="Дата от"
        end-placeholder="Дата до"
        class="date-picker"
        :value="rangeDate"
        @update:value="onChangeDate"
      />
    </template>

    <n-space
      justify="space-between"
      align="center"
      class="filters-group"
    >
      <n-checkbox-group
        :value="processingTypes"
        @update:value="onChangeProcessingTypes"
      >
        <n-space
          :size="[ 16, 12 ]"
        >
          <n-space
            v-for="item in processingFilters"
            :key="item.id!"
            align="center"
            class="checkbox-list__item"
            :size="[ 0, 8 ]"
          >
            <n-checkbox
              :value="item.id!"
              :label="item.label!"
            />

            <BaseStatusIndicator
              :color="item.color"
              :visible="isCheckedProcessingType(
                item.id!
              )"
            />
          </n-space>
        </n-space>
      </n-checkbox-group>

      <n-radio-group
        v-model:value="barType"
      >
        <n-space class="radio-list">
          <n-radio
            v-for="item in barTypes"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </n-space>
      </n-radio-group>
    </n-space>

    <div class="bar-chart">
      <Bar
        class="bar-chart"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.bar-chart {
  height: 450px;
}

.radio-list {
  gap: 12px 32px!important;
}

.filters-group {
  margin-bottom: 50px;
  gap: 16px 30px !important;
}

.date-picker {
  width: 280px;
}
</style>
