<script lang="ts" setup>
import { Pie } from 'vue-chartjs';
import type {
  GroupMessagesChartPieProps
} from './group-messages-chart-pie.types';

defineProps<GroupMessagesChartPieProps>();
</script>

<template>
  <Pie
    class="pie-chart"
    :data="data"
    :options="options"
  />
</template>

<style lang="scss" scoped>
.pie-chart {
  width: 105px;
  max-width: 120px;
}
</style>
