import { useVModel } from '@vueuse/core';
import {
  IBaseSwitchListItemEmits,
  IBaseSwitchListItemProps
} from './base-switch-list-item.types';

export default function useBaseSwitchListItem(
  props: IBaseSwitchListItemProps,
  emit: IBaseSwitchListItemEmits
) {
  const checked = useVModel(
    props, 'modelValue', emit
  );

  return {
    checked
  };
}
