<script lang="ts" setup>
import { NIcon } from 'naive-ui';
import { IProps } from './base-icon.types';
import useBaseIcon from './useBaseIcon';

const props = withDefaults(
  defineProps<IProps>(),
  {
    color: '#222222'
  }
);

const { SVGComponent } = useBaseIcon(props);
</script>

<template>
  <n-icon
    v-bind="$attrs"
    :color="props.color"
    :style="{
      transform: props.scale
        ? `scale(${props.scale})`
        : undefined
    }"
  >
    <component :is="SVGComponent" />
  </n-icon>
</template>
