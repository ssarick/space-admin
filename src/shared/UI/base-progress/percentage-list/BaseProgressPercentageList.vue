<script setup lang="ts">
import { BaseProgressPercentageListProps } from './base-progress-percentage-list.types';

const props = withDefaults(
  defineProps<BaseProgressPercentageListProps>(),
  {
    options: () => []
  }
);
</script>

<template>
  <ul class="base-progress-list">
    <li
      v-for="(item, index) in props.options"
      :key="`list-item-${index}`"
    >
      {{ item.label }}: {{ item.percentage }}%
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.base-progress {
  &-list {
    list-style: none;
  }
}
</style>
