<script setup lang="ts">
import { NPopselect } from 'naive-ui';
import { SelectMixedOption } from 'naive-ui/es/select/src/interface';
import BaseIcon from '@/shared/UI/base-icon/BaseIcon.vue';
import { BaseStatusItem } from '@/shared/UI/base-status';
import {
  BaseStatusDropdownEmit,
  BaseStatusDropdownProps
} from './base-status-dropdown.types';
import useBaseStatusDropdown from './useBaseStatusDropdown';

const props = withDefaults(
  defineProps<BaseStatusDropdownProps>(),
  {
    options: () => []
  }
);

const emit = defineEmits<BaseStatusDropdownEmit>();

const {
  modelValue,
  activeItem
} = useBaseStatusDropdown(props, emit);
</script>

<template>
  <n-popselect
    v-model:value="modelValue"
    :options="props.options as SelectMixedOption[]"
  >
    <BaseStatusItem
      v-bind="activeItem"
      type="filled"
    >
      <template #after-content>
        <BaseIcon
          icon="arrow-down"
          class="icon-placement"
          color="#222"
          size="18"
        />
      </template>
    </BaseStatusItem>
  </n-popselect>
</template>

<style scoped lang="scss">
.icon-placement{
  margin-top: 2px;
}
</style>
