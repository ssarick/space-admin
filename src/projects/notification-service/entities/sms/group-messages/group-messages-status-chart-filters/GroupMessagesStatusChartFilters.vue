<script setup lang="ts">
import BaseIcon from '@/shared/UI/base-icon';
import useGroupMessagesChartPie
  from '@/projects/notification-service/entities/sms/group-messages/group-messages-chart/pie/useGroupMessagesChartPie';
import GroupMessagesChartPie
  from '../group-messages-chart/pie';
import type {
  GroupMessagesStatusChartFilterEmits,
  GroupMessagesStatusChartFilterProps
} from './grouped-messages-statues-chart-filters.types';
import useGroupedMessagesStatusChartFilters
  from './useGroupedMessagesStatusChartFilters';

const { chartOptions } = useGroupMessagesChartPie();

const props = defineProps<GroupMessagesStatusChartFilterProps>();
const emit = defineEmits<GroupMessagesStatusChartFilterEmits>();

const {
  activeColors,
  activeColorsHover,
  chartData,
  toggleActiveClass,
  hoverActiveClass
} = useGroupedMessagesStatusChartFilters(props, emit);
</script>

<template>
  <n-grid
    class="mb-4"
    layout-shift-disabled
    :x-gap="16"
    :y-gap="16"
    :cols="20"
  >
    <n-gi
      v-for="item in data"
      :key="item.icon"
      :span="3"
    >
      <div
        class="status-widget-item"
        :class="!item.active ? '' : 'active'"
        @click="toggleActiveClass(item)"
        @mouseenter="hoverActiveClass(item)"
      >
        <div class="item-icon">
          <n-space
            justify="space-between"
            align="center"
            :wrap="false"
          >
            <BaseIcon
              size="40"
              :color="item.color"
              :icon="item.icon"
            />

            <n-tag
              v-if="item.active"
              size="small"
              class="mb-1"
              :color="{
                color: activeColors?.alpha,
                textColor: activeColors?.color
              }"
            >
              {{ $t('Selected') }}
            </n-tag>
          </n-space>
        </div>

        <n-text class="item-title">{{ item?.title }}</n-text>

        <n-statistic>
          <n-skeleton v-if="loading" />

          <n-number-animation
            v-else
            :from="0"
            :to="item?.number"
          />
        </n-statistic>
      </div>
    </n-gi>

    <n-gi :span="8">
      <div class="chart-widget-item">
        <n-space
          justify="space-between"
          class="item-wrapper"
          align="start"
        >
          <n-spin :show="loading">
            <GroupMessagesChartPie
              v-if="chartData"
              class="my-auto"
              :data="chartData"
              :options="chartOptions"
            />
          </n-spin>

          <div class="item-wrapper">
            <n-text class="item-title">
              {{ $t('short-desc') }}
            </n-text>

            <n-text class="item-text">
              {{ $t('text-sms') }}
            </n-text>
          </div>
        </n-space>
      </div>
    </n-gi>
  </n-grid>
</template>

<style scoped lang="scss">
.status-widget-item{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px;
  border: 2px solid map-get($color-common, 'white-grey');
  border-radius: 12px;

  &:hover {
    transition: 0.2s linear all;
    cursor: pointer;
    border: 2px solid v-bind('activeColorsHover?.color');
    background: v-bind('activeColorsHover?.alpha');
  }

  .item-icon{
    padding-bottom: 14px;
  }
  .item-title{
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: 0.008em;
    text-align: left;
    color: map-get($color-secondary, 'dark_text');
    padding-bottom: 4px;
  }
}

.active{
  transition: 0.2s linear all;
  cursor: pointer;
  border: 2px solid v-bind('activeColors?.color');
  background: v-bind('activeColors?.alpha');
}

:deep(.n-statistic-value__content) {
  font-size: 24px !important;
  font-weight: 600 !important;
  line-height: 30px;
  letter-spacing: -0.01em;
  text-align: left;
  color: map-get($color-common, 'black');
}

.chart-widget-item{
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border: 2px solid map-get($color-common, 'white-grey');
  border-radius: 12px;
  height: 100%;
  .item-wrapper{
    display: flex;
    flex-direction: column;
  }
  .item-title{
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.008em;
    text-align: left;
    color: map-get($color-common, 'black');
    padding-bottom: 4px;
  }
  .item-text {
    font-size: 12px;
    font-weight: 600;
    line-height: 16px;
    letter-spacing: -0.01em;
    text-align: left;
    color: map-get($color-secondary, 'dark_text');
  }
}
</style>

