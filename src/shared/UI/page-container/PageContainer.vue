<script setup lang="ts">
import { PageContainerProps } from './page-container.types';

const props = withDefaults(
  defineProps<PageContainerProps>(),
  {
    tag: 'main'
  }
);
</script>

<template>
  <component
    :is="props.tag"
    :class="{
      container: props.fluid !== true
    }"
  >
    <slot />
  </component>
</template>
