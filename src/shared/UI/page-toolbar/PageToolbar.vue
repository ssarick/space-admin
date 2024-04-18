<script lang="ts" setup>
import { IPageToolbarProps } from './page-toolbar.types';

defineProps<IPageToolbarProps>();
</script>

<template>
  <div class="page-toolbar">
    <h2 class="headline-1">
      {{ title }}
    </h2>

    <div
      v-if="isShowSlot"
      class="page-toolbar__right"
    ><slot /></div>
  </div>
</template>

<style lang="scss">
.page-toolbar {
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  &__right {
    @include flex(1rem);
  }
}
</style>
