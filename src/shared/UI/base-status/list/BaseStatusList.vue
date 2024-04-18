<script lang="ts" setup>
import BaseStatusItem from '../item/BaseStatusItem.vue';
import { IBaseStatusListProps } from './base-status-list.types';

const props = withDefaults(
  defineProps<IBaseStatusListProps>(),
  {
    list: () => []
  }
);
</script>

<template>
  <div class="status-list">
    <BaseStatusItem
      v-for="item in props.list"
      :key="item.subLabel || item.label"
      v-bind="item"
    />
  </div>
</template>

<style lang="scss" scoped>
.status-list {
  :deep(.status-wrapper) {
    &:not(:first-child) {
      margin-top: 24px;
    }
  }
}
</style>
