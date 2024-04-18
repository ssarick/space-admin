<script setup lang="ts">
import { NSpace } from 'naive-ui';
import BaseStatusIndicator from '../indicator/BaseStatusIndicator.vue';
import { IBaseStatusItemProps } from './base-status-item.types';
import useBaseStatusItem from './useBaseStatusItem';

const props = withDefaults(
  defineProps<IBaseStatusItemProps>(),
  {
    visible: true,
    type: 'default'
  }
);

const {
  isIndicatorVisible,
  isWrapperHasBgColor
} = useBaseStatusItem(props);
</script>

<template>
  <n-space
    v-if="props.label || props.subLabel"
    inline
    :wrap-item="false"
    :class="[
      'status-wrapper',
      {
        'status-wrapper--bordered': props.bordered,
        [`status-wrapper--${props.type}`]: !!props.type,
        [`color-bg-common_${props.color}-light`]: isWrapperHasBgColor,
        [`color-border-common_${props.color}`]: props.bordered
      }
    ]"
    :size="4"
  >
    <div
      v-if="isIndicatorVisible"
      class="status-indicator-wrapper"
    >
      <BaseStatusIndicator
        :color="props.color"
        :visible="props.visible"
      />
    </div>

    <slot name="before-content" />

    <div class="status-content">
      <n-text
        v-if="props.label"
        class="text-caption"
        tag="p"
      >
        {{ props.label }}
      </n-text>

      <n-text
        v-if="props.subLabel"
        tag="p"
        class="text-caption2 color-secondary_dark_text text-weight-5"
      >
        {{ props.subLabel }}
      </n-text>
    </div>

    <slot name="after-content" />
  </n-space>

  <BaseStatusIndicator
    v-else
    :color="props.color"
    :visible="props.visible"
  />
</template>
