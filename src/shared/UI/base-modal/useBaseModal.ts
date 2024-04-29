import { useVModels } from '@vueuse/core';
import {
  IBaseModalEmits,
  IBaseModalProps
} from './base-modal.types';

export default function useBaseModal(
  props: IBaseModalProps,
  emit: IBaseModalEmits
) {
  const models = useVModels(props, emit);

  const onToggleModal = () => {
    models.modelValue && (
      models.modelValue.value = !models.modelValue.value
    );
  };

  return {
    ...models,
    onToggleModal
  };
}
