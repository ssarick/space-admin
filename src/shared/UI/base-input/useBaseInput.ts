import { ref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { InputInst } from 'naive-ui';
import { globalConfig } from '@/shared/config/global-config';
import {
  IBaseInputEmits,
  IBaseInputProps,
  InputFormatter
} from './base-input.types';

export default function useBaseInput(
  props: IBaseInputProps,
  emit: IBaseInputEmits
) {
  const inputRef = ref<InputInst | null>(null);

  const focus = () => {
    inputRef.value?.focus();
  };

  const blur = () => {
    inputRef.value?.blur();
  };

  const valueFormatters: InputFormatter[] = [
    (value?: string | null) => props.uppercase
      ? String(value || '').toUpperCase()
      : value
  ];

  const formatValue = (value: string): string => {
    return valueFormatters.reduce(
      (acc: ReturnType<InputFormatter>, formatter) =>
        formatter(acc), value
    ) || value;
  };

  const handleInput = useDebounceFn((v: string) => {
    emit('input', formatValue(v));
  }, globalConfig.debounceInMS);

  const handleChange = (value: string) =>
    emit('change', formatValue(value));

  const onUpdate = (value: string) =>
    emit('update:modelValue', formatValue(value));

  return {
    inputRef,
    focus,
    blur,
    handleInput,
    onUpdate,
    handleChange
  };
}
