import { useVModel } from '@vueuse/core';
import {
  IBaseSwitchBarEmit,
  IBaseSwitchBarProps
} from './base-switch-bar.types';

export default function useBaseSwitchBar(
  props: IBaseSwitchBarProps,
  emit: IBaseSwitchBarEmit
) {
  const model = useVModel(props, 'modelValue', emit);

  const onLeftLabelClick = () => (model.value = false);
  const onRightLabelClick = () => (model.value = true);

  return {
    model,
    onLeftLabelClick,
    onRightLabelClick
  };
}
