<script lang="ts" setup>
import { IPageTitleProps } from './page-title.types';

const props = defineProps<IPageTitleProps>();
</script>

<template>
  <n-text
    v-if="title"
    tag="h2"
    class="headline-1 mr-2"
    :class="{ 'mb-4': !props.noMargin }"
  >
    {{ title || '' }}
  </n-text>
</template>
