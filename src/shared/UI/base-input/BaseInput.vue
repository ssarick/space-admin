<script setup lang="ts">
import { NInput } from 'naive-ui';
import { IBaseInputEmits, IBaseInputProps } from './base-input.types';
import useBaseInput from './useBaseInput';

const props = defineProps<IBaseInputProps>();
const emit = defineEmits<IBaseInputEmits>();

const {
  inputRef,
  focus,
  blur,
  handleInput,
  onUpdate,
  handleChange
} = useBaseInput(props, emit);

defineExpose({
  blur,
  focus
});
</script>

<template>
  <n-input
    v-bind="$attrs"
    ref="inputRef"
    :class="[
      'base-input',
      {
        'base-input--suffix-border': !!$slots.suffix,
        [`base-input--size-${props.size}`]: !!props.size
      }
    ]"
    :value="props.modelValue"
    @input="handleInput"
    @change="handleChange"
    @update:value="onUpdate"
  >
    <template
      v-for="slot in Object.keys($slots)"
      #[slot]="data"
      :key="slot"
    >
      <slot
        :key="slot"
        :name="slot"
        v-bind="data"
      />
    </template>
  </n-input>
</template>

<style lang="scss">
.base-input {
  .n-base-icon {
    width: $base-input-icon-size;
    height: $base-input-icon-size;

    > svg {
      width: $base-input-icon-size;
      height: $base-input-icon-size;
    }
  }
}
</style>
