<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import { IBaseInputGroupProps } from './base-input-group.types';

const props = defineProps<IBaseInputGroupProps>();
</script>

<template>
  <div class="base-input-group">
    <n-text
      tag="p"
      class="base-input-group__label"
    >
      {{ props.title }}
    </n-text>

    <n-space
      justify="space-between"
      :wrap="false"
    >
      <slot />
    </n-space>
  </div>
</template>
