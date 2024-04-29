<script setup lang="ts">
import { NSpin } from 'naive-ui';

interface IProps {
  size?: number | 'small' | 'medium' | 'large'
}

withDefaults(defineProps<IProps>(), {
  size: 50
});
</script>

<template>
  <div class="base-loading">
    <n-spin :size="size" />
  </div>
</template>

<style scoped lang="scss">
.base-loading {
  width: 100%;
  height: calc(100vh - 335px);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
