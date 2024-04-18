<script setup lang="ts">
import { IBaseStatusIndicatorProps } from './base-status-indicator.types';

const props = withDefaults(
  defineProps<IBaseStatusIndicatorProps>(),
  {
    size: 'medium'
  }
);
</script>

<template>
  <div
    :class="[
      'status-indicator',
      'hideable',
      {
        visible: props.visible,
        [`color-bg-common_${props.color}`]: props.color,
        [`size--${props.size}`]: props.size
      }
    ]"
  />
</template>
