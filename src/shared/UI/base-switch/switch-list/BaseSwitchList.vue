<script lang="ts" setup>
import { SwitchListItem } from '@/shared/types/list.types';
import BaseSwitchListItem from '../switch-list-item/BaseSwitchListItem.vue';
import {
  IBaseSwitchListEmits,
  IBaseSwitchListProps } from './base-switch-list.types';
import useBaseSwitchList from './useBaseSwitchList';

const props = withDefaults(
  defineProps<IBaseSwitchListProps>(),
  {
    idKey: 'id',
    activeKey: 'active',
    list: () => []
  }
) as IBaseSwitchListProps<SwitchListItem>;

const emit = defineEmits<IBaseSwitchListEmits>();

const {
  emitCheckItem,
  getItemLabel
} = useBaseSwitchList(props, emit);
</script>

<template>
  <div
    :class="[
      'switch-list',
      {
        'border-top': props.borderTop
      }
    ]"
  >
    <BaseSwitchListItem
      v-for="item in props.list"
      :key="item[props.idKey!] as string"
      :label="getItemLabel(item)"
      :loading="item.loading"
      :model-value="item[props.activeKey!] as boolean"
      @update:model-value="emitCheckItem(item, $event)"
    />
  </div>
</template>
