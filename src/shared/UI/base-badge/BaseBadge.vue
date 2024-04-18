<script setup lang="ts">
import { BaseBadgeProps } from './base-badge.types';

const props = withDefaults(
  defineProps<BaseBadgeProps>(),
  {
    max: 99,
    offset: () => [ -4, 4 ]
  }
);
</script>

<template>
  <n-badge
    v-bind="$attrs"
    :max="props.max"
    :offset="props.offset"
  >
    <slot />
  </n-badge>
</template>
