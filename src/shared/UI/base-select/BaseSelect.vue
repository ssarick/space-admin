<script setup lang="ts">
import { NSelect, NSpin } from 'naive-ui';
import { SelectMixedOption, Value } from 'naive-ui/es/select/src/interface';
import { BaseSelectEmits, BaseSelectProps } from './base-select.types';
import useBaseSelect from './useBaseSelect';

const emit = defineEmits<BaseSelectEmits>();

const props = withDefaults(defineProps<BaseSelectProps>(), {
  searchFieldName: 'searchString',
  resetMenuOnOptionsChange: false
});

const {
  loading,
  remote,
  onUpdate,
  onShow,
  onFocus,
  onBlur,
  selectRef,
  onClear,
  clear,
  handleScroll,
  onSearch,
  classes,
  optionsData,
  renderOption
} = useBaseSelect(props, emit);

defineExpose({
  clear,
  onReset: onClear
});
</script>

<template>
  <n-select
    ref="selectRef"
    v-bind="$attrs"
    :class="classes"
    :value="(modelValue as Value)"
    :options="(optionsData as SelectMixedOption[])"
    :loading="loading"
    :remote="remote"
    :render-label="renderOption"
    :size="props.size"
    :reset-menu-on-options-change="resetMenuOnOptionsChange"
    @update:value="onUpdate"
    @update:show="onShow"
    @search="onSearch"
    @clear="onClear"
    @focus="onFocus"
    @blur="onBlur"
    @scroll="handleScroll"
  >
    <template
      v-if="loading"
      #empty
    >
      <n-spin
        size="small"
        class="py-4"
      />
    </template>
  </n-select>
</template>

<style scoped lang="scss">
.searching {
  :deep(.n-base-selection--focus .n-base-selection-placeholder) {
    opacity: 0;
  }
}
:deep(.n-base-selection) {
  &.n-base-selection--disabled {
    .n-base-selection-input__content {
      color: var(--n-text-color-disabled);
    }
  }
}
.n-select {
  :deep(.n-base-selection-input) {
    text-transform: inherit;
  }
}
</style>
