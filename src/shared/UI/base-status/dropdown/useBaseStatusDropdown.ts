import { useVModels } from '@vueuse/core';
import { StatusConfig } from '@/shared/types/status.types';
import {
  BaseStatusDropdownEmit,
  BaseStatusDropdownProps
} from '@/shared/UI/base-status/dropdown/base-status-dropdown.types';

export default function useBaseStatusDropdown(
  props: BaseStatusDropdownProps,
  emit: BaseStatusDropdownEmit
) {
  const models = useVModels(props, emit);

  const activeItem = computed<StatusConfig | undefined>(
    () => props.options?.find(
      item => item.value === props.modelValue
    )
  );

  return {
    ...models,
    activeItem
  };
}
