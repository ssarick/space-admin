<script lang="ts" setup>
import { NSpace } from 'naive-ui';
import { IBaseLinkGroupProps } from './base-link-group.types';

const props = defineProps<IBaseLinkGroupProps>();
</script>

<template>
  <n-space class="base-link-group">
    <router-link
      v-for="(link, index) in props.links"
      :key="`link-${index}`"
      class="color-common_black"
      :to="link"
    >
      {{ link.text }}
    </router-link>
  </n-space>
</template>

<style lang="scss" scoped>
.base-link-group {
  gap: 8px 25px!important;
}
</style>
