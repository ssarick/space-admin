<script lang="ts" setup>
import { NCard } from 'naive-ui';

interface IProps {
  title?: string
}
defineProps<IProps>();
</script>
<template>
  <n-card
    size="small"
    hoverable
    :title="$t(title || '')"
    :header-style="{
      backgroundColor: '#f4f4f4',
      height: '40px',
      marginBottom: '15px',
    }"
  >
    <slot />
  </n-card>
</template>
