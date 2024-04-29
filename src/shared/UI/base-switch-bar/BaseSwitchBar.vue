<script lang="ts" setup>
import {
  NSpace,
  NSwitch,
  NText
} from 'naive-ui';
import {
  IBaseSwitchBarEmit,
  IBaseSwitchBarProps
} from './base-switch-bar.types';
import useBaseSwitchBar from './useBaseSwitchBar';

const props = defineProps<IBaseSwitchBarProps>();
const emit = defineEmits<IBaseSwitchBarEmit>();

const {
  model,
  onLeftLabelClick,
  onRightLabelClick
} = useBaseSwitchBar(
  props,
  emit
);
</script>

<template>
  <n-space
    class="switch-bar"
    align="center"
  >
    <n-text
      v-if="props.leftLabel"
      class="switch-bar__label"
      @click="onLeftLabelClick"
    >
      {{ props.leftLabel }}
    </n-text>

    <n-switch
      v-model:value="model"
      v-bind="$attrs"
    />

    <n-text
      v-if="props.rightLabel"
      class="switch-bar__label"
      @click="onRightLabelClick"
    >
      {{ props.rightLabel }}
    </n-text>
  </n-space>
</template>

<style lang="scss" scoped>
.switch-bar {
  border-radius: 4px;
  padding: 6px 12px;
  background-color: map-get($color-secondary, 'light');
  user-select: none;

  &__label {
    cursor: pointer;
  }
}
</style>
