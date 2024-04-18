<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import { NSpace } from 'naive-ui';
import { BaseStatusList } from '@/shared/UI/base-status';
import { IChartPieProps } from './chart-pie.types';
import useChartPie from './useChartPie';

const props = defineProps<IChartPieProps>();
const { chartOptions } = useChartPie();
</script>

<template>
  <div class="chart-pie">
    <n-text
      tag="h3"
      class="headline-2 mb-5"
    >
      {{ props.title }}
    </n-text>

    <n-space
      class="chart-pie__content"
      justify="center"
      align="center"
    >
      <n-text
        v-if="props.isEmpty"
        tag="h3"
        class="color-secondary_dark py-7 px-3"
      >
        По запросу ничего не найдено
      </n-text>

      <template v-else>
        <BaseStatusList
          class="mb-2 text-weight-7"
          :list="props.legends"
        />

        <Pie
          class="pie-chart"
          :data="props.data!"
          :options="chartOptions"
        />
      </template>
    </n-space>
  </div>
</template>

<style lang="scss" scoped>
.pie-chart {
  width: 360px;
  max-width: 360px;
}
</style>
