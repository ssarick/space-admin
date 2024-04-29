<script lang="ts" setup>
import { NSwitch } from 'naive-ui';
import {
  IBaseSwitchListItemEmits,
  IBaseSwitchListItemProps
} from './base-switch-list-item.types';
import useBaseSwitchListItem from './useBaseSwitchListItem';

const props = defineProps<IBaseSwitchListItemProps>();
const emit = defineEmits<IBaseSwitchListItemEmits>();

const { checked } = useBaseSwitchListItem(
  props, emit
);
</script>

<template>
  <div
    :class="[
      'flex',
      'align-items-center',
      'justify-space-between',
      'switch-list-item'
    ]"
  >
    <n-text
      tag="p"
      class="switch-list-item__label"
    >
      {{ props.label }}
    </n-text>

    <n-switch
      v-model:value="checked"
      size="large"
      :loading="props.loading"
    />
  </div>
</template>
