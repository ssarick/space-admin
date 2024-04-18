<script lang="ts" setup>
import { NSkeleton, NSpace } from 'naive-ui';
import { IBaseSkeletonListItemProps } from './base-skeleton-list-item.types';

const props = withDefaults(
  defineProps<IBaseSkeletonListItemProps>(),
  {
    repeat: 1
  }
);
</script>

<template>
  <n-space
    v-for="(_, index) in props.repeat"
    :key="index"
    align="center"
    class="mt-2"
    :wrap="false"
    :wrap-item="false"
    :size="[ 16, 16 ]"
  >
    <n-skeleton
      style="min-width: 40px"
      circle
      animated
      :width="40"
      :height="36"
    />

    <n-skeleton
      round
      animated
      :height="20"
      :repeat="2"
    />
  </n-space>
</template>
