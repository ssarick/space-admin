<script lang="ts" setup>

import { NSkeleton } from 'naive-ui';

</script>

<template>
  <div
    :class="[
      'skeleton-profile',
      'flex',
      'flex-column',
      'justify-content-center'
    ]"
  >
    <n-skeleton
      width="100%"
      round
    />

    <n-skeleton
      width="60%"
      class="mt-1"
      round
    />
  </div>
</template>

<style lang="scss" scoped>
.skeleton-profile {
  width: 160px;
  max-width: 100%;
}
</style>
