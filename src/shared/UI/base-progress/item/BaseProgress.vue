<script lang="ts" setup>
import { NProgress } from 'naive-ui';
import { BaseProgressProps } from './base-progress.types';
import useBaseProgress from './useBaseProgress';

const props = withDefaults(
  defineProps<BaseProgressProps>(),
  {
    options: () => []
  }
);

const { calcPercentageByIndex } = useBaseProgress(props);
</script>

<template>
  <div class="base-progress">
    <n-progress
      v-for="(item, index) in props.options"
      :key="`progress-${index}`"
      type="line"
      class="base-progress__item"
      rail-color="transparent"
      :style="{
        zIndex: -index
      }"
      :color="item.color"
      :processing="item.processing || false"
      :show-indicator="false"
      :percentage="calcPercentageByIndex(index)"
      :height="12"
      :border-radius="4"
    />
  </div>
</template>

<style lang="scss" scoped>
.base-progress {
  width: 82px;
  height: 12px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1000;
    background-color: map-get($color-common, 'gray-lighter');
  }

  &__item {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
